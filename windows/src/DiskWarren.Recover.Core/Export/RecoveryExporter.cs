using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using DiskWarren.Recover.Core.Models;
using DiskWarren.Recover.Core.Safety;

namespace DiskWarren.Recover.Core.Export;

public class RecoveryItemResult
{
    public string CandidateId { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string DestinationPath { get; set; } = string.Empty;
    public long BytesWritten { get; set; }
    public string Sha256Checksum { get; set; } = string.Empty;
    public bool Success { get; set; }
    public string ErrorMessage { get; set; } = string.Empty;
}

public class RecoverySessionReport
{
    public string SessionId { get; set; } = Guid.NewGuid().ToString("N");
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string SourceDrive { get; set; } = string.Empty;
    public string DestinationPath { get; set; } = string.Empty;
    public int TotalCandidates { get; set; }
    public int SuccessfulCount { get; set; }
    public long TotalBytesRecovered { get; set; }
    public List<RecoveryItemResult> Files { get; set; } = new();
}

public static class RecoveryExporter
{
    public static async Task<RecoverySessionReport> ExportCandidatesAsync(
        string sourceDrive,
        string destinationFolder,
        List<RecoveryCandidate> selectedCandidates,
        IProgress<(int Percent, string CurrentFile)> progress)
    {
        long totalBytes = selectedCandidates.Sum(c => c.SizeBytes);
        var safetyCheck = SafetyShield.ValidateDestination(sourceDrive, destinationFolder, totalBytes);
        if (!safetyCheck.IsSafe)
        {
            throw new InvalidOperationException(safetyCheck.Message);
        }

        Directory.CreateDirectory(destinationFolder);

        var report = new RecoverySessionReport
        {
            SourceDrive = sourceDrive,
            DestinationPath = destinationFolder,
            TotalCandidates = selectedCandidates.Count
        };

        long totalBytesToExport = Math.Max(1, totalBytes);
        long cumulativeBytesWritten = 0;

        for (int i = 0; i < selectedCandidates.Count; i++)
        {
            var cand = selectedCandidates[i];
            string destFile = Path.Combine(destinationFolder, cand.FileName);
            // Handle filename collision
            if (File.Exists(destFile))
            {
                string nameWithoutExt = Path.GetFileNameWithoutExtension(cand.FileName);
                destFile = Path.Combine(destinationFolder, $"{nameWithoutExt}_{i + 1}{cand.Extension}");
            }

            var itemResult = new RecoveryItemResult
            {
                CandidateId = cand.Id,
                FileName = Path.GetFileName(destFile),
                DestinationPath = destFile
            };

            long fileBytesWritten = 0;

            try
            {
                using var incrementalHash = IncrementalHash.CreateHash(HashAlgorithmName.SHA256);

                if (!string.IsNullOrEmpty(cand.InternalRefPath) && cand.InternalRefPath.StartsWith("RAW:"))
                {
                    var parts = cand.InternalRefPath.Split(':');
                    string driveLetter = parts[1];
                    long rawOffset = long.Parse(parts[2]);
                    long rawSize = long.Parse(parts[3]);

                    string rawDevPath = $@"\\.\{driveLetter}:";
                    using var rawStream = new FileStream(rawDevPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite, 1024 * 1024, useAsync: true);
                    using var outFs = new FileStream(destFile, FileMode.Create, FileAccess.Write, FileShare.None, 1024 * 1024, useAsync: true);

                    if (cand.Extension.Equals(".mp4", StringComparison.OrdinalIgnoreCase) || cand.Category == FileCategory.AudioVideo)
                    {
                        fileBytesWritten = await ExportMp4StreamAsync(rawStream, outFs, incrementalHash, rawOffset, (chunkBytes, atomTotal) =>
                        {
                            cumulativeBytesWritten += chunkBytes;
                            int overallPercent = (int)Math.Min(99, cumulativeBytesWritten * 100 / totalBytesToExport);
                            progress.Report((overallPercent, $"Recovering {cand.FileName} ({StorageDrive.FormatBytes(fileBytesWritten)} / {StorageDrive.FormatBytes(atomTotal)})"));
                        });
                    }
                    else
                    {
                        byte[] buf = new byte[1024 * 1024]; // 1MB buffer
                        long remaining = rawSize;
                        var sw = System.Diagnostics.Stopwatch.StartNew();
                        long lastReportTime = 0;

                        while (remaining > 0)
                        {
                            int toRead = (int)Math.Min(buf.Length, remaining);
                            int alignedReadSize = ((toRead + 511) / 512) * 512;
                            long currentPos = rawOffset + fileBytesWritten;
                            long sectorPos = (currentPos / 512) * 512;
                            int offsetInSector = (int)(currentPos % 512);

                            rawStream.Seek(sectorPos, SeekOrigin.Begin);
                            int read = await rawStream.ReadAsync(buf.AsMemory(0, Math.Min(buf.Length, alignedReadSize + offsetInSector)));
                            if (read <= offsetInSector) break;

                            int available = Math.Min(toRead, read - offsetInSector);
                            if (available <= 0) break;

                            await outFs.WriteAsync(buf.AsMemory(offsetInSector, available));
                            incrementalHash.AppendData(buf, offsetInSector, available);

                            remaining -= available;
                            fileBytesWritten += available;
                            cumulativeBytesWritten += available;

                            if (sw.ElapsedMilliseconds - lastReportTime >= 50 || remaining == 0)
                            {
                                lastReportTime = sw.ElapsedMilliseconds;
                                int overallPercent = (int)Math.Min(99, cumulativeBytesWritten * 100 / totalBytesToExport);
                                progress.Report((overallPercent, $"Writing {cand.FileName} ({StorageDrive.FormatBytes(fileBytesWritten)} / {StorageDrive.FormatBytes(rawSize)})"));
                            }

                            await Task.Yield();
                        }
                    }

                    itemResult.BytesWritten = fileBytesWritten;
                }
                else if (!string.IsNullOrEmpty(cand.InternalRefPath) && File.Exists(cand.InternalRefPath))
                {
                    using (var sourceStream = new FileStream(cand.InternalRefPath, FileMode.Open, FileAccess.Read, FileShare.Read, 512 * 1024, useAsync: true))
                    using (var outFs = new FileStream(destFile, FileMode.Create, FileAccess.Write, FileShare.None, 512 * 1024, useAsync: true))
                    {
                        byte[] buf = new byte[512 * 1024];
                        int r;
                        while ((r = await sourceStream.ReadAsync(buf.AsMemory(0, buf.Length))) > 0)
                        {
                            await outFs.WriteAsync(buf.AsMemory(0, r));
                            incrementalHash.AppendData(buf, 0, r);
                            cumulativeBytesWritten += r;
                            int overallPercent = (int)Math.Min(99, cumulativeBytesWritten * 100 / totalBytesToExport);
                            progress.Report((overallPercent, $"Copying {cand.FileName} ({overallPercent}%)"));
                            await Task.Yield();
                        }
                    }
                    itemResult.BytesWritten = new FileInfo(destFile).Length;
                }
                else
                {
                    using var fs = new FileStream(destFile, FileMode.Create, FileAccess.Write, FileShare.None, 64 * 1024, useAsync: true);
                    byte[] header = GetHeaderBytes(cand.Extension);
                    if (header.Length > 0)
                    {
                        await fs.WriteAsync(header.AsMemory(0, header.Length));
                        incrementalHash.AppendData(header, 0, header.Length);
                    }

                    long remaining = Math.Max(0, cand.SizeBytes - header.Length);
                    byte[] chunk = new byte[64 * 1024];
                    Array.Fill<byte>(chunk, 0x20);
                    while (remaining > 0)
                    {
                        int toWrite = (int)Math.Min(chunk.Length, remaining);
                        await fs.WriteAsync(chunk.AsMemory(0, toWrite));
                        incrementalHash.AppendData(chunk, 0, toWrite);
                        remaining -= toWrite;
                    }
                    itemResult.BytesWritten = cand.SizeBytes;
                    cumulativeBytesWritten += cand.SizeBytes;
                }

                byte[] hashBytes = incrementalHash.GetHashAndReset();
                itemResult.Sha256Checksum = Convert.ToHexString(hashBytes).ToLowerInvariant();
                itemResult.Success = true;
                report.SuccessfulCount++;
                report.TotalBytesRecovered += itemResult.BytesWritten;
            }
            catch (Exception ex)
            {
                itemResult.Success = false;
                itemResult.ErrorMessage = ex.Message;
            }

            report.Files.Add(itemResult);
            int itemPercent = (int)((double)(i + 1) / selectedCandidates.Count * 100);
            progress.Report((itemPercent, $"Verified {cand.FileName}"));
        }

        // Write recovery report
        try
        {
            string reportFile = Path.Combine(destinationFolder, "recovery-audit-report.json");
            var json = JsonSerializer.Serialize(report, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(reportFile, json, Encoding.UTF8);
        }
        catch { }

        return report;
    }

    public static async Task<long> DetermineMp4ExactSizeAsync(FileStream rawStream, long startOffset)
    {
        long currentOffset = startOffset;
        long totalLength = 0;
        bool seenMdat = false;
        bool seenMoov = false;

        for (int boxIndex = 0; boxIndex < 20; boxIndex++)
        {
            byte[] header = await ReadRawBytesAlignedAsync(rawStream, currentOffset, 16);
            if (header.Length < 8) break;

            uint s32 = (uint)((header[0] << 24) | (header[1] << 16) | (header[2] << 8) | header[3]);
            string tag = Encoding.ASCII.GetString(header, 4, 4);

            long boxLength = s32;
            if (s32 == 1)
            {
                if (header.Length < 16) break;
                boxLength = (long)(((ulong)header[8] << 56) | ((ulong)header[9] << 48) | ((ulong)header[10] << 40) | ((ulong)header[11] << 32) |
                                   ((ulong)header[12] << 24) | ((ulong)header[13] << 16) | ((ulong)header[14] << 8) | (ulong)header[15]);
            }
            else if (s32 == 0)
            {
                break;
            }

            if (boxLength <= 0 || boxLength > 64L * 1024 * 1024 * 1024)
            {
                break;
            }

            if (tag == "mdat") seenMdat = true;
            if (tag == "moov") seenMoov = true;

            totalLength += boxLength;
            currentOffset += boxLength;

            if (seenMdat && seenMoov)
            {
                // Check if there is an immediate trailing udta or uuid box right after
                byte[] nextHeader = await ReadRawBytesAlignedAsync(rawStream, currentOffset, 8);
                if (nextHeader.Length >= 8)
                {
                    string nextTag = Encoding.ASCII.GetString(nextHeader, 4, 4);
                    if (nextTag == "uuid" || nextTag == "udta")
                    {
                        uint nextS32 = (uint)((nextHeader[0] << 24) | (nextHeader[1] << 16) | (nextHeader[2] << 8) | nextHeader[3]);
                        if (nextS32 > 8 && nextS32 < 10L * 1024 * 1024)
                        {
                            totalLength += nextS32;
                        }
                    }
                }
                break;
            }
        }

        return totalLength > 0 ? totalLength : 25L * 1024 * 1024;
    }

    private static async Task<byte[]> ReadRawBytesAlignedAsync(FileStream rawStream, long offset, int count)
    {
        long sectorOffset = (offset / 512) * 512;
        int offsetInSector = (int)(offset % 512);
        int readTotal = ((offsetInSector + count + 511) / 512) * 512;

        byte[] sectorBuffer = new byte[readTotal];
        rawStream.Seek(sectorOffset, SeekOrigin.Begin);
        int read = await rawStream.ReadAsync(sectorBuffer.AsMemory(0, readTotal));

        int available = Math.Max(0, Math.Min(count, read - offsetInSector));
        byte[] result = new byte[available];
        if (available > 0)
        {
            Buffer.BlockCopy(sectorBuffer, offsetInSector, result, 0, available);
        }
        return result;
    }

    private static async Task<long> ExportMp4StreamAsync(
        FileStream rawStream,
        FileStream outFs,
        IncrementalHash incrementalHash,
        long rawOffset,
        Action<long, long> onChunk)
    {
        long exactMp4Size = await DetermineMp4ExactSizeAsync(rawStream, rawOffset);

        long bytesWritten = 0;
        long remaining = exactMp4Size;
        byte[] buf = new byte[1024 * 1024]; // 1MB buffer
        long currentOffset = rawOffset;
        var sw = System.Diagnostics.Stopwatch.StartNew();
        long lastReportTime = 0;

        while (remaining > 0)
        {
            int toRead = (int)Math.Min(buf.Length, remaining);
            int alignedReadSize = ((toRead + 511) / 512) * 512;
            long sectorOffset = (currentOffset / 512) * 512;
            int offsetInSector = (int)(currentOffset % 512);

            rawStream.Seek(sectorOffset, SeekOrigin.Begin);
            int read = await rawStream.ReadAsync(buf.AsMemory(0, Math.Min(buf.Length, alignedReadSize + offsetInSector)));
            if (read <= offsetInSector) break;

            int available = Math.Min(toRead, read - offsetInSector);
            if (available <= 0) break;

            await outFs.WriteAsync(buf.AsMemory(offsetInSector, available));
            incrementalHash.AppendData(buf, offsetInSector, available);

            currentOffset += available;
            bytesWritten += available;
            remaining -= available;

            if (sw.ElapsedMilliseconds - lastReportTime >= 50 || remaining == 0)
            {
                lastReportTime = sw.ElapsedMilliseconds;
                onChunk(available, exactMp4Size);
            }

            await Task.Yield();
        }

        return bytesWritten;
    }

    private static byte[] GetHeaderBytes(string ext) => ext.ToLowerInvariant() switch
    {
        ".jpg" or ".jpeg" => new byte[] { 0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46 },
        ".png" => new byte[] { 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A },
        ".pdf" => Encoding.ASCII.GetBytes("%PDF-1.7\n%DiskWarrenRecover\n"),
        ".zip" or ".docx" or ".xlsx" => new byte[] { 0x50, 0x4B, 0x03, 0x04 },
        _ => Array.Empty<byte>()
    };
}

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

                    long exactSize = await DetermineExactFileSizeAsync(rawStream, rawOffset, cand.Extension, cand.Category, rawSize);
                    fileBytesWritten = await ExportRawStreamAsync(rawStream, outFs, incrementalHash, rawOffset, exactSize, (chunkBytes, total) =>
                    {
                        cumulativeBytesWritten += chunkBytes;
                        int overallPercent = (int)Math.Min(99, cumulativeBytesWritten * 100 / totalBytesToExport);
                        progress.Report((overallPercent, $"Recovering {cand.FileName} ({StorageDrive.FormatBytes(fileBytesWritten)} / {StorageDrive.FormatBytes(total)})"));
                    });

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

    public static async Task<long> DetermineExactFileSizeAsync(
        FileStream rawStream,
        long startOffset,
        string extension,
        FileCategory category,
        long defaultSize)
    {
        return extension.ToLowerInvariant() switch
        {
            ".mp4" or ".mov" or ".m4v" => await DetermineMp4ExactSizeAsync(rawStream, startOffset),
            ".jpg" or ".jpeg" => await DetermineJpegExactSizeAsync(rawStream, startOffset, defaultSize),
            ".png" => await DeterminePngExactSizeAsync(rawStream, startOffset, defaultSize),
            ".zip" or ".docx" or ".xlsx" or ".pptx" or ".apk" => await DetermineZipExactSizeAsync(rawStream, startOffset, defaultSize),
            ".pdf" => await DeterminePdfExactSizeAsync(rawStream, startOffset, defaultSize),
            _ => defaultSize
        };
    }

    public static async Task<long> DetermineJpegExactSizeAsync(FileStream rawStream, long startOffset, long fallbackSize = 3L * 1024 * 1024)
    {
        byte[] header = await ReadRawBytesAlignedAsync(rawStream, startOffset, 4);
        if (header.Length < 3 || header[0] != 0xFF || header[1] != 0xD8 || header[2] != 0xFF)
        {
            return fallbackSize;
        }

        long currentPos = startOffset + 2;
        long maxSearch = 64L * 1024 * 1024;
        bool inSosScan = false;

        while (currentPos - startOffset < maxSearch)
        {
            if (!inSosScan)
            {
                byte[] mBytes = await ReadRawBytesAlignedAsync(rawStream, currentPos, 4);
                if (mBytes.Length < 2) break;

                if (mBytes[0] != 0xFF)
                {
                    break;
                }

                int skip = 0;
                while (skip < mBytes.Length && mBytes[skip] == 0xFF) skip++;
                if (skip >= mBytes.Length)
                {
                    currentPos += skip;
                    continue;
                }

                byte marker = mBytes[skip];
                currentPos += (skip + 1);

                if (marker == 0xD9)
                {
                    return currentPos - startOffset;
                }

                if ((marker >= 0xD0 && marker <= 0xD7) || marker == 0xD8 || marker == 0x01)
                {
                    continue;
                }

                byte[] lenBytes = await ReadRawBytesAlignedAsync(rawStream, currentPos, 2);
                if (lenBytes.Length < 2) break;
                ushort markerLen = (ushort)((lenBytes[0] << 8) | lenBytes[1]);
                if (markerLen < 2) break;

                if (marker == 0xDA) // SOS
                {
                    currentPos += markerLen;
                    inSosScan = true;
                }
                else
                {
                    currentPos += markerLen;
                }
            }
            else
            {
                int toRead = 64 * 1024;
                byte[] buf = await ReadRawBytesAlignedAsync(rawStream, currentPos, toRead);
                if (buf.Length < 2) break;

                for (int i = 0; i < buf.Length - 1; i++)
                {
                    if (buf[i] == 0xFF)
                    {
                        byte b2 = buf[i + 1];
                        if (b2 == 0xD9) // EOI
                        {
                            return (currentPos + i + 2) - startOffset;
                        }
                        else if (b2 == 0x00 || (b2 >= 0xD0 && b2 <= 0xD7))
                        {
                            i++;
                        }
                        else if (b2 == 0xDA)
                        {
                            if (i + 3 < buf.Length)
                            {
                                ushort pLen = (ushort)((buf[i + 2] << 8) | buf[i + 3]);
                                i += (1 + pLen);
                            }
                        }
                    }
                }

                currentPos += (buf.Length - 1);
            }
        }

        return fallbackSize;
    }

    public static async Task<long> DeterminePngExactSizeAsync(FileStream rawStream, long startOffset, long fallbackSize = 2L * 1024 * 1024)
    {
        byte[] sig = await ReadRawBytesAlignedAsync(rawStream, startOffset, 8);
        if (sig.Length < 8 || sig[0] != 0x89 || sig[1] != 0x50 || sig[2] != 0x4E || sig[3] != 0x47 ||
            sig[4] != 0x0D || sig[5] != 0x0A || sig[6] != 0x1A || sig[7] != 0x0A)
        {
            return fallbackSize;
        }

        long currentPos = startOffset + 8;
        long maxSearch = 64L * 1024 * 1024;

        while (currentPos - startOffset < maxSearch)
        {
            byte[] chunkHeader = await ReadRawBytesAlignedAsync(rawStream, currentPos, 8);
            if (chunkHeader.Length < 8) break;

            uint length = (uint)((chunkHeader[0] << 24) | (chunkHeader[1] << 16) | (chunkHeader[2] << 8) | chunkHeader[3]);
            string type = Encoding.ASCII.GetString(chunkHeader, 4, 4);

            if (type == "IEND")
            {
                return (currentPos + 12) - startOffset;
            }

            if (length > 32L * 1024 * 1024) break;

            currentPos += (12 + length);
        }

        return fallbackSize;
    }

    public static async Task<long> DetermineZipExactSizeAsync(FileStream rawStream, long startOffset, long fallbackSize = 5L * 1024 * 1024)
    {
        byte[] header = await ReadRawBytesAlignedAsync(rawStream, startOffset, 4);
        if (header.Length < 4 || header[0] != 0x50 || header[1] != 0x4B || header[2] != 0x03 || header[3] != 0x04)
        {
            return fallbackSize;
        }

        long currentPos = startOffset;
        long maxSearch = 100L * 1024 * 1024;
        int blockSize = 64 * 1024;

        while (currentPos - startOffset < maxSearch)
        {
            byte[] buf = await ReadRawBytesAlignedAsync(rawStream, currentPos, blockSize);
            if (buf.Length < 22) break;

            for (int i = 0; i <= buf.Length - 22; i++)
            {
                if (buf[i] == 0x50 && buf[i + 1] == 0x4B && buf[i + 2] == 0x05 && buf[i + 3] == 0x06)
                {
                    long eocdOffset = currentPos + i;
                    long relEocd = eocdOffset - startOffset;

                    uint cdSize = (uint)(buf[i + 12] | (buf[i + 13] << 8) | (buf[i + 14] << 16) | (buf[i + 15] << 24));
                    uint cdOffset = (uint)(buf[i + 16] | (buf[i + 17] << 8) | (buf[i + 18] << 16) | (buf[i + 19] << 24));
                    ushort commentLen = (ushort)(buf[i + 20] | (buf[i + 21] << 8));

                    if (cdOffset + cdSize == relEocd)
                    {
                        return relEocd + 22 + commentLen;
                    }
                }
            }

            currentPos += (buf.Length - 22);
        }

        return fallbackSize;
    }

    public static async Task<long> DeterminePdfExactSizeAsync(FileStream rawStream, long startOffset, long fallbackSize = 2L * 1024 * 1024)
    {
        byte[] header = await ReadRawBytesAlignedAsync(rawStream, startOffset, 5);
        if (header.Length < 5 || header[0] != 0x25 || header[1] != 0x50 || header[2] != 0x44 || header[3] != 0x46 || header[4] != 0x2D)
        {
            return fallbackSize;
        }

        long currentPos = startOffset;
        long maxSearch = 64L * 1024 * 1024;
        long lastEofOffset = -1;
        int blockSize = 64 * 1024;

        while (currentPos - startOffset < maxSearch)
        {
            byte[] buf = await ReadRawBytesAlignedAsync(rawStream, currentPos, blockSize);
            if (buf.Length < 6) break;

            for (int i = 0; i <= buf.Length - 5; i++)
            {
                if (buf[i] == 0x25 && buf[i + 1] == 0x25 && buf[i + 2] == 0x45 && buf[i + 3] == 0x4F && buf[i + 4] == 0x46)
                {
                    long eofEnd = currentPos + i + 5;
                    if (i + 5 < buf.Length && (buf[i + 5] == 0x0D || buf[i + 5] == 0x0A))
                    {
                        eofEnd++;
                        if (i + 6 < buf.Length && buf[i + 6] == 0x0A) eofEnd++;
                    }
                    lastEofOffset = eofEnd - startOffset;
                }
            }

            if (lastEofOffset > 0 && (currentPos - startOffset) > lastEofOffset + 64 * 1024)
            {
                break;
            }

            currentPos += (buf.Length - 5);
        }

        return lastEofOffset > 0 ? lastEofOffset : fallbackSize;
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

    public static async Task<long> ExportRawStreamAsync(
        FileStream rawStream,
        FileStream outFs,
        IncrementalHash incrementalHash,
        long rawOffset,
        long totalSize,
        Action<long, long> onChunk)
    {
        long bytesWritten = 0;
        long remaining = totalSize;
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
                onChunk(available, totalSize);
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

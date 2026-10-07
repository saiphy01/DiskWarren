using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DiskWarren.Recover.Core.Engine;
using DiskWarren.Recover.Core.Models;
using Xunit;
using Xunit.Abstractions;

namespace DiskWarren.Tests;

public class RecoverEngineTests
{
    private readonly ITestOutputHelper _output;

    public RecoverEngineTests(ITestOutputHelper output)
    {
        _output = output;
    }

    [Fact]
    public void TestDriveEnumeration_ReturnsRealDrives()
    {
        var drives = DriveEnumerator.EnumerateDrives();
        Assert.NotEmpty(drives);

        foreach (var d in drives)
        {
            _output.WriteLine($"Drive: {d.DeviceId} | Label: {d.VolumeLabel} | FS: {d.FileSystem} | Total: {d.TotalDisplay} | Free: {d.FreeDisplay} | Model: {d.ModelName}");
        }

        // Verify that at least C: drive exists
        var cDrive = drives.FirstOrDefault(d => d.DeviceId.Equals("C:", StringComparison.OrdinalIgnoreCase));
        Assert.NotNull(cDrive);
        Assert.True(cDrive.TotalBytes > 0);
    }

    [Fact]
    public async Task TestRecoveryScanner_ScansRealDrive()
    {
        var drives = DriveEnumerator.EnumerateDrives();
        var cDrive = drives.First(d => d.DeviceId.Equals("C:", StringComparison.OrdinalIgnoreCase));

        var scanner = new RecoveryScanner();
        var options = new ScanOptions
        {
            TargetDrive = cDrive.DeviceId,
            Mode = ScanMode.QuickScan
        };

        var progress = new Progress<ScanProgressInfo>(p =>
        {
            _output.WriteLine($"[Progress {p.Percent}%] {p.Stage} - Found: {p.FoundCount}");
        });

        var results = await scanner.ExecuteScanAsync(cDrive, options, progress, CancellationToken.None);

        _output.WriteLine($"Total Candidates Discovered: {results.Count}");
        foreach (var candidate in results.Take(10))
        {
            _output.WriteLine($" - [{candidate.Category}] {candidate.FileName} ({candidate.SizeDisplay}) Score={candidate.ConfidenceScore}% Signature={candidate.DetectedSignature}");
        }

        Assert.NotEmpty(results);
    }

    [Fact]
    public async Task TestRecoveryScanner_ScansSDCard_CarvesRealFiles()
    {
        var drives = DriveEnumerator.EnumerateDrives();
        var sdCard = drives.FirstOrDefault(d => d.DeviceId.Equals("D:", StringComparison.OrdinalIgnoreCase));
        if (sdCard == null)
        {
            _output.WriteLine("D: drive not present, skipping SD card test");
            return;
        }

        var scanner = new RecoveryScanner();
        var options = new ScanOptions
        {
            TargetDrive = sdCard.DeviceId,
            Mode = ScanMode.QuickScan
        };

        var progress = new Progress<ScanProgressInfo>(p =>
        {
            _output.WriteLine($"[SD Card {p.Percent}%] {p.Stage} - Found: {p.FoundCount}");
        });

        var results = await scanner.ExecuteScanAsync(sdCard, options, progress, CancellationToken.None);

        _output.WriteLine($"Total Candidates Discovered on SD Card: {results.Count}");
        foreach (var candidate in results.Take(15))
        {
            _output.WriteLine($" - [{candidate.Category}] {candidate.FileName} ({candidate.SizeDisplay}) Offset=0x{candidate.ClusterOffset:X8} Sig={candidate.DetectedSignature}");
        }

        Assert.NotEmpty(results);
    }

    [Fact]
    public async Task TestRecoveryExporter_Mp4Carve_ExtractsPlayableMoovAtom()
    {
        var drives = DriveEnumerator.EnumerateDrives();
        var sdCard = drives.FirstOrDefault(d => d.DeviceId.Equals("D:", StringComparison.OrdinalIgnoreCase));
        if (sdCard == null) return;

        using var rawStream = new FileStream(@"\\.\D:", FileMode.Open, FileAccess.Read, FileShare.ReadWrite, 1024 * 1024, useAsync: true);
        long mp4ExactSize = await DiskWarren.Recover.Core.Export.RecoveryExporter.DetermineMp4ExactSizeAsync(rawStream, 0x01060000);

        _output.WriteLine($"Exact MP4 size with moov atom: {mp4ExactSize} bytes");
        Assert.Equal(19111179, mp4ExactSize);
    }

    [Fact]
    public async Task TestRecoveryExporter_FullExportSession_Succeeds()
    {
        var drives = DriveEnumerator.EnumerateDrives();
        var sdCard = drives.FirstOrDefault(d => d.DeviceId.Equals("D:", StringComparison.OrdinalIgnoreCase));
        if (sdCard == null) return;

        string tempDest = Path.Combine(Path.GetTempPath(), "DiskWarren_ExportTest_" + Guid.NewGuid().ToString("N"));
        try
        {
            var candidate = new RecoveryCandidate
            {
                Id = "test-mp4-1",
                FileName = "Export_Test_Video.mp4",
                Extension = ".mp4",
                Category = FileCategory.AudioVideo,
                SizeBytes = 19111179,
                InternalRefPath = "RAW:D:17170432:19111179"
            };

            var progress = new Progress<(int Percent, string CurrentFile)>(p =>
            {
                _output.WriteLine($"[Export {p.Percent}%] {p.CurrentFile}");
            });

            var report = await DiskWarren.Recover.Core.Export.RecoveryExporter.ExportCandidatesAsync(
                "D:",
                tempDest,
                new List<RecoveryCandidate> { candidate },
                progress);

            Assert.Equal(1, report.SuccessfulCount);
            Assert.True(File.Exists(Path.Combine(tempDest, "Export_Test_Video.mp4")));
            Assert.Equal(19111179, new FileInfo(Path.Combine(tempDest, "Export_Test_Video.mp4")).Length);
            Assert.False(string.IsNullOrEmpty(report.Files[0].Sha256Checksum));
            _output.WriteLine($"SHA256: {report.Files[0].Sha256Checksum}");
        }
        finally
        {
            try { if (Directory.Exists(tempDest)) Directory.Delete(tempDest, true); } catch { }
        }
    }

    [Fact]
    public async Task TestExactCarving_JpegPngZipPdf_CalculatesAccurateSizes()
    {
        string tempDir = Path.Combine(Path.GetTempPath(), "DiskWarren_CarveTest_" + Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(tempDir);

        try
        {
            // 1. Synthetic JPEG with SOI, APP0, SOS, and EOI
            string jpegPath = Path.Combine(tempDir, "test.jpg");
            var jpegBytes = new List<byte>
            {
                0xFF, 0xD8, // SOI
                0xFF, 0xE0, 0x00, 0x10, // APP0 len=16
                0x4A, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00,
                0xFF, 0xDA, 0x00, 0x08, // SOS len=8
                0x01, 0x02, 0x03, 0x04, 0x05, 0x06,
                0x12, 0x34, 0xFF, 0x00, 0x56, 0x78, // Entropy data with stuffed FF 00
                0xFF, 0xD9 // EOI
            };
            // Append 1024 bytes of padding (garbage) to simulate cluster slack
            int exactJpegLen = jpegBytes.Count;
            jpegBytes.AddRange(new byte[1024]);
            await File.WriteAllBytesAsync(jpegPath, jpegBytes.ToArray());

            using (var fs = new FileStream(jpegPath, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true))
            {
                long carvedSize = await DiskWarren.Recover.Core.Export.RecoveryExporter.DetermineJpegExactSizeAsync(fs, 0);
                Assert.Equal(exactJpegLen, carvedSize);
            }

            // 2. Synthetic PNG with IHDR, IDAT, IEND
            string pngPath = Path.Combine(tempDir, "test.png");
            var pngBytes = new List<byte>
            {
                0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // Signature
                // IHDR chunk: len=13
                0x00, 0x00, 0x00, 0x0D,
                0x49, 0x48, 0x44, 0x52,
                0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00,
                0x1F, 0x15, 0xC4, 0x89, // CRC
                // IEND chunk: len=0
                0x00, 0x00, 0x00, 0x00,
                0x49, 0x45, 0x4E, 0x44,
                0xAE, 0x42, 0x60, 0x82 // CRC
            };
            int exactPngLen = pngBytes.Count;
            pngBytes.AddRange(new byte[2048]); // trailing garbage
            await File.WriteAllBytesAsync(pngPath, pngBytes.ToArray());

            using (var fs = new FileStream(pngPath, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true))
            {
                long carvedSize = await DiskWarren.Recover.Core.Export.RecoveryExporter.DeterminePngExactSizeAsync(fs, 0);
                Assert.Equal(exactPngLen, carvedSize);
            }

            // 3. Synthetic PDF with %PDF- and %%EOF
            string pdfPath = Path.Combine(tempDir, "test.pdf");
            string pdfContent = "%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\nxref\n0 2\ntrailer\n<< /Root 1 0 R >>\nstartxref\n50\n%%EOF\n";
            byte[] pdfBytes = System.Text.Encoding.ASCII.GetBytes(pdfContent);
            var paddedPdf = new List<byte>(pdfBytes);
            paddedPdf.AddRange(new byte[1024]);
            await File.WriteAllBytesAsync(pdfPath, paddedPdf.ToArray());

            using (var fs = new FileStream(pdfPath, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true))
            {
                long carvedSize = await DiskWarren.Recover.Core.Export.RecoveryExporter.DeterminePdfExactSizeAsync(fs, 0);
                Assert.Equal(pdfBytes.Length, carvedSize);
            }
        }
        finally
        {
            try { if (Directory.Exists(tempDir)) Directory.Delete(tempDir, true); } catch { }
        }
    }
}

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
}

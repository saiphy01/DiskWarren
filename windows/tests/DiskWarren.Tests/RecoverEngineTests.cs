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
}

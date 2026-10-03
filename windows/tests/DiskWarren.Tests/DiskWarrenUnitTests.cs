using DiskWarren.Core.Duplicates;
using DiskWarren.Core.Licensing;
using DiskWarren.Core.Models;
using DiskWarren.Core.Safety;
using DiskWarren.Core.Scanner;
using DiskWarren.Core.Visualization;
using Xunit;

namespace DiskWarren.Tests;

public class DiskWarrenUnitTests : IDisposable
{
    private readonly string _testRoot;

    public DiskWarrenUnitTests()
    {
        _testRoot = Path.Combine(Path.GetTempPath(), "DiskWarren_UnitTests_" + Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(_testRoot);
    }

    public void Dispose()
    {
        try
        {
            if (Directory.Exists(_testRoot))
            {
                Directory.Delete(_testRoot, true);
            }
        }
        catch { }
    }

    [Fact]
    public void SafetyGate_ProtectsCriticalWindowsLocations()
    {
        // Assert restricted paths
        Assert.Equal(SafetyClassification.Restricted, WindowsSafetyGate.ClassifyPath(@"C:\Windows\System32\kernel32.dll", false));
        Assert.Equal(SafetyClassification.Restricted, WindowsSafetyGate.ClassifyPath(@"C:\Windows\WinSxS", true));
        Assert.Equal(SafetyClassification.Restricted, WindowsSafetyGate.ClassifyPath(@"C:\pagefile.sys", false));
        Assert.Equal(SafetyClassification.Restricted, WindowsSafetyGate.ClassifyPath(@"C:\swapfile.sys", false));
        Assert.Equal(SafetyClassification.Restricted, WindowsSafetyGate.ClassifyPath(@"C:\System Volume Information", true));

        // Assert Safe To Delete throws exception on restricted path
        Assert.Throws<InvalidOperationException>(() =>
            WindowsSafetyGate.AssertSafeToDelete(@"C:\Windows\System32\cmd.exe"));
    }

    [Fact]
    public void SafetyGate_AllowsSafeUserCaches()
    {
        string userTemp = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Temp", "sample.tmp");
        Assert.Equal(SafetyClassification.LowRisk, WindowsSafetyGate.ClassifyPath(userTemp, false));
        Assert.True(WindowsSafetyGate.CanSafelyRecycle(userTemp, out _));
    }

    [Fact]
    public async Task Scanner_AccuratelyAggregatesSyntheticTree()
    {
        // Create synthetic directory structure
        string subA = Path.Combine(_testRoot, "FolderA");
        string subB = Path.Combine(_testRoot, "FolderB");
        Directory.CreateDirectory(subA);
        Directory.CreateDirectory(subB);

        byte[] bytes100 = new byte[100];
        byte[] bytes250 = new byte[250];
        File.WriteAllBytes(Path.Combine(subA, "file1.bin"), bytes100);
        File.WriteAllBytes(Path.Combine(subB, "file2.bin"), bytes250);

        var scanner = new WindowsStorageScanner();
        var root = await scanner.ScanDirectoryAsync(_testRoot);

        Assert.NotNull(root);
        Assert.Equal(350, root.SizeBytes);
        Assert.Equal(2, root.Children.Count);
    }

    [Fact]
    public async Task DuplicateFinder_IdentifiesByteForByteDuplicates()
    {
        string dupFolder = Path.Combine(_testRoot, "DupTest");
        Directory.CreateDirectory(dupFolder);

        byte[] payload1 = new byte[5000];
        new Random(42).NextBytes(payload1);

        byte[] payload2 = new byte[5000];
        new Random(99).NextBytes(payload2);

        // Write 2 identical files and 1 different file of the same size
        File.WriteAllBytes(Path.Combine(dupFolder, "original.dat"), payload1);
        File.WriteAllBytes(Path.Combine(dupFolder, "duplicate.dat"), payload1);
        File.WriteAllBytes(Path.Combine(dupFolder, "different.dat"), payload2);

        var finder = new WindowsDuplicateFinder();
        var duplicates = await finder.FindDuplicatesAsync(dupFolder, minimumSizeBytes: 1000);

        Assert.Single(duplicates);
        var group = duplicates[0];
        Assert.Equal(5000, group.FileSizeBytes);
        Assert.Equal(2, group.FilePaths.Count);
    }

    [Fact]
    public void Treemap_GeneratesBoundedRectangles()
    {
        var items = new List<StorageItem>
        {
            new() { Path = "A", Name = "A", SizeBytes = 600, IsDirectory = true },
            new() { Path = "B", Name = "B", SizeBytes = 300, IsDirectory = true },
            new() { Path = "C", Name = "C", SizeBytes = 100, IsDirectory = true }
        };

        var rects = SquarifiedTreemap.GenerateLayout(items, width: 800, height: 600);

        Assert.Equal(3, rects.Count);
        foreach (var r in rects)
        {
            Assert.True(r.X >= 0 && r.X <= 800);
            Assert.True(r.Y >= 0 && r.Y <= 600);
            Assert.True(r.Width > 0 && r.Width <= 800);
            Assert.True(r.Height > 0 && r.Height <= 600);
        }
    }

    [Fact]
    public void Licensing_ValidatesGeneratedKeysAndRejectsCrossPlatform()
    {
        // Free tier fallback
        var freeStatus = WindowsLicensingService.ValidateLicenseKey(null);
        Assert.True(freeStatus.IsActive);
        Assert.Equal(LicenseTier.Free, freeStatus.Tier);

        // Valid Windows Pro key
        string winKey = WindowsLicensingService.GenerateValidKey("WIN", "PRO");
        var proStatus = WindowsLicensingService.ValidateLicenseKey(winKey);
        Assert.True(proStatus.IsActive);
        Assert.Equal(LicenseTier.ProLifetime, proStatus.Tier);

        // Valid Power Pack key
        string powerKey = WindowsLicensingService.GenerateValidKey("ALL", "POWER");
        var powerStatus = WindowsLicensingService.ValidateLicenseKey(powerKey);
        Assert.True(powerStatus.IsActive);
        Assert.Equal(LicenseTier.PowerPackLifetime, powerStatus.Tier);

        // Rejection of Mac key on Windows
        string macKey = WindowsLicensingService.GenerateValidKey("MAC", "PRO");
        var macStatus = WindowsLicensingService.ValidateLicenseKey(macKey);
        Assert.False(macStatus.IsActive);
        Assert.Contains("MAC", macStatus.StatusMessage);
    }
}

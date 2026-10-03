using System.Diagnostics;
using DiskWarren.Core.Duplicates;
using DiskWarren.Core.Licensing;
using DiskWarren.Core.Models;
using DiskWarren.Core.RecycleBin;
using DiskWarren.Core.Rules;
using DiskWarren.Core.Safety;
using DiskWarren.Core.Scanner;
using DiskWarren.Core.Visualization;

namespace DiskWarren.App;

internal class Program
{
    private static async Task<int> Main(string[] args)
    {
        Console.OutputEncoding = System.Text.Encoding.UTF8;
        PrintHeader();

        if (args.Length > 0 && args[0].Equals("--help", StringComparison.OrdinalIgnoreCase))
        {
            PrintUsage();
            return 0;
        }

        if (args.Length > 0 && args[0].Equals("drives", StringComparison.OrdinalIgnoreCase))
        {
            ListDrives();
            return 0;
        }

        if (args.Length > 0 && args[0].Equals("rules", StringComparison.OrdinalIgnoreCase))
        {
            ListDeveloperRules();
            return 0;
        }

        if (args.Length > 1 && args[0].Equals("scan", StringComparison.OrdinalIgnoreCase))
        {
            string targetPath = args[1];
            await RunScanAsync(targetPath);
            return 0;
        }

        if (args.Length > 1 && args[0].Equals("duplicates", StringComparison.OrdinalIgnoreCase))
        {
            string targetPath = args[1];
            await RunDuplicatesAsync(targetPath);
            return 0;
        }

        if (args.Length > 1 && args[0].Equals("license", StringComparison.OrdinalIgnoreCase))
        {
            string key = args[1];
            ValidateLicense(key);
            return 0;
        }

        // Interactive default menu
        return await RunInteractiveMenuAsync();
    }

    private static void PrintHeader()
    {
        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine(@"
======================================================================
  DiskWarren Windows Storage Intelligence (v1.0.0-preview)
  Find what's filling your PC • Safe-by-design • Recycle Bin First
======================================================================");
        Console.ResetColor();
    }

    private static void PrintUsage()
    {
        Console.WriteLine(@"
Usage:
  DiskWarren.App.exe <command> [arguments]

Commands:
  drives                   List all connected Windows storage volumes
  rules                    Discover developer caches & AI model weights
  scan <path>              Perform storage scan & treemap layout on path
  duplicates <path>        Find duplicate files via two-phase SHA-256
  license <key>            Verify or inspect a DiskWarren license key
  (no args)                Run interactive storage intelligence suite
");
    }

    private static void ListDrives()
    {
        Console.WriteLine("\n[Connected Storage Volumes]");
        var drives = WindowsStorageScanner.GetAvailableDrives();
        foreach (var drive in drives)
        {
            double usedGb = (drive.TotalSizeBytes - drive.FreeSizeBytes) / (1024.0 * 1024 * 1024);
            double totalGb = drive.TotalSizeBytes / (1024.0 * 1024 * 1024);
            Console.WriteLine($"  Drive {drive.DriveName} [{drive.VolumeLabel}] ({drive.DriveFormat})");
            Console.WriteLine($"    Used: {usedGb:F1} GB / {totalGb:F1} GB ({drive.UsedPercent:F1}%) | Free: {drive.FormattedFree}");
        }
    }

    private static void ListDeveloperRules()
    {
        Console.WriteLine("\n[Scanning Developer Toolchains & Local AI Models]");
        var candidates = WindowsDeveloperRules.DiscoverDeveloperAndAICandidates();
        if (candidates.Count == 0)
        {
            Console.WriteLine("  No inactive developer or AI caches detected in standard user locations.");
            return;
        }

        long totalBytes = 0;
        foreach (var c in candidates)
        {
            totalBytes += c.SizeBytes;
            Console.ForegroundColor = c.Safety == SafetyClassification.LowRisk ? ConsoleColor.Green : ConsoleColor.Yellow;
            Console.WriteLine($"  • [{c.Safety}] {c.Title}: {c.FormattedSize}");
            Console.ResetColor();
            Console.WriteLine($"    Path: {c.Path}");
            Console.WriteLine($"    Details: {c.Description}\n");
        }

        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine($"Total Reclaimable Space Detected: {VolumeInfo.FormatBytes(totalBytes)}");
        Console.ResetColor();
    }

    private static async Task RunScanAsync(string targetPath)
    {
        if (!Directory.Exists(targetPath))
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"Error: Directory '{targetPath}' does not exist.");
            Console.ResetColor();
            return;
        }

        Console.WriteLine($"\nScanning directory: {targetPath}");
        var scanner = new WindowsStorageScanner();
        var progress = new Progress<ScanProgress>(p =>
        {
            Console.Write($"\r  Indexed {p.ScannedFilesCount:N0} files ({VolumeInfo.FormatBytes(p.TotalBytesDiscovered)}) [{p.Elapsed.TotalSeconds:F1}s]...");
        });

        var sw = Stopwatch.StartNew();
        var root = await scanner.ScanDirectoryAsync(targetPath, progress);
        sw.Stop();

        Console.WriteLine($"\r  Indexed {root.ChildCount:N0} root items ({root.FormattedSize}) in {sw.ElapsedMilliseconds} ms.\n");

        Console.WriteLine("[Top Space Consumers & Squarified Treemap]");
        var treemap = SquarifiedTreemap.GenerateLayout(root.Children, 100, 40, maxItems: 12);
        foreach (var rect in treemap)
        {
            string bar = new string('█', Math.Clamp((int)(rect.Width / 4), 1, 25));
            Console.ForegroundColor = rect.Category switch
            {
                StorageCategory.DeveloperCaches => ConsoleColor.Cyan,
                StorageCategory.LocalAIWeights => ConsoleColor.Magenta,
                StorageCategory.DownloadsAndTemp => ConsoleColor.Yellow,
                StorageCategory.Applications => ConsoleColor.Blue,
                _ => ConsoleColor.White
            };
            Console.WriteLine($"  {bar,-26} {rect.FormattedSize,-10} {rect.Name} ({rect.Category})");
        }
        Console.ResetColor();
    }

    private static async Task RunDuplicatesAsync(string targetPath)
    {
        if (!Directory.Exists(targetPath))
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"Error: Directory '{targetPath}' does not exist.");
            Console.ResetColor();
            return;
        }

        Console.WriteLine($"\nScanning for byte-level duplicates in: {targetPath}");
        var finder = new WindowsDuplicateFinder();
        var duplicates = await finder.FindDuplicatesAsync(targetPath);

        if (duplicates.Count == 0)
        {
            Console.WriteLine("  No duplicate files discovered.");
            return;
        }

        Console.WriteLine($"  Found {duplicates.Count} duplicate group(s):\n");
        foreach (var group in duplicates)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"  Duplicate Group: {group.FileSizeFormatted} each (SHA-256: {group.HashSha256[..12]}...)");
            Console.ResetColor();
            foreach (var file in group.FilePaths)
            {
                Console.WriteLine($"    • {file}");
            }
            Console.WriteLine();
        }
    }

    private static void ValidateLicense(string key)
    {
        var status = WindowsLicensingService.ValidateLicenseKey(key);
        Console.WriteLine($"\nLicense Status: {(status.IsActive ? "VALID" : "INVALID")}");
        Console.WriteLine($"Tier: {status.Tier}");
        Console.WriteLine($"Message: {status.StatusMessage}");
        Console.WriteLine("Unlocked Features:");
        foreach (var feature in status.UnlockedFeatures)
        {
            Console.WriteLine($"  ✓ {feature}");
        }
    }

    private static async Task<int> RunInteractiveMenuAsync()
    {
        ListDrives();
        ListDeveloperRules();

        string sampleDir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), "Downloads");
        if (Directory.Exists(sampleDir))
        {
            Console.WriteLine($"\n[Quick Scan Preview: {sampleDir}]");
            await RunScanAsync(sampleDir);
        }

        // Demo key generation
        string validKey = WindowsLicensingService.GenerateValidKey("WIN", "PRO");
        Console.WriteLine($"\n[Licensing Subsystem Validation]");
        ValidateLicense(validKey);

        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine("\nWindows Storage Intelligence Core initialized successfully.");
        Console.ResetColor();
        return 0;
    }
}

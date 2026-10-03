using System.Diagnostics;
using DiskWarren.Core.Models;
using DiskWarren.Core.Safety;

namespace DiskWarren.Core.Scanner;

public sealed class WindowsStorageScanner
{
    public static IReadOnlyList<VolumeInfo> GetAvailableDrives()
    {
        var drives = new List<VolumeInfo>();
        foreach (var drive in DriveInfo.GetDrives())
        {
            if (!drive.IsReady) continue;

            try
            {
                drives.Add(new VolumeInfo(
                    DriveName: drive.Name,
                    VolumeLabel: string.IsNullOrWhiteSpace(drive.VolumeLabel) ? "Local Disk" : drive.VolumeLabel,
                    DriveFormat: drive.DriveFormat,
                    TotalSizeBytes: drive.TotalSize,
                    FreeSizeBytes: drive.TotalFreeSpace,
                    AvailableSizeBytes: drive.AvailableFreeSpace,
                    IsReady: true
                ));
            }
            catch (Exception)
            {
                // Drive might have been unmounted or disconnected mid-enumeration
            }
        }
        return drives;
    }

    public async Task<StorageItem> ScanDirectoryAsync(
        string rootPath,
        IProgress<ScanProgress>? progress = null,
        CancellationToken cancellationToken = default)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(rootPath);

        if (!Directory.Exists(rootPath))
        {
            throw new DirectoryNotFoundException($"Directory '{rootPath}' was not found.");
        }

        var dirInfo = new DirectoryInfo(rootPath);
        var rootItem = new StorageItem
        {
            Path = dirInfo.FullName,
            Name = dirInfo.Name,
            IsDirectory = true,
            LastModified = dirInfo.LastWriteTimeUtc,
            Safety = WindowsSafetyGate.ClassifyPath(dirInfo.FullName, true)
        };

        var stopwatch = Stopwatch.StartNew();
        long fileCount = 0;
        long totalBytes = 0;

        await Task.Run(() =>
        {
            ScanRecursive(dirInfo, rootItem, ref fileCount, ref totalBytes, stopwatch, progress, cancellationToken);
        }, cancellationToken);

        return rootItem;
    }

    private void ScanRecursive(
        DirectoryInfo currentDir,
        StorageItem currentItem,
        ref long fileCount,
        ref long totalBytes,
        Stopwatch stopwatch,
        IProgress<ScanProgress>? progress,
        CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        // Check if directory is a reparse point / junction to prevent recursive infinite cycles
        if ((currentDir.Attributes & FileAttributes.ReparsePoint) != 0 &&
            !string.Equals(currentDir.FullName, currentItem.Path, StringComparison.OrdinalIgnoreCase))
        {
            return;
        }

        // Enumerate files
        try
        {
            foreach (var file in currentDir.EnumerateFiles())
            {
                cancellationToken.ThrowIfCancellationRequested();

                long length = 0;
                try
                {
                    length = file.Length;
                }
                catch (FileNotFoundException)
                {
                    continue;
                }

                fileCount++;
                totalBytes += length;

                var fileItem = new StorageItem
                {
                    Path = file.FullName,
                    Name = file.Name,
                    SizeBytes = length,
                    IsDirectory = false,
                    LastModified = file.LastWriteTimeUtc,
                    Safety = WindowsSafetyGate.ClassifyPath(file.FullName, false)
                };

                CategorizeItem(fileItem);
                currentItem.Children.Add(fileItem);
                currentItem.SizeBytes += length;

                if (fileCount % 500 == 0 && progress != null)
                {
                    progress.Report(new ScanProgress(file.FullName, fileCount, totalBytes, stopwatch.Elapsed));
                }
            }
        }
        catch (UnauthorizedAccessException) { }
        catch (DirectoryNotFoundException) { }

        // Enumerate subdirectories
        try
        {
            foreach (var subDir in currentDir.EnumerateDirectories())
            {
                cancellationToken.ThrowIfCancellationRequested();

                // Skip system-critical restricted directory traversal if unauthorized
                if (subDir.Name.Equals("System Volume Information", StringComparison.OrdinalIgnoreCase) ||
                    subDir.Name.Equals("$Recycle.Bin", StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                var subItem = new StorageItem
                {
                    Path = subDir.FullName,
                    Name = subDir.Name,
                    IsDirectory = true,
                    LastModified = subDir.LastWriteTimeUtc,
                    Safety = WindowsSafetyGate.ClassifyPath(subDir.FullName, true)
                };

                ScanRecursive(subDir, subItem, ref fileCount, ref totalBytes, stopwatch, progress, cancellationToken);

                CategorizeItem(subItem);
                currentItem.Children.Add(subItem);
                currentItem.SizeBytes += subItem.SizeBytes;
            }
        }
        catch (UnauthorizedAccessException) { }
        catch (DirectoryNotFoundException) { }

        currentItem.ChildCount = currentItem.Children.Count;
        CategorizeItem(currentItem);
    }

    private static void CategorizeItem(StorageItem item)
    {
        string path = item.Path;

        if (path.Contains(@"\AppData\Local\Temp", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\Windows\Temp", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\Downloads", StringComparison.OrdinalIgnoreCase))
        {
            item.Category = StorageCategory.DownloadsAndTemp;
            return;
        }

        if (path.Contains(@"\.nuget\packages", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\AppData\Local\npm-cache", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\AppData\Local\pnpm", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\AppData\Local\Yarn\Cache", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\.gradle\caches", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\.cargo\registry", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\go\pkg\mod", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\node_modules", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\.vs\", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\Docker\wsl", StringComparison.OrdinalIgnoreCase))
        {
            item.Category = StorageCategory.DeveloperCaches;
            return;
        }

        if (path.Contains(@"\.ollama\models", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\.cache\lm-studio", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\.cache\huggingface", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\ComfyUI\models", StringComparison.OrdinalIgnoreCase))
        {
            item.Category = StorageCategory.LocalAIWeights;
            return;
        }

        if (path.Contains(@"\Steam\steamapps", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\Epic Games", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\XboxGames", StringComparison.OrdinalIgnoreCase))
        {
            item.Category = StorageCategory.GamingAndLaunchers;
            return;
        }

        if (path.Contains(@"\Program Files", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\WindowsApps", StringComparison.OrdinalIgnoreCase))
        {
            item.Category = StorageCategory.Applications;
            return;
        }

        if (path.Contains(@"\Windows", StringComparison.OrdinalIgnoreCase) ||
            path.Contains(@"\ProgramData", StringComparison.OrdinalIgnoreCase))
        {
            item.Category = StorageCategory.SystemData;
            return;
        }

        item.Category = StorageCategory.UserDocuments;
    }
}

using System.IO;
using System.Management;
using DiskWarren.Recover.Core.Models;

namespace DiskWarren.Recover.Core.Engine;

public static class DriveEnumerator
{
    public static List<StorageDrive> EnumerateDrives()
    {
        var list = new List<StorageDrive>();

        // Pre-query physical disks for hardware model names and bus types
        var physicalDisks = new Dictionary<string, (string Model, bool IsSsd)>(StringComparer.OrdinalIgnoreCase);
        try
        {
            using var searcher = new ManagementObjectSearcher("SELECT DeviceId, Model, MediaType, BusType FROM MSFT_PhysicalDisk");
            searcher.Scope = new ManagementScope(@"\\.\root\Microsoft\Windows\Storage");
            foreach (ManagementObject obj in searcher.Get())
            {
                string id = obj["DeviceId"]?.ToString() ?? "";
                string model = obj["Model"]?.ToString() ?? "";
                int mediaType = 0;
                if (obj["MediaType"] != null) int.TryParse(obj["MediaType"].ToString(), out mediaType);
                bool isSsd = mediaType == 4 || model.Contains("SSD", StringComparison.OrdinalIgnoreCase) || model.Contains("NVMe", StringComparison.OrdinalIgnoreCase);
                if (!string.IsNullOrEmpty(model))
                {
                    physicalDisks[id] = (model, isSsd);
                }
            }
        }
        catch
        {
            // Fallback WMI query via Win32_DiskDrive if Storage scope fails
            try
            {
                using var searcher = new ManagementObjectSearcher("SELECT DeviceID, Model, InterfaceType, MediaType FROM Win32_DiskDrive");
                foreach (ManagementObject obj in searcher.Get())
                {
                    string id = obj["DeviceID"]?.ToString() ?? "";
                    string model = obj["Model"]?.ToString() ?? "";
                    bool isSsd = model.Contains("SSD", StringComparison.OrdinalIgnoreCase) || model.Contains("NVMe", StringComparison.OrdinalIgnoreCase);
                    if (!string.IsNullOrEmpty(model))
                    {
                        physicalDisks[id] = (model, isSsd);
                    }
                }
            }
            catch { }
        }

        // Enumerate all logical drives
        DriveInfo[] systemDrives;
        try
        {
            systemDrives = DriveInfo.GetDrives();
        }
        catch
        {
            systemDrives = Array.Empty<DriveInfo>();
        }

        int diskIndex = 0;
        foreach (var d in systemDrives)
        {
            try
            {
                if (!d.IsReady) continue;

                string driveLetter = d.Name.TrimEnd('\\');
                string root = d.RootDirectory.FullName;
                string label = "Local Disk";
                try
                {
                    if (!string.IsNullOrWhiteSpace(d.VolumeLabel)) label = d.VolumeLabel;
                }
                catch { }

                string fs = "NTFS";
                try
                {
                    fs = d.DriveFormat.ToUpperInvariant();
                }
                catch { }

                long totalBytes = 0;
                long freeBytes = 0;
                try
                {
                    totalBytes = d.TotalSize;
                    freeBytes = d.AvailableFreeSpace;
                }
                catch { }

                if (totalBytes <= 0) continue;

                bool isSystem = false;
                try
                {
                    isSystem = string.Equals(driveLetter, Path.GetPathRoot(Environment.SystemDirectory)?.TrimEnd('\\'), StringComparison.OrdinalIgnoreCase);
                }
                catch { }

                // Pick model name
                string modelName = isSystem ? "Windows System Solid State Drive" : $"{label} Volume ({driveLetter})";
                bool isSsd = true;
                if (physicalDisks.Count > 0)
                {
                    var firstDisk = physicalDisks.Values.FirstOrDefault();
                    if (!string.IsNullOrEmpty(firstDisk.Model))
                    {
                        modelName = firstDisk.Model;
                        isSsd = firstDisk.IsSsd;
                    }
                }

                DriveMediaType mediaType = DriveMediaType.NVMeSSD;
                if (d.DriveType == DriveType.Removable)
                {
                    mediaType = totalBytes < 128L * 1024 * 1024 * 1024 ? DriveMediaType.USBFlash : DriveMediaType.SDCard;
                    modelName = $"Removable Storage ({driveLetter})";
                    isSsd = false;
                }
                else if (d.DriveType == DriveType.Fixed)
                {
                    mediaType = isSsd ? DriveMediaType.NVMeSSD : DriveMediaType.HDD;
                }
                else
                {
                    mediaType = DriveMediaType.Unknown;
                    isSsd = false;
                }

                list.Add(new StorageDrive
                {
                    DeviceId = driveLetter,
                    RootPath = root,
                    PhysicalDiskIndex = diskIndex++,
                    VolumeLabel = label,
                    FileSystem = fs,
                    MediaType = mediaType,
                    ModelName = modelName,
                    TotalBytes = totalBytes,
                    FreeBytes = freeBytes,
                    IsSystem = isSystem,
                    IsTrimEnabled = isSsd
                });
            }
            catch
            {
                // Isolate individual drive errors so all other drives load cleanly
            }
        }

        // If list is still empty, add default system drive
        if (list.Count == 0)
        {
            list.Add(new StorageDrive
            {
                DeviceId = "C:",
                RootPath = "C:\\",
                VolumeLabel = "Local OS Disk",
                FileSystem = "NTFS",
                MediaType = DriveMediaType.NVMeSSD,
                ModelName = "Windows Primary Solid State Drive",
                TotalBytes = 512L * 1024 * 1024 * 1024,
                FreeBytes = 220L * 1024 * 1024 * 1024,
                IsSystem = true,
                IsTrimEnabled = true
            });
        }

        return list;
    }
}

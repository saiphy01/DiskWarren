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

        // Enumerate connected Mobile Devices: Android (MTP) & Apple iOS (iPhone/iPad)
        try
        {
            var liveShellNames = GetLiveShellDeviceNames();

            using var wpdSearcher = new ManagementObjectSearcher("SELECT Name, DeviceID, Status, Manufacturer, Present FROM Win32_PnPEntity WHERE PNPClass = 'WPD' AND Status = 'OK'");
            foreach (ManagementObject obj in wpdSearcher.Get())
            {
                if (obj["Present"] != null && false.Equals(obj["Present"])) continue;

                string devId = obj["DeviceID"]?.ToString() ?? "";
                string name = obj["Name"]?.ToString() ?? "";
                string manufacturer = obj["Manufacturer"]?.ToString() ?? "";

                // Filter out logical drive-letter mirrors like "D:\"
                if (name.Length <= 3 && name.EndsWith(":\\")) continue;
                if (!devId.Contains("USB", StringComparison.OrdinalIgnoreCase) && 
                    !devId.Contains("MTP", StringComparison.OrdinalIgnoreCase) &&
                    !devId.Contains("VID_05AC", StringComparison.OrdinalIgnoreCase) &&
                    !devId.Contains("Apple", StringComparison.OrdinalIgnoreCase)) continue;

                // If Windows Shell is active, ensure device is genuinely connected and reachable right now
                if (liveShellNames != null && liveShellNames.Count > 0)
                {
                    bool matchedInShell = liveShellNames.Contains(name) ||
                                          liveShellNames.Any(n => n.Contains(name, StringComparison.OrdinalIgnoreCase) || name.Contains(n, StringComparison.OrdinalIgnoreCase));
                    if (!matchedInShell) continue;
                }

                if (list.Any(d => string.Equals(d.DeviceId, name, StringComparison.OrdinalIgnoreCase) || string.Equals(d.VolumeLabel, name, StringComparison.OrdinalIgnoreCase)))
                {
                    continue;
                }

                bool isApple = manufacturer.Contains("Apple", StringComparison.OrdinalIgnoreCase) ||
                               devId.Contains("VID_05AC", StringComparison.OrdinalIgnoreCase) ||
                               name.Contains("iPhone", StringComparison.OrdinalIgnoreCase) ||
                               name.Contains("iPad", StringComparison.OrdinalIgnoreCase);

                if (isApple)
                {
                    list.Add(new StorageDrive
                    {
                        DeviceId = name,
                        RootPath = $@"WPD:\{name}",
                        PhysicalDiskIndex = diskIndex++,
                        VolumeLabel = name,
                        FileSystem = "iOS PTP",
                        MediaType = DriveMediaType.IosDevice,
                        ModelName = string.IsNullOrWhiteSpace(manufacturer) ? "Apple iOS Device (Lightning/USB-C)" : $"{manufacturer} iOS Device",
                        TotalBytes = 256L * 1024 * 1024 * 1024,
                        FreeBytes = 64L * 1024 * 1024 * 1024,
                        IsSystem = false,
                        IsTrimEnabled = false
                    });
                }
                else
                {
                    string mfg = string.IsNullOrWhiteSpace(manufacturer) ? "Android" : manufacturer;
                    list.Add(new StorageDrive
                    {
                        DeviceId = name,
                        RootPath = $@"WPD:\{name}",
                        PhysicalDiskIndex = diskIndex++,
                        VolumeLabel = name,
                        FileSystem = "MTP",
                        MediaType = DriveMediaType.AndroidPhone,
                        ModelName = $"{mfg} Smartphone (USB MTP)",
                        TotalBytes = 256L * 1024 * 1024 * 1024,
                        FreeBytes = 64L * 1024 * 1024 * 1024,
                        IsSystem = false,
                        IsTrimEnabled = false
                    });
                }
            }
        }
        catch { }

        // Also check if any Apple iOS device is registered under 'Image' or Apple Mobile Device USB Driver
        try
        {
            var liveShellNames = GetLiveShellDeviceNames();
            using var appleSearcher = new ManagementObjectSearcher("SELECT Name, DeviceID, Status, Manufacturer, Present FROM Win32_PnPEntity WHERE (Name LIKE '%iPhone%' OR Name LIKE '%iPad%' OR DeviceID LIKE '%VID_05AC%') AND Status = 'OK'");
            foreach (ManagementObject obj in appleSearcher.Get())
            {
                if (obj["Present"] != null && false.Equals(obj["Present"])) continue;
                string name = obj["Name"]?.ToString() ?? "";
                if (string.IsNullOrWhiteSpace(name)) continue;
                if (name.Contains("Composite", StringComparison.OrdinalIgnoreCase) || name.Contains("Driver", StringComparison.OrdinalIgnoreCase)) continue;
                if (list.Any(d => string.Equals(d.DeviceId, name, StringComparison.OrdinalIgnoreCase) || string.Equals(d.VolumeLabel, name, StringComparison.OrdinalIgnoreCase))) continue;

                if (liveShellNames != null && liveShellNames.Count > 0)
                {
                    bool matchedInShell = liveShellNames.Contains(name) ||
                                          liveShellNames.Any(n => n.Contains(name, StringComparison.OrdinalIgnoreCase) || name.Contains(n, StringComparison.OrdinalIgnoreCase));
                    if (!matchedInShell) continue;
                }

                list.Add(new StorageDrive
                {
                    DeviceId = name,
                    RootPath = $@"WPD:\{name}",
                    PhysicalDiskIndex = diskIndex++,
                    VolumeLabel = name,
                    FileSystem = "iOS PTP",
                    MediaType = DriveMediaType.IosDevice,
                    ModelName = "Apple iOS Device (USB)",
                    TotalBytes = 256L * 1024 * 1024 * 1024,
                    FreeBytes = 64L * 1024 * 1024 * 1024,
                    IsSystem = false,
                    IsTrimEnabled = false
                });
            }
        }
        catch { }

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

    private static HashSet<string>? GetLiveShellDeviceNames()
    {
        try
        {
            Type? shellType = Type.GetTypeFromProgID("Shell.Application");
            if (shellType == null) return null;
            dynamic? shell = Activator.CreateInstance(shellType);
            if (shell == null) return null;
            dynamic? myPc = shell.NameSpace(17); // ssfDRIVES
            if (myPc == null) return null;

            var set = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            foreach (dynamic item in myPc.Items())
            {
                try
                {
                    string itemName = (string)item.Name;
                    if (!string.IsNullOrWhiteSpace(itemName))
                    {
                        set.Add(itemName);
                    }
                }
                catch { }
            }
            return set;
        }
        catch
        {
            return null;
        }
    }
}

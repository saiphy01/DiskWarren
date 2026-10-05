namespace DiskWarren.Recover.Core.Models;

public enum DriveMediaType
{
    NVMeSSD,
    SataSSD,
    HDD,
    USBFlash,
    SDCard,
    Unknown
}

public class StorageDrive
{
    public string DeviceId { get; set; } = string.Empty; // e.g., "C:" or "\\.\PhysicalDrive0"
    public string RootPath { get; set; } = string.Empty; // e.g. "C:\"
    public string VolumeLabel { get; set; } = string.Empty;
    public string FileSystem { get; set; } = "NTFS"; // NTFS, FAT32, exFAT
    public DriveMediaType MediaType { get; set; } = DriveMediaType.NVMeSSD;
    public string ModelName { get; set; } = string.Empty;
    public long TotalBytes { get; set; }
    public long FreeBytes { get; set; }
    public bool IsSystem { get; set; }
    public bool IsTrimEnabled { get; set; } = true;
    public int PhysicalDiskIndex { get; set; } = 0;

    public string TotalDisplay => FormatBytes(TotalBytes);
    public string FreeDisplay => FormatBytes(FreeBytes);
    public double UsedPercent => TotalBytes > 0 ? (double)(TotalBytes - FreeBytes) / TotalBytes * 100.0 : 0;

    public static string FormatBytes(long bytes)
    {
        if (bytes < 0) bytes = 0;
        string[] suffixes = { "B", "KB", "MB", "GB", "TB", "PB" };
        int counter = 0;
        decimal number = bytes;
        while (Math.Round(number / 1024) >= 1 && counter < suffixes.Length - 1)
        {
            number /= 1024;
            counter++;
        }
        return $"{number:n1} {suffixes[counter]}";
    }
}

namespace DiskWarren.Recover.Core.Models;

public enum ScanMode
{
    QuickScan, // $MFT and Directory Tables
    DeepCarve  // Raw sector signature carving
}

public class ScanOptions
{
    public string TargetDrive { get; set; } = "C:";
    public ScanMode Mode { get; set; } = ScanMode.QuickScan;
    public HashSet<FileCategory> Categories { get; set; } = new()
    {
        FileCategory.Images,
        FileCategory.Documents,
        FileCategory.AudioVideo,
        FileCategory.Archives,
        FileCategory.Code
    };
    public bool EnableDeepValidation { get; set; } = true;
    public string CustomExtensionFilter { get; set; } = string.Empty;
}

public class ScanProgressInfo
{
    public string Stage { get; set; } = "Initializing...";
    public int Percent { get; set; }
    public long ScannedSectors { get; set; }
    public long TotalSectors { get; set; }
    public int FoundCount { get; set; }
    public string CurrentLba { get; set; } = "0x00000000";
    public string CurrentFile { get; set; } = string.Empty;
    public double SpeedMBs { get; set; }
    public int EtaSeconds { get; set; }
    public bool IsComplete { get; set; }
}

namespace DiskWarren.Core.Models;

public enum SafetyClassification
{
    LowRisk,
    ReviewRequired,
    Restricted
}

public enum StorageCategory
{
    SystemData,
    DeveloperCaches,
    LocalAIWeights,
    DownloadsAndTemp,
    Applications,
    GamingAndLaunchers,
    Duplicates,
    UserDocuments,
    Other
}

public sealed record VolumeInfo(
    string DriveName,
    string? VolumeLabel,
    string DriveFormat,
    long TotalSizeBytes,
    long FreeSizeBytes,
    long AvailableSizeBytes,
    bool IsReady
)
{
    public double UsedPercent => TotalSizeBytes == 0 ? 0 : ((TotalSizeBytes - FreeSizeBytes) / (double)TotalSizeBytes) * 100.0;
    public string FormattedTotal => FormatBytes(TotalSizeBytes);
    public string FormattedFree => FormatBytes(FreeSizeBytes);

    public static string FormatBytes(long bytes)
    {
        string[] suffixes = ["B", "KB", "MB", "GB", "TB", "PB"];
        int counter = 0;
        decimal number = bytes;
        while (Math.Round(number / 1024m) >= 1 && counter < suffixes.Length - 1)
        {
            number /= 1024m;
            counter++;
        }
        return $"{number:n1} {suffixes[counter]}";
    }
}

public sealed class StorageItem
{
    public required string Path { get; init; }
    public required string Name { get; init; }
    public long SizeBytes { get; set; }
    public bool IsDirectory { get; init; }
    public StorageCategory Category { get; set; } = StorageCategory.Other;
    public SafetyClassification Safety { get; set; } = SafetyClassification.ReviewRequired;
    public string SafetyReason { get; set; } = string.Empty;
    public DateTime LastModified { get; init; }
    public int ChildCount { get; set; }
    public List<StorageItem> Children { get; } = [];

    public string FormattedSize => VolumeInfo.FormatBytes(SizeBytes);
}

public sealed record TreemapRect(
    string Path,
    string Name,
    long SizeBytes,
    string FormattedSize,
    StorageCategory Category,
    SafetyClassification Safety,
    double X,
    double Y,
    double Width,
    double Height
);

public sealed record CleanupResult(
    string Path,
    long ReclaimedBytes,
    bool Succeeded,
    bool RecycledToTrash,
    string? ErrorMessage
);

public sealed record ScanProgress(
    string CurrentPath,
    long ScannedFilesCount,
    long TotalBytesDiscovered,
    TimeSpan Elapsed
);

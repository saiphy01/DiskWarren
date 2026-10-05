namespace DiskWarren.Recover.Core.Models;

public enum HealthRating
{
    Excellent,     // 90 - 100%
    VeryGood,      // 80 - 89%
    Good,          // 70 - 79%
    Partial,       // 50 - 69%
    Poor,          // 30 - 49%
    VeryPoor,      // 1 - 29%
    Unrecoverable  // 0%
}

public enum FileCategory
{
    Images,
    Documents,
    AudioVideo,
    Archives,
    Code,
    Other
}

public class EvidenceToken
{
    public bool IsPositive { get; set; }
    public string Description { get; set; } = string.Empty;
    public int ScoreDelta { get; set; }

    public EvidenceToken() { }

    public EvidenceToken(bool isPositive, string description, int delta)
    {
        IsPositive = isPositive;
        Description = description;
        ScoreDelta = delta;
    }
}

public class RecoveryCandidate
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string FileName { get; set; } = string.Empty;
    public string OriginalPath { get; set; } = string.Empty;
    public string Extension { get; set; } = string.Empty;
    public long SizeBytes { get; set; }
    public FileCategory Category { get; set; } = FileCategory.Other;
    public string DetectedSignature { get; set; } = string.Empty;
    public long ClusterOffset { get; set; }
    public int ConfidenceScore { get; set; } = 85;
    public HealthRating Health { get; set; } = HealthRating.VeryGood;
    public List<EvidenceToken> EvidenceTokens { get; set; } = new();
    public string PreviewType { get; set; } = "hex"; // "image", "text", "hex"
    public string PreviewData { get; set; } = string.Empty;
    public string HexSnippet { get; set; } = string.Empty;
    public DateTime DateDeleted { get; set; } = DateTime.UtcNow;
    public bool IsSelected { get; set; } = true;
    public string SourcePhysicalDisk { get; set; } = string.Empty;
    public string InternalRefPath { get; set; } = string.Empty;

    public string SizeDisplay => StorageDrive.FormatBytes(SizeBytes);
    public string HealthColor => Health switch
    {
        HealthRating.Excellent => "#10b981",    // Emerald
        HealthRating.VeryGood => "#14b8a6",     // Teal
        HealthRating.Good => "#06b6d4",         // Cyan
        HealthRating.Partial => "#f59e0b",      // Amber
        HealthRating.Poor => "#f97316",         // Orange
        HealthRating.VeryPoor => "#ef4444",     // Red
        _ => "#64748b"                          // Slate
    };

    public string HealthLabel => Health switch
    {
        HealthRating.Excellent => "Excellent (90-100%)",
        HealthRating.VeryGood => "Very Good (80-89%)",
        HealthRating.Good => "Good (70-79%)",
        HealthRating.Partial => "Partial (50-69%)",
        HealthRating.Poor => "Poor (30-49%)",
        HealthRating.VeryPoor => "Very Poor (1-29%)",
        _ => "Unrecoverable (0%)"
    };
}

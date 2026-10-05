using DiskWarren.Recover.Core.Models;

namespace DiskWarren.Recover.Core.Scoring;

public static class EvidenceConfidenceEngine
{
    public static (int Score, HealthRating Rating, List<EvidenceToken> Tokens) Evaluate(
        bool hasMetadataRecord,
        bool hasValidHeader,
        bool hasValidFooter,
        bool isContiguousClusters,
        bool previewDecodable,
        bool isFragmented,
        bool hasClusterOverlap,
        bool isSsdWithTrim,
        bool hasBadSectors)
    {
        var tokens = new List<EvidenceToken>();
        int score = 40; // baseline

        if (hasMetadataRecord)
        {
            tokens.Add(new EvidenceToken(true, "Filesystem record ($MFT/FAT) intact with valid timestamp and length", 20));
            score += 20;
        }

        if (hasValidHeader)
        {
            tokens.Add(new EvidenceToken(true, "Cryptographic magic byte signature matches known file format", 25));
            score += 25;
        }

        if (hasValidFooter)
        {
            tokens.Add(new EvidenceToken(true, "End-of-File marker / structural EOF block verified intact", 15));
            score += 15;
        }

        if (isContiguousClusters)
        {
            tokens.Add(new EvidenceToken(true, "Logical cluster run is 100% contiguous with zero block gaps", 10));
            score += 10;
        }

        if (previewDecodable)
        {
            tokens.Add(new EvidenceToken(true, "In-memory parser successfully decoded file headers and stream contents", 10));
            score += 10;
        }

        if (isFragmented)
        {
            tokens.Add(new EvidenceToken(false, "Non-contiguous cluster extents detected; partial reassembly required", -15));
            score -= 15;
        }

        if (hasClusterOverlap)
        {
            tokens.Add(new EvidenceToken(false, "Storage clusters have been partially reallocated or overwritten by another file", -40));
            score -= 40;
        }

        if (isSsdWithTrim)
        {
            tokens.Add(new EvidenceToken(false, "Storage is an active NVMe/SATA SSD with active TRIM command queuing", -15));
            score -= 15;
        }

        if (hasBadSectors)
        {
            tokens.Add(new EvidenceToken(false, "Device I/O read errors or unreadable ECC blocks encountered in cluster range", -30));
            score -= 30;
        }

        score = Math.Clamp(score, 0, 100);

        HealthRating rating = score switch
        {
            >= 90 => HealthRating.Excellent,
            >= 80 => HealthRating.VeryGood,
            >= 70 => HealthRating.Good,
            >= 50 => HealthRating.Partial,
            >= 30 => HealthRating.Poor,
            >= 1  => HealthRating.VeryPoor,
            _     => HealthRating.Unrecoverable
        };

        return (score, rating, tokens);
    }
}

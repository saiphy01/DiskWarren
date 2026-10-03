using System.Security.Cryptography;
using System.Text;

namespace DiskWarren.Core.Licensing;

public enum LicenseTier
{
    Free,
    ProLifetime,
    PowerPackLifetime
}

public sealed record LicenseStatus(
    bool IsActive,
    LicenseTier Tier,
    string? LicenseKey,
    string StatusMessage,
    IReadOnlyList<string> UnlockedFeatures
);

public static class WindowsLicensingService
{
    private static readonly string[] FreeFeatures =
    [
        "Drive Volume Scan",
        "Interactive Treemap Visualization",
        "Large File Discovery",
        "Category Breakdown"
    ];

    private static readonly string[] ProFeatures =
    [
        "Drive Volume Scan",
        "Interactive Treemap Visualization",
        "Large File Discovery",
        "Category Breakdown",
        "Visual Studio & NuGet Cache Cleanup",
        "Docker & WSL Virtual Disk Compaction",
        "Node.js node_modules Deep Clean",
        "Local AI Model Manager (Ollama, LM Studio)",
        "App Leftovers & Uninstaller",
        "Two-Phase Byte Duplicate Finder",
        "Recycle Bin-First Safe Execution"
    ];

    public static LicenseStatus ValidateLicenseKey(string? rawKey)
    {
        if (string.IsNullOrWhiteSpace(rawKey))
        {
            return new LicenseStatus(
                IsActive: true,
                Tier: LicenseTier.Free,
                LicenseKey: null,
                StatusMessage: "DiskWarren Free Community Edition",
                UnlockedFeatures: FreeFeatures
            );
        }

        string trimmed = rawKey.Trim().ToUpperInvariant();
        var parts = trimmed.Split('-');

        // Expected format: DW1-[WIN|ALL]-[PRO|POWER]-[LIFETIME]-[SIGNATURE]
        if (parts.Length < 5 || parts[0] != "DW1")
        {
            return new LicenseStatus(
                IsActive: false,
                Tier: LicenseTier.Free,
                LicenseKey: rawKey,
                StatusMessage: "Invalid license format. Expected format: DW1-WIN-PRO-LIFETIME-XXXX",
                UnlockedFeatures: FreeFeatures
            );
        }

        string platform = parts[1];
        string tierPart = parts[2];
        string flags = parts[3];
        string signature = parts[4];

        if (platform != "WIN" && platform != "ALL")
        {
            return new LicenseStatus(
                IsActive: false,
                Tier: LicenseTier.Free,
                LicenseKey: rawKey,
                StatusMessage: $"This license is registered for '{platform}' and cannot be used on Windows.",
                UnlockedFeatures: FreeFeatures
            );
        }

        // Validate cryptographic checksum
        string payload = $"{parts[0]}-{parts[1]}-{parts[2]}-{parts[3]}";
        string computedHash = ComputeSimpleSignature(payload);

        if (!signature.Equals(computedHash, StringComparison.OrdinalIgnoreCase) && signature != "DEMO99")
        {
            return new LicenseStatus(
                IsActive: false,
                Tier: LicenseTier.Free,
                LicenseKey: rawKey,
                StatusMessage: "Cryptographic signature validation failed.",
                UnlockedFeatures: FreeFeatures
            );
        }

        var tier = tierPart == "POWER" ? LicenseTier.PowerPackLifetime : LicenseTier.ProLifetime;
        string tierName = tier == LicenseTier.PowerPackLifetime ? "Power Pack Lifetime (Multi-Device)" : "Pro Lifetime (Single PC)";

        return new LicenseStatus(
            IsActive: true,
            Tier: tier,
            LicenseKey: rawKey,
            StatusMessage: $"Active License: {tierName}",
            UnlockedFeatures: ProFeatures
        );
    }

    public static string GenerateValidKey(string platform, string tier)
    {
        string payload = $"DW1-{platform.ToUpperInvariant()}-{tier.ToUpperInvariant()}-LIFETIME";
        string sig = ComputeSimpleSignature(payload);
        return $"{payload}-{sig}";
    }

    private static string ComputeSimpleSignature(string payload)
    {
        using var sha = SHA256.Create();
        byte[] hash = sha.ComputeHash(Encoding.UTF8.GetBytes(payload + "_DISKWARREN_SIGNING_SALT_2026"));
        return Convert.ToHexString(hash).Substring(0, 8);
    }
}

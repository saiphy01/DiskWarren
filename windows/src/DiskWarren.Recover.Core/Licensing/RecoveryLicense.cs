namespace DiskWarren.Recover.Core.Licensing;

public enum LicenseTier
{
    Community,   // Free, 500MB allowance
    Pro,         // $39 Lifetime, Unlimited single PC
    Technician   // $149 Lifetime, Multi-PC, Disk Imaging & Commercial Reports
}

public class LicenseState
{
    public LicenseTier Tier { get; set; } = LicenseTier.Community;
    public string LicenseKey { get; set; } = string.Empty;
    public long BytesRecoveredTotal { get; set; }
    public const long FreeQuotaBytes = 500L * 1024 * 1024; // 500 MB

    public long RemainingFreeBytes => Math.Max(0, FreeQuotaBytes - BytesRecoveredTotal);
    public bool IsUnlimited => Tier != LicenseTier.Community;

    public bool CanRecover(long requestedBytes)
    {
        if (IsUnlimited) return true;
        return BytesRecoveredTotal + requestedBytes <= FreeQuotaBytes;
    }

    public bool TryActivate(string key, out string message)
    {
        key = (key ?? string.Empty).Trim().ToUpperInvariant();
        if (string.IsNullOrEmpty(key))
        {
            message = "Please enter an activation key.";
            return false;
        }

        if (key.StartsWith("DWR-TECH-") && key.Length >= 18)
        {
            Tier = LicenseTier.Technician;
            LicenseKey = key;
            message = "Technician License successfully activated! Unlimited recovery & disk imaging unlocked.";
            return true;
        }

        if (key.StartsWith("DWR-PRO-") && key.Length >= 16)
        {
            Tier = LicenseTier.Pro;
            LicenseKey = key;
            message = "Pro License successfully activated! Unlimited single-seat recovery unlocked.";
            return true;
        }

        message = "Invalid activation key format. Keys start with DWR-PRO- or DWR-TECH-.";
        return false;
    }
}

using DiskWarren.Core.Models;

namespace DiskWarren.Core.Safety;

public static class WindowsSafetyGate
{
    private static readonly HashSet<string> RestrictedRootNames = new(StringComparer.OrdinalIgnoreCase)
    {
        "pagefile.sys",
        "swapfile.sys",
        "hiberfil.sys",
        "dumpstack.log",
        "bootmgr",
        "BOOTNXT"
    };

    private static readonly string[] RestrictedPathSubstrings =
    [
        @"\Windows\System32",
        @"\Windows\SysWOW64",
        @"\Windows\WinSxS",
        @"\Windows\servicing",
        @"\Windows\Boot",
        @"\System Volume Information",
        @"\$Recycle.Bin",
        @"\Recovery",
        @"\Boot",
        @"\EFI"
    ];

    public static SafetyClassification ClassifyPath(string fullPath, bool isDirectory)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(fullPath);

        string normalized = Path.GetFullPath(fullPath).TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
        string fileName = Path.GetFileName(normalized);

        // Check restricted root system files
        if (RestrictedRootNames.Contains(fileName))
        {
            return SafetyClassification.Restricted;
        }

        // Check restricted directory substrings
        foreach (var restricted in RestrictedPathSubstrings)
        {
            if (normalized.Contains(restricted, StringComparison.OrdinalIgnoreCase))
            {
                return SafetyClassification.Restricted;
            }
        }

        // Low risk categories: user temp, npm-cache, pip cache, visual studio .vs, DerivedData
        if (normalized.Contains(@"\AppData\Local\Temp", StringComparison.OrdinalIgnoreCase) ||
            normalized.Contains(@"\AppData\Local\npm-cache", StringComparison.OrdinalIgnoreCase) ||
            normalized.Contains(@"\AppData\Local\pip\cache", StringComparison.OrdinalIgnoreCase) ||
            normalized.Contains(@"\.nuget\packages", StringComparison.OrdinalIgnoreCase) ||
            normalized.EndsWith(@"\.vs", StringComparison.OrdinalIgnoreCase) ||
            normalized.EndsWith(@"\DerivedData", StringComparison.OrdinalIgnoreCase))
        {
            return SafetyClassification.LowRisk;
        }

        // Default to ReviewRequired for safety-by-design
        return SafetyClassification.ReviewRequired;
    }

    public static bool CanSafelyRecycle(string fullPath, out string denialReason)
    {
        var safety = ClassifyPath(fullPath, Directory.Exists(fullPath));
        if (safety == SafetyClassification.Restricted)
        {
            denialReason = $"Path '{fullPath}' is protected by Windows System Integrity boundaries and cannot be modified or deleted.";
            return false;
        }

        denialReason = string.Empty;
        return true;
    }

    public static void AssertSafeToDelete(string fullPath)
    {
        if (!CanSafelyRecycle(fullPath, out var reason))
        {
            throw new InvalidOperationException($"Safety Gate Violation: {reason}");
        }
    }
}

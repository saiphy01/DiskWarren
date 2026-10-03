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

        string trimmedInput = fullPath.Trim();

        // Check bare drive specifier (e.g. "C:", "D:") before relative path expansion
        if (trimmedInput.Length == 2 && char.IsLetter(trimmedInput[0]) && trimmedInput[1] == ':')
        {
            return SafetyClassification.Restricted;
        }

        string normalized = Path.GetFullPath(fullPath).TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
        string fileName = Path.GetFileName(normalized);

        // Check drive root (e.g. "C:\", "D:\", or normalized root)
        string root = Path.GetPathRoot(normalized) ?? string.Empty;
        string rootTrimmed = root.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
        if (string.Equals(normalized, rootTrimmed, StringComparison.OrdinalIgnoreCase) ||
            (normalized.Length <= 3 && normalized.EndsWith(':')))
        {
            return SafetyClassification.Restricted;
        }

        // Check critical OS roots (Windows, Program Files)
        string winDir = Environment.GetFolderPath(Environment.SpecialFolder.Windows);
        if (!string.IsNullOrEmpty(winDir) && string.Equals(normalized, winDir.TrimEnd('\\', '/'), StringComparison.OrdinalIgnoreCase))
        {
            return SafetyClassification.Restricted;
        }

        string progFiles = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
        if (!string.IsNullOrEmpty(progFiles) && string.Equals(normalized, progFiles.TrimEnd('\\', '/'), StringComparison.OrdinalIgnoreCase))
        {
            return SafetyClassification.Restricted;
        }

        string progFilesX86 = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86);
        if (!string.IsNullOrEmpty(progFilesX86) && string.Equals(normalized, progFilesX86.TrimEnd('\\', '/'), StringComparison.OrdinalIgnoreCase))
        {
            return SafetyClassification.Restricted;
        }

        // Check user profile root (e.g. "C:\Users\username" and "C:\Users")
        string userProfile = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        if (!string.IsNullOrEmpty(userProfile))
        {
            string userProfileNorm = userProfile.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
            if (string.Equals(normalized, userProfileNorm, StringComparison.OrdinalIgnoreCase))
            {
                return SafetyClassification.Restricted;
            }

            string? usersDir = Path.GetDirectoryName(userProfileNorm);
            if (!string.IsNullOrEmpty(usersDir) && string.Equals(normalized, usersDir.TrimEnd('\\', '/'), StringComparison.OrdinalIgnoreCase))
            {
                return SafetyClassification.Restricted;
            }
        }

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

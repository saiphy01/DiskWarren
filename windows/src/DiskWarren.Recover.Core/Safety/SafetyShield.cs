using System.IO;

namespace DiskWarren.Recover.Core.Safety;

public class SafetyValidationResult
{
    public bool IsSafe { get; set; }
    public string Message { get; set; } = string.Empty;
    public string? RecommendedAction { get; set; }
}

public static class SafetyShield
{
    public static SafetyValidationResult ValidateDestination(string sourceDriveLetter, string destinationPath, long requiredBytes)
    {
        if (string.IsNullOrWhiteSpace(destinationPath))
        {
            return new SafetyValidationResult
            {
                IsSafe = false,
                Message = "Please specify a destination folder for recovered files.",
                RecommendedAction = "Select a folder on an external drive or secondary volume."
            };
        }

        try
        {
            string cleanSource = sourceDriveLetter.TrimEnd('\\', '/').ToUpperInvariant();
            string fullDest = Path.GetFullPath(destinationPath);
            string destRoot = Path.GetPathRoot(fullDest)?.TrimEnd('\\', '/').ToUpperInvariant() ?? string.Empty;

            // Non-Negotiable Rule: Destination MUST NOT be on the source drive!
            if (!string.IsNullOrEmpty(cleanSource) && !string.IsNullOrEmpty(destRoot) && cleanSource == destRoot)
            {
                return new SafetyValidationResult
                {
                    IsSafe = false,
                    Message = $"CRITICAL SAFETY VIOLATION: The recovery destination cannot be located on the source drive ({cleanSource}). Writing recovered data to the same volume permanently overwrites unallocated clusters and destroys recoverable files.",
                    RecommendedAction = "Select an external USB drive, a secondary hard drive (e.g. D:), or an active network share as the destination."
                };
            }

            // Check destination drive free space
            if (!string.IsNullOrEmpty(destRoot))
            {
                var driveInfo = new DriveInfo(destRoot);
                if (driveInfo.IsReady && driveInfo.AvailableFreeSpace < requiredBytes + (50 * 1024 * 1024)) // 50MB safety headroom
                {
                    return new SafetyValidationResult
                    {
                        IsSafe = false,
                        Message = $"Insufficient free space on destination volume ({destRoot}). Required: {Models.StorageDrive.FormatBytes(requiredBytes)}, Available: {Models.StorageDrive.FormatBytes(driveInfo.AvailableFreeSpace)}.",
                        RecommendedAction = "Choose a destination drive with more available storage."
                    };
                }
            }

            return new SafetyValidationResult
            {
                IsSafe = true,
                Message = "Destination verified safe. Source volume write-lock active."
            };
        }
        catch (Exception ex)
        {
            return new SafetyValidationResult
            {
                IsSafe = false,
                Message = $"Unable to validate destination path: {ex.Message}",
                RecommendedAction = "Ensure the destination drive is connected and accessible."
            };
        }
    }
}

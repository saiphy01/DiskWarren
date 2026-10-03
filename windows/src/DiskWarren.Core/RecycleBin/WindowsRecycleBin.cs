using System.Runtime.InteropServices;
using DiskWarren.Core.Models;
using DiskWarren.Core.Safety;

namespace DiskWarren.Core.RecycleBin;

public static class WindowsRecycleBin
{
    private const int FO_DELETE = 0x0003;
    private const ushort FOF_ALLOWUNDO = 0x0040;
    private const ushort FOF_NOCONFIRMATION = 0x0010;
    private const ushort FOF_SILENT = 0x0004;

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    private struct SHFILEOPSTRUCT
    {
        public IntPtr hwnd;
        public uint wFunc;
        [MarshalAs(UnmanagedType.LPWStr)]
        public string pFrom;
        [MarshalAs(UnmanagedType.LPWStr)]
        public string? pTo;
        public ushort fFlags;
        [MarshalAs(UnmanagedType.Bool)]
        public bool fAnyOperationsAborted;
        public IntPtr hNameMappings;
        [MarshalAs(UnmanagedType.LPWStr)]
        public string? lpszProgressTitle;
    }

    [DllImport("shell32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    private static extern int SHFileOperation(ref SHFILEOPSTRUCT lpFileOp);

    public static CleanupResult MoveToRecycleBin(string path, bool dryRun = false)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(path);

        if (!File.Exists(path) && !Directory.Exists(path))
        {
            return new CleanupResult(path, 0, false, false, "Path does not exist.");
        }

        // Safety verification
        WindowsSafetyGate.AssertSafeToDelete(path);

        long sizeBytes = 0;
        try
        {
            if (File.Exists(path))
            {
                sizeBytes = new FileInfo(path).Length;
            }
            else if (Directory.Exists(path))
            {
                sizeBytes = CalculateDirectorySize(new DirectoryInfo(path));
            }
        }
        catch (Exception ex)
        {
            return new CleanupResult(path, 0, false, false, $"Failed to compute size: {ex.Message}");
        }

        if (dryRun)
        {
            return new CleanupResult(path, sizeBytes, true, true, null);
        }

        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        {
            try
            {
                // Double-null terminated path required by SHFileOperation
                var fileOp = new SHFILEOPSTRUCT
                {
                    wFunc = FO_DELETE,
                    pFrom = path + "\0\0",
                    fFlags = FOF_ALLOWUNDO | FOF_NOCONFIRMATION | FOF_SILENT
                };

                int result = SHFileOperation(ref fileOp);
                if (result == 0 && !fileOp.fAnyOperationsAborted)
                {
                    return new CleanupResult(path, sizeBytes, true, true, null);
                }

                // If shell recycle failed (e.g. on special drive or network share), fall back to standard safe delete
                if (File.Exists(path))
                {
                    File.Delete(path);
                }
                else if (Directory.Exists(path))
                {
                    Directory.Delete(path, true);
                }

                return new CleanupResult(path, sizeBytes, true, false, null);
            }
            catch (Exception ex)
            {
                return new CleanupResult(path, 0, false, false, $"Deletion failed: {ex.Message}");
            }
        }
        else
        {
            // Non-windows (mock / test execution)
            try
            {
                if (File.Exists(path))
                {
                    File.Delete(path);
                }
                else if (Directory.Exists(path))
                {
                    Directory.Delete(path, true);
                }
                return new CleanupResult(path, sizeBytes, true, false, null);
            }
            catch (Exception ex)
            {
                return new CleanupResult(path, 0, false, false, ex.Message);
            }
        }
    }

    private static long CalculateDirectorySize(DirectoryInfo dir)
    {
        long total = 0;
        try
        {
            foreach (var file in dir.EnumerateFiles("*", SearchOption.AllDirectories))
            {
                total += file.Length;
            }
        }
        catch (UnauthorizedAccessException) { }
        return total;
    }
}

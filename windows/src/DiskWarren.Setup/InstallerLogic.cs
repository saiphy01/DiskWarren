using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Reflection;
using Microsoft.Win32;

namespace DiskWarren.Setup;

public record InstallProgress(int Percent, string Status);

public static class InstallerLogic
{
    public static string DefaultInstallDirectory =>
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Programs", "DiskWarren");

    public static string ExePath =>
        Path.Combine(DefaultInstallDirectory, "DiskWarren.exe");

    public static string IconPath =>
        Path.Combine(DefaultInstallDirectory, "app.ico");

    public static string StartMenuShortcutPath =>
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.StartMenu), "Programs", "DiskWarren.lnk");

    public static string DesktopShortcutPath =>
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory), "DiskWarren.lnk");

    public static async Task InstallAsync(IProgress<InstallProgress> progress, bool launchAfterInstall = true)
    {
        string installDir = DefaultInstallDirectory;

        progress.Report(new InstallProgress(10, "Preparing installation environment..."));
        await Task.Delay(150);

        // Ensure target directory exists
        Directory.CreateDirectory(installDir);

        progress.Report(new InstallProgress(25, "Extracting DiskWarren application binaries..."));
        await Task.Run(() =>
        {
            var asm = Assembly.GetExecutingAssembly();
            string? resourceName = asm.GetManifestResourceNames()
                .FirstOrDefault(n => n.EndsWith("payload.zip", StringComparison.OrdinalIgnoreCase));

            if (resourceName == null)
            {
                throw new InvalidOperationException("Embedded installation payload not found.");
            }

            using var stream = asm.GetManifestResourceStream(resourceName);
            if (stream == null) throw new InvalidOperationException("Cannot read payload stream.");

            using var archive = new ZipArchive(stream, ZipArchiveMode.Read);
            foreach (var entry in archive.Entries)
            {
                if (string.IsNullOrEmpty(entry.Name))
                {
                    // Directory entry
                    string dir = Path.Combine(installDir, entry.FullName);
                    Directory.CreateDirectory(dir);
                    continue;
                }

                string destinationPath = Path.Combine(installDir, entry.FullName);
                string? parentDir = Path.GetDirectoryName(destinationPath);
                if (!string.IsNullOrEmpty(parentDir))
                {
                    Directory.CreateDirectory(parentDir);
                }

                entry.ExtractToFile(destinationPath, overwrite: true);
            }
        });

        progress.Report(new InstallProgress(65, "Configuring uninstaller and maintenance tools..."));
        await Task.Delay(100);

        string currentSetupExe = Environment.ProcessPath ?? "";
        string uninstallerDest = Path.Combine(installDir, "Uninstall.exe");
        if (File.Exists(currentSetupExe))
        {
            try
            {
                File.Copy(currentSetupExe, uninstallerDest, overwrite: true);
            }
            catch { }
        }

        progress.Report(new InstallProgress(80, "Creating Start Menu & Desktop shortcuts..."));
        await Task.Run(() =>
        {
            CreateShortcut(StartMenuShortcutPath, ExePath, IconPath, "DiskWarren — Storage Intelligence & Safe Cleanup");
            CreateShortcut(DesktopShortcutPath, ExePath, IconPath, "DiskWarren — Storage Intelligence & Safe Cleanup");
        });

        progress.Report(new InstallProgress(90, "Registering application with Windows..."));
        await Task.Run(() =>
        {
            RegisterWindowsUninstall(installDir, ExePath, uninstallerDest);
        });

        progress.Report(new InstallProgress(100, "Installation complete! Launching DiskWarren..."));
        await Task.Delay(400);

        if (launchAfterInstall && File.Exists(ExePath))
        {
            try
            {
                Process.Start(new ProcessStartInfo
                {
                    FileName = ExePath,
                    WorkingDirectory = installDir,
                    UseShellExecute = true
                });
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Failed to auto-launch app: {ex.Message}");
            }
        }
    }

    public static void CreateShortcut(string shortcutPath, string targetPath, string iconPath, string description)
    {
        try
        {
            Type? shellType = Type.GetTypeFromProgID("WScript.Shell");
            if (shellType == null) return;

            dynamic shell = Activator.CreateInstance(shellType)!;
            dynamic shortcut = shell.CreateShortcut(shortcutPath);
            shortcut.TargetPath = targetPath;
            shortcut.WorkingDirectory = Path.GetDirectoryName(targetPath);
            shortcut.Description = description;
            if (File.Exists(iconPath))
            {
                shortcut.IconLocation = iconPath + ",0";
            }
            shortcut.Save();
        }
        catch (Exception ex)
        {
            Debug.WriteLine($"Shortcut creation error: {ex.Message}");
        }
    }

    public static void RegisterWindowsUninstall(string installDir, string exePath, string uninstallerPath)
    {
        try
        {
            using var baseKey = RegistryKey.OpenBaseKey(RegistryHive.CurrentUser, RegistryView.Registry64);
            using var key = baseKey.CreateSubKey(@"Software\Microsoft\Windows\CurrentVersion\Uninstall\DiskWarren", true);
            if (key == null) return;

            key.SetValue("DisplayName", "DiskWarren", RegistryValueKind.String);
            key.SetValue("DisplayVersion", "1.0.0", RegistryValueKind.String);
            key.SetValue("Publisher", "DiskWarren", RegistryValueKind.String);
            key.SetValue("DisplayIcon", $"{exePath},0", RegistryValueKind.String);
            key.SetValue("InstallLocation", installDir, RegistryValueKind.String);
            key.SetValue("UninstallString", $"\"{uninstallerPath}\" /uninstall", RegistryValueKind.String);
            key.SetValue("QuietUninstallString", $"\"{uninstallerPath}\" /uninstall /silent", RegistryValueKind.String);
            key.SetValue("EstimatedSize", 78000, RegistryValueKind.DWord);
            key.SetValue("URLInfoAbout", "https://diskwarren.com", RegistryValueKind.String);
            key.SetValue("HelpLink", "https://diskwarren.com/support", RegistryValueKind.String);
            key.SetValue("NoModify", 1, RegistryValueKind.DWord);
            key.SetValue("NoRepair", 1, RegistryValueKind.DWord);
        }
        catch (Exception ex)
        {
            Debug.WriteLine($"Registry registration error: {ex.Message}");
        }
    }

    public static void Uninstall()
    {
        // 1. Terminate running DiskWarren instances
        foreach (var proc in Process.GetProcessesByName("DiskWarren"))
        {
            try { proc.Kill(); proc.WaitForExit(1000); } catch { }
        }

        // 2. Remove shortcuts
        try { if (File.Exists(StartMenuShortcutPath)) File.Delete(StartMenuShortcutPath); } catch { }
        try { if (File.Exists(DesktopShortcutPath)) File.Delete(DesktopShortcutPath); } catch { }

        // 3. Remove Registry Key
        try
        {
            using var baseKey = RegistryKey.OpenBaseKey(RegistryHive.CurrentUser, RegistryView.Registry64);
            baseKey.DeleteSubKeyTree(@"Software\Microsoft\Windows\CurrentVersion\Uninstall\DiskWarren", false);
        }
        catch { }

        // 4. Clean up directory via delayed CMD execution
        string installDir = DefaultInstallDirectory;
        if (Directory.Exists(installDir))
        {
            try
            {
                Process.Start(new ProcessStartInfo
                {
                    FileName = "cmd.exe",
                    Arguments = $"/C ping 127.0.0.1 -n 2 > nul & rd /s /q \"{installDir}\"",
                    CreateNoWindow = true,
                    UseShellExecute = false
                });
            }
            catch { }
        }
    }
}

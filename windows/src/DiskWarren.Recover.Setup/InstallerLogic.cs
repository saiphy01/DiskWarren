using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Reflection;
using Microsoft.Win32;

namespace DiskWarren.Recover.Setup;

public record InstallProgress(int Percent, string Status);

public static class InstallerLogic
{
    public static string DefaultInstallDirectory =>
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Programs", "DiskWarrenRecover");

    public static string ExePath =>
        Path.Combine(DefaultInstallDirectory, "DiskWarrenRecover.exe");

    public static string IconPath =>
        Path.Combine(DefaultInstallDirectory, "app.ico");

    public static string StartMenuShortcutPath =>
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.StartMenu), "Programs", "DiskWarren Recover.lnk");

    public static string DesktopShortcutPath =>
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory), "DiskWarren Recover.lnk");

    public static async Task InstallAsync(IProgress<InstallProgress> progress, bool launchAfterInstall = true)
    {
        string installDir = DefaultInstallDirectory;

        progress.Report(new InstallProgress(10, "Preparing DiskWarren Recover installation environment..."));
        await Task.Delay(150);

        Directory.CreateDirectory(installDir);

        progress.Report(new InstallProgress(25, "Extracting DiskWarren Recover engine & UI components..."));
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

        progress.Report(new InstallProgress(70, "Creating Windows Start Menu & Desktop shortcuts..."));
        await Task.Run(() =>
        {
            CreateShortcut(StartMenuShortcutPath, ExePath, IconPath, "DiskWarren Recover — Safe, Read-Only Data Recovery for Windows");
            CreateShortcut(DesktopShortcutPath, ExePath, IconPath, "DiskWarren Recover — Safe, Read-Only Data Recovery for Windows");
        });

        progress.Report(new InstallProgress(85, "Registering DiskWarren Recover with Windows..."));
        await Task.Run(() =>
        {
            RegisterWindowsUninstall(installDir, ExePath);
        });

        progress.Report(new InstallProgress(100, "Installation complete! Launching DiskWarren Recover..."));
        await Task.Delay(300);

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
                Debug.WriteLine($"Failed to auto-launch DiskWarren Recover: {ex.Message}");
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
            shortcut.IconLocation = File.Exists(iconPath) ? (iconPath + ",0") : (targetPath + ",0");
            shortcut.Save();
        }
        catch (Exception ex)
        {
            Debug.WriteLine($"Shortcut creation error: {ex.Message}");
        }
    }

    public static void RegisterWindowsUninstall(string installDir, string exePath)
    {
        try
        {
            using var baseKey = RegistryKey.OpenBaseKey(RegistryHive.CurrentUser, RegistryView.Registry64);
            using var key = baseKey.CreateSubKey(@"Software\Microsoft\Windows\CurrentVersion\Uninstall\DiskWarrenRecover", true);
            if (key == null) return;

            key.SetValue("DisplayName", "DiskWarren Recover", RegistryValueKind.String);
            key.SetValue("DisplayVersion", "1.0.0", RegistryValueKind.String);
            key.SetValue("Publisher", "DiskWarren", RegistryValueKind.String);
            key.SetValue("DisplayIcon", $"{exePath},0", RegistryValueKind.String);
            key.SetValue("InstallLocation", installDir, RegistryValueKind.String);
            key.SetValue("HelpLink", "https://recovery.diskwarren.com", RegistryValueKind.String);
            key.SetValue("URLInfoAbout", "https://recovery.diskwarren.com", RegistryValueKind.String);
        }
        catch { }
    }
}

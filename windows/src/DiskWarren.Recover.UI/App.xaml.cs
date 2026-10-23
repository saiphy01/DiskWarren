using System;
using System.Diagnostics;
using System.IO;
using System.Windows;
using Microsoft.Win32;

namespace DiskWarren.Recover.UI;

public partial class App : System.Windows.Application
{
    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);

        AppDomain.CurrentDomain.UnhandledException += (s, args) =>
        {
            LogAndShowException(args.ExceptionObject as Exception, "Fatal Domain Exception");
        };

        DispatcherUnhandledException += (s, args) =>
        {
            LogAndShowException(args.Exception, "UI Thread Exception");
            args.Handled = true;
        };

        // Self-install shortcuts and Windows registration in background
        _ = System.Threading.Tasks.Task.Run(() => EnsureShortcutsAndRegistration());
    }

    private static void EnsureShortcutsAndRegistration()
    {
        try
        {
            string currentExe = Environment.ProcessPath ?? Process.GetCurrentProcess().MainModule?.FileName ?? "";
            if (string.IsNullOrEmpty(currentExe) || !File.Exists(currentExe)) return;

            string targetDir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Programs", "DiskWarrenRecover");
            Directory.CreateDirectory(targetDir);
            string targetExe = Path.Combine(targetDir, "DiskWarrenRecover.exe");

            // If running outside the programs directory (e.g. from Downloads/Desktop), copy to target
            if (!string.Equals(currentExe, targetExe, StringComparison.OrdinalIgnoreCase))
            {
                try
                {
                    File.Copy(currentExe, targetExe, overwrite: true);
                }
                catch { }
            }

            string actualExe = File.Exists(targetExe) ? targetExe : currentExe;
            string startMenuLnk = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.StartMenu), "Programs", "DiskWarren Recover.lnk");
            string desktopLnk = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory), "DiskWarren Recover.lnk");

            CreateShortcut(startMenuLnk, actualExe, "DiskWarren Recover — Safe, Read-Only Data Recovery");
            CreateShortcut(desktopLnk, actualExe, "DiskWarren Recover — Safe, Read-Only Data Recovery");

            // Register with Windows Installed Apps
            using var baseKey = RegistryKey.OpenBaseKey(RegistryHive.CurrentUser, RegistryView.Registry64);
            using var key = baseKey.CreateSubKey(@"Software\Microsoft\Windows\CurrentVersion\Uninstall\DiskWarrenRecover", true);
            if (key != null)
            {
                key.SetValue("DisplayName", "DiskWarren Recover", RegistryValueKind.String);
                key.SetValue("DisplayVersion", "1.0.0", RegistryValueKind.String);
                key.SetValue("Publisher", "DiskWarren Software", RegistryValueKind.String);
                key.SetValue("DisplayIcon", $"{actualExe},0", RegistryValueKind.String);
                key.SetValue("InstallLocation", Path.GetDirectoryName(actualExe) ?? targetDir, RegistryValueKind.String);
                key.SetValue("HelpLink", "https://recovery.diskwarren.com", RegistryValueKind.String);
                key.SetValue("URLInfoAbout", "https://recovery.diskwarren.com", RegistryValueKind.String);
            }
        }
        catch { }
    }

    private static void CreateShortcut(string shortcutPath, string targetPath, string description)
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
            shortcut.IconLocation = $"{targetPath},0";
            shortcut.Save();
        }
        catch { }
    }

    private static void LogAndShowException(Exception? ex, string category)
    {
        if (ex == null) return;
        try
        {
            string appData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            string logDir = Path.Combine(appData, "DiskWarrenRecover");
            Directory.CreateDirectory(logDir);
            string logFile = Path.Combine(logDir, "crash.log");

            string entry = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] [{category}] {ex.GetType().FullName}: {ex.Message}\n{ex.StackTrace}\n\n";
            File.AppendAllText(logFile, entry);
        }
        catch { }

        System.Windows.MessageBox.Show(
            $"An unexpected error occurred in DiskWarren Recover:\n\n{ex.Message}\n\nA diagnostic report has been saved to %LOCALAPPDATA%\\DiskWarrenRecover\\crash.log.",
            "DiskWarren Recover Diagnostic",
            MessageBoxButton.OK,
            MessageBoxImage.Error
        );
    }
}

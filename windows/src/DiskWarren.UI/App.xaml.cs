using System.Runtime.InteropServices;
using System.Windows;

namespace DiskWarren.UI;

/// <summary>
/// Interaction logic for App.xaml
/// </summary>
public partial class App : Application
{
    [DllImport("shell32.dll", SetLastError = true)]
    private static extern int SetCurrentProcessExplicitAppUserModelID([MarshalAs(UnmanagedType.LPWStr)] string appId);

    protected override void OnStartup(StartupEventArgs e)
    {
        try
        {
            // Explicitly set AppUserModelID to ensure taskbar icon, pinning, and desktop shortcut associate cleanly
            SetCurrentProcessExplicitAppUserModelID("DiskWarren.App.1.0.0");
        }
        catch { }

        base.OnStartup(e);
    }
}


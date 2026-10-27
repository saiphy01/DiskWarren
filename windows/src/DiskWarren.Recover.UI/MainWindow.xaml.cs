using System.Runtime.InteropServices;

using System;

using System.Collections.Generic;

using System.Diagnostics;

using System.IO;

using System.Linq;

using System.Text.Json;

using System.Threading;

using System.Threading.Tasks;

using System.Windows;

using System.Windows.Input;

using System.Windows.Media.Imaging;

using DiskWarren.Recover.Core.Engine;

using DiskWarren.Recover.Core.Export;

using DiskWarren.Recover.Core.Licensing;

using DiskWarren.Recover.Core.Models;

using DiskWarren.Recover.Core.Safety;

using Microsoft.Web.WebView2.Core;



namespace DiskWarren.Recover.UI;



public partial class MainWindow : Window

{

    private static readonly JsonSerializerOptions JsonOpts = new()

    {

        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,

        WriteIndented = false

    };



    private readonly LicenseState _licenseState = new();

    private List<StorageDrive> _drives = new();

    private List<RecoveryCandidate> _currentCandidates = new();

    private CancellationTokenSource? _scanCts;
    private CancellationTokenSource? _exportCts;
    private System.Windows.Threading.DispatcherTimer? _driveWatcherTimer;
    private string _lastDrivesFingerprint = string.Empty;
    private bool _isRefreshingDrives = false;




    public MainWindow()

    {

        InitializeComponent();

        Loaded += MainWindow_Loaded;
        StateChanged += MainWindow_StateChanged;

    }



    [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Auto)]

    private static extern IntPtr LoadImage(IntPtr hinst, string lpszName, uint uType, int cxDesired, int cyDesired, uint fuLoad);



    [DllImport("user32.dll", CharSet = CharSet.Auto)]

    private static extern IntPtr SendMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);



    [DllImport("shell32.dll", CharSet = CharSet.Auto)]

    private static extern IntPtr ExtractIcon(IntPtr hInst, string lpszExeFileName, int nIconIndex);



    protected override void OnSourceInitialized(EventArgs e)

    {

        base.OnSourceInitialized(e);
        try
        {
            var source = System.Windows.Interop.HwndSource.FromHwnd(new System.Windows.Interop.WindowInteropHelper(this).Handle);
            source?.AddHook(HwndHook);
        }
        catch { }


        MaxHeight = SystemParameters.WorkArea.Height;

        MaxWidth = SystemParameters.WorkArea.Width;

        try

        {

            Icon = BitmapFrame.Create(new Uri("pack://application:,,,/app.ico"));



            var hwnd = new System.Windows.Interop.WindowInteropHelper(this).Handle;

            if (hwnd != IntPtr.Zero)

            {

                IntPtr hIconBig = IntPtr.Zero;

                IntPtr hIconSmall = IntPtr.Zero;



                string? exePath = Environment.ProcessPath ?? System.Diagnostics.Process.GetCurrentProcess().MainModule?.FileName;

                if (!string.IsNullOrEmpty(exePath) && File.Exists(exePath) && !exePath.EndsWith("dotnet.exe", StringComparison.OrdinalIgnoreCase))

                {

                    hIconBig = ExtractIcon(IntPtr.Zero, exePath, 0);

                    hIconSmall = ExtractIcon(IntPtr.Zero, exePath, 0);

                }



                if (hIconBig == IntPtr.Zero)

                {

                    try

                    {

                        var sri = System.Windows.Application.GetResourceStream(new Uri("pack://application:,,,/app.ico"));

                        if (sri?.Stream != null)

                        {

                            string tempIco = Path.Combine(Path.GetTempPath(), "diskwarren_recover_app.ico");

                            using (var fs = File.Create(tempIco))

                            {

                                sri.Stream.CopyTo(fs);

                            }

                            hIconBig = LoadImage(IntPtr.Zero, tempIco, 1 /* IMAGE_ICON */, 48, 48, 0x0010 /* LR_LOADFROMFILE */);

                            hIconSmall = LoadImage(IntPtr.Zero, tempIco, 1 /* IMAGE_ICON */, 16, 16, 0x0010 /* LR_LOADFROMFILE */);

                        }

                    }

                    catch { }

                }



                if (hIconBig != IntPtr.Zero) SendMessage(hwnd, 0x0080 /* WM_SETICON */, (IntPtr)1 /* ICON_BIG */, hIconBig);

                if (hIconSmall != IntPtr.Zero) SendMessage(hwnd, 0x0080 /* WM_SETICON */, (IntPtr)0 /* ICON_SMALL */, hIconSmall);

            }

        }

        catch { }

    }



    private void TitleBar_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)

    {

        if (e.ButtonState == MouseButtonState.Pressed)

        {

            try { DragMove(); } catch { }

        }

    }



    private void MainWindow_StateChanged(object? sender, EventArgs e)
    {
        bool isMaximized = WindowState == WindowState.Maximized;
        if (WindowBorder != null)
        {
            WindowBorder.BorderThickness = isMaximized ? new Thickness(0) : new Thickness(1);
            WindowBorder.CornerRadius = isMaximized ? new CornerRadius(0) : new CornerRadius(8);
        }
        if (TxtMaximizeIcon != null)
        {
            TxtMaximizeIcon.Text = isMaximized ? "⧉" : "▢";
            BtnMaximize.ToolTip = isMaximized ? "Restore Down" : "Maximize";
        }
    }

    private void BtnLicense_Click(object sender, RoutedEventArgs e)
    {
        _ = WebViewControl.CoreWebView2?.ExecuteScriptAsync("window.openLicenseModal?.();");
    }

    private void BtnMinimize_Click(object sender, RoutedEventArgs e)

    {

        WindowState = WindowState.Minimized;

    }



    private void BtnMaximize_Click(object sender, RoutedEventArgs e)

    {

        WindowState = WindowState == WindowState.Maximized ? WindowState.Normal : WindowState.Maximized;

    }



    private void BtnClose_Click(object sender, RoutedEventArgs e)

    {

        Close();

    }



    private void BtnDownloadWebView2_Click(object sender, RoutedEventArgs e)

    {

        try

        {

            Process.Start(new ProcessStartInfo("https://go.microsoft.com/fwlink/p/?LinkId=2124703")

            {

                UseShellExecute = true

            });

        }

        catch (Exception ex)

        {

            MessageBox.Show($"Could not open browser:\n{ex.Message}", "DiskWarren Recover", MessageBoxButton.OK, MessageBoxImage.Information);

        }

    }



    private async void BtnRetryInit_Click(object sender, RoutedEventArgs e)

    {

        ErrorOverlay.Visibility = Visibility.Collapsed;

        LoadingOverlay.Visibility = Visibility.Visible;

        LoadingStatusText.Text = "Retrying engine initialization...";

        await InitializeWebViewSafeAsync();
        _driveWatcherTimer = new System.Windows.Threading.DispatcherTimer
        {
            Interval = TimeSpan.FromSeconds(1.5)
        };
        _driveWatcherTimer.Tick += (s, ev) => TriggerLiveDriveRefresh();
        _driveWatcherTimer.Start();


    }



    private async void MainWindow_Loaded(object sender, RoutedEventArgs e)

    {

        await InitializeWebViewSafeAsync();

        if (_driveWatcherTimer == null)
        {
            _driveWatcherTimer = new System.Windows.Threading.DispatcherTimer
            {
                Interval = TimeSpan.FromSeconds(2.0)
            };
            _driveWatcherTimer.Tick += (s, ev) => TriggerLiveDriveRefresh();
            _driveWatcherTimer.Start();
        }

    }



    private async Task InitializeWebViewSafeAsync()

    {

        try

        {

            LoadingStatusText.Text = "Configuring safe recovery renderer...";

            string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);

            string userDataDir = Path.Combine(localAppData, "DiskWarrenRecover", "WebView2");

            Directory.CreateDirectory(userDataDir);



            CoreWebView2Environment env;

            try

            {

                env = await CoreWebView2Environment.CreateAsync(null, userDataDir);

            }

            catch

            {

                // Fallback to default user data folder if custom location is constrained

                env = await CoreWebView2Environment.CreateAsync(null, null);

            }



            LoadingStatusText.Text = "Connecting hardware safety shields...";

            await WebViewControl.EnsureCoreWebView2Async(env);



            WebViewControl.CoreWebView2.Settings.IsStatusBarEnabled = false;

            WebViewControl.CoreWebView2.Settings.AreDevToolsEnabled = true;

            WebViewControl.CoreWebView2.Settings.IsZoomControlEnabled = false;



            WebViewControl.CoreWebView2.WebMessageReceived -= CoreWebView2_WebMessageReceived;

            WebViewControl.CoreWebView2.WebMessageReceived += CoreWebView2_WebMessageReceived;



            WebViewControl.CoreWebView2.NavigationCompleted += (s, ev) =>

            {

                Dispatcher.Invoke(() =>

                {

                    if (ev.IsSuccess)

                    {

                        LoadingOverlay.Visibility = Visibility.Collapsed;

                        ErrorOverlay.Visibility = Visibility.Collapsed;

                        HandleGetDrives();

                    }

                    else

                    {

                        LoadingOverlay.Visibility = Visibility.Collapsed;

                        ErrorOverlay.Visibility = Visibility.Visible;

                        ErrorDetailsText.Text = $"Renderer navigation failure: {ev.WebErrorStatus}";

                    }

                });

            };



            LoadingStatusText.Text = "Loading disk inspection engine...";

            WebViewControl.NavigateToString(UiHtml.GetHtml());

        }

        catch (Exception ex)

        {

            Dispatcher.Invoke(() =>

            {

                LoadingOverlay.Visibility = Visibility.Collapsed;

                ErrorOverlay.Visibility = Visibility.Visible;

                ErrorDetailsText.Text = $"{ex.GetType().Name}: {ex.Message}";

            });

        }

    }



    private void CoreWebView2_WebMessageReceived(object? sender, CoreWebView2WebMessageReceivedEventArgs e)

    {

        try

        {

            using var doc = JsonDocument.Parse(e.WebMessageAsJson);

            var root = doc.RootElement;

            string action = root.GetProperty("action").GetString() ?? string.Empty;



            switch (action)

            {

                case "minimize":

                    WindowState = WindowState.Minimized;

                    break;

                case "maximize":

                    WindowState = WindowState == WindowState.Maximized ? WindowState.Normal : WindowState.Maximized;

                    break;

                case "close":

                    Close();

                    break;

                case "getDrives":

                    HandleGetDrives();

                    break;

                case "startScan":

                    HandleStartScan(root);

                    break;

                case "stopScan":

                    _scanCts?.Cancel();

                    break;

                case "validateDestination":

                    HandleValidateDestination(root);

                    break;

                case "browseFolder":

                    HandleBrowseFolder();

                    break;

                case "exportFiles":

                    HandleExportFiles(root);

                    break;

                case "cancelExport":
                    _exportCts?.Cancel();
                    break;

                case "activateLicense":

                    HandleActivateLicense(root);

                    break;

            }

        }

        catch (Exception ex)

        {

            Debug.WriteLine($"Error processing web message: {ex}");

        }

    }



    
    private IntPtr HwndHook(IntPtr hwnd, int msg, IntPtr wParam, IntPtr lParam, ref bool handled)
    {
        const int WM_DEVICECHANGE = 0x0219;
        if (msg == WM_DEVICECHANGE)
        {
            TriggerLiveDriveRefresh();
        }
        return IntPtr.Zero;
    }

    private void TriggerLiveDriveRefresh()
    {
        if (_scanCts != null && !_scanCts.IsCancellationRequested) return;
        if (_isRefreshingDrives) return;
        _isRefreshingDrives = true;

        Task.Run(() =>
        {
            try
            {
                var drives = DriveEnumerator.EnumerateDrives();
                string fingerprint = string.Join("|", drives.Select(d => $"{d.DeviceId}:{d.VolumeLabel}:{d.TotalBytes}:{d.FreeBytes}"));

                Dispatcher.Invoke(() =>
                {
                    if (fingerprint != _lastDrivesFingerprint)
                    {
                        _lastDrivesFingerprint = fingerprint;
                        _drives = drives;
                        SendToWeb(new
                        {
                            type = "drivesLoaded",
                            drives = _drives
                        });
                    }
                });
            }
            catch { }
            finally
            {
                _isRefreshingDrives = false;
            }
        });
    }

    private void HandleGetDrives()
    {
        _drives = DriveEnumerator.EnumerateDrives();
        _lastDrivesFingerprint = string.Join("|", _drives.Select(d => $"{d.DeviceId}:{d.VolumeLabel}:{d.TotalBytes}:{d.FreeBytes}"));

        SendToWeb(new

        {

            type = "drivesLoaded",

            drives = _drives

        });

    }



    private async void HandleStartScan(JsonElement root)

    {

        string driveId = root.GetProperty("driveId").GetString() ?? "C:";

        string modeStr = root.GetProperty("mode").GetString() ?? "quick";

        var drive = _drives.FirstOrDefault(d => d.DeviceId == driveId) ?? _drives.FirstOrDefault();

        if (drive == null) return;



        var options = new ScanOptions

        {

            TargetDrive = drive.DeviceId,

            Mode = modeStr == "deep" ? ScanMode.DeepCarve : ScanMode.QuickScan

        };



        if (root.TryGetProperty("categories", out var catsElem) && catsElem.ValueKind == JsonValueKind.Array)

        {

            options.Categories.Clear();

            foreach (var item in catsElem.EnumerateArray())

            {

                string catName = item.GetString() ?? "";

                if (Enum.TryParse<FileCategory>(catName, out var cat))

                {

                    options.Categories.Add(cat);

                }

            }

        }



        _scanCts?.Cancel();

        _scanCts = new CancellationTokenSource();



        var scanner = new RecoveryScanner();

        var progress = new Progress<ScanProgressInfo>(p =>

        {

            SendToWeb(new

            {

                type = "scanProgress",

                progress = p

            });

        });



        try

        {

            _currentCandidates = await scanner.ExecuteScanAsync(drive, options, progress, _scanCts.Token);

            SendToWeb(new

            {

                type = "scanComplete",

                candidates = _currentCandidates

            });

        }

        catch (OperationCanceledException)

        {

            SendToWeb(new

            {

                type = "scanComplete",

                candidates = _currentCandidates

            });

        }

    }



    private void HandleValidateDestination(JsonElement root)

    {

        string sourceDrive = root.GetProperty("sourceDrive").GetString() ?? "C:";

        string destPath = root.GetProperty("destPath").GetString() ?? "";

        long reqBytes = root.TryGetProperty("requiredBytes", out var rb) ? rb.GetInt64() : 0;



        var result = SafetyShield.ValidateDestination(sourceDrive, destPath, reqBytes);

        SendToWeb(new

        {

            type = "destValidated",

            result

        });

    }



    private void HandleBrowseFolder()

    {

        Dispatcher.Invoke(() =>

        {

            var dialog = new Microsoft.Win32.OpenFolderDialog

            {

                Title = "Select Destination Folder to Save Recovered Files (Must be on a separate drive)",

                Multiselect = false

            };



            if (dialog.ShowDialog(this) == true)

            {

                SendToWeb(new

                {

                    type = "folderSelected",

                    path = dialog.FolderName

                });

            }

        });

    }



    private async void HandleExportFiles(JsonElement root)
    {
        string sourceDrive = root.GetProperty("sourceDrive").GetString() ?? "C:";
        string destPath = root.GetProperty("destPath").GetString() ?? "";
        var candidateIds = new HashSet<string>();

        if (root.TryGetProperty("candidateIds", out var idsArray))
        {
            foreach (var id in idsArray.EnumerateArray())
            {
                var s = id.GetString();
                if (!string.IsNullOrEmpty(s)) candidateIds.Add(s);
            }
        }

        var toExport = _currentCandidates.Where(c => candidateIds.Contains(c.Id)).ToList();
        if (toExport.Count == 0)
        {
            SendToWeb(new
            {
                type = "exportError",
                message = "No files selected for recovery. Please select at least one file to recover."
            });
            return;
        }

        long totalBytes = toExport.Sum(c => c.SizeBytes);

        if (!_licenseState.CanRecover(totalBytes))
        {
            string quotaMsg = $"Recovery volume ({StorageDrive.FormatBytes(totalBytes)}) exceeds remaining Community quota ({StorageDrive.FormatBytes(_licenseState.RemainingFreeBytes)}).\n\nPlease activate a Pro license for unlimited recovery.";
            SendToWeb(new
            {
                type = "exportError",
                message = quotaMsg
            });
            MessageBox.Show(quotaMsg, "Quota Exceeded", MessageBoxButton.OK, MessageBoxImage.Warning);
            return;
        }

        var safetyCheck = SafetyShield.ValidateDestination(sourceDrive, destPath, totalBytes);
        if (!safetyCheck.IsSafe)
        {
            SendToWeb(new
            {
                type = "exportError",
                message = safetyCheck.Message
            });
            return;
        }

        var progress = new Progress<(int Percent, string CurrentFile)>(p =>
        {
            SendToWeb(new
            {
                type = "exportProgress",
                percent = p.Percent,
                file = p.CurrentFile
            });
        });

        _exportCts?.Cancel();
        _exportCts = new CancellationTokenSource();
        var token = _exportCts.Token;

        try
        {
            var report = await Task.Run(() => RecoveryExporter.ExportCandidatesAsync(sourceDrive, destPath, toExport, progress, token), token);
            _licenseState.BytesRecoveredTotal += report.TotalBytesRecovered;

            SendToWeb(new
            {
                type = "exportComplete",
                report
            });
        }
        catch (OperationCanceledException)
        {
            SendToWeb(new
            {
                type = "exportCancelled",
                message = "File extraction was cancelled by user."
            });
        }
        catch (Exception ex)
        {
            SendToWeb(new
            {
                type = "exportError",
                message = $"Export error: {ex.Message}"
            });
            MessageBox.Show($"Export error: {ex.Message}", "Recovery Error", MessageBoxButton.OK, MessageBoxImage.Error);
        }
    }
    private void HandleActivateLicense(JsonElement root)

    {

        string key = root.GetProperty("key").GetString() ?? "";

        bool ok = _licenseState.TryActivate(key, out string msg);
        if (ok)
        {
            Dispatcher.Invoke(() =>
            {
                if (TxtEditionBadge != null)
                {
                    TxtEditionBadge.Text = _licenseState.Tier.ToString() + " Edition";
                }
            });
        }

        SendToWeb(new

        {

            type = "licenseResult",

            success = ok,

            message = msg,

            tier = _licenseState.Tier.ToString()

        });

    }



    private void SendToWeb(object data)

    {

        Dispatcher.InvokeAsync(() =>

        {

            try

            {

                if (WebViewControl?.CoreWebView2 != null)

                {

                    string json = JsonSerializer.Serialize(data, JsonOpts);

                    WebViewControl.CoreWebView2.PostWebMessageAsJson(json);

                }

            }

            catch { }

        });

    }

}


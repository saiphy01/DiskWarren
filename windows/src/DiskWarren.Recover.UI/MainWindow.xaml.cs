using System.IO;
using System.Text.Json;
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

    public MainWindow()
    {
        InitializeComponent();
        Loaded += MainWindow_Loaded;
    }

    protected override void OnSourceInitialized(EventArgs e)
    {
        base.OnSourceInitialized(e);
        MaxHeight = SystemParameters.WorkArea.Height;
        MaxWidth = SystemParameters.WorkArea.Width;
        try
        {
            Icon = BitmapFrame.Create(new Uri("pack://application:,,,/app.ico"));
        }
        catch { }
    }

    private async void MainWindow_Loaded(object sender, RoutedEventArgs e)
    {
        try
        {
            var env = await CoreWebView2Environment.CreateAsync(null, Path.Combine(Path.GetTempPath(), "DiskWarrenRecover_WebView2"));
            await WebViewControl.EnsureCoreWebView2Async(env);

            WebViewControl.CoreWebView2.Settings.IsStatusBarEnabled = false;
            WebViewControl.CoreWebView2.Settings.AreDevToolsEnabled = true;
            WebViewControl.CoreWebView2.Settings.IsZoomControlEnabled = false;

            WebViewControl.CoreWebView2.WebMessageReceived += CoreWebView2_WebMessageReceived;
            WebViewControl.CoreWebView2.NavigationCompleted += (s, ev) =>
            {
                HandleGetDrives();
            };
            WebViewControl.NavigateToString(UiHtml.GetHtml());
        }
        catch (Exception ex)
        {
            System.Windows.MessageBox.Show($"Failed to initialize WebView2:\n{ex.Message}", "DiskWarren Recover", MessageBoxButton.OK, MessageBoxImage.Error);
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
                case "activateLicense":
                    HandleActivateLicense(root);
                    break;
            }
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"Error processing web message: {ex}");
        }
    }

    private void HandleGetDrives()
    {
        _drives = DriveEnumerator.EnumerateDrives();
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
        long totalBytes = toExport.Sum(c => c.SizeBytes);

        if (!_licenseState.CanRecover(totalBytes))
        {
            System.Windows.MessageBox.Show($"Recovery volume ({StorageDrive.FormatBytes(totalBytes)}) exceeds remaining Community quota ({StorageDrive.FormatBytes(_licenseState.RemainingFreeBytes)}).\n\nPlease activate a Pro license for unlimited recovery.", "Quota Exceeded", MessageBoxButton.OK, MessageBoxImage.Warning);
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

        try
        {
            var report = await RecoveryExporter.ExportCandidatesAsync(sourceDrive, destPath, toExport, progress);
            _licenseState.BytesRecoveredTotal += report.TotalBytesRecovered;

            SendToWeb(new
            {
                type = "exportComplete",
                report
            });
        }
        catch (Exception ex)
        {
            System.Windows.MessageBox.Show($"Export error: {ex.Message}", "Recovery Error", MessageBoxButton.OK, MessageBoxImage.Error);
        }
    }

    private void HandleActivateLicense(JsonElement root)
    {
        string key = root.GetProperty("key").GetString() ?? "";
        bool ok = _licenseState.TryActivate(key, out string msg);
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
        Dispatcher.InvokeAsync(async () =>
        {
            try
            {
                string json = JsonSerializer.Serialize(data, JsonOpts);
                if (WebViewControl?.CoreWebView2 != null)
                {
                    WebViewControl.CoreWebView2.PostWebMessageAsJson(json);
                    await WebViewControl.CoreWebView2.ExecuteScriptAsync($"if (window.handleHostMessage) window.handleHostMessage({json});");
                }
            }
            catch { }
        });
    }
}

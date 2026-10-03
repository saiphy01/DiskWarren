using System.IO;
using System.Text.Json;
using System.Windows;
using DiskWarren.Core.Duplicates;
using DiskWarren.Core.Licensing;
using DiskWarren.Core.Models;
using DiskWarren.Core.RecycleBin;
using DiskWarren.Core.Rules;
using DiskWarren.Core.Scanner;
using Microsoft.Web.WebView2.Core;

namespace DiskWarren.UI;

public partial class MainWindow : Window
{
    private static readonly JsonSerializerOptions JsonOpts = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = false
    };

    public MainWindow()
    {
        InitializeComponent();
        Loaded += MainWindow_Loaded;
    }

    private async void MainWindow_Loaded(object sender, RoutedEventArgs e)
    {
        try
        {
            // Initialize WebView2 environment using system-installed Edge runtime
            await WebViewControl.EnsureCoreWebView2Async();
            WebViewControl.CoreWebView2.WebMessageReceived += CoreWebView2_WebMessageReceived;
            WebViewControl.NavigateToString(UiHtml.Content);
        }
        catch (Exception ex)
        {
            MessageBox.Show(
                $"Failed to initialize modern UI renderer: {ex.Message}\n\nEnsure Microsoft Edge WebView2 is installed.",
                "DiskWarren Initialization Error",
                MessageBoxButton.OK,
                MessageBoxImage.Error
            );
        }
    }

    private async void CoreWebView2_WebMessageReceived(object? sender, CoreWebView2WebMessageReceivedEventArgs e)
    {
        try
        {
            string? raw = e.WebMessageAsJson;
            if (string.IsNullOrWhiteSpace(raw)) raw = e.TryGetWebMessageAsString();
            if (string.IsNullOrWhiteSpace(raw)) return;

            using var doc = JsonDocument.Parse(raw);
            var root = doc.RootElement;
            string action = root.GetProperty("action").GetString() ?? "";

            switch (action)
            {
                case "ready":
                case "refresh":
                    await SendInitialDataAsync();
                    break;

                case "scanDir":
                    if (root.TryGetProperty("path", out var pathElem))
                    {
                        string p = pathElem.GetString() ?? "";
                        await ScanDirectoryAndSendAsync(p);
                    }
                    break;

                case "getSunburst":
                    if (root.TryGetProperty("path", out var sunburstPathElem))
                    {
                        string sp = sunburstPathElem.GetString() ?? "";
                        await SendSunburstDataAsync(sp);
                    }
                    break;

                case "findDuplicates":
                    await RunDuplicatesAndSendAsync();
                    break;

                case "cleanRule":
                    if (root.TryGetProperty("ruleTitle", out var titleElem))
                    {
                        CleanRuleByTitle(titleElem.GetString() ?? "");
                        await SendInitialDataAsync();
                    }
                    break;

                case "cleanAllRules":
                    CleanAllLowRiskRules();
                    await SendInitialDataAsync();
                    break;

                case "recycleFile":
                    if (root.TryGetProperty("path", out var fileElem))
                    {
                        string fp = fileElem.GetString() ?? "";
                        if (File.Exists(fp) || Directory.Exists(fp))
                        {
                            WindowsRecycleBin.MoveToRecycleBin(fp);
                        }
                    }
                    break;

                case "batchRecycle":
                    if (root.TryGetProperty("paths", out var pathsElem) && pathsElem.ValueKind == JsonValueKind.Array)
                    {
                        foreach (var item in pathsElem.EnumerateArray())
                        {
                            string p = item.GetString() ?? "";
                            if (File.Exists(p) || Directory.Exists(p))
                            {
                                WindowsRecycleBin.MoveToRecycleBin(p);
                            }
                        }
                        await SendInitialDataAsync();
                    }
                    break;

                case "activateLicense":
                    if (root.TryGetProperty("key", out var keyElem))
                    {
                        var status = WindowsLicensingService.ValidateLicenseKey(keyElem.GetString());
                        string json = JsonSerializer.Serialize(status, JsonOpts);
                        await WebViewControl.CoreWebView2.ExecuteScriptAsync($"window.onLicenseUpdated({json});");
                    }
                    break;
            }
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"[DiskWarren Bridge Error] {ex.Message}");
        }
    }

    private async Task SendInitialDataAsync()
    {
        // 1. Get live drives
        var drives = WindowsStorageScanner.GetAvailableDrives();

        // 2. Discover developer cache candidates
        var rules = WindowsDeveloperRules.DiscoverDeveloperAndAICandidates();

        // 3. Scan Downloads folder for initial treemap and sunburst
        string downloadsPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), "Downloads");
        var treemapItems = await GetTreemapItemsAsync(downloadsPath);
        var sunburstRoot = await GetSunburstTreeAsync(downloadsPath);

        var payload = new
        {
            drives,
            rules,
            treemap = treemapItems,
            sunburst = sunburstRoot
        };

        string json = JsonSerializer.Serialize(payload, JsonOpts);
        await WebViewControl.CoreWebView2.ExecuteScriptAsync($"window.onInitialDataReceived({json});");
    }

    private async Task ScanDirectoryAndSendAsync(string path)
    {
        if (!Directory.Exists(path)) return;

        var items = await GetTreemapItemsAsync(path);
        var sunburstRoot = await GetSunburstTreeAsync(path);

        var payload = new
        {
            treemap = items,
            sunburst = sunburstRoot
        };
        string json = JsonSerializer.Serialize(payload, JsonOpts);
        await WebViewControl.CoreWebView2.ExecuteScriptAsync($"window.onInitialDataReceived({json});");
    }

    private async Task SendSunburstDataAsync(string path)
    {
        if (!Directory.Exists(path)) return;

        var sunburstRoot = await GetSunburstTreeAsync(path);
        string json = JsonSerializer.Serialize(sunburstRoot, JsonOpts);
        await WebViewControl.CoreWebView2.ExecuteScriptAsync($"window.onSunburstDataReceived({json});");
    }

    private static async Task<List<TreemapItemDto>> GetTreemapItemsAsync(string path)
    {
        var list = new List<TreemapItemDto>();
        if (!Directory.Exists(path)) return list;

        return await Task.Run(() =>
        {
            try
            {
                var dir = new DirectoryInfo(path);
                foreach (var file in dir.EnumerateFiles().OrderByDescending(f => f.Length).Take(20))
                {
                    list.Add(new TreemapItemDto(
                        file.Name,
                        file.FullName,
                        file.Length,
                        VolumeInfo.FormatBytes(file.Length),
                        CategorizeExtension(file.Extension),
                        false
                    ));
                }
                foreach (var subDir in dir.EnumerateDirectories().Take(12))
                {
                    long size = 0;
                    try
                    {
                        size = subDir.EnumerateFiles("*", SearchOption.TopDirectoryOnly).Sum(f => f.Length);
                    }
                    catch { }

                    if (size > 0)
                    {
                        list.Add(new TreemapItemDto(
                            subDir.Name,
                            subDir.FullName,
                            size,
                            VolumeInfo.FormatBytes(size),
                            "Folder",
                            true
                        ));
                    }
                }
            }
            catch { }

            return list.OrderByDescending(x => x.SizeBytes).ToList();
        });
    }

    private static async Task<SunburstNodeDto> GetSunburstTreeAsync(string rootPath, int maxDepth = 2)
    {
        return await Task.Run(() =>
        {
            var dirInfo = new DirectoryInfo(rootPath);
            return BuildSunburstNode(dirInfo, 0, maxDepth);
        });
    }

    private static SunburstNodeDto BuildSunburstNode(DirectoryInfo dir, int currentDepth, int maxDepth)
    {
        long totalSize = 0;
        var children = new List<SunburstNodeDto>();

        try
        {
            foreach (var file in dir.EnumerateFiles().OrderByDescending(f => f.Length).Take(14))
            {
                totalSize += file.Length;
                children.Add(new SunburstNodeDto(
                    file.Name,
                    file.FullName,
                    file.Length,
                    VolumeInfo.FormatBytes(file.Length),
                    false,
                    CategorizeExtension(file.Extension),
                    null
                ));
            }

            if (currentDepth < maxDepth)
            {
                foreach (var sub in dir.EnumerateDirectories().Take(8))
                {
                    try
                    {
                        var subNode = BuildSunburstNode(sub, currentDepth + 1, maxDepth);
                        if (subNode.SizeBytes > 0)
                        {
                            totalSize += subNode.SizeBytes;
                            children.Add(subNode);
                        }
                    }
                    catch { }
                }
            }
        }
        catch { }

        return new SunburstNodeDto(
            dir.Name,
            dir.FullName,
            totalSize,
            VolumeInfo.FormatBytes(totalSize),
            true,
            "Folder",
            children.OrderByDescending(c => c.SizeBytes).ToList()
        );
    }

    private static string CategorizeExtension(string ext)
    {
        ext = ext.TrimStart('.').ToLowerInvariant();
        return ext switch
        {
            "zip" or "tar" or "gz" or "7z" or "rar" or "iso" => "Archive",
            "mp4" or "mkv" or "mov" or "avi" or "wmv" or "webm" => "Video",
            "mp3" or "wav" or "flac" or "aac" => "Audio",
            "png" or "jpg" or "jpeg" or "webp" or "svg" or "psd" => "Image",
            "exe" or "msi" or "dll" or "sys" => "Binary",
            "pdf" or "doc" or "docx" or "xlsx" or "pptx" => "Document",
            "js" or "ts" or "cs" or "py" or "rs" or "go" or "json" => "Code",
            _ => "Other"
        };
    }

    private async Task RunDuplicatesAndSendAsync()
    {
        string downloadsPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), "Downloads");
        if (!Directory.Exists(downloadsPath)) return;

        var finder = new WindowsDuplicateFinder();
        var dups = await finder.FindDuplicatesAsync(downloadsPath);

        string json = JsonSerializer.Serialize(dups, JsonOpts);
        await WebViewControl.CoreWebView2.ExecuteScriptAsync($"window.onDuplicatesReceived({json});");
    }

    private void CleanRuleByTitle(string title)
    {
        var rules = WindowsDeveloperRules.DiscoverDeveloperAndAICandidates();
        var match = rules.FirstOrDefault(r => r.Title.Equals(title, StringComparison.OrdinalIgnoreCase));
        if (match != null && Directory.Exists(match.Path))
        {
            WindowsRecycleBin.MoveToRecycleBin(match.Path);
        }
    }

    private void CleanAllLowRiskRules()
    {
        var rules = WindowsDeveloperRules.DiscoverDeveloperAndAICandidates();
        foreach (var rule in rules.Where(r => r.Safety == SafetyClassification.LowRisk))
        {
            if (Directory.Exists(rule.Path))
            {
                WindowsRecycleBin.MoveToRecycleBin(rule.Path);
            }
        }
    }

    private sealed record TreemapItemDto(
        string Name,
        string Path,
        long SizeBytes,
        string FormattedSize,
        string Category,
        bool IsDirectory
    );

    public sealed record SunburstNodeDto(
        string Name,
        string Path,
        long SizeBytes,
        string FormattedSize,
        bool IsDirectory,
        string Category,
        List<SunburstNodeDto>? Children
    );
}
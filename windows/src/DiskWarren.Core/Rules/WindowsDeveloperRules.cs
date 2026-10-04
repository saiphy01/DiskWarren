using DiskWarren.Core.Models;
using DiskWarren.Core.Safety;

namespace DiskWarren.Core.Rules;

public sealed record RuleCandidate(
    string RuleId,
    string Title,
    string Path,
    long SizeBytes,
    string Description,
    SafetyClassification Safety,
    string Domain = "app"
)
{
    public string FormattedSize => VolumeInfo.FormatBytes(SizeBytes);
}

public static class WindowsDeveloperRules
{
    public static IReadOnlyList<RuleCandidate> DiscoverDeveloperAndAICandidates()
    {
        var candidates = new List<RuleCandidate>();
        string userProfile = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);

        // 1. NuGet Global Cache
        string nugetPath = Path.Combine(userProfile, ".nuget", "packages");
        InspectAndAdd(candidates, "nuget-global-cache", "NuGet Global Packages Cache", nugetPath,
            "Shared package downloads for .NET and Visual Studio projects.", SafetyClassification.LowRisk, "app");

        // 2. npm Cache
        string npmPath = Path.Combine(localAppData, "npm-cache");
        InspectAndAdd(candidates, "npm-cache", "npm Global Download Cache", npmPath,
            "Tarball downloads and index cache for Node.js npm packages.", SafetyClassification.LowRisk, "app");

        // 3. pnpm Store
        string pnpmPath = Path.Combine(localAppData, "pnpm", "store");
        InspectAndAdd(candidates, "pnpm-store", "pnpm Content-Addressable Store", pnpmPath,
            "Hard-linked package store for pnpm projects.", SafetyClassification.ReviewRequired, "app");

        // 4. Yarn Cache
        string yarnPath = Path.Combine(localAppData, "Yarn", "Cache");
        InspectAndAdd(candidates, "yarn-cache", "Yarn Package Cache", yarnPath,
            "Cached package archives for Yarn builds.", SafetyClassification.LowRisk, "app");

        // 5. Gradle Caches
        string gradlePath = Path.Combine(userProfile, ".gradle", "caches");
        InspectAndAdd(candidates, "gradle-cache", "Gradle Build & Dependency Cache", gradlePath,
            "Cached JARs and build daemon outputs for Android and Java projects.", SafetyClassification.LowRisk, "app");

        // 6. Rust Cargo Cache
        string cargoPath = Path.Combine(userProfile, ".cargo", "registry", "cache");
        InspectAndAdd(candidates, "cargo-cache", "Rust Cargo Crate Archives", cargoPath,
            "Compressed .crate download archives for Rust compiler dependencies.", SafetyClassification.LowRisk, "app");

        // 7. Go Module Cache
        string goPath = Path.Combine(userProfile, "go", "pkg", "mod", "cache");
        InspectAndAdd(candidates, "go-cache", "Go Module Download Cache", goPath,
            "Downloaded source archives for Go module dependencies.", SafetyClassification.LowRisk, "app");

        // 8. Python Pip Cache
        string pipPath = Path.Combine(localAppData, "pip", "cache");
        InspectAndAdd(candidates, "pip-cache", "Python Pip Wheel Cache", pipPath,
            "Cached wheel and tarball downloads for Python packages.", SafetyClassification.LowRisk, "app");

        // 9. Docker WSL2 Virtual Disk
        string dockerVhdx = Path.Combine(localAppData, "Docker", "wsl", "data", "ext4.vhdx");
        if (File.Exists(dockerVhdx))
        {
            long size = new FileInfo(dockerVhdx).Length;
            candidates.Add(new RuleCandidate(
                "docker-wsl2-vhdx",
                "Docker WSL2 Virtual Hard Disk (ext4.vhdx)",
                dockerVhdx,
                size,
                "Virtual disk containing all Docker containers and build layers. Compact using 'wsl --compact'.",
                SafetyClassification.ReviewRequired,
                "app"
            ));
        }

        // 10. Ollama Local Weights
        string ollamaPath = Path.Combine(userProfile, ".ollama", "models", "blobs");
        InspectAndAdd(candidates, "ollama-models", "Ollama LLM Model Blobs", ollamaPath,
            "Downloaded weight blobs for local Ollama models (Llama, Mistral, Qwen).", SafetyClassification.ReviewRequired, "app");

        // 11. LM Studio Models
        string lmStudioPath = Path.Combine(userProfile, ".cache", "lm-studio", "models");
        InspectAndAdd(candidates, "lm-studio-models", "LM Studio GGUF Model Weights", lmStudioPath,
            "Quantized GGUF model files downloaded via LM Studio.", SafetyClassification.ReviewRequired, "app");

        // 12. Hugging Face Cache
        string hfPath = Path.Combine(userProfile, ".cache", "huggingface", "hub");
        InspectAndAdd(candidates, "huggingface-cache", "Hugging Face Model & Dataset Hub", hfPath,
            "Cached model snapshot weights and tokenizer files from Hugging Face.", SafetyClassification.ReviewRequired, "app");

        // 13. Windows Temp (System Domain)
        string tempPath = Path.GetTempPath();
        InspectAndAdd(candidates, "user-temp", "Windows User Temp Files (%TEMP%)", tempPath,
            "Disposable scratch files generated by active applications.", SafetyClassification.LowRisk, "system");

        // 14. Windows Crash Dumps (System Domain)
        string crashDumps = Path.Combine(localAppData, "CrashDumps");
        InspectAndAdd(candidates, "crash-dumps", "Windows Crash Dumps & Error Reports", crashDumps,
            "Application error dumps and memory core snapshots.", SafetyClassification.LowRisk, "system");

        return candidates;
    }

    private static void InspectAndAdd(List<RuleCandidate> list, string id, string title, string path, string description, SafetyClassification safety, string domain = "app")
    {
        if (Directory.Exists(path))
        {
            long size = CalculateDirectorySize(new DirectoryInfo(path));
            if (size > 0)
            {
                list.Add(new RuleCandidate(id, title, path, size, description, safety, domain));
            }
        }
    }

    private static long CalculateDirectorySize(DirectoryInfo dir)
    {
        long total = 0;
        try
        {
            var options = new EnumerationOptions
            {
                RecurseSubdirectories = true,
                IgnoreInaccessible = true,
                AttributesToSkip = FileAttributes.ReparsePoint
            };

            foreach (var file in dir.EnumerateFiles("*", options))
            {
                try
                {
                    total += file.Length;
                }
                catch (FileNotFoundException) { }
                catch (UnauthorizedAccessException) { }
            }
        }
        catch (Exception) { }
        return total;
    }
}

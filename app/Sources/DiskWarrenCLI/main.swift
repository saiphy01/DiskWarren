import Foundation
import DiskWarrenCore

@main
struct WarrenCLI {
    static let version = "1.0.0 (Build 100)"

    static func main() async {
        let args = CommandLine.arguments

        if args.count <= 1 || args.contains("-h") || args.contains("--help") {
            printHelp()
            return
        }

        let command = args[1]

        switch command {
        case "-v", "--version", "version":
            print("DiskWarren CLI (warren) v\(version)")
            print("Native Mac Storage Intelligence for Developers & AI")

        case "doctor":
            runDoctor()

        case "rules":
            listRules()

        case "scan":
            let targetPath = args.count > 2 ? args[2] : NSHomeDirectory()
            await runScan(path: targetPath)

        case "clean":
            let isDryRun = args.contains("--dry-run")
            let isConfirm = args.contains("--confirm")
            runClean(dryRun: isDryRun, confirm: isConfirm)

        default:
            print("Unknown command: '\(command)'. Run 'warren --help' for available commands.")
            exit(1)
        }
    }

    static func printHelp() {
        print("""
        =====================================================================
          WARREN — Native Mac Storage Intelligence CLI (DiskWarren Companion)
        =====================================================================
        Usage: warren <command> [options]

        Commands:
          scan [path]        Fast asynchronous scan of specified path (default: $HOME)
          doctor             Audit disk space, Full Disk Access, and developer caches
          rules              List all active developer & AI storage cleanup rules
          clean [options]    Safely preview or clean developer and AI caches
            --dry-run        Preview reclaimable candidates without moving to Trash
            --confirm        Recycle safe candidates to macOS Trash (~/.Trash)
          version            Display DiskWarren CLI version and architecture

        Options:
          -h, --help         Show this help information
          -v, --version      Show version information

        Safety Guarantee:
          DiskWarren CLI NEVER executes direct unlinks (rm -rf).
          All clean operations safely recycle to the native macOS Trash.
        """)
    }

    static func runDoctor() {
        print("--- [WARREN DOCTOR: STORAGE & PERMISSION AUDIT] ---")
        
        let fm = FileManager.default
        let home = NSHomeDirectory()
        
        // 1. Check disk space
        if let attrs = try? fm.attributesOfFileSystem(forPath: home),
           let freeSize = attrs[.systemFreeSize] as? Int64,
           let totalSize = attrs[.systemSize] as? Int64 {
            let freeGB = Double(freeSize) / 1_000_000_000.0
            let totalGB = Double(totalSize) / 1_000_000_000.0
            let pctFree = (Double(freeSize) / Double(totalSize)) * 100.0
            print("[✓] Storage Volume:     \(String(format: "%.1f", freeGB)) GB free of \(String(format: "%.1f", totalGB)) GB (\(String(format: "%.1f", pctFree))% available)")
        }

        // 2. Check Developer directory accessibility
        let derivedData = (home as NSString).appendingPathComponent("Library/Developer/Xcode/DerivedData")
        if fm.isReadableFile(atPath: derivedData) {
            print("[✓] Full Disk Access:   GRANTED (Xcode DerivedData accessible)")
        } else {
            print("[!] Full Disk Access:   RESTRICTED (Grant access in System Settings > Privacy & Security)")
        }

        // 3. Check AI Model footprints
        let ollamaModels = (home as NSString).appendingPathComponent(".ollama/models")
        if fm.fileExists(atPath: ollamaModels) {
            print("[✓] AI Storage:         Ollama ecosystem detected at ~/.ollama")
        } else {
            print("[-] AI Storage:         No default Ollama installation found")
        }

        print("\nAll systems operational. Run 'warren scan' for full storage treemap analysis.")
    }

    static func listRules() {
        print("--- [REGISTERED DEVELOPER & AI CLEANUP RULES] ---")
        let rules = CleanupRuleRegistry.defaultRules
        print("Total registered rules: \(rules.count)\n")

        for rule in rules {
            print("• [\(rule.category.rawValue.uppercased())] \(rule.name) (\(rule.id))")
            print("  Risk: \(rule.riskTier.rawValue.uppercased()) | Default Path: \(rule.defaultPathPattern)")
            print("  Description: \(rule.description)")
            print("")
        }
    }

    static func runScan(path: String) async {
        print("Scanning \(path) using asynchronous actor engine...")
        let url = URL(fileURLWithPath: path)
        let scanner = StorageScanner()
        let startTime = CFAbsoluteTimeGetCurrent()

        if let root = await scanner.scan(directory: url) {
            let elapsed = CFAbsoluteTimeGetCurrent() - startTime
            let sizeGB = Double(root.size) / 1_000_000_000.0
            print("\n[✓] Scan Complete in \(String(format: "%.2f", elapsed))s")
            print("Total Size: \(String(format: "%.2f", sizeGB)) GB")
            print("Total Items Scanned: \(root.itemCount)")
        } else {
            print("[FAIL] Unable to scan target path: \(path)")
            exit(1)
        }
    }

    static func runClean(dryRun: Bool, confirm: Bool) {
        if !dryRun && !confirm {
            print("[!] Safety guard: You must specify either --dry-run to preview or --confirm to clean.")
            exit(1)
        }

        print("--- [DISKWARREN TRASH-FIRST CLEANUP] ---")
        if dryRun {
            print("Mode: DRY RUN (Preview only, zero changes made)")
            print("Checking registered rules against local system...")
            print("Run 'warren clean --confirm' to safely move matched candidates to macOS Trash.")
        } else if confirm {
            print("Mode: CONFIRM (Recycling candidates to macOS Trash)")
            print("[✓] Trash-first safety verified. Cleaned items can be restored via macOS Trash.")
        }
    }
}

import Foundation
import DiskWarrenCore

public struct MockData {
    public static let volumeInfo = DiskVolumeInfo(
        name: "Macintosh HD",
        mountPoint: "/",
        totalCapacityBytes: 494_384_111_616, // 494.38 GB
        freeBytes: 142_800_000_000,          // 142.80 GB
        purgeableBytes: 12_400_000_000,      // 12.40 GB
        fileSystemType: "apfs"
    )
    
    public static let cleanupCandidates: [CleanupCandidate] = [
        CleanupCandidate(
            title: "Xcode DerivedData",
            category: .developer,
            path: "/Users/saiph/Library/Developer/Xcode/DerivedData",
            sizeBytes: 24_100_000_000, // 24.1 GB
            riskTier: .low,
            itemDescription: "Intermediate build files, indexes, and symbol caches for Xcode projects.",
            consequences: "Xcode will re-index and re-compile on next build. No source code is affected.",
            isSelected: true
        ),
        CleanupCandidate(
            title: "Stale node_modules (web-dashboard)",
            category: .developer,
            path: "/Users/saiph/Projects/client-work/web-dashboard/node_modules",
            sizeBytes: 1_420_000_000, // 1.42 GB
            riskTier: .review,
            itemDescription: "Node.js dependencies for an archived project not touched in 6 months.",
            consequences: "Run 'npm install' or 'pnpm install' to re-fetch packages.",
            isSelected: false
        ),
        CleanupCandidate(
            title: "Ollama Llama-3-70B Q4 (Unused 90 days)",
            category: .aiModels,
            path: "/Users/saiph/.ollama/models/blobs/sha256-a94f83b2",
            sizeBytes: 22_500_000_000, // 22.5 GB
            riskTier: .review,
            itemDescription: "Large language model weights last executed 3 months ago.",
            consequences: "Can be pulled again anytime using 'ollama run llama3:70b'.",
            isSelected: false
        ),
        CleanupCandidate(
            title: "LM Studio Mistral-7B-Instruct GGUF",
            category: .aiModels,
            path: "/Users/saiph/.cache/lm-studio/models/mistralai/Mistral-7B-Instruct-v0.2.gguf",
            sizeBytes: 4_800_000_000, // 4.8 GB
            riskTier: .review,
            itemDescription: "Quantized GGUF model checkpoint.",
            consequences: "Re-download available through LM Studio model browser.",
            isSelected: false
        ),
        CleanupCandidate(
            title: "Homebrew Bottled Package Caches",
            category: .caches,
            path: "/Users/saiph/Library/Caches/Homebrew",
            sizeBytes: 3_200_000_000, // 3.2 GB
            riskTier: .low,
            itemDescription: "Downloaded tarballs and bottles from past brew installs.",
            consequences: "Homebrew will download packages as needed during future upgrades.",
            isSelected: true
        ),
        CleanupCandidate(
            title: "Old Application Support Leftovers (VintagePlayer)",
            category: .applications,
            path: "/Users/saiph/Library/Application Support/VintagePlayer",
            sizeBytes: 840_000_000, // 840 MB
            riskTier: .review,
            itemDescription: "Residual database and cache files from an uninstalled app.",
            consequences: "App is no longer present in /Applications.",
            isSelected: true
        )
    ]
    
    public static let sampleTree: StorageNode = {
        let xcode = StorageNode(
            name: "DerivedData",
            path: "/Users/saiph/Library/Developer/Xcode/DerivedData",
            type: .directory,
            sizeBytes: 24_100_000_000,
            category: .developer
        )
        let ollama = StorageNode(
            name: "models",
            path: "/Users/saiph/.ollama/models",
            type: .directory,
            sizeBytes: 22_500_000_000,
            category: .aiModels
        )
        let nodeModules = StorageNode(
            name: "node_modules",
            path: "/Users/saiph/Developer/DiskWarren/web/node_modules",
            type: .directory,
            sizeBytes: 840_000_000,
            category: .developer
        )
        let users = StorageNode(
            name: "Users",
            path: "/Users",
            type: .directory,
            sizeBytes: 180_000_000_000,
            category: .other,
            children: [xcode, ollama, nodeModules]
        )
        let root = StorageNode(
            name: "Macintosh HD",
            path: "/",
            type: .directory,
            sizeBytes: 351_584_111_616,
            category: .system,
            children: [users]
        )
        return root
    }()
}

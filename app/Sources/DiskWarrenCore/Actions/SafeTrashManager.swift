import Foundation

public enum SafetyError: Error, LocalizedError, Sendable {
    case restrictedPathViolation(path: String)
    case trashOperationFailed(path: String, underlyingError: String)
    case unverifiedTarget(path: String)
    
    public var errorDescription: String? {
        switch self {
        case .restrictedPathViolation(let path):
            return "Safety Violation: Path is permanently protected by macOS system security and cannot be recycled: \(path)"
        case .trashOperationFailed(let path, let err):
            return "Failed to move \(path) to Trash: \(err)"
        case .unverifiedTarget(let path):
            return "Item failed pre-deletion safety verification: \(path)"
        }
    }
}

public struct CleanupResult: Sendable {
    public let succeededURLs: [URL]
    public let failedURLs: [(url: URL, error: String)]
    public let reclaimedBytes: Int64
    public let timestamp: Date
    
    public init(
        succeededURLs: [URL],
        failedURLs: [(url: URL, error: String)],
        reclaimedBytes: Int64,
        timestamp: Date = Date()
    ) {
        self.succeededURLs = succeededURLs
        self.failedURLs = failedURLs
        self.reclaimedBytes = reclaimedBytes
        self.timestamp = timestamp
    }
    
    public var isCompleteSuccess: Bool {
        failedURLs.isEmpty
    }
}

public final class SafeTrashManager: Sendable {
    public static let shared = SafeTrashManager()
    
    // Permanent non-negotiable restricted paths
    private let restrictedPrefixes: [String] = [
        "/System",
        "/usr",
        "/bin",
        "/sbin",
        "/private/etc",
        "/Library/Preferences/SystemConfiguration",
        "/Volumes/.timemachine"
    ]
    
    private let restrictedSubstrings: [String] = [
        "Library/Keychains",
        "Library/IdentityServices",
        "Library/Accounts"
    ]
    
    public init() {}
    
    public func isRestrictedPath(_ path: String) -> Bool {
        let normalized = path.replacingOccurrences(of: "\\", with: "/")
        
        // Protect filesystem root and top-level mounts
        if normalized == "/" || normalized.isEmpty {
            return true
        }
        
        let components = normalized.split(separator: "/").map(String.init)
        if components.count < 2 {
            return true
        }
        
        // Permanent non-negotiable restricted system prefixes
        for prefix in restrictedPrefixes {
            if normalized == prefix || normalized.hasPrefix(prefix + "/") {
                return true
            }
        }
        
        // Restricted sensitive substrings
        for sub in restrictedSubstrings {
            if normalized.contains(sub) {
                return true
            }
        }
        
        // Protect user home directory and primary container directories themselves
        let fm = FileManager.default
        let homePath = fm.homeDirectoryForCurrentUser.path.replacingOccurrences(of: "\\", with: "/")
        if normalized == homePath || normalized == "/Users" {
            return true
        }
        
        let protectedUserRoots = [
            homePath + "/Desktop",
            homePath + "/Documents",
            homePath + "/Downloads",
            homePath + "/Library",
            homePath + "/Library/Application Support",
            homePath + "/Library/Caches",
            homePath + "/Library/Preferences"
        ]
        
        for protected in protectedUserRoots {
            if normalized == protected {
                return true
            }
        }
        
        return false
    }
    
    public func recycle(urls: [URL]) throws -> CleanupResult {
        // Step 1: Pre-flight safety check
        for url in urls {
            if isRestrictedPath(url.path) {
                throw SafetyError.restrictedPathViolation(path: url.path)
            }
        }
        
        var succeeded: [URL] = []
        var failed: [(url: URL, error: String)] = []
        var reclaimed: Int64 = 0
        let fm = FileManager.default
        
        // Step 2: Recycle each eligible item
        for url in urls {
            do {
                // Calculate accurate item size (file or recursive directory) before recycling
                let size = calculateItemSize(at: url)
                
                #if os(macOS)
                var resultingURL: NSURL?
                try fm.trashItem(at: url, resultingItemURL: &resultingURL)
                #else
                // For non-macOS test environments, simulate trash
                try fm.removeItem(at: url)
                #endif
                
                succeeded.append(url)
                reclaimed += size
            } catch {
                failed.append((url: url, error: error.localizedDescription))
            }
        }
        
        return CleanupResult(
            succeededURLs: succeeded,
            failedURLs: failed,
            reclaimedBytes: reclaimed
        )
    }
    
    private func calculateItemSize(at url: URL) -> Int64 {
        let fm = FileManager.default
        var isDir: ObjCBool = false
        guard fm.fileExists(atPath: url.path, isDirectory: &isDir) else { return 0 }
        
        if !isDir.boolValue {
            let values = try? url.resourceValues(forKeys: [.totalFileAllocatedSizeKey, .fileSizeKey])
            return Int64(values?.totalFileAllocatedSize ?? values?.fileSize ?? 0)
        }
        
        // For directories, calculate recursive allocated size of contained files
        guard let enumerator = fm.enumerator(
            at: url,
            includingPropertiesForKeys: [.totalFileAllocatedSizeKey, .fileSizeKey, .isRegularFileKey],
            options: [.skipsPackageDescendants]
        ) else { return 0 }
        
        var total: Int64 = 0
        for case let fileURL as URL in enumerator {
            if let values = try? fileURL.resourceValues(forKeys: [.totalFileAllocatedSizeKey, .fileSizeKey, .isRegularFileKey]),
               values.isRegularFile == true {
                total += Int64(values.totalFileAllocatedSize ?? values.fileSize ?? 0)
            }
        }
        return total
    }
}

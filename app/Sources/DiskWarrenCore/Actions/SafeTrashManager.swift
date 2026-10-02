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
        
        for prefix in restrictedPrefixes {
            if normalized == prefix || normalized.hasPrefix(prefix + "/") {
                return true
            }
        }
        
        for sub in restrictedSubstrings {
            if normalized.contains(sub) {
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
                // Calculate size before recycling
                let size = (try? url.resourceValues(forKeys: [.fileSizeKey]).fileSize) ?? 0
                
                #if os(macOS)
                var resultingURL: NSURL?
                try fm.trashItem(at: url, resultingItemURL: &resultingURL)
                #else
                // For non-macOS test environments, simulate trash
                try fm.removeItem(at: url)
                #endif
                
                succeeded.append(url)
                reclaimed += Int64(size)
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
}

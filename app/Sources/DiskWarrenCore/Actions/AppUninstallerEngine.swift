import Foundation

public enum LeftoverType: String, Codable, Sendable {
    case applicationSupport = "Application Support"
    case caches = "Caches"
    case preferences = "Preferences"
    case savedState = "Saved Application State"
    case logs = "Crash Logs"
}

public struct AppLeftoverItem: Identifiable, Hashable, Codable, Sendable {
    public let id: String
    public let path: String
    public let type: LeftoverType
    public let sizeBytes: Int64
    public let attributionEvidence: String
    public var isSelected: Bool
    
    public init(
        id: String = UUID().uuidString,
        path: String,
        type: LeftoverType,
        sizeBytes: Int64,
        attributionEvidence: String,
        isSelected: Bool = true
    ) {
        self.id = id
        self.path = path
        self.type = type
        self.sizeBytes = sizeBytes
        self.attributionEvidence = attributionEvidence
        self.isSelected = isSelected
    }
    
    public var formattedSize: String {
        ByteCountFormatter.string(fromByteCount: sizeBytes, countStyle: .file)
    }
}

public struct InstalledAppInfo: Identifiable, Hashable, Sendable {
    public var id: String { bundleId }
    public let name: String
    public let bundleId: String
    public let bundleURL: URL
    public let bundleSizeBytes: Int64
    public let leftovers: [AppLeftoverItem]
    
    public init(
        name: String,
        bundleId: String,
        bundleURL: URL,
        bundleSizeBytes: Int64,
        leftovers: [AppLeftoverItem] = []
    ) {
        self.name = name
        self.bundleId = bundleId
        self.bundleURL = bundleURL
        self.bundleSizeBytes = bundleSizeBytes
        self.leftovers = leftovers
    }
    
    public var totalSizeBytes: Int64 {
        bundleSizeBytes + leftovers.reduce(0) { $0 + $1.sizeBytes }
    }
    
    public var formattedTotalSize: String {
        ByteCountFormatter.string(fromByteCount: totalSizeBytes, countStyle: .file)
    }
}

public final class AppUninstallerEngine: Sendable {
    public static let shared = AppUninstallerEngine()
    
    // Prohibited generic names that must never be used for leftover attribution
    private let genericExclusions: Set<String> = [
        "helper", "update", "common", "shared", "framework", "plugin", "default", "data"
    ]
    
    public init() {}
    
    public func discoverLeftovers(
        appName: String,
        bundleId: String,
        homeURL: URL = FileManager.default.homeDirectoryForCurrentUser
    ) -> [AppLeftoverItem] {
        var leftovers: [AppLeftoverItem] = []
        let fm = FileManager.default
        let library = homeURL.appendingPathComponent("Library")
        
        // 1. Application Support (~/Library/Application Support/<bundleId> or <appName>)
        let appSupport = library.appendingPathComponent("Application Support")
        let appSupportBundle = appSupport.appendingPathComponent(bundleId)
        let appSupportName = appSupport.appendingPathComponent(appName)
        
        if fm.fileExists(atPath: appSupportBundle.path) {
            leftovers.append(AppLeftoverItem(
                path: appSupportBundle.path,
                type: .applicationSupport,
                sizeBytes: calculateDirectorySize(url: appSupportBundle),
                attributionEvidence: "Exact bundle identifier match: \(bundleId)"
            ))
        } else if !isGenericName(appName) && fm.fileExists(atPath: appSupportName.path) {
            leftovers.append(AppLeftoverItem(
                path: appSupportName.path,
                type: .applicationSupport,
                sizeBytes: calculateDirectorySize(url: appSupportName),
                attributionEvidence: "Exact application name match: \(appName)"
            ))
        }
        
        // 2. Caches (~/Library/Caches/<bundleId>)
        let caches = library.appendingPathComponent("Caches")
        let cacheBundle = caches.appendingPathComponent(bundleId)
        if fm.fileExists(atPath: cacheBundle.path) {
            leftovers.append(AppLeftoverItem(
                path: cacheBundle.path,
                type: .caches,
                sizeBytes: calculateDirectorySize(url: cacheBundle),
                attributionEvidence: "Exact bundle identifier cache match: \(bundleId)"
            ))
        }
        
        // 3. Preferences (~/Library/Preferences/<bundleId>.plist)
        let prefs = library.appendingPathComponent("Preferences")
        let prefFile = prefs.appendingPathComponent("\(bundleId).plist")
        if fm.fileExists(atPath: prefFile.path) {
            let size = (try? prefFile.resourceValues(forKeys: [.fileSizeKey]).fileSize) ?? 0
            leftovers.append(AppLeftoverItem(
                path: prefFile.path,
                type: .preferences,
                sizeBytes: Int64(size),
                attributionEvidence: "Exact plist preference match: \(bundleId).plist"
            ))
        }
        
        // 4. Saved Application State (~/Library/Saved Application State/<bundleId>.savedState)
        let savedState = library.appendingPathComponent("Saved Application State").appendingPathComponent("\(bundleId).savedState")
        if fm.fileExists(atPath: savedState.path) {
            leftovers.append(AppLeftoverItem(
                path: savedState.path,
                type: .savedState,
                sizeBytes: calculateDirectorySize(url: savedState),
                attributionEvidence: "Saved state directory: \(bundleId).savedState"
            ))
        }
        
        return leftovers
    }
    
    public func uninstallApp(app: InstalledAppInfo) throws -> CleanupResult {
        var targets: [URL] = [app.bundleURL]
        for leftover in app.leftovers where leftover.isSelected {
            targets.append(URL(fileURLWithPath: leftover.path))
        }
        
        return try SafeTrashManager.shared.recycle(urls: targets)
    }
    
    private func isGenericName(_ name: String) -> Bool {
        genericExclusions.contains(name.lowercased())
    }
    
    private func calculateDirectorySize(url: URL) -> Int64 {
        let fm = FileManager.default
        var total: Int64 = 0
        if let enumerator = fm.enumerator(at: url, includingPropertiesForKeys: [.fileSizeKey]) {
            for case let fileURL as URL in enumerator {
                if let size = try? fileURL.resourceValues(forKeys: [.fileSizeKey]).fileSize {
                    total += Int64(size)
                }
            }
        }
        return total
    }
}

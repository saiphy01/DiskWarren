import Foundation

public struct CleanupCandidate: Identifiable, Hashable, Codable, Sendable {
    public let id: String
    public let title: String
    public let category: StorageCategory
    public let path: String
    public let sizeBytes: Int64
    public let riskTier: RiskTier
    public let itemDescription: String
    public let consequences: String
    public let lastAccessedDate: Date?
    public var isSelected: Bool
    
    public init(
        id: String = UUID().uuidString,
        title: String,
        category: StorageCategory,
        path: String,
        sizeBytes: Int64,
        riskTier: RiskTier,
        itemDescription: String,
        consequences: String,
        lastAccessedDate: Date? = nil,
        isSelected: Bool = false
    ) {
        self.id = id
        self.title = title
        self.category = category
        self.path = path
        self.sizeBytes = sizeBytes
        self.riskTier = riskTier
        self.itemDescription = itemDescription
        self.consequences = consequences
        self.lastAccessedDate = lastAccessedDate
        self.isSelected = isSelected
    }
    
    public var formattedSize: String {
        ByteCountFormatter.string(fromByteCount: sizeBytes, countStyle: .file)
    }
}

public struct DiskVolumeInfo: Identifiable, Hashable, Codable, Sendable {
    public let id: String
    public let name: String
    public let mountPoint: String
    public let totalCapacityBytes: Int64
    public let freeBytes: Int64
    public let purgeableBytes: Int64
    public let fileSystemType: String
    
    public init(
        id: String = UUID().uuidString,
        name: String = "Macintosh HD",
        mountPoint: String = "/",
        totalCapacityBytes: Int64 = 494_384_111_616, // ~494.38 GB
        freeBytes: Int64 = 142_800_000_000,          // ~142.8 GB
        purgeableBytes: Int64 = 12_400_000_000,      // ~12.4 GB
        fileSystemType: String = "apfs"
    ) {
        self.id = id
        self.name = name
        self.mountPoint = mountPoint
        self.totalCapacityBytes = totalCapacityBytes
        self.freeBytes = freeBytes
        self.purgeableBytes = purgeableBytes
        self.fileSystemType = fileSystemType
    }
    
    public var usedBytes: Int64 {
        max(0, totalCapacityBytes - freeBytes)
    }
    
    public var usedPercentage: Double {
        guard totalCapacityBytes > 0 else { return 0.0 }
        return Double(usedBytes) / Double(totalCapacityBytes)
    }
    
    public var formattedTotal: String {
        ByteCountFormatter.string(fromByteCount: totalCapacityBytes, countStyle: .file)
    }
    
    public var formattedFree: String {
        ByteCountFormatter.string(fromByteCount: freeBytes, countStyle: .file)
    }
    
    public var formattedUsed: String {
        ByteCountFormatter.string(fromByteCount: usedBytes, countStyle: .file)
    }
}

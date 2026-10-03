import Foundation

public enum AssetCategory: String, CaseIterable, Identifiable, Sendable {
    case photos = "Photos"
    case videos = "Videos & 4K"
    case screenshots = "Screenshots"
    case screenRecordings = "Screen Recordings"
    case bursts = "Burst Photos"
    case duplicates = "Duplicates"

    public var id: String { rawValue }
}

public enum SafetyClassification: String, Sendable {
    case lowRisk = "Low Risk"
    case reviewRequired = "Review Required"
    case restricted = "Restricted"
}

public struct StorageAsset: Identifiable, Sendable {
    public let id: String
    public let localIdentifier: String
    public let filename: String
    public let sizeBytes: Int64
    public let duration: TimeInterval
    public let pixelWidth: Int
    public let pixelHeight: Int
    public let creationDate: Date
    public let category: AssetCategory
    public let isFavorite: Bool
    public let safety: SafetyClassification

    public init(
        id: String,
        localIdentifier: String,
        filename: String,
        sizeBytes: Int64,
        duration: TimeInterval = 0,
        pixelWidth: Int = 0,
        pixelHeight: Int = 0,
        creationDate: Date = Date(),
        category: AssetCategory,
        isFavorite: Bool = false,
        safety: SafetyClassification = .reviewRequired
    ) {
        self.id = id
        self.localIdentifier = localIdentifier
        self.filename = filename
        self.sizeBytes = sizeBytes
        self.duration = duration
        self.pixelWidth = pixelWidth
        self.pixelHeight = pixelHeight
        self.creationDate = creationDate
        self.category = category
        self.isFavorite = isFavorite
        self.safety = safety
    }

    public var formattedSize: String {
        ByteCountFormatter.string(fromByteCount: sizeBytes, countStyle: .file)
    }

    public var formattedDuration: String {
        guard duration > 0 else { return "" }
        let minutes = Int(duration) / 60
        let seconds = Int(duration) % 60
        return String(format: "%d:%02d", minutes, seconds)
    }
}

public struct DuplicateAssetGroup: Identifiable, Sendable {
    public let id: String
    public let totalSizeBytes: Int64
    public let assets: [StorageAsset]

    public init(id: String, totalSizeBytes: Int64, assets: [StorageAsset]) {
        self.id = id
        self.totalSizeBytes = totalSizeBytes
        self.assets = assets
    }

    public var formattedTotalSize: String {
        ByteCountFormatter.string(fromByteCount: totalSizeBytes, countStyle: .file)
    }
}

public struct StorageSummary: Sendable {
    public let totalIndexedBytes: Int64
    public let photosBytes: Int64
    public let videosBytes: Int64
    public let screenshotsBytes: Int64
    public let duplicateBytes: Int64
    public let assetCount: Int

    public init(
        totalIndexedBytes: Int64,
        photosBytes: Int64,
        videosBytes: Int64,
        screenshotsBytes: Int64,
        duplicateBytes: Int64,
        assetCount: Int
    ) {
        self.totalIndexedBytes = totalIndexedBytes
        self.photosBytes = photosBytes
        self.videosBytes = videosBytes
        self.screenshotsBytes = screenshotsBytes
        self.duplicateBytes = duplicateBytes
        self.assetCount = assetCount
    }

    public var formattedTotal: String {
        ByteCountFormatter.string(fromByteCount: totalIndexedBytes, countStyle: .file)
    }
}

import Foundation

public struct DuplicateAssetDetector: Sendable {
    public init() {}

    public func findDuplicates(assets: [StorageAsset]) -> [DuplicateAssetGroup] {
        var groups: [String: [StorageAsset]] = [:]

        // Group by exact resolution (pixelWidth x pixelHeight) and near file size (within 1%)
        for asset in assets where asset.pixelWidth > 0 && asset.pixelHeight > 0 {
            let key = "\(asset.pixelWidth)x\(asset.pixelHeight)_\(asset.sizeBytes / 1024)"
            groups[key, default: []].append(asset)
        }

        return groups
            .filter { $0.value.count > 1 }
            .map { key, items in
                let totalSize = items.reduce(0) { $0 + $1.sizeBytes }
                return DuplicateAssetGroup(
                    id: key,
                    totalSizeBytes: totalSize,
                    assets: items
                )
            }
            .sorted { $0.totalSizeBytes > $1.totalSizeBytes }
    }
}

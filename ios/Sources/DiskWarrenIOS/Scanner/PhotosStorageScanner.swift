import Foundation
import Photos

public final class PhotosStorageScanner: @unchecked Sendable {
    public init() {}

    public func requestAuthorization() async -> PHAuthorizationStatus {
        await withCheckedContinuation { continuation in
            PHPhotoLibrary.requestAuthorization(for: .readWrite) { status in
                continuation.resume(returning: status)
            }
        }
    }

    public func scanPhotoLibrary() async -> [StorageAsset] {
        let options = PHFetchOptions()
        options.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]

        let fetchResult = PHAsset.fetchAssets(with: options)
        var results: [StorageAsset] = []

        fetchResult.enumerateObjects { asset, _, _ in
            let category = self.categorize(asset: asset)
            let estimatedSize = self.estimateAssetSize(asset: asset)
            let safety: SafetyClassification = (category == .screenshots) ? .lowRisk : .reviewRequired

            let item = StorageAsset(
                id: asset.localIdentifier,
                localIdentifier: asset.localIdentifier,
                filename: self.extractFilename(asset: asset),
                sizeBytes: estimatedSize,
                duration: asset.duration,
                pixelWidth: asset.pixelWidth,
                pixelHeight: asset.pixelHeight,
                creationDate: asset.creationDate ?? Date(),
                category: category,
                isFavorite: asset.isFavorite,
                safety: safety
            )
            results.append(item)
        }

        return results
    }

    private func categorize(asset: PHAsset) -> AssetCategory {
        if asset.mediaType == .video {
            if asset.mediaSubtypes.contains(.videoHighFrameRate) {
                return .videos
            }
            return .videos
        }

        if asset.mediaSubtypes.contains(.photoScreenshot) {
            return .screenshots
        }

        return .photos
    }

    private func estimateAssetSize(asset: PHAsset) -> Int64 {
        // Fast resource size estimation or pixel dimension fallback
        let resources = PHAssetResource.assetResources(for: asset)
        for resource in resources {
            if let fileSize = resource.value(forKey: "fileSize") as? Int64, fileSize > 0 {
                return fileSize
            }
        }

        // Fallback approximation based on pixel count & media type
        if asset.mediaType == .video {
            return Int64(asset.duration * 4_000_000) // ~4 MB/sec for typical 1080p/4K H.264/HEVC
        } else {
            return Int64(asset.pixelWidth * asset.pixelHeight * 3 / 8) // typical JPEG/HEIC compression ratio
        }
    }

    private func extractFilename(asset: PHAsset) -> String {
        let resources = PHAssetResource.assetResources(for: asset)
        return resources.first?.originalFilename ?? "Asset_\(asset.localIdentifier.prefix(8))"
    }
}

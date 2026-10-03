import Foundation
import Photos

public final class IOSSafetyGate: @unchecked Sendable {
    public static let shared = IOSSafetyGate()

    private init() {}

    public func canSafelyRecycle(asset: StorageAsset) -> (allowed: Bool, reason: String?) {
        if asset.isFavorite {
            return (false, "Asset is marked as a Favorite in Apple Photos. Unfavorite it first to allow recycling.")
        }
        return (true, nil)
    }

    public func deleteAssets(localIdentifiers: [String]) async throws -> Bool {
        let assets = PHAsset.fetchAssets(withLocalIdentifiers: localIdentifiers, options: nil)
        guard assets.count > 0 else { return false }

        return try await withCheckedThrowingContinuation { continuation in
            PHPhotoLibrary.shared().performChanges({
                PHAssetChangeRequest.deleteAssets(assets as NSArray)
            }) { success, error in
                if let error = error {
                    continuation.resume(throwing: error)
                } else {
                    continuation.resume(returning: success)
                }
            }
        }
    }
}

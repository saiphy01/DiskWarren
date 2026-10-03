import XCTest
@testable import DiskWarrenIOS

final class DiskWarrenIOSTests: XCTestCase {

    func testDuplicateAssetDetector_GroupsMatchingDimensions() {
        let asset1 = StorageAsset(
            id: "1",
            localIdentifier: "1",
            filename: "IMG_1001.JPG",
            sizeBytes: 3_000_000,
            pixelWidth: 4032,
            pixelHeight: 3024,
            category: .photos
        )

        let asset2 = StorageAsset(
            id: "2",
            localIdentifier: "2",
            filename: "IMG_1001_Burst2.JPG",
            sizeBytes: 3_000_500,
            pixelWidth: 4032,
            pixelHeight: 3024,
            category: .photos
        )

        let asset3 = StorageAsset(
            id: "3",
            localIdentifier: "3",
            filename: "IMG_2000.JPG",
            sizeBytes: 5_000_000,
            pixelWidth: 1920,
            pixelHeight: 1080,
            category: .photos
        )

        let detector = DuplicateAssetDetector()
        let groups = detector.findDuplicates(assets: [asset1, asset2, asset3])

        XCTAssertEqual(groups.count, 1)
        XCTAssertEqual(groups[0].assets.count, 2)
    }

    func testSafetyGate_ProtectsFavorites() {
        let favoriteAsset = StorageAsset(
            id: "fav1",
            localIdentifier: "fav1",
            filename: "FamilyPhoto.HEIC",
            sizeBytes: 2_500_000,
            category: .photos,
            isFavorite: true
        )

        let regularAsset = StorageAsset(
            id: "reg1",
            localIdentifier: "reg1",
            filename: "Receipt.HEIC",
            sizeBytes: 1_200_000,
            category: .photos,
            isFavorite: false
        )

        let gate = IOSSafetyGate.shared
        let favCheck = gate.canSafelyRecycle(asset: favoriteAsset)
        XCTAssertFalse(favCheck.allowed)
        XCTAssertNotNil(favCheck.reason)

        let regCheck = gate.canSafelyRecycle(asset: regularAsset)
        XCTAssertTrue(regCheck.allowed)
        XCTAssertNil(regCheck.reason)
    }

    func testStorageAsset_ByteCountFormatting() {
        let asset = StorageAsset(
            id: "test",
            localIdentifier: "test",
            filename: "Video.MOV",
            sizeBytes: 1_048_576 * 500, // 500 MB
            duration: 125,
            category: .videos
        )

        XCTAssertEqual(asset.formattedDuration, "2:05")
        XCTAssertFalse(asset.formattedSize.isEmpty)
    }
}

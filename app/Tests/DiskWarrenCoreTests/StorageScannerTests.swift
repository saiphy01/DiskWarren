import XCTest
@testable import DiskWarrenCore

final class StorageScannerTests: XCTestCase {
    func testTreeAggregationAndIndexQueries() {
        let f1 = StorageNode(name: "video1.mov", path: "/Media/video1.mov", type: .file, sizeBytes: 150_000_000, category: .media)
        let f2 = StorageNode(name: "video2.mov", path: "/Media/video2.mov", type: .file, sizeBytes: 250_000_000, category: .media)
        let f3 = StorageNode(name: "notes.txt", path: "/Media/notes.txt", type: .file, sizeBytes: 10_000, category: .documents)
        
        let dir = StorageNode(
            name: "Media",
            path: "/Media",
            type: .directory,
            sizeBytes: 400_010_000,
            children: [f1, f2, f3]
        )
        
        let root = StorageNode(
            name: "Macintosh HD",
            path: "/",
            type: .directory,
            sizeBytes: 400_010_000,
            children: [dir]
        )
        
        let index = StorageIndex(rootNode: root)
        
        // Query largest files > 100MB
        let largest = index.findLargestFiles(limit: 10, minSizeBytes: 100_000_000)
        XCTAssertEqual(largest.count, 2)
        XCTAssertEqual(largest.first?.name, "video2.mov")
        XCTAssertEqual(largest.first?.sizeBytes, 250_000_000)
        
        // Search query
        let searchResults = index.search(query: "notes")
        XCTAssertEqual(searchResults.count, 1)
        XCTAssertEqual(searchResults.first?.name, "notes.txt")
        
        // Category totals
        let totals = index.calculateCategoryTotals()
        XCTAssertEqual(totals[.media], 400_000_000)
        XCTAssertEqual(totals[.documents], 10_000)
    }
}

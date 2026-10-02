import XCTest
import CoreGraphics
@testable import DiskWarrenCore
@testable import DiskWarrenUI

final class TreemapEngineTests: XCTestCase {
    func testSquarifiedLayoutBoundsContainment() {
        let n1 = StorageNode(name: "A", path: "/A", type: .directory, sizeBytes: 500)
        let n2 = StorageNode(name: "B", path: "/B", type: .directory, sizeBytes: 300)
        let n3 = StorageNode(name: "C", path: "/C", type: .file, sizeBytes: 200)
        
        let bounds = CGRect(x: 0, y: 0, width: 800, height: 600)
        let tiles = TreemapEngine.computeLayout(nodes: [n1, n2, n3], in: bounds)
        
        XCTAssertEqual(tiles.count, 3)
        for tile in tiles {
            XCTAssertTrue(bounds.contains(tile.rect), "Tile rect \(tile.rect) must be contained in bounds \(bounds)")
            XCTAssertGreaterThan(tile.rect.width, 0)
            XCTAssertGreaterThan(tile.rect.height, 0)
        }
    }
    
    func testEmptyNodesReturnsEmptyTiles() {
        let bounds = CGRect(x: 0, y: 0, width: 800, height: 600)
        let tiles = TreemapEngine.computeLayout(nodes: [], in: bounds)
        XCTAssertTrue(tiles.isEmpty)
    }
    
    func testSingleNodeOccupiesFullBounds() {
        let single = StorageNode(name: "Single", path: "/Single", type: .file, sizeBytes: 1000)
        let bounds = CGRect(x: 0, y: 0, width: 400, height: 400)
        let tiles = TreemapEngine.computeLayout(nodes: [single], in: bounds)
        
        XCTAssertEqual(tiles.count, 1)
        XCTAssertEqual(tiles.first?.rect.width, 400)
        XCTAssertEqual(tiles.first?.rect.height, 400)
    }
}

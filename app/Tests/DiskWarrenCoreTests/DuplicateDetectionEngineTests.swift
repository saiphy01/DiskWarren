import XCTest
@testable import DiskWarrenCore

final class DuplicateDetectionEngineTests: XCTestCase {
    let engine = DuplicateDetectionEngine.shared
    
    func testSameSizeDifferentContentIsNotDuplicate() throws {
        let tempDir = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("DiskWarren_DupTest_\(UUID().uuidString)")
        try FileManager.default.createDirectory(at: tempDir, withIntermediateDirectories: true)
        defer { try? FileManager.default.removeItem(at: tempDir) }
        
        let fileA = tempDir.appendingPathComponent("fileA.bin")
        let fileB = tempDir.appendingPathComponent("fileB.bin")
        
        // Both 100 bytes, but different contents
        let dataA = Data(repeating: 0x41, count: 100) // 'A'
        let dataB = Data(repeating: 0x42, count: 100) // 'B'
        
        try dataA.write(to: fileA)
        try dataB.write(to: fileB)
        
        let candidates = [
            (url: fileA, size: Int64(100), modDate: Date()),
            (url: fileB, size: Int64(100), modDate: Date())
        ]
        
        let groups = try engine.findDuplicates(candidateFiles: candidates)
        XCTAssertTrue(groups.isEmpty, "Files with same size but different content must NEVER be marked as duplicates")
    }
    
    func testIdenticalContentDifferentNamesIsDuplicate() throws {
        let tempDir = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("DiskWarren_DupTest_\(UUID().uuidString)")
        try FileManager.default.createDirectory(at: tempDir, withIntermediateDirectories: true)
        defer { try? FileManager.default.removeItem(at: tempDir) }
        
        let master = tempDir.appendingPathComponent("master.mp4")
        let copy = tempDir.appendingPathComponent("backup_copy.mp4")
        
        let identicalData = Data(repeating: 0x58, count: 10240) // 10 KB identical
        try identicalData.write(to: master)
        try identicalData.write(to: copy)
        
        let candidates = [
            (url: master, size: Int64(10240), modDate: Date(timeIntervalSince1970: 1000)),
            (url: copy, size: Int64(10240), modDate: Date(timeIntervalSince1970: 2000))
        ]
        
        var groups = try engine.findDuplicates(candidateFiles: candidates)
        XCTAssertEqual(groups.count, 1)
        XCTAssertEqual(groups.first?.files.count, 2)
        
        // Test auto selection Keep Newest
        engine.applyAutoSelection(groups: &groups, strategy: .keepNewest)
        let files = groups.first!.files
        XCTAssertTrue(files.contains { $0.path.contains("master.mp4") && $0.isSelectedForRemoval })
        XCTAssertTrue(files.contains { $0.path.contains("backup_copy.mp4") && !$0.isSelectedForRemoval })
    }
}

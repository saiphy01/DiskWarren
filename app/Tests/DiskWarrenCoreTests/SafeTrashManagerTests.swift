import XCTest
@testable import DiskWarrenCore

final class SafeTrashManagerTests: XCTestCase {
    let trashManager = SafeTrashManager.shared
    
    func testRestrictedPathsRejection() {
        let systemPath = URL(fileURLWithPath: "/System/Library/CoreServices/Finder.app")
        let usrPath = URL(fileURLWithPath: "/usr/bin/python3")
        let keychainsPath = URL(fileURLWithPath: "/Users/test/Library/Keychains/login.keychain-db")
        
        XCTAssertThrowsError(try trashManager.recycle(urls: [systemPath])) { error in
            guard case SafetyError.restrictedPathViolation = error else {
                XCTFail("Must throw restrictedPathViolation for /System")
                return
            }
        }
        
        XCTAssertThrowsError(try trashManager.recycle(urls: [usrPath])) { error in
            guard case SafetyError.restrictedPathViolation = error else {
                XCTFail("Must throw restrictedPathViolation for /usr")
                return
            }
        }
        
        XCTAssertThrowsError(try trashManager.recycle(urls: [keychainsPath])) { error in
            guard case SafetyError.restrictedPathViolation = error else {
                XCTFail("Must throw restrictedPathViolation for Keychains")
                return
            }
        }
    }
    
    func testSafeSandboxRecycle() throws {
        // Create an isolated sandbox file in temporary directory
        let tempDir = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("DiskWarren_SafeTest_\(UUID().uuidString)")
        try FileManager.default.createDirectory(at: tempDir, withIntermediateDirectories: true)
        defer { try? FileManager.default.removeItem(at: tempDir) }
        
        let testFile = tempDir.appendingPathComponent("sample_cache.tmp")
        try "test data for safe recycling".data(using: .utf8)?.write(to: testFile)
        
        XCTAssertTrue(FileManager.default.fileExists(atPath: testFile.path))
        
        // Execute recycle on sandbox file
        let result = try trashManager.recycle(urls: [testFile])
        
        XCTAssertTrue(result.isCompleteSuccess)
        XCTAssertEqual(result.succeededURLs.count, 1)
        XCTAssertFalse(FileManager.default.fileExists(atPath: testFile.path), "Recycled file should no longer be at original path")
    }
}

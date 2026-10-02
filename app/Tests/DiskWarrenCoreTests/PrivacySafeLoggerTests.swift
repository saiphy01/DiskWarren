import XCTest
@testable import DiskWarrenCore

final class PrivacySafeLoggerTests: XCTestCase {
    func testSanitizeStripsDocumentsPath() {
        let logger = PrivacySafeLogger()
        let raw = "/Users/testuser/Documents/TopSecretFinancials.pdf"
        let sanitized = logger.sanitizePath(raw)
        
        XCTAssertFalse(sanitized.contains("TopSecretFinancials.pdf"), "Sanitizer must remove sensitive document filenames")
        XCTAssertTrue(sanitized.contains("[REDACTED_FILE.pdf]"), "Sanitizer must preserve non-sensitive extension")
    }
    
    func testSanitizeStripsDesktopPath() {
        let logger = PrivacySafeLogger()
        let raw = "/Users/testuser/Desktop/ClientContract.docx"
        let sanitized = logger.sanitizePath(raw)
        
        XCTAssertFalse(sanitized.contains("ClientContract.docx"))
        XCTAssertTrue(sanitized.contains("[REDACTED_FILE.docx]"))
    }
    
    func testLoggerMemoryStorage() {
        let logger = PrivacySafeLogger()
        logger.log(level: .info, subsystem: "TestModule", message: "Starting scan")
        
        let expectation = XCTestExpectation(description: "Wait for logger queue")
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
            let logs = logger.getRecentLogs()
            XCTAssertFalse(logs.isEmpty)
            XCTAssertEqual(logs.last?.subsystem, "TestModule")
            expectation.fulfill()
        }
        wait(for: [expectation], timeout: 1.0)
    }
}

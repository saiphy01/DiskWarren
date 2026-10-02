import XCTest
@testable import DiskWarrenCore

final class AIStorageScannerTests: XCTestCase {
    let scanner = AIStorageScanner.shared
    
    func testGGUFMagicByteValidation() throws {
        // Create synthetic temporary file with GGUF magic bytes: 'G', 'G', 'U', 'F'
        let tempFile = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("test_model.gguf")
        let validGGUFBytes = Data([0x47, 0x47, 0x55, 0x46, 0x01, 0x00, 0x00, 0x00])
        try validGGUFBytes.write(to: tempFile)
        
        defer { try? FileManager.default.removeItem(at: tempFile) }
        
        XCTAssertTrue(scanner.isGGUFFile(url: tempFile), "Valid GGUF header must be detected")
        
        // Corrupt header
        let invalidBytes = Data([0x50, 0x4B, 0x03, 0x04]) // Zip magic
        try invalidBytes.write(to: tempFile)
        
        XCTAssertFalse(scanner.isGGUFFile(url: tempFile), "Non-GGUF file must be rejected")
    }
    
    func testProviderDefaultLocations() {
        XCTAssertEqual(AIModelProvider.ollama.defaultLocation, "~/.ollama/models")
        XCTAssertEqual(AIModelProvider.lmStudio.defaultLocation, "~/.cache/lm-studio/models")
        XCTAssertEqual(AIModelProvider.huggingFace.defaultLocation, "~/.cache/huggingface/hub")
    }
}

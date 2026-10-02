import XCTest
@testable import DiskWarrenCore

final class AppUninstallerEngineTests: XCTestCase {
    let engine = AppUninstallerEngine.shared
    
    func testLeftoverAttributionWithEvidence() throws {
        // Create synthetic sandbox user library
        let tempHome = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("DiskWarren_AppTest_\(UUID().uuidString)")
        let appSupport = tempHome.appendingPathComponent("Library/Application Support/com.example.DemoApp")
        let caches = tempHome.appendingPathComponent("Library/Caches/com.example.DemoApp")
        let prefs = tempHome.appendingPathComponent("Library/Preferences")
        
        try FileManager.default.createDirectory(at: appSupport, withIntermediateDirectories: true)
        try FileManager.default.createDirectory(at: caches, withIntermediateDirectories: true)
        try FileManager.default.createDirectory(at: prefs, withIntermediateDirectories: true)
        
        let prefFile = prefs.appendingPathComponent("com.example.DemoApp.plist")
        try "fake plist content".data(using: .utf8)?.write(to: prefFile)
        
        defer { try? FileManager.default.removeItem(at: tempHome) }
        
        let leftovers = engine.discoverLeftovers(
            appName: "DemoApp",
            bundleId: "com.example.DemoApp",
            homeURL: tempHome
        )
        
        XCTAssertEqual(leftovers.count, 3)
        XCTAssertTrue(leftovers.contains { $0.type == .applicationSupport })
        XCTAssertTrue(leftovers.contains { $0.type == .caches })
        XCTAssertTrue(leftovers.contains { $0.type == .preferences })
        
        for leftover in leftovers {
            XCTAssertFalse(leftover.attributionEvidence.isEmpty, "Attribution evidence must be documented for every leftover")
        }
    }
}

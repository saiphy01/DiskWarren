import XCTest
@testable import DiskWarrenCore

final class CleanupRuleRegistryTests: XCTestCase {
    let registry = CleanupRuleRegistry.shared
    
    func testXcodeDerivedDataRuleMatch() {
        let path = "/Users/saiph/Library/Developer/Xcode/DerivedData/MyApp-abcd/Build/Products"
        let rule = registry.evaluate(path: path)
        
        XCTAssertNotNil(rule)
        XCTAssertEqual(rule?.id, "xcode.deriveddata")
        XCTAssertEqual(rule?.riskTier, .low)
    }
    
    func testNodeModulesRuleMatch() {
        let path = "/Users/saiph/Developer/Projects/frontend/node_modules"
        let rule = registry.evaluate(path: path)
        
        XCTAssertNotNil(rule)
        XCTAssertEqual(rule?.id, "node.modules")
        XCTAssertEqual(rule?.riskTier, .review)
    }
    
    func testHomebrewCachesMatch() {
        let path = "/Users/saiph/Library/Caches/Homebrew/downloads/node-20.tar.gz"
        let rule = registry.evaluate(path: path)
        
        XCTAssertNotNil(rule)
        XCTAssertEqual(rule?.id, "brew.caches")
        XCTAssertEqual(rule?.riskTier, .low)
    }
    
    func testFalsePositiveResistanceInUserDocuments() {
        // Essential safety invariant: NEVER classify an unknown file as safe merely because its name contains 'cache' or 'temp'
        let fakeCacheDoc = "/Users/saiph/Documents/my_cache.txt"
        let fakeTempNotes = "/Users/saiph/Desktop/temp_notes.md"
        let systemApp = "/System/Library/CoreServices/Finder.app"
        
        XCTAssertNil(registry.evaluate(path: fakeCacheDoc), "Files in Documents named cache.txt must never match cleanup rules")
        XCTAssertNil(registry.evaluate(path: fakeTempNotes), "Files in Desktop named temp_notes.md must never match cleanup rules")
        XCTAssertNil(registry.evaluate(path: systemApp), "System critical applications must never match cleanup rules")
    }
}

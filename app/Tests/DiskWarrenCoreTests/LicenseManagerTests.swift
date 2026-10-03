import XCTest
@testable import DiskWarrenCore

final class LicenseManagerTests: XCTestCase {
    let licenseManager = LicenseManager.shared
    
    override func setUp() {
        super.setUp()
        licenseManager.deactivateLicense()
    }
    
    func testValidLicenseActivation() throws {
        // Known valid test key: WARREN-PRO-DEMO01-C5BA
        let validKey = "WARREN-PRO-DEMO01-C5BA"
        let success = try licenseManager.activateLicense(key: validKey)
        
        XCTAssertTrue(success)
        XCTAssertTrue(licenseManager.isProActivated)
    }
    
    func testValidPowerPackLicenseActivation() throws {
        // Known valid Power Pack key: WARREN-POWER-DEMO01-D90C
        let powerKey = "WARREN-POWER-DEMO01-D90C"
        let success = try licenseManager.activateLicense(key: powerKey)
        
        XCTAssertTrue(success)
        XCTAssertTrue(licenseManager.isProActivated)
    }
    
    func testInvalidChecksumRejection() throws {
        let invalidKey = "WARREN-PRO-DEMO01-XXXX" // Wrong checksum
        let success = try licenseManager.activateLicense(key: invalidKey)
        
        XCTAssertFalse(success)
        XCTAssertFalse(licenseManager.isProActivated)
    }
    
    func testDeactivation() throws {
        let validKey = "WARREN-PRO-DEMO01-C5BA"
        _ = try licenseManager.activateLicense(key: validKey)
        XCTAssertTrue(licenseManager.isProActivated)
        
        licenseManager.deactivateLicense()
        XCTAssertFalse(licenseManager.isProActivated)
    }
}

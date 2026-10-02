import XCTest
@testable import DiskWarrenCore

final class PermissionManagerTests: XCTestCase {
    func testPermissionManagerMockGranted() {
        let manager = PermissionManager()
        manager.mockStatus = .granted
        XCTAssertEqual(manager.checkFullDiskAccess(), .granted)
    }
    
    func testPermissionManagerMockDenied() {
        let manager = PermissionManager()
        manager.mockStatus = .denied
        XCTAssertEqual(manager.checkFullDiskAccess(), .denied)
    }
    
    func testPermissionManagerMockLimited() {
        let manager = PermissionManager()
        manager.mockStatus = .limited
        XCTAssertEqual(manager.checkFullDiskAccess(), .limited)
    }
}

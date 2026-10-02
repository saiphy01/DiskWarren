import XCTest
@testable import DiskWarrenCore
@testable import DiskWarrenUI

final class SystemMonitorTests: XCTestCase {
    func testSystemMetricsCalculation() {
        let metrics = SystemMetrics(
            diskFreeBytes: 100_000_000_000,
            diskTotalBytes: 500_000_000_000,
            cpuUsagePercentage: 10.0,
            ramUsagePercentage: 50.0
        )
        
        XCTAssertEqual(metrics.diskUsedFraction, 0.8, accuracy: 0.001)
    }
    
    func testReduceMotionFallback() {
        let reduced = MotionPreferences.animation(value: 1, reduceMotion: true)
        XCTAssertNil(reduced, "Reduce motion must return nil for instant accessibility transition")
        
        let normal = MotionPreferences.animation(value: 1, reduceMotion: false)
        XCTAssertNotNil(normal, "Normal motion must return spring animation")
    }
}

import SwiftUI
import DiskWarrenCore
import DiskWarrenUI

@MainActor
public final class AppCoordinator: ObservableObject {
    @Published public var selectedNavigationItem: AppNavigationItem? = .dashboard
    @Published public var isScanning: Bool = false
    @Published public var scanProgress: Double = 0.0
    @Published public var scanFileCount: Int = 0
    @Published public var scanByteCount: Int64 = 0
    @Published public var currentScanPath: String = ""
    @Published public var showOnboarding: Bool = false
    @Published public var showCleanupConfirmModal: Bool = false
    @Published public var permissionStatus: PermissionStatus = .granted
    @Published public var selectedVolume: DiskVolumeInfo = MockData.volumeInfo
    @Published public var cleanupCandidates: [CleanupCandidate] = MockData.cleanupCandidates
    
    private let permissionManager: PermissionManaging
    private let logger: PrivacySafeLogger
    
    public init(
        permissionManager: PermissionManaging = PermissionManager.shared,
        logger: PrivacySafeLogger = PrivacySafeLogger.shared
    ) {
        self.permissionManager = permissionManager
        self.logger = logger
        self.permissionStatus = permissionManager.checkFullDiskAccess()
        
        logger.log(level: .info, subsystem: "AppCoordinator", message: "Application coordinator initialized")
    }
    
    public func startScan() {
        guard !isScanning else { return }
        isScanning = true
        scanProgress = 0.0
        scanFileCount = 0
        scanByteCount = 0
        
        logger.log(level: .info, subsystem: "AppCoordinator", message: "Scan started on volume", sensitivePath: selectedVolume.mountPoint)
    }
    
    public func cancelScan() {
        isScanning = false
        logger.log(level: .info, subsystem: "AppCoordinator", message: "Scan cancelled by user")
    }
    
    public func requestFullDiskAccess() {
        permissionManager.openSystemSettingsFullDiskAccess()
    }
}

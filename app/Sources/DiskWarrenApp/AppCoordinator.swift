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
    
    private var scanTask: Task<Void, Never>?
    
    public func startScan() {
        guard !isScanning else { return }
        isScanning = true
        scanProgress = 0.0
        scanFileCount = 0
        scanByteCount = 0
        
        logger.log(level: .info, subsystem: "AppCoordinator", message: "Scan started on volume", sensitivePath: selectedVolume.mountPoint)
        
        scanTask?.cancel()
        scanTask = Task { [weak self] in
            let scanner = StorageScanner()
            let homeURL = FileManager.default.homeDirectoryForCurrentUser
            
            do {
                _ = try await scanner.scan(rootURL: homeURL) { [weak self] progress in
                    Task { @MainActor in
                        guard let self = self, self.isScanning else { return }
                        self.scanFileCount = progress.filesIndexed
                        self.scanByteCount = progress.bytesMeasured
                        self.currentScanPath = progress.currentPath
                        let estimatedTotalFiles: Double = 500_000
                        self.scanProgress = min(0.95, Double(progress.filesIndexed) / estimatedTotalFiles)
                    }
                }
                
                await MainActor.run {
                    guard let self = self, self.isScanning else { return }
                    self.isScanning = false
                    self.scanProgress = 1.0
                    self.logger.log(level: .info, subsystem: "AppCoordinator", message: "Scan completed successfully")
                }
            } catch {
                await MainActor.run {
                    guard let self = self else { return }
                    self.isScanning = false
                    self.logger.log(level: .warning, subsystem: "AppCoordinator", message: "Scan interrupted: \(error.localizedDescription)")
                }
            }
        }
    }
    
    public func cancelScan() {
        scanTask?.cancel()
        scanTask = nil
        isScanning = false
        logger.log(level: .info, subsystem: "AppCoordinator", message: "Scan cancelled by user")
    }
    
    public func requestFullDiskAccess() {
        permissionManager.openSystemSettingsFullDiskAccess()
    }
}

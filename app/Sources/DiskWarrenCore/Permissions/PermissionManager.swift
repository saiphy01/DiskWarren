import Foundation
#if canImport(AppKit)
import AppKit
#endif

public enum PermissionStatus: String, Codable, Sendable {
    case granted
    case denied
    case notDetermined
    case limited
}

public protocol PermissionManaging: Sendable {
    func checkFullDiskAccess() -> PermissionStatus
    func openSystemSettingsFullDiskAccess()
}

public final class PermissionManager: PermissionManaging, @unchecked Sendable {
    public static let shared = PermissionManager()
    
    // Test hook to allow mocking permissions during unit tests & sandbox simulations
    public var mockStatus: PermissionStatus? = nil
    
    public init() {}
    
    public func checkFullDiskAccess() -> PermissionStatus {
        if let mock = mockStatus {
            return mock
        }
        
        #if os(macOS)
        let homeDir = FileManager.default.homeDirectoryForCurrentUser
        let testPaths = [
            homeDir.appendingPathComponent("Library/Safari"),
            homeDir.appendingPathComponent("Library/Mail"),
            homeDir.appendingPathComponent("Library/Suggestions")
        ]
        
        for path in testPaths {
            if FileManager.default.fileExists(atPath: path.path) {
                do {
                    _ = try FileManager.default.contentsOfDirectory(atPath: path.path)
                    return .granted
                } catch {
                    return .denied
                }
            }
        }
        
        // If specific user directories do not exist, check reading root Library/Application Support/com.apple.TCC
        let tccPath = "/Library/Application Support/com.apple.TCC"
        if FileManager.default.isReadableFile(atPath: tccPath) {
            return .granted
        }
        
        return .limited
        #else
        return .granted
        #endif
    }
    
    public func openSystemSettingsFullDiskAccess() {
        #if os(macOS)
        let modernURL = URL(string: "x-apple.systempreferences:com.apple.Settings.PrivacySecurity.extension?Privacy_AllFiles")
        let legacyURL = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_AllFiles")
        
        if let modern = modernURL, NSWorkspace.shared.open(modern) {
            return
        }
        if let legacy = legacyURL {
            NSWorkspace.shared.open(legacy)
        }
        #endif
    }
}

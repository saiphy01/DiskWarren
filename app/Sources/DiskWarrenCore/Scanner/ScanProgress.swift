import Foundation

public struct ScanProgress: Sendable, Codable {
    public let filesIndexed: Int
    public let directoriesIndexed: Int
    public let bytesMeasured: Int64
    public let currentPath: String
    public let permissionDeniedCount: Int
    public let isCompleted: Bool
    public let elapsedSeconds: Double
    
    public init(
        filesIndexed: Int = 0,
        directoriesIndexed: Int = 0,
        bytesMeasured: Int64 = 0,
        currentPath: String = "",
        permissionDeniedCount: Int = 0,
        isCompleted: Bool = false,
        elapsedSeconds: Double = 0.0
    ) {
        self.filesIndexed = filesIndexed
        self.directoriesIndexed = directoriesIndexed
        self.bytesMeasured = bytesMeasured
        self.currentPath = currentPath
        self.permissionDeniedCount = permissionDeniedCount
        self.isCompleted = isCompleted
        self.elapsedSeconds = elapsedSeconds
    }
    
    public var filesPerSecond: Double {
        guard elapsedSeconds > 0 else { return 0 }
        return Double(filesIndexed) / elapsedSeconds
    }
    
    public var formattedBytes: String {
        ByteCountFormatter.string(fromByteCount: bytesMeasured, countStyle: .file)
    }
}

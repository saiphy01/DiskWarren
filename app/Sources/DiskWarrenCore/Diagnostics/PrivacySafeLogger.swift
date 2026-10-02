import Foundation

public enum LogLevel: String, Codable, Sendable {
    case debug = "DEBUG"
    case info = "INFO"
    case warning = "WARN"
    case error = "ERROR"
}

public struct LogEntry: Identifiable, Codable, Sendable {
    public let id: UUID
    public let timestamp: Date
    public let level: LogLevel
    public let subsystem: String
    public let sanitizedMessage: String
    
    public init(
        id: UUID = UUID(),
        timestamp: Date = Date(),
        level: LogLevel,
        subsystem: String,
        sanitizedMessage: String
    ) {
        self.id = id
        self.timestamp = timestamp
        self.level = level
        self.subsystem = subsystem
        self.sanitizedMessage = sanitizedMessage
    }
}

public final class PrivacySafeLogger: @unchecked Sendable {
    public static let shared = PrivacySafeLogger()
    
    private let queue = DispatchQueue(label: "com.diskwarren.logger", qos: .utility)
    private var inMemoryLogs: [LogEntry] = []
    private let maxEntries: Int = 1000
    
    public init() {}
    
    public func log(
        level: LogLevel,
        subsystem: String,
        message: String,
        sensitivePath: String? = nil
    ) {
        let sanitized = sanitize(message: message, rawPath: sensitivePath)
        let entry = LogEntry(level: level, subsystem: subsystem, sanitizedMessage: sanitized)
        
        queue.async {
            self.inMemoryLogs.append(entry)
            if self.inMemoryLogs.count > self.maxEntries {
                self.inMemoryLogs.removeFirst(self.inMemoryLogs.count - self.maxEntries)
            }
        }
    }
    
    public func getRecentLogs() -> [LogEntry] {
        queue.sync { inMemoryLogs }
    }
    
    public func sanitize(message: String, rawPath: String?) -> String {
        guard let path = rawPath else { return message }
        
        let sanitizedPath = sanitizePath(path)
        return "\(message) [path: \(sanitizedPath)]"
    }
    
    public func sanitizePath(_ path: String) -> String {
        // Redact user's home folder and private directory names
        let home = NSHomeDirectory()
        var cleaned = path
        
        if cleaned.hasPrefix(home) {
            cleaned = "~" + cleaned.dropFirst(home.count)
        }
        
        // Strip sensitive user files while retaining structural classification
        let sensitiveDirectories = ["/Documents/", "/Desktop/", "/Downloads/", "/Photos/", "/Mail/", "/Messages/"]
        for dir in sensitiveDirectories {
            if let range = cleaned.range(of: dir) {
                let suffix = cleaned[range.upperBound...]
                let ext = (suffix as NSString).pathExtension
                let placeholder = ext.isEmpty ? "[REDACTED_DIR]" : "[REDACTED_FILE.\(ext)]"
                cleaned = String(cleaned[..<range.upperBound]) + placeholder
            }
        }
        
        return cleaned
    }
}

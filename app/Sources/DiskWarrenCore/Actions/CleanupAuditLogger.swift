import Foundation

public struct AuditRecord: Codable, Sendable {
    public let timestamp: Date
    public let reclaimedBytes: Int64
    public let itemCount: Int
    public let succeededCount: Int
    public let failedCount: Int
    public let status: String
    
    public init(
        timestamp: Date = Date(),
        reclaimedBytes: Int64,
        itemCount: Int,
        succeededCount: Int,
        failedCount: Int,
        status: String
    ) {
        self.timestamp = timestamp
        self.reclaimedBytes = reclaimedBytes
        self.itemCount = itemCount
        self.succeededCount = succeededCount
        self.failedCount = failedCount
        self.status = status
    }
}

public final class CleanupAuditLogger: Sendable {
    public static let shared = CleanupAuditLogger()
    
    private let queue = DispatchQueue(label: "com.diskwarren.auditlogger")
    
    public init() {}
    
    public func recordCleanup(result: CleanupResult) {
        let record = AuditRecord(
            reclaimedBytes: result.reclaimedBytes,
            itemCount: result.succeededURLs.count + result.failedURLs.count,
            succeededCount: result.succeededURLs.count,
            failedCount: result.failedURLs.count,
            status: result.isCompleteSuccess ? "SUCCESS" : "PARTIAL_FAILURE"
        )
        
        queue.async {
            self.appendToFile(record: record)
        }
    }
    
    private func appendToFile(record: AuditRecord) {
        let fm = FileManager.default
        let appSupport = fm.urls(for: .applicationSupportDirectory, in: .userDomainMask).first ?? URL(fileURLWithPath: NSTemporaryDirectory())
        let warrenDir = appSupport.appendingPathComponent("DiskWarren")
        try? fm.createDirectory(at: warrenDir, withIntermediateDirectories: true)
        
        let fileURL = warrenDir.appendingPathComponent("audit_log.json")
        
        var existingRecords: [AuditRecord] = []
        if let data = try? Data(contentsOf: fileURL),
           let decoded = try? JSONDecoder().decode([AuditRecord].self, from: data) {
            existingRecords = decoded
        }
        
        existingRecords.append(record)
        
        if let encoded = try? JSONEncoder().encode(existingRecords) {
            try? encoded.write(to: fileURL)
        }
    }
}

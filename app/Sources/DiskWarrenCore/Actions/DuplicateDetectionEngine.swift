import Foundation
import CryptoKit

public enum DuplicateSelectStrategy: String, CaseIterable, Sendable {
    case keepNewest = "Keep Newest"
    case keepOldest = "Keep Oldest"
    case manual = "Manual Selection"
}

public struct DuplicateFileItem: Identifiable, Hashable, Codable, Sendable {
    public let id: String
    public let path: String
    public let sizeBytes: Int64
    public let modifiedDate: Date
    public var isSelectedForRemoval: Bool
    
    public init(
        id: String = UUID().uuidString,
        path: String,
        sizeBytes: Int64,
        modifiedDate: Date = Date(),
        isSelectedForRemoval: Bool = false
    ) {
        self.id = id
        self.path = path
        self.sizeBytes = sizeBytes
        self.modifiedDate = modifiedDate
        self.isSelectedForRemoval = isSelectedForRemoval
    }
}

public struct DuplicateGroup: Identifiable, Hashable, Sendable {
    public let id: String
    public let sizeBytes: Int64
    public let sha256Hash: String
    public var files: [DuplicateFileItem]
    
    public init(
        id: String = UUID().uuidString,
        sizeBytes: Int64,
        sha256Hash: String,
        files: [DuplicateFileItem]
    ) {
        self.id = id
        self.sizeBytes = sizeBytes
        self.sha256Hash = sha256Hash
        self.files = files
    }
    
    public var reclaimableBytes: Int64 {
        let countToRemove = files.filter { $0.isSelectedForRemoval }.count
        return Int64(countToRemove) * sizeBytes
    }
}

public final class DuplicateDetectionEngine: Sendable {
    public static let shared = DuplicateDetectionEngine()
    
    public init() {}
    
    public func findDuplicates(
        candidateFiles: [(url: URL, size: Int64, modDate: Date)]
    ) throws -> [DuplicateGroup] {
        // Stage 1: Size grouping (O(N))
        var sizeBuckets: [Int64: [(url: URL, size: Int64, modDate: Date)]] = [:]
        for item in candidateFiles where item.size > 0 {
            sizeBuckets[item.size, default: []].append(item)
        }
        
        let candidateBuckets = sizeBuckets.filter { $0.value.count > 1 }
        guard !candidateBuckets.isEmpty else { return [] }
        
        // Stage 2: Fast partial chunk hashing (Header 4KB + Footer 4KB)
        var partialHashBuckets: [String: [(url: URL, size: Int64, modDate: Date)]] = [:]
        for (_, files) in candidateBuckets {
            for file in files {
                if let partial = try? computePartialHash(url: file.url, fileSize: file.size) {
                    partialHashBuckets[partial, default: []].append(file)
                }
            }
        }
        
        let fullHashCandidates = partialHashBuckets.filter { $0.value.count > 1 }
        
        // Stage 3: Full streaming SHA-256 cryptographic hash
        var fullHashBuckets: [String: [(url: URL, size: Int64, modDate: Date)]] = [:]
        for (_, files) in fullHashCandidates {
            for file in files {
                if let full = try? computeFullStreamingSHA256(url: file.url) {
                    fullHashBuckets[full, default: []].append(file)
                }
            }
        }
        
        // Construct Duplicate Groups
        var duplicateGroups: [DuplicateGroup] = []
        for (hash, files) in fullHashBuckets where files.count > 1 {
            let size = files.first?.size ?? 0
            let items = files.map {
                DuplicateFileItem(
                    path: $0.url.path,
                    sizeBytes: $0.size,
                    modifiedDate: $0.modDate,
                    isSelectedForRemoval: false
                )
            }
            duplicateGroups.append(DuplicateGroup(sizeBytes: size, sha256Hash: hash, files: items))
        }
        
        return duplicateGroups
    }
    
    public func applyAutoSelection(groups: inout [DuplicateGroup], strategy: DuplicateSelectStrategy) {
        guard strategy != .manual else { return }
        
        for gIndex in 0..<groups.count {
            var files = groups[gIndex].files
            guard files.count > 1 else { continue }
            
            // Sort by modified date
            files.sort { $0.modifiedDate < $1.modifiedDate }
            
            for fIndex in 0..<files.count {
                if strategy == .keepNewest {
                    // Keep the last (newest), mark all older for removal
                    files[fIndex].isSelectedForRemoval = (fIndex < files.count - 1)
                } else if strategy == .keepOldest {
                    // Keep the first (oldest), mark all newer for removal
                    files[fIndex].isSelectedForRemoval = (fIndex > 0)
                }
            }
            groups[gIndex].files = files
        }
    }
    
    // MARK: - Streaming SHA-256 Hashing
    public func computeFullStreamingSHA256(url: URL) throws -> String {
        let handle = try FileHandle(forReadingFrom: url)
        defer { try? handle.close() }
        
        var hasher = SHA256()
        let bufferSize = 64 * 1024 // 64 KB streaming buffer
        
        while autoreleasepool(invoking: {
            let data = handle.readData(ofLength: bufferSize)
            guard !data.isEmpty else { return false }
            hasher.update(data: data)
            return true
        }) {}
        
        let digest = hasher.finalize()
        return digest.map { String(format: "%02hhx", $0) }.joined()
    }
    
    // MARK: - Partial Chunk Hashing
    private func computePartialHash(url: URL, fileSize: Int64) throws -> String {
        let handle = try FileHandle(forReadingFrom: url)
        defer { try? handle.close() }
        
        var hasher = Insecure.MD5() // Fast partial sampling
        
        // Read header 4KB
        let header = handle.readData(ofLength: 4096)
        hasher.update(data: header)
        
        // Read footer 4KB if large enough
        if fileSize > 8192 {
            try handle.seek(toOffset: UInt64(fileSize - 4096))
            let footer = handle.readData(ofLength: 4096)
            hasher.update(data: footer)
        }
        
        let digest = hasher.finalize()
        return "\(fileSize):" + digest.map { String(format: "%02hhx", $0) }.joined()
    }
}

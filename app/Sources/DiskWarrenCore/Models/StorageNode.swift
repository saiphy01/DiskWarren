import Foundation

public enum StorageNodeType: String, Codable, Sendable {
    case file
    case directory
    case bundle
    case symlink
}

public struct StorageNode: Identifiable, Hashable, Codable, Sendable {
    public let id: String
    public let name: String
    public let path: String
    public let type: StorageNodeType
    public var sizeBytes: Int64
    public var allocatedSizeBytes: Int64
    public let modifiedDate: Date
    public var category: StorageCategory
    public var children: [StorageNode]?
    public let isSymlink: Bool
    public let isRestricted: Bool
    public var permissionDenied: Bool
    
    public init(
        id: String = UUID().uuidString,
        name: String,
        path: String,
        type: StorageNodeType,
        sizeBytes: Int64,
        allocatedSizeBytes: Int64? = nil,
        modifiedDate: Date = Date(),
        category: StorageCategory = .other,
        children: [StorageNode]? = nil,
        isSymlink: Bool = false,
        isRestricted: Bool = false,
        permissionDenied: Bool = false
    ) {
        self.id = id
        self.name = name
        self.path = path
        self.type = type
        self.sizeBytes = sizeBytes
        self.allocatedSizeBytes = allocatedSizeBytes ?? sizeBytes
        self.modifiedDate = modifiedDate
        self.category = category
        self.children = children
        self.isSymlink = isSymlink
        self.isRestricted = isRestricted
        self.permissionDenied = permissionDenied
    }
    
    public var formattedSize: String {
        ByteCountFormatter.string(fromByteCount: sizeBytes, countStyle: .file)
    }
}

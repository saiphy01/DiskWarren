import Foundation

public final class StorageIndex: @unchecked Sendable {
    public let rootNode: StorageNode
    private var allFiles: [StorageNode] = []
    private var allDirectories: [StorageNode] = []
    
    public init(rootNode: StorageNode) {
        self.rootNode = rootNode
        indexNodes(node: rootNode)
    }
    
    private func indexNodes(node: StorageNode) {
        if node.type == .file || node.type == .bundle {
            allFiles.append(node)
        } else if node.type == .directory {
            allDirectories.append(node)
            if let children = node.children {
                for child in children {
                    indexNodes(node: child)
                }
            }
        }
    }
    
    public func findLargestFiles(limit: Int = 25, minSizeBytes: Int64 = 104_857_600) -> [StorageNode] { // >100 MB default
        return allFiles
            .filter { $0.sizeBytes >= minSizeBytes }
            .sorted { $0.sizeBytes > $1.sizeBytes }
            .prefix(limit)
            .map { $0 }
    }
    
    public func findLargestDirectories(limit: Int = 20) -> [StorageNode] {
        return allDirectories
            .sorted { $0.sizeBytes > $1.sizeBytes }
            .prefix(limit)
            .map { $0 }
    }
    
    public func search(query: String, limit: Int = 50) -> [StorageNode] {
        guard !query.trimmingCharacters(in: .whitespaces).isEmpty else { return [] }
        let lower = query.lowercased()
        
        let matchedFiles = allFiles.filter { $0.name.lowercased().contains(lower) }
        let matchedDirs = allDirectories.filter { $0.name.lowercased().contains(lower) }
        
        return Array((matchedDirs + matchedFiles).prefix(limit))
    }
    
    public func calculateCategoryTotals() -> [StorageCategory: Int64] {
        var totals: [StorageCategory: Int64] = [:]
        for cat in StorageCategory.allCases {
            totals[cat] = 0
        }
        
        for file in allFiles {
            totals[file.category, default: 0] += file.sizeBytes
        }
        
        return totals
    }
}

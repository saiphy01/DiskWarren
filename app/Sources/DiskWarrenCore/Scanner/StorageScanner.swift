import Foundation

public actor StorageScanner {
    private var isCancelled: Bool = false
    private var visitedInodes = Set<String>()
    private var filesCount: Int = 0
    private var directoriesCount: Int = 0
    private var totalBytes: Int64 = 0
    private var permissionDeniedCount: Int = 0
    private var startTime: Date = Date()
    
    public init() {}
    
    public func cancel() {
        self.isCancelled = true
    }
    
    public func scan(
        rootURL: URL,
        progressHandler: (@Sendable (ScanProgress) -> Void)? = nil
    ) async throws -> StorageNode {
        isCancelled = false
        startTime = Date()
        visitedInodes.removeAll()
        filesCount = 0
        directoriesCount = 0
        totalBytes = 0
        permissionDeniedCount = 0
        
        return try await scanDirectory(
            url: rootURL,
            progressHandler: progressHandler
        )
    }
    
    private func scanDirectory(
        url: URL,
        progressHandler: (@Sendable (ScanProgress) -> Void)?
    ) async throws -> StorageNode {
        if isCancelled {
            throw CancellationError()
        }
        
        // Loop and cycle detection
        if let fileID = fileIdentifier(for: url) {
            if visitedInodes.contains(fileID) {
                // Loop detected! Return stub node without descending
                return StorageNode(
                    name: url.lastPathComponent,
                    path: url.path,
                    type: .symlink,
                    sizeBytes: 0,
                    isSymlink: true
                )
            }
            visitedInodes.insert(fileID)
        }
        
        directoriesCount += 1
        let fm = FileManager.default
        let resourceKeys: Set<URLResourceKey> = [
            .isRegularFileKey,
            .isDirectoryKey,
            .isSymbolicLinkKey,
            .fileSizeKey,
            .totalFileAllocatedSizeKey,
            .contentModificationDateKey
        ]
        
        var childrenNodes: [StorageNode] = []
        var dirSizeBytes: Int64 = 0
        
        do {
            let contents = try fm.contentsOfDirectory(
                at: url,
                includingPropertiesForKeys: Array(resourceKeys),
                options: [.skipsPackageDescendants]
            )
            
            for itemURL in contents {
                if isCancelled { throw CancellationError() }
                
                guard let resourceValues = try? itemURL.resourceValues(forKeys: resourceKeys) else {
                    continue
                }
                
                let isDirectory = resourceValues.isDirectory ?? false
                let isSymlink = resourceValues.isSymbolicLink ?? false
                let modDate = resourceValues.contentModificationDate ?? Date()
                
                if isSymlink {
                    // Do not follow symlinks into arbitrary external trees
                    let child = StorageNode(
                        name: itemURL.lastPathComponent,
                        path: itemURL.path,
                        type: .symlink,
                        sizeBytes: 0,
                        modifiedDate: modDate,
                        isSymlink: true
                    )
                    childrenNodes.append(child)
                } else if isDirectory {
                    let subDirNode = try await scanDirectory(
                        url: itemURL,
                        progressHandler: progressHandler
                    )
                    dirSizeBytes += subDirNode.sizeBytes
                    childrenNodes.append(subDirNode)
                } else {
                    let size = Int64(resourceValues.totalFileAllocatedSize ?? resourceValues.fileSize ?? 0)
                    filesCount += 1
                    totalBytes += size
                    dirSizeBytes += size
                    
                    let fileNode = StorageNode(
                        name: itemURL.lastPathComponent,
                        path: itemURL.path,
                        type: .file,
                        sizeBytes: size,
                        modifiedDate: modDate
                    )
                    childrenNodes.append(fileNode)
                    
                    // Periodic throttle progress updates (every 250 files)
                    if filesCount % 250 == 0 {
                        let elapsed = Date().timeIntervalSince(startTime)
                        let progress = ScanProgress(
                            filesIndexed: filesCount,
                            directoriesIndexed: directoriesCount,
                            bytesMeasured: totalBytes,
                            currentPath: itemURL.path,
                            permissionDeniedCount: permissionDeniedCount,
                            isCompleted: false,
                            elapsedSeconds: elapsed
                        )
                        progressHandler?(progress)
                    }
                }
            }
        } catch {
            // Permission denied or unreadable directory
            permissionDeniedCount += 1
            return StorageNode(
                name: url.lastPathComponent,
                path: url.path,
                type: .directory,
                sizeBytes: 0,
                permissionDenied: true
            )
        }
        
        return StorageNode(
            name: url.lastPathComponent.isEmpty ? url.path : url.lastPathComponent,
            path: url.path,
            type: .directory,
            sizeBytes: dirSizeBytes,
            children: childrenNodes
        )
    }
    
    private func fileIdentifier(for url: URL) -> String? {
        do {
            let values = try url.resourceValues(forKeys: [.fileResourceIdentifierKey])
            if let id = values.fileResourceIdentifier {
                return "\(id)"
            }
        } catch {}
        return url.path
    }
}

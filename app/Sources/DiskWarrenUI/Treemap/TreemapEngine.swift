import Foundation
import CoreGraphics
import DiskWarrenCore

public struct TreemapTile: Identifiable, Sendable {
    public var id: String { node.id }
    public let node: StorageNode
    public let rect: CGRect
    public let depth: Int
    
    public init(node: StorageNode, rect: CGRect, depth: Int = 0) {
        self.node = node
        self.rect = rect
        self.depth = depth
    }
}

public struct TreemapEngine {
    public static func computeLayout(
        nodes: [StorageNode],
        in bounds: CGRect,
        minDimension: CGFloat = 4.0
    ) -> [TreemapTile] {
        guard bounds.width > 0 && bounds.height > 0 && !nodes.isEmpty else {
            return []
        }
        
        let validNodes = nodes.filter { $0.sizeBytes > 0 }
        guard !validNodes.isEmpty else { return [] }
        
        let totalWeight = validNodes.reduce(0) { $0 + Double($1.sizeBytes) }
        guard totalWeight > 0 else { return [] }
        
        // Normalize areas to bounding box area
        let totalArea = Double(bounds.width * bounds.height)
        let sortedNodes = validNodes.sorted { $0.sizeBytes > $1.sizeBytes }
        let areas = sortedNodes.map { (Double($0.sizeBytes) / totalWeight) * totalArea }
        
        var tiles: [TreemapTile] = []
        var remainingRect = bounds
        var currentRow: [(StorageNode, Double)] = []
        
        for (node, area) in zip(sortedNodes, areas) {
            let candidateRow = currentRow + [(node, area)]
            if currentRow.isEmpty || worstAspectRatio(currentRow, in: remainingRect) >= worstAspectRatio(candidateRow, in: remainingRect) {
                currentRow = candidateRow
            } else {
                // Layout current row and update remaining rectangle
                let rowTiles = layoutRow(currentRow, in: &remainingRect)
                tiles.append(contentsOf: rowTiles)
                currentRow = [(node, area)]
            }
        }
        
        if !currentRow.isEmpty {
            let rowTiles = layoutRow(currentRow, in: &remainingRect)
            tiles.append(contentsOf: rowTiles)
        }
        
        return tiles.filter { $0.rect.width >= minDimension && $0.rect.height >= minDimension }
    }
    
    private static func worstAspectRatio(_ row: [(StorageNode, Double)], in bounds: CGRect) -> Double {
        guard !row.isEmpty else { return Double.infinity }
        
        let side = min(Double(bounds.width), Double(bounds.height))
        guard side > 0 else { return Double.infinity }
        
        let rowSum = row.reduce(0.0) { $0 + $1.1 }
        guard rowSum > 0 else { return Double.infinity }
        
        let sideSquared = side * side
        var worst = 0.0
        
        for (_, area) in row {
            guard area > 0 else { continue }
            let r1 = (sideSquared * area) / (rowSum * rowSum)
            let r2 = (rowSum * rowSum) / (sideSquared * area)
            let aspect = max(r1, r2)
            if aspect > worst {
                worst = aspect
            }
        }
        
        return worst
    }
    
    private static func layoutRow(_ row: [(StorageNode, Double)], in bounds: inout CGRect) -> [TreemapTile] {
        guard !row.isEmpty else { return [] }
        
        let rowSum = row.reduce(0.0) { $0 + $1.1 }
        guard rowSum > 0 else { return [] }
        
        var tiles: [TreemapTile] = []
        let isHorizontal = bounds.width >= bounds.height
        
        if isHorizontal {
            let rowWidth = CGFloat(rowSum / Double(bounds.height))
            var currentY = bounds.minY
            
            for (node, area) in row {
                let tileHeight = CGFloat(area / rowSum) * bounds.height
                let tileRect = CGRect(x: bounds.minX, y: currentY, width: rowWidth, height: tileHeight)
                tiles.append(TreemapTile(node: node, rect: tileRect))
                currentY += tileHeight
            }
            
            bounds = CGRect(
                x: bounds.minX + rowWidth,
                y: bounds.minY,
                width: max(0, bounds.width - rowWidth),
                height: bounds.height
            )
        } else {
            let rowHeight = CGFloat(rowSum / Double(bounds.width))
            var currentX = bounds.minX
            
            for (node, area) in row {
                let tileWidth = CGFloat(area / rowSum) * bounds.width
                let tileRect = CGRect(x: currentX, y: bounds.minY, width: tileWidth, height: rowHeight)
                tiles.append(TreemapTile(node: node, rect: tileRect))
                currentX += tileWidth
            }
            
            bounds = CGRect(
                x: bounds.minX,
                y: bounds.minY + rowHeight,
                width: bounds.width,
                height: max(0, bounds.height - rowHeight)
            )
        }
        
        return tiles
    }
}

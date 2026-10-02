import SwiftUI
import DiskWarrenCore

public struct InteractiveTreemapView: View {
    public let rootNode: StorageNode
    public let onSelectNode: (StorageNode) -> Void
    public let onDrillDown: (StorageNode) -> Void
    
    @State private var hoveredTileId: String? = nil
    @State private var selectedTileId: String? = nil
    
    public init(
        rootNode: StorageNode,
        onSelectNode: @escaping (StorageNode) -> Void = { _ in },
        onDrillDown: @escaping (StorageNode) -> Void = { _ in }
    ) {
        self.rootNode = rootNode
        self.onSelectNode = onSelectNode
        self.onDrillDown = onDrillDown
    }
    
    public var body: some View {
        GeometryReader { geometry in
            let children = rootNode.children ?? [rootNode]
            let bounds = CGRect(origin: .zero, size: geometry.size)
            let tiles = TreemapEngine.computeLayout(nodes: children, in: bounds)
            
            ZStack(alignment: .topLeading) {
                ForEach(tiles) { tile in
                    let isHovered = hoveredTileId == tile.id
                    let isSelected = selectedTileId == tile.id
                    let color = WarrenTheme.color(for: tile.node.category)
                    
                    ZStack(alignment: .bottomLeading) {
                        RoundedRectangle(cornerRadius: 6)
                            .fill(color.opacity(isHovered ? 0.95 : (isSelected ? 0.9 : 0.8)))
                            .overlay(
                                RoundedRectangle(cornerRadius: 6)
                                    .stroke(
                                        isSelected ? Color.white : (isHovered ? Color.white.opacity(0.8) : WarrenTheme.subtleBorder),
                                        lineWidth: isSelected ? 2 : 1
                                    )
                            )
                        
                        // Label (only if tile is large enough to display text)
                        if tile.rect.width > 50 && tile.rect.height > 30 {
                            VStack(alignment: .leading, spacing: 1) {
                                Text(tile.node.name)
                                    .font(WarrenTypography.caption)
                                    .fontWeight(.semibold)
                                    .foregroundColor(.white)
                                    .lineLimit(1)
                                
                                Text(tile.node.formattedSize)
                                    .font(WarrenTypography.metricSmall)
                                    .foregroundColor(.white.opacity(0.85))
                            }
                            .padding(6)
                        }
                    }
                    .frame(width: tile.rect.width, height: tile.rect.height)
                    .position(x: tile.rect.midX, y: tile.rect.midY)
                    .onHover { hovering in
                        hoveredTileId = hovering ? tile.id : nil
                    }
                    .onTapGesture(count: 2) {
                        if tile.node.type == .directory {
                            onDrillDown(tile.node)
                        }
                    }
                    .onTapGesture(count: 1) {
                        selectedTileId = tile.id
                        onSelectNode(tile.node)
                    }
                    .accessibilityLabel("\(tile.node.name), \(tile.node.formattedSize)")
                }
            }
        }
    }
}

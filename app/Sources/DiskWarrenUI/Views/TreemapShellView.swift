import SwiftUI
import DiskWarrenCore

public struct TreemapShellView: View {
    public let rootNode: StorageNode
    public let breadcrumbs: [BreadcrumbItem]
    public let onSelectNode: (StorageNode) -> Void
    public let onDrillDown: (StorageNode) -> Void
    public let onBreadcrumbSelect: (BreadcrumbItem) -> Void
    
    public init(
        rootNode: StorageNode = MockData.sampleTree,
        breadcrumbs: [BreadcrumbItem] = [
            .init(name: "Macintosh HD", path: "/"),
            .init(name: "Users", path: "/Users"),
            .init(name: "saiph", path: "/Users/saiph")
        ],
        onSelectNode: @escaping (StorageNode) -> Void = { _ in },
        onDrillDown: @escaping (StorageNode) -> Void = { _ in },
        onBreadcrumbSelect: @escaping (BreadcrumbItem) -> Void = { _ in }
    ) {
        self.rootNode = rootNode
        self.breadcrumbs = breadcrumbs
        self.onSelectNode = onSelectNode
        self.onDrillDown = onDrillDown
        self.onBreadcrumbSelect = onBreadcrumbSelect
    }
    
    public var body: some View {
        VStack(spacing: 16) {
            // Header Bar
            HStack {
                BreadcrumbBar(items: breadcrumbs, onSelect: onBreadcrumbSelect)
                
                Spacer()
                
                HStack(spacing: 8) {
                    Image(systemName: "magnifyingglass")
                        .foregroundColor(.gray)
                    Text("Filter files...")
                        .font(WarrenTypography.body)
                        .foregroundColor(.gray)
                }
                .padding(.horizontal, 10)
                .padding(.vertical, 6)
                .background(WarrenTheme.darkCard)
                .cornerRadius(WarrenTheme.cornerSmall)
            }
            .padding(.horizontal, 24)
            .padding(.top, 16)
            
            // Visual Treemap Grid Shell
            GeometryReader { geometry in
                HStack(spacing: 12) {
                    // Main Treemap Visual Canvas
                    VStack(spacing: 8) {
                        HStack(spacing: 8) {
                            // Large Left Tile (e.g. Developer DerivedData)
                            Button(action: {
                                if let child = rootNode.children?.first { onSelectNode(child) }
                            }) {
                                ZStack(alignment: .bottomLeading) {
                                    RoundedRectangle(cornerRadius: 8)
                                        .fill(WarrenTheme.devCyan.opacity(0.85))
                                    
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text("Developer / Xcode")
                                            .font(WarrenTypography.headline)
                                            .foregroundColor(.black)
                                        Text("24.1 GB")
                                            .font(WarrenTypography.metricSmall)
                                            .foregroundColor(.black.opacity(0.8))
                                    }
                                    .padding(12)
                                }
                            }
                            .buttonStyle(.plain)
                            .frame(width: geometry.size.width * 0.45)
                            
                            // Right Split Tiles
                            VStack(spacing: 8) {
                                // Top Right (AI Models)
                                Button(action: {}) {
                                    ZStack(alignment: .bottomLeading) {
                                        RoundedRectangle(cornerRadius: 8)
                                            .fill(WarrenTheme.aiPurple.opacity(0.85))
                                        
                                        VStack(alignment: .leading, spacing: 2) {
                                            Text("AI Models (Ollama)")
                                                .font(WarrenTypography.headline)
                                                .foregroundColor(.white)
                                            Text("22.5 GB")
                                                .font(WarrenTypography.metricSmall)
                                                .foregroundColor(.white.opacity(0.8))
                                        }
                                        .padding(12)
                                    }
                                }
                                .buttonStyle(.plain)
                                
                                HStack(spacing: 8) {
                                    // Bottom Right Left (Applications)
                                    RoundedRectangle(cornerRadius: 8)
                                        .fill(WarrenTheme.appBlue.opacity(0.85))
                                        .overlay(
                                            VStack(alignment: .leading, spacing: 2) {
                                                Text("Applications")
                                                    .font(WarrenTypography.caption)
                                                    .foregroundColor(.white)
                                                Text("14.8 GB")
                                                    .font(WarrenTypography.metricSmall)
                                                    .foregroundColor(.white)
                                            }
                                            .padding(8),
                                            alignment: .bottomLeading
                                        )
                                    
                                    // Bottom Right Right (Caches & Temp)
                                    RoundedRectangle(cornerRadius: 8)
                                        .fill(WarrenTheme.warningAmber.opacity(0.85))
                                        .overlay(
                                            VStack(alignment: .leading, spacing: 2) {
                                                Text("Caches")
                                                    .font(WarrenTypography.caption)
                                                    .foregroundColor(.black)
                                                Text("8.2 GB")
                                                    .font(WarrenTypography.metricSmall)
                                                    .foregroundColor(.black)
                                            }
                                            .padding(8),
                                            alignment: .bottomLeading
                                        )
                                }
                            }
                        }
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    
                    // Inspector Sidebar
                    VStack(alignment: .leading, spacing: 16) {
                        Text("Selected Item Details")
                            .font(WarrenTypography.headline)
                            .foregroundColor(.white)
                        
                        WarrenCard(padding: 12) {
                            VStack(alignment: .leading, spacing: 8) {
                                HStack {
                                    Image(systemName: "folder.fill")
                                        .foregroundColor(WarrenTheme.brandTeal)
                                    Text("DerivedData")
                                        .font(WarrenTypography.body)
                                        .fontWeight(.semibold)
                                        .foregroundColor(.white)
                                }
                                
                                Text("/Users/saiph/Library/Developer/Xcode/DerivedData")
                                    .font(WarrenTypography.caption)
                                    .foregroundColor(.gray)
                                    .lineLimit(2)
                                
                                Divider()
                                
                                HStack {
                                    Text("Size:")
                                        .font(WarrenTypography.caption)
                                        .foregroundColor(.gray)
                                    Spacer()
                                    Text("24.10 GB")
                                        .font(WarrenTypography.metricMedium)
                                        .foregroundColor(.white)
                                }
                                
                                HStack {
                                    Text("Category:")
                                        .font(WarrenTypography.caption)
                                        .foregroundColor(.gray)
                                    Spacer()
                                    CategoryBadge(.developer)
                                }
                            }
                        }
                        
                        Spacer()
                        
                        WarrenButton("Drill Down", icon: "arrow.down.right.and.arrow.up.left", style: .secondary) {}
                            .frame(maxWidth: .infinity)
                    }
                    .frame(width: 240)
                }
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 24)
        }
        .background(WarrenTheme.darkBackground)
    }
}

import SwiftUI
import DiskWarrenCore

public struct GlobalSearchView: View {
    @Binding public var searchText: String
    public let results: [StorageNode]
    public let onSelectNode: (StorageNode) -> Void
    
    public init(
        searchText: Binding<String>,
        results: [StorageNode] = [],
        onSelectNode: @escaping (StorageNode) -> Void = { _ in }
    ) {
        self._searchText = searchText
        self.results = results
        self.onSelectNode = onSelectNode
    }
    
    public var body: some View {
        VStack(spacing: 16) {
            // Search Input Field
            HStack(spacing: 10) {
                Image(systemName: "magnifyingglass")
                    .foregroundColor(WarrenTheme.brandTeal)
                
                TextField("Search files, folders, or extensions (e.g. .gguf, DerivedData, node_modules)...", text: $searchText)
                    .font(WarrenTypography.body)
                    .textFieldStyle(.plain)
                    .foregroundColor(.white)
                
                if !searchText.isEmpty {
                    Button(action: { searchText = "" }) {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundColor(.gray)
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(12)
            .background(WarrenTheme.darkSurface)
            .cornerRadius(WarrenTheme.cornerSmall)
            .overlay(
                RoundedRectangle(cornerRadius: WarrenTheme.cornerSmall)
                    .stroke(WarrenTheme.brandTeal.opacity(0.4), lineWidth: 1)
            )
            .padding(.horizontal, 24)
            .padding(.top, 16)
            
            // Search Results Table
            if results.isEmpty && !searchText.isEmpty {
                EmptyStateView(
                    title: "No Matching Items Found",
                    subtitle: "No files or directories matching '\(searchText)' were found on this volume.",
                    icon: "magnifyingglass"
                )
            } else {
                ScrollView {
                    VStack(spacing: 8) {
                        ForEach(results) { node in
                            Button(action: { onSelectNode(node) }) {
                                HStack(spacing: 12) {
                                    Image(systemName: node.type == .directory ? "folder.fill" : node.category.iconName)
                                        .foregroundColor(WarrenTheme.color(for: node.category))
                                        .frame(width: 24)
                                    
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text(node.name)
                                            .font(WarrenTypography.body)
                                            .fontWeight(.semibold)
                                            .foregroundColor(.white)
                                        
                                        Text(node.path)
                                            .font(WarrenTypography.caption)
                                            .foregroundColor(.gray)
                                            .lineLimit(1)
                                            .truncationMode(.middle)
                                    }
                                    
                                    Spacer()
                                    
                                    CategoryBadge(node.category)
                                    
                                    Text(node.formattedSize)
                                        .font(WarrenTypography.metricSmall)
                                        .foregroundColor(.white)
                                }
                                .padding(10)
                                .background(WarrenTheme.darkSurface)
                                .cornerRadius(WarrenTheme.cornerSmall)
                                .overlay(
                                    RoundedRectangle(cornerRadius: WarrenTheme.cornerSmall)
                                        .stroke(WarrenTheme.subtleBorder, lineWidth: 1)
                                )
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.horizontal, 24)
                }
            }
        }
        .background(WarrenTheme.darkBackground)
    }
}

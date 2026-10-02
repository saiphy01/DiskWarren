import SwiftUI
import DiskWarrenCore

public struct RiskBadge: View {
    public let riskTier: RiskTier
    
    public init(_ riskTier: RiskTier) {
        self.riskTier = riskTier
    }
    
    public var body: some View {
        HStack(spacing: 4) {
            Circle()
                .fill(WarrenTheme.color(for: riskTier))
                .frame(width: 6, height: 6)
            
            Text(riskTier.rawValue)
                .font(WarrenTypography.caption)
                .fontWeight(.medium)
                .foregroundColor(WarrenTheme.color(for: riskTier))
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 4)
        .background(WarrenTheme.color(for: riskTier).opacity(0.12))
        .cornerRadius(WarrenTheme.cornerSmall)
        .overlay(
            RoundedRectangle(cornerRadius: WarrenTheme.cornerSmall)
                .stroke(WarrenTheme.color(for: riskTier).opacity(0.3), lineWidth: 1)
        )
    }
}

public struct CategoryBadge: View {
    public let category: StorageCategory
    
    public init(_ category: StorageCategory) {
        self.category = category
    }
    
    public var body: some View {
        HStack(spacing: 4) {
            Image(systemName: category.iconName)
                .font(.system(size: 10))
            
            Text(category.rawValue)
                .font(WarrenTypography.caption)
        }
        .foregroundColor(WarrenTheme.color(for: category))
        .padding(.horizontal, 6)
        .padding(.vertical, 3)
        .background(WarrenTheme.color(for: category).opacity(0.15))
        .cornerRadius(4)
    }
}

public struct BreadcrumbItem: Identifiable, Hashable {
    public let id = UUID()
    public let name: String
    public let path: String
    
    public init(name: String, path: String) {
        self.name = name
        self.path = path
    }
}

public struct BreadcrumbBar: View {
    public let items: [BreadcrumbItem]
    public let onSelect: (BreadcrumbItem) -> Void
    
    public init(items: [BreadcrumbItem], onSelect: @escaping (BreadcrumbItem) -> Void) {
        self.items = items
        self.onSelect = onSelect
    }
    
    public var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 6) {
                ForEach(Array(items.enumerated()), id: \.element.id) { index, item in
                    Button(action: { onSelect(item) }) {
                        HStack(spacing: 4) {
                            if index == 0 {
                                Image(systemName: "internaldrive.fill")
                                    .font(.system(size: 11))
                            }
                            Text(item.name)
                                .font(WarrenTypography.caption)
                                .foregroundColor(index == items.count - 1 ? .white : .gray)
                        }
                        .padding(.horizontal, 6)
                        .padding(.vertical, 3)
                        .background(index == items.count - 1 ? WarrenTheme.darkCard : Color.clear)
                        .cornerRadius(4)
                    }
                    .buttonStyle(.plain)
                    
                    if index < items.count - 1 {
                        Image(systemName: "chevron.right")
                            .font(.system(size: 9, weight: .bold))
                            .foregroundColor(.gray)
                    }
                }
            }
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(WarrenTheme.darkSurface)
            .cornerRadius(WarrenTheme.cornerSmall)
        }
    }
}

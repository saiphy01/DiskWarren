import SwiftUI

public struct WarrenCard<Content: View>: View {
    private let content: Content
    private let padding: CGFloat
    private let cornerRadius: CGFloat
    
    public init(
        padding: CGFloat = 16,
        cornerRadius: CGFloat = WarrenTheme.cornerMedium,
        @ViewBuilder content: () -> Content
    ) {
        self.padding = padding
        self.cornerRadius = cornerRadius
        self.content = content()
    }
    
    public var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            content
        }
        .padding(padding)
        .background(
            RoundedRectangle(cornerRadius: cornerRadius)
                .fill(WarrenTheme.darkSurface)
        )
        .overlay(
            RoundedRectangle(cornerRadius: cornerRadius)
                .stroke(WarrenTheme.subtleBorder, lineWidth: WarrenTheme.borderWidth)
        )
    }
}

public enum WarrenButtonStyle {
    case primary
    case secondary
    case danger
    case subtle
}

public struct WarrenButton: View {
    private let title: String
    private let icon: String?
    private let style: WarrenButtonStyle
    private let isEnabled: Bool
    private let action: () -> Void
    
    public init(
        _ title: String,
        icon: String? = nil,
        style: WarrenButtonStyle = .primary,
        isEnabled: Bool = true,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.icon = icon
        self.style = style
        self.isEnabled = isEnabled
        self.action = action
    }
    
    public var body: some View {
        Button(action: {
            if isEnabled { action() }
        }) {
            HStack(spacing: 8) {
                if let icon = icon {
                    Image(systemName: icon)
                        .font(.system(size: 13, weight: .semibold))
                }
                Text(title)
                    .font(WarrenTypography.body)
                    .fontWeight(.semibold)
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 8)
            .background(backgroundView)
            .foregroundColor(foregroundColor)
            .cornerRadius(WarrenTheme.cornerSmall)
            .overlay(
                RoundedRectangle(cornerRadius: WarrenTheme.cornerSmall)
                    .stroke(borderColor, lineWidth: 1)
            )
        }
        .buttonStyle(.plain)
        .disabled(!isEnabled)
        .opacity(isEnabled ? 1.0 : 0.5)
    }
    
    @ViewBuilder
    private var backgroundView: some View {
        switch style {
        case .primary:
            WarrenTheme.brandTeal
        case .secondary:
            WarrenTheme.darkCard
        case .danger:
            WarrenTheme.dangerCoral
        case .subtle:
            Color.clear
        }
    }
    
    private var foregroundColor: Color {
        switch style {
        case .primary:
            return .black
        case .secondary:
            return .white
        case .danger:
            return .white
        case .subtle:
            return WarrenTheme.brandTeal
        }
    }
    
    private var borderColor: Color {
        switch style {
        case .secondary:
            return WarrenTheme.subtleBorder
        case .subtle:
            return WarrenTheme.brandTeal.opacity(0.4)
        default:
            return Color.clear
        }
    }
}

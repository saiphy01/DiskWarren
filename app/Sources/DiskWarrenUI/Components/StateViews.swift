import SwiftUI

public struct LoadingStateView: View {
    public let message: String
    
    public init(_ message: String = "Scanning filesystem...") {
        self.message = message
    }
    
    public var body: some View {
        VStack(spacing: 16) {
            ProgressView()
                .progressViewStyle(.circular)
                .scaleEffect(1.3)
                .tint(WarrenTheme.brandTeal)
            
            Text(message)
                .font(WarrenTypography.body)
                .foregroundColor(.gray)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(WarrenTheme.darkBackground)
    }
}

public struct EmptyStateView: View {
    public let title: String
    public let subtitle: String
    public let icon: String
    public let actionTitle: String?
    public let action: (() -> Void)?
    
    public init(
        title: String,
        subtitle: String,
        icon: String = "tray.fill",
        actionTitle: String? = nil,
        action: (() -> Void)? = nil
    ) {
        self.title = title
        self.subtitle = subtitle
        self.icon = icon
        self.actionTitle = actionTitle
        self.action = action
    }
    
    public var body: some View {
        VStack(spacing: 16) {
            Image(systemName: icon)
                .font(.system(size: 40))
                .foregroundColor(.gray.opacity(0.6))
            
            VStack(spacing: 6) {
                Text(title)
                    .font(WarrenTypography.title2)
                    .foregroundColor(.white)
                
                Text(subtitle)
                    .font(WarrenTypography.body)
                    .foregroundColor(.gray)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 360)
            }
            
            if let actionTitle = actionTitle, let action = action {
                WarrenButton(actionTitle, style: .primary) {
                    action()
                }
                .padding(.top, 8)
            }
        }
        .padding(32)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(WarrenTheme.darkBackground)
    }
}

public struct ErrorStateView: View {
    public let title: String
    public let errorMessage: String
    public let retryAction: (() -> Void)?
    
    public init(
        title: String = "Scan Encountered an Issue",
        errorMessage: String,
        retryAction: (() -> Void)? = nil
    ) {
        self.title = title
        self.errorMessage = errorMessage
        self.retryAction = retryAction
    }
    
    public var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "exclamationmark.octagon.fill")
                .font(.system(size: 44))
                .foregroundColor(WarrenTheme.dangerCoral)
            
            VStack(spacing: 6) {
                Text(title)
                    .font(WarrenTypography.title2)
                    .foregroundColor(.white)
                
                Text(errorMessage)
                    .font(WarrenTypography.body)
                    .foregroundColor(.gray)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 400)
            }
            
            if let retry = retryAction {
                WarrenButton("Retry Scan", icon: "arrow.clockwise", style: .secondary) {
                    retry()
                }
            }
        }
        .padding(32)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(WarrenTheme.darkBackground)
    }
}

public struct PermissionDeniedView: View {
    public let onOpenSettings: () -> Void
    
    public init(onOpenSettings: @escaping () -> Void) {
        self.onOpenSettings = onOpenSettings
    }
    
    public var body: some View {
        VStack(spacing: 18) {
            Image(systemName: "lock.shield.fill")
                .font(.system(size: 48))
                .foregroundColor(WarrenTheme.warningAmber)
            
            VStack(spacing: 8) {
                Text("Full Disk Access Recommended")
                    .font(WarrenTypography.title1)
                    .foregroundColor(.white)
                
                Text("macOS requires explicit permission to scan System Data, Time Machine snapshots, and application caches. DiskWarren strictly stays local and never uploads your files.")
                    .font(WarrenTypography.body)
                    .foregroundColor(.gray)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 460)
            }
            
            VStack(alignment: .leading, spacing: 10) {
                HStack(spacing: 10) {
                    Text("1.")
                        .font(WarrenTypography.headline)
                        .foregroundColor(WarrenTheme.brandTeal)
                    Text("Open **System Settings > Privacy & Security**")
                        .font(WarrenTypography.body)
                        .foregroundColor(.white)
                }
                HStack(spacing: 10) {
                    Text("2.")
                        .font(WarrenTypography.headline)
                        .foregroundColor(WarrenTheme.brandTeal)
                    Text("Select **Full Disk Access**")
                        .font(WarrenTypography.body)
                        .foregroundColor(.white)
                }
                HStack(spacing: 10) {
                    Text("3.")
                        .font(WarrenTypography.headline)
                        .foregroundColor(WarrenTheme.brandTeal)
                    Text("Toggle **DiskWarren** ON")
                        .font(WarrenTypography.body)
                        .foregroundColor(.white)
                }
            }
            .padding(16)
            .background(WarrenTheme.darkCard)
            .cornerRadius(WarrenTheme.cornerSmall)
            
            WarrenButton("Open System Settings", icon: "arrow.up.forward.app", style: .primary) {
                onOpenSettings()
            }
            .padding(.top, 6)
        }
        .padding(32)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(WarrenTheme.darkBackground)
    }
}

import SwiftUI
import DiskWarrenCore

public struct SafeCleanupReviewView: View {
    public let candidates: [CleanupCandidate]
    public let onConfirmTrash: () -> Void
    public let onDismiss: () -> Void
    
    public init(
        candidates: [CleanupCandidate] = MockData.cleanupCandidates.filter { $0.isSelected },
        onConfirmTrash: @escaping () -> Void = {},
        onDismiss: @escaping () -> Void = {}
    ) {
        self.candidates = candidates
        self.onConfirmTrash = onConfirmTrash
        self.onDismiss = onDismiss
    }
    
    public var body: some View {
        ZStack {
            Color.black.opacity(0.65)
                .ignoresSafeArea()
            
            ConfirmCleanupModal(
                candidates: candidates,
                onConfirm: onConfirmTrash,
                onCancel: onDismiss
            )
        }
    }
}

public struct AppUninstallerShellView: View {
    public struct AppItem: Identifiable {
        public let id = UUID()
        public let name: String
        public let bundleId: String
        public let appSize: Int64
        public let leftoversSize: Int64
        public let iconName: String
        
        public var totalSize: Int64 { appSize + leftoversSize }
    }
    
    public let sampleApps: [AppItem] = [
        .init(name: "Xcode.app", bundleId: "com.apple.dt.Xcode", appSize: 32_000_000_000, leftoversSize: 24_100_000_000, iconName: "hammer.fill"),
        .init(name: "Docker.app", bundleId: "com.docker.docker", appSize: 2_400_000_000, leftoversSize: 18_200_000_000, iconName: "shippingbox.fill"),
        .init(name: "Slack.app", bundleId: "com.tinyspeck.slackmacgap", appSize: 420_000_000, leftoversSize: 1_200_000_000, iconName: "message.fill")
    ]
    
    public init() {}
    
    public var body: some View {
        VStack(spacing: 20) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    HStack(spacing: 8) {
                        Image(systemName: "trash.circle.fill")
                            .foregroundColor(WarrenTheme.appBlue)
                        Text("Application Uninstaller & Leftovers")
                            .font(WarrenTypography.title1)
                            .foregroundColor(.white)
                    }
                    Text("Completely remove apps along with their hidden Application Support, Caches, and Preferences.")
                        .font(WarrenTypography.caption)
                        .foregroundColor(.gray)
                }
                Spacer()
            }
            .padding(.horizontal, 24)
            .padding(.top, 20)
            
            ScrollView {
                VStack(spacing: 12) {
                    ForEach(sampleApps) { app in
                        HStack(spacing: 14) {
                            Image(systemName: app.iconName)
                                .font(.system(size: 24))
                                .foregroundColor(WarrenTheme.appBlue)
                                .frame(width: 32)
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text(app.name)
                                    .font(WarrenTypography.headline)
                                    .foregroundColor(.white)
                                Text(app.bundleId)
                                    .font(WarrenTypography.caption)
                                    .foregroundColor(.gray)
                            }
                            
                            Spacer()
                            
                            VStack(alignment: .trailing, spacing: 2) {
                                Text(ByteCountFormatter.string(fromByteCount: app.totalSize, countStyle: .file))
                                    .font(WarrenTypography.metricMedium)
                                    .foregroundColor(.white)
                                Text("incl. \(ByteCountFormatter.string(fromByteCount: app.leftoversSize, countStyle: .file)) leftovers")
                                    .font(WarrenTypography.caption)
                                    .foregroundColor(WarrenTheme.warningAmber)
                            }
                            
                            WarrenButton("Uninstall", style: .secondary) {}
                        }
                        .padding(14)
                        .background(WarrenTheme.darkSurface)
                        .cornerRadius(WarrenTheme.cornerSmall)
                        .overlay(
                            RoundedRectangle(cornerRadius: WarrenTheme.cornerSmall)
                                .stroke(WarrenTheme.subtleBorder, lineWidth: 1)
                        )
                    }
                }
                .padding(.horizontal, 24)
            }
        }
        .background(WarrenTheme.darkBackground)
    }
}

public struct DuplicateFinderShellView: View {
    public init() {}
    
    public var body: some View {
        VStack(spacing: 20) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    HStack(spacing: 8) {
                        Image(systemName: "doc.on.doc.fill")
                            .foregroundColor(WarrenTheme.duplicatePink)
                        Text("Duplicate File Finder")
                            .font(WarrenTypography.title1)
                            .foregroundColor(.white)
                    }
                    Text("Cryptographically verified identical files across your Mac. Discard duplicates safely.")
                        .font(WarrenTypography.caption)
                        .foregroundColor(.gray)
                }
                Spacer()
                WarrenButton("Auto-Select Duplicates", style: .secondary) {}
            }
            .padding(.horizontal, 24)
            .padding(.top, 20)
            
            EmptyStateView(
                title: "No Duplicate Scan Run Yet",
                subtitle: "Run a storage scan to discover byte-for-byte identical files consuming redundant storage.",
                icon: "doc.on.doc.fill",
                actionTitle: "Scan for Duplicates"
            ) {}
        }
        .background(WarrenTheme.darkBackground)
    }
}

public struct SettingsShellView: View {
    public init() {}
    
    public var body: some View {
        VStack(alignment: .leading, spacing: 24) {
            Text("Settings & Privacy")
                .font(WarrenTypography.title1)
                .foregroundColor(.white)
            
            WarrenCard(padding: 20) {
                VStack(alignment: .leading, spacing: 14) {
                    Text("Privacy & Telemetry")
                        .font(WarrenTypography.headline)
                        .foregroundColor(.white)
                    
                    Toggle("Transmit zero file paths and metadata (Enforced)", isOn: .constant(true))
                        .disabled(true)
                        .tint(WarrenTheme.brandEmerald)
                    
                    Toggle("Check for app updates automatically", isOn: .constant(true))
                        .tint(WarrenTheme.brandTeal)
                }
            }
            
            WarrenCard(padding: 20) {
                VStack(alignment: .leading, spacing: 14) {
                    Text("Safety Controls")
                        .font(WarrenTypography.headline)
                        .foregroundColor(.white)
                    
                    Toggle("Always move items to Trash (Never delete permanently)", isOn: .constant(true))
                        .disabled(true)
                        .tint(WarrenTheme.brandEmerald)
                    
                    Toggle("Require confirmation before recycling > 5 GB", isOn: .constant(true))
                        .tint(WarrenTheme.brandTeal)
                }
            }
            
            Spacer()
        }
        .padding(24)
        .background(WarrenTheme.darkBackground)
    }
}

public struct OnboardingShellView: View {
    public let onComplete: () -> Void
    
    public init(onComplete: @escaping () -> Void = {}) {
        self.onComplete = onComplete
    }
    
    public var body: some View {
        VStack(spacing: 24) {
            Image(systemName: "internaldrive.fill")
                .font(.system(size: 56))
                .foregroundColor(WarrenTheme.brandTeal)
            
            VStack(spacing: 8) {
                Text("Welcome to DiskWarren")
                    .font(WarrenTypography.display)
                    .foregroundColor(.white)
                
                Text("Know exactly where your Mac's storage went — and safely take it back.")
                    .font(WarrenTypography.body)
                    .foregroundColor(.gray)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: 440)
            }
            
            HStack(spacing: 20) {
                VStack(spacing: 8) {
                    Image(systemName: "lock.shield.fill")
                        .font(.system(size: 24))
                        .foregroundColor(WarrenTheme.brandEmerald)
                    Text("100% Local & Private")
                        .font(WarrenTypography.headline)
                        .foregroundColor(.white)
                    Text("No file paths or filenames ever leave your Mac.")
                        .font(WarrenTypography.caption)
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                }
                .frame(width: 150)
                
                VStack(spacing: 8) {
                    Image(systemName: "trash.circle.fill")
                        .font(.system(size: 24))
                        .foregroundColor(WarrenTheme.warningAmber)
                    Text("Trash-First Safety")
                        .font(WarrenTypography.headline)
                        .foregroundColor(.white)
                    Text("All purges route through Trash. Fully restorable.")
                        .font(WarrenTypography.caption)
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                }
                .frame(width: 150)
                
                VStack(spacing: 8) {
                    Image(systemName: "cpu.fill")
                        .font(.system(size: 24))
                        .foregroundColor(WarrenTheme.aiPurple)
                    Text("Dev & AI Built-In")
                        .font(WarrenTypography.headline)
                        .foregroundColor(.white)
                    Text("Ollama, Xcode, Docker, Node intelligence.")
                        .font(WarrenTypography.caption)
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                }
                .frame(width: 150)
            }
            .padding(.vertical, 16)
            
            WarrenButton("Get Started", icon: "arrow.right", style: .primary) {
                onComplete()
            }
        }
        .padding(40)
        .frame(width: 600, height: 440)
        .background(WarrenTheme.darkBackground)
    }
}

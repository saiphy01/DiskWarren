import SwiftUI
import DiskWarrenCore

#if canImport(AppKit)
import AppKit
#endif

// MARK: - Native macOS Traffic Light Window Controls
public struct MacTrafficLightControls: View {
    @State private var isHovering = false
    
    public init() {}
    
    public var body: some View {
        HStack(spacing: 8) {
            // Close Button (Red)
            Button(action: {
                #if os(macOS)
                NSApplication.shared.keyWindow?.close()
                #endif
            }) {
                ZStack {
                    Circle()
                        .fill(Color(red: 255/255, green: 95/255, blue: 86/255))
                        .frame(width: 12, height: 12)
                        .overlay(Circle().stroke(Color.black.opacity(0.12), lineWidth: 0.5))
                    
                    if isHovering {
                        Image(systemName: "xmark")
                            .font(.system(size: 7, weight: .bold))
                            .foregroundColor(Color(red: 76/255, green: 0/255, blue: 0/255))
                    }
                }
            }
            .buttonStyle(.plain)
            .help("Close Window")
            
            // Minimize Button (Yellow)
            Button(action: {
                #if os(macOS)
                NSApplication.shared.keyWindow?.miniaturize(nil)
                #endif
            }) {
                ZStack {
                    Circle()
                        .fill(Color(red: 255/255, green: 189/255, blue: 46/255))
                        .frame(width: 12, height: 12)
                        .overlay(Circle().stroke(Color.black.opacity(0.12), lineWidth: 0.5))
                    
                    if isHovering {
                        Image(systemName: "minus")
                            .font(.system(size: 7, weight: .bold))
                            .foregroundColor(Color(red: 89/255, green: 58/255, blue: 0/255))
                    }
                }
            }
            .buttonStyle(.plain)
            .help("Minimize Window")
            
            // Zoom / Fullscreen Button (Green)
            Button(action: {
                #if os(macOS)
                NSApplication.shared.keyWindow?.zoom(nil)
                #endif
            }) {
                ZStack {
                    Circle()
                        .fill(Color(red: 39/255, green: 201/255, blue: 63/255))
                        .frame(width: 12, height: 12)
                        .overlay(Circle().stroke(Color.black.opacity(0.12), lineWidth: 0.5))
                    
                    if isHovering {
                        Image(systemName: "plus")
                            .font(.system(size: 7, weight: .bold))
                            .foregroundColor(Color(red: 0/255, green: 77/255, blue: 26/255))
                    }
                }
            }
            .buttonStyle(.plain)
            .help("Zoom Window")
        }
        .onHover { hovering in
            withAnimation(.easeInOut(duration: 0.15)) {
                isHovering = hovering
            }
        }
    }
}

public enum AppNavigationItem: String, CaseIterable, Identifiable {
    case dashboard = "Dashboard"
    case treemap = "Treemap"
    case largeFiles = "Large Files"
    case developer = "Developer Intelligence"
    case aiStorage = "AI Storage"
    case duplicates = "Duplicates"
    case uninstaller = "Uninstaller"
    case settings = "Settings"
    
    public var id: String { rawValue }
    
    public var iconName: String {
        switch self {
        case .dashboard: return WarrenIcons.dashboard
        case .treemap: return WarrenIcons.treemap
        case .largeFiles: return WarrenIcons.largeFiles
        case .developer: return WarrenIcons.developer
        case .aiStorage: return WarrenIcons.aiModels
        case .duplicates: return WarrenIcons.duplicates
        case .uninstaller: return WarrenIcons.uninstaller
        case .settings: return WarrenIcons.settings
        }
    }
}

public struct MainAppShellView: View {
    @Binding public var selectedItem: AppNavigationItem?
    public let permissionStatus: PermissionStatus
    public let onOpenFDA: () -> Void
    public let onStartScan: () -> Void
    
    public init(
        selectedItem: Binding<AppNavigationItem?>,
        permissionStatus: PermissionStatus = .granted,
        onOpenFDA: @escaping () -> Void = {},
        onStartScan: @escaping () -> Void = {}
    ) {
        self._selectedItem = selectedItem
        self.permissionStatus = permissionStatus
        self.onOpenFDA = onOpenFDA
        self.onStartScan = onStartScan
    }
    
    public var body: some View {
        NavigationSplitView {
            // Sidebar
            VStack(alignment: .leading, spacing: 0) {
                // macOS Window Controls (Traffic Lights)
                HStack {
                    MacTrafficLightControls()
                    Spacer()
                }
                .padding(.horizontal, 14)
                .padding(.top, 14)
                .padding(.bottom, 8)
                
                // Brand Header with Official Vector Icon
                HStack(spacing: 10) {
                    DiskWarrenLogoView(size: 30)
                    VStack(alignment: .leading, spacing: 1) {
                        HStack(spacing: 6) {
                            Text("DiskWarren")
                                .font(WarrenTypography.body)
                                .fontWeight(.bold)
                                .foregroundColor(WarrenTheme.textPrimary)
                            Text("v1.0")
                                .font(.system(size: 9, weight: .bold))
                                .padding(.horizontal, 5)
                                .padding(.vertical, 2)
                                .background(WarrenTheme.brandTeal.opacity(0.14))
                                .foregroundColor(WarrenTheme.brandTeal)
                                .cornerRadius(4)
                        }
                        Text("Mac Storage Intelligence")
                            .font(WarrenTypography.caption)
                            .foregroundColor(WarrenTheme.textSecondary)
                    }
                    Spacer()
                }
                .padding(.horizontal, 14)
                .padding(.bottom, 12)
                
                // Disk Header
                HStack(spacing: 10) {
                    Image(systemName: "internaldrive.fill")
                        .font(.system(size: 18))
                        .foregroundColor(WarrenTheme.brandTeal)
                    
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Macintosh HD")
                            .font(WarrenTypography.body)
                            .fontWeight(.bold)
                            .foregroundColor(WarrenTheme.textPrimary)
                        Text("142.8 GB Free of 494 GB")
                            .font(WarrenTypography.caption)
                            .foregroundColor(WarrenTheme.textSecondary)
                    }
                    Spacer()
                }
                .padding(12)
                .background(WarrenTheme.cardBackground)
                .cornerRadius(WarrenTheme.cornerSmall)
                .overlay(
                    RoundedRectangle(cornerRadius: WarrenTheme.cornerSmall)
                        .stroke(WarrenTheme.subtleBorder, lineWidth: 1)
                )
                .padding(.horizontal, 12)
                .padding(.bottom, 8)
                
                // Navigation List
                List(selection: $selectedItem) {
                    Section("OVERVIEW") {
                        NavigationLink(value: AppNavigationItem.dashboard) {
                            Label(AppNavigationItem.dashboard.rawValue, systemImage: AppNavigationItem.dashboard.iconName)
                        }
                        NavigationLink(value: AppNavigationItem.treemap) {
                            Label(AppNavigationItem.treemap.rawValue, systemImage: AppNavigationItem.treemap.iconName)
                        }
                    }
                    
                    Section("INTELLIGENCE") {
                        NavigationLink(value: AppNavigationItem.developer) {
                            Label(AppNavigationItem.developer.rawValue, systemImage: AppNavigationItem.developer.iconName)
                        }
                        NavigationLink(value: AppNavigationItem.aiStorage) {
                            Label(AppNavigationItem.aiStorage.rawValue, systemImage: AppNavigationItem.aiStorage.iconName)
                        }
                        NavigationLink(value: AppNavigationItem.duplicates) {
                            Label(AppNavigationItem.duplicates.rawValue, systemImage: AppNavigationItem.duplicates.iconName)
                        }
                        NavigationLink(value: AppNavigationItem.uninstaller) {
                            Label(AppNavigationItem.uninstaller.rawValue, systemImage: AppNavigationItem.uninstaller.iconName)
                        }
                    }
                    
                    Section("PREFERENCES") {
                        NavigationLink(value: AppNavigationItem.settings) {
                            Label(AppNavigationItem.settings.rawValue, systemImage: AppNavigationItem.settings.iconName)
                        }
                    }
                }
                .listStyle(.sidebar)
                
                Spacer()
                
                // FDA Status Pill
                if permissionStatus != .granted {
                    Button(action: onOpenFDA) {
                        HStack(spacing: 6) {
                            Image(systemName: "exclamationmark.shield.fill")
                                .foregroundColor(WarrenTheme.warningAmber)
                            Text("Full Disk Access: Limited")
                                .font(WarrenTypography.caption)
                                .foregroundColor(WarrenTheme.warningAmber)
                        }
                        .padding(8)
                        .frame(maxWidth: .infinity)
                        .background(WarrenTheme.warningAmber.opacity(0.12))
                        .cornerRadius(WarrenTheme.cornerSmall)
                    }
                    .buttonStyle(.plain)
                    .padding(12)
                }
            }
            .navigationSplitViewColumnWidth(min: 210, ideal: 230, max: 280)
        } detail: {
            // Main Content Router
            switch selectedItem ?? .dashboard {
            case .dashboard:
                DashboardView(onStartScan: onStartScan)
            case .treemap:
                TreemapShellView()
            case .largeFiles:
                EmptyStateView(
                    title: "Large Files Explorer",
                    subtitle: "Scan to locate files over 100 MB consuming storage.",
                    icon: WarrenIcons.largeFiles
                )
            case .developer:
                DeveloperCleanerView()
            case .aiStorage:
                AIStorageView()
            case .duplicates:
                DuplicateFinderShellView()
            case .uninstaller:
                AppUninstallerShellView()
            case .settings:
                SettingsShellView()
            }
        }
    }
}

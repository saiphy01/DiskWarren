import SwiftUI
import DiskWarrenCore

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
                // Disk Header
                HStack(spacing: 8) {
                    Image(systemName: "internaldrive.fill")
                        .foregroundColor(WarrenTheme.brandTeal)
                    
                    VStack(alignment: .leading, spacing: 1) {
                        Text("Macintosh HD")
                            .font(WarrenTypography.body)
                            .fontWeight(.semibold)
                            .foregroundColor(.white)
                        Text("142.8 GB Free of 494 GB")
                            .font(WarrenTypography.caption)
                            .foregroundColor(.gray)
                    }
                    Spacer()
                }
                .padding(14)
                .background(WarrenTheme.darkSurface)
                .cornerRadius(WarrenTheme.cornerSmall)
                .padding(.horizontal, 12)
                .padding(.top, 12)
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

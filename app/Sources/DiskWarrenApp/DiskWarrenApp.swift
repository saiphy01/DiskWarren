import SwiftUI
import DiskWarrenCore
import DiskWarrenUI

@main
public struct DiskWarrenApp: App {
    @StateObject private var coordinator = AppCoordinator()
    
    public init() {}
    
    public var body: some Scene {
        WindowGroup {
            MainAppShellView(
                selectedItem: $coordinator.selectedNavigationItem,
                permissionStatus: coordinator.permissionStatus,
                onOpenFDA: { coordinator.requestFullDiskAccess() },
                onStartScan: { coordinator.startScan() }
            )
            .frame(minWidth: 900, minHeight: 600)
            .background(WarrenTheme.darkBackground)
            .sheet(isPresented: $coordinator.showOnboarding) {
                OnboardingShellView {
                    coordinator.showOnboarding = false
                }
            }
        }
        .windowStyle(.hiddenTitleBar)
        .commands {
            CommandGroup(replacing: .newItem) {
                Button("Start Storage Scan") {
                    coordinator.startScan()
                }
                .keyboardShortcut("s", modifiers: .command)
            }
        }
    }
}

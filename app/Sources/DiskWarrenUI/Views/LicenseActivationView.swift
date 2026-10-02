import SwiftUI
import DiskWarrenCore

public struct LicenseActivationView: View {
    @ObservedObject public var licenseManager = LicenseManager.shared
    @State private var inputKey: String = ""
    @State private var errorMessage: String? = nil
    public let onDismiss: () -> Void
    
    public init(onDismiss: @escaping () -> Void = {}) {
        self.onDismiss = onDismiss
    }
    
    public var body: some View {
        VStack(spacing: 20) {
            // Header
            HStack {
                Image(systemName: "key.fill")
                    .foregroundColor(WarrenTheme.brandTeal)
                Text("DiskWarren Licensing")
                    .font(WarrenTypography.title2)
                    .foregroundColor(.white)
                Spacer()
                Button(action: onDismiss) {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.gray)
                }
                .buttonStyle(.plain)
            }
            
            if licenseManager.isProActivated {
                // Activated state
                VStack(spacing: 14) {
                    Image(systemName: "checkmark.seal.fill")
                        .font(.system(size: 48))
                        .foregroundColor(WarrenTheme.brandEmerald)
                    
                    Text("DiskWarren Pro Activated")
                        .font(WarrenTypography.title1)
                        .foregroundColor(.white)
                    
                    Text("Lifetime license active. All features unlocked with unlimited safe cleanup and duplicate removal.")
                        .font(WarrenTypography.body)
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                    
                    WarrenButton("Deactivate on this Mac", style: .secondary) {
                        licenseManager.deactivateLicense()
                    }
                    .padding(.top, 8)
                }
                .padding(20)
            } else {
                // Input state
                VStack(alignment: .leading, spacing: 14) {
                    Text("Enter your DiskWarren Pro license key to unlock unlimited batch cleanup, uninstaller leftovers, and duplicate file removal.")
                        .font(WarrenTypography.body)
                        .foregroundColor(.gray)
                    
                    TextField("WARREN-PRO-XXXXXX-XXXX", text: $inputKey)
                        .font(WarrenTypography.metricMedium)
                        .textFieldStyle(.plain)
                        .padding(10)
                        .background(WarrenTheme.darkCard)
                        .cornerRadius(WarrenTheme.cornerSmall)
                        .overlay(
                            RoundedRectangle(cornerRadius: WarrenTheme.cornerSmall)
                                .stroke(WarrenTheme.subtleBorder, lineWidth: 1)
                        )
                    
                    if let err = errorMessage {
                        Text(err)
                            .font(WarrenTypography.caption)
                            .foregroundColor(WarrenTheme.dangerCoral)
                    }
                    
                    HStack(spacing: 12) {
                        WarrenButton("Activate License", icon: "checkmark", style: .primary) {
                            do {
                                let success = try licenseManager.activateLicense(key: inputKey)
                                if !success {
                                    errorMessage = "Invalid license key or checksum mismatch."
                                } else {
                                    errorMessage = nil
                                }
                            } catch {
                                errorMessage = error.localizedDescription
                            }
                        }
                        
                        Spacer()
                        
                        Link(destination: URL(string: "https://diskwarren.com/#pricing")!) {
                            HStack(spacing: 4) {
                                Text("Buy License ($29)")
                                    .font(WarrenTypography.body)
                                    .foregroundColor(WarrenTheme.brandTeal)
                                Image(systemName: "arrow.up.forward.app")
                                    .font(.system(size: 11))
                                    .foregroundColor(WarrenTheme.brandTeal)
                            }
                        }
                    }
                }
            }
        }
        .padding(24)
        .frame(width: 480)
        .background(WarrenTheme.darkSurface)
        .cornerRadius(WarrenTheme.cornerLarge)
        .overlay(
            RoundedRectangle(cornerRadius: WarrenTheme.cornerLarge)
                .stroke(WarrenTheme.subtleBorder, lineWidth: 1)
        )
    }
}

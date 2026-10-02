import SwiftUI
import DiskWarrenCore

public struct ConfirmCleanupModal: View {
    public let candidates: [CleanupCandidate]
    public let onConfirm: () -> Void
    public let onCancel: () -> Void
    
    public init(
        candidates: [CleanupCandidate],
        onConfirm: @escaping () -> Void,
        onCancel: @escaping () -> Void
    ) {
        self.candidates = candidates
        self.onConfirm = onConfirm
        self.onCancel = onCancel
    }
    
    private var totalBytes: Int64 {
        candidates.reduce(0) { $0 + $1.sizeBytes }
    }
    
    public var body: some View {
        VStack(spacing: 20) {
            // Header
            HStack(spacing: 12) {
                Image(systemName: "exclamationmark.triangle.fill")
                    .font(.system(size: 28))
                    .foregroundColor(WarrenTheme.warningAmber)
                
                VStack(alignment: .leading, spacing: 4) {
                    Text("Confirm Safe Space Reclamation")
                        .font(WarrenTypography.title2)
                        .foregroundColor(.white)
                    
                    Text("\(candidates.count) items selected totaling \(ByteCountFormatter.string(fromByteCount: totalBytes, countStyle: .file))")
                        .font(WarrenTypography.body)
                        .foregroundColor(.gray)
                }
                
                Spacer()
            }
            
            // List of items
            ScrollView {
                VStack(spacing: 8) {
                    ForEach(candidates) { candidate in
                        HStack(spacing: 10) {
                            Circle()
                                .fill(WarrenTheme.color(for: candidate.riskTier))
                                .frame(width: 8, height: 8)
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text(candidate.title)
                                    .font(WarrenTypography.body)
                                    .foregroundColor(.white)
                                
                                Text(candidate.path)
                                    .font(WarrenTypography.caption)
                                    .foregroundColor(.gray)
                                    .lineLimit(1)
                                    .truncationMode(.middle)
                            }
                            
                            Spacer()
                            
                            Text(candidate.formattedSize)
                                .font(WarrenTypography.metricSmall)
                                .foregroundColor(.white)
                        }
                        .padding(10)
                        .background(WarrenTheme.darkCard)
                        .cornerRadius(WarrenTheme.cornerSmall)
                    }
                }
            }
            .frame(maxHeight: 220)
            
            // Trash safety notice
            HStack(spacing: 10) {
                Image(systemName: "trash.circle.fill")
                    .font(.system(size: 16))
                    .foregroundColor(WarrenTheme.brandEmerald)
                
                Text("Safety Guarantee: Selected items will be safely moved to your macOS Trash and can be restored at any time.")
                    .font(WarrenTypography.caption)
                    .foregroundColor(WarrenTheme.brandEmerald)
                
                Spacer()
            }
            .padding(10)
            .background(WarrenTheme.brandEmerald.opacity(0.1))
            .cornerRadius(WarrenTheme.cornerSmall)
            
            // Actions
            HStack(spacing: 12) {
                WarrenButton("Cancel", style: .secondary) {
                    onCancel()
                }
                
                Spacer()
                
                WarrenButton("Move to Trash (\(ByteCountFormatter.string(fromByteCount: totalBytes, countStyle: .file)))", icon: "trash.fill", style: .danger) {
                    onConfirm()
                }
            }
        }
        .padding(24)
        .frame(width: 540)
        .background(WarrenTheme.darkSurface)
        .cornerRadius(WarrenTheme.cornerLarge)
        .overlay(
            RoundedRectangle(cornerRadius: WarrenTheme.cornerLarge)
                .stroke(WarrenTheme.subtleBorder, lineWidth: 1)
        )
    }
}

import SwiftUI
import DiskWarrenCore

public struct DeveloperCleanerView: View {
    public let candidates: [CleanupCandidate]
    public let onToggleSelection: (CleanupCandidate) -> Void
    public let onReviewSelected: () -> Void
    
    public init(
        candidates: [CleanupCandidate] = MockData.cleanupCandidates.filter { $0.category == .developer },
        onToggleSelection: @escaping (CleanupCandidate) -> Void = { _ in },
        onReviewSelected: @escaping () -> Void = {}
    ) {
        self.candidates = candidates
        self.onToggleSelection = onToggleSelection
        self.onReviewSelected = onReviewSelected
    }
    
    private var selectedBytes: Int64 {
        candidates.filter { $0.isSelected }.reduce(0) { $0 + $1.sizeBytes }
    }
    
    public var body: some View {
        VStack(spacing: 20) {
            // Header
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    HStack(spacing: 8) {
                        Image(systemName: "hammer.fill")
                            .foregroundColor(WarrenTheme.devCyan)
                        Text("Developer Storage Intelligence")
                            .font(WarrenTypography.title1)
                            .foregroundColor(.white)
                    }
                    Text("Reclaim disk space consumed by Xcode DerivedData, Node node_modules, Rust targets, and build caches.")
                        .font(WarrenTypography.caption)
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                WarrenButton(
                    "Reclaim Selected (\(ByteCountFormatter.string(fromByteCount: selectedBytes, countStyle: .file)))",
                    icon: "trash",
                    style: .primary,
                    isEnabled: selectedBytes > 0
                ) {
                    onReviewSelected()
                }
            }
            .padding(.horizontal, 24)
            .padding(.top, 20)
            
            // Candidate List Table
            ScrollView {
                VStack(spacing: 12) {
                    ForEach(candidates) { candidate in
                        HStack(spacing: 14) {
                            Button(action: { onToggleSelection(candidate) }) {
                                Image(systemName: candidate.isSelected ? "checkmark.square.fill" : "square")
                                    .font(.system(size: 16))
                                    .foregroundColor(candidate.isSelected ? WarrenTheme.brandTeal : .gray)
                            }
                            .buttonStyle(.plain)
                            
                            VStack(alignment: .leading, spacing: 3) {
                                HStack {
                                    Text(candidate.title)
                                        .font(WarrenTypography.headline)
                                        .foregroundColor(.white)
                                    
                                    RiskBadge(candidate.riskTier)
                                }
                                
                                Text(candidate.path)
                                    .font(WarrenTypography.caption)
                                    .foregroundColor(.gray)
                                    .lineLimit(1)
                                    .truncationMode(.middle)
                                
                                Text(candidate.consequences)
                                    .font(.system(size: 11))
                                    .foregroundColor(.gray.opacity(0.8))
                            }
                            
                            Spacer()
                            
                            Text(candidate.formattedSize)
                                .font(WarrenTypography.metricMedium)
                                .foregroundColor(.white)
                        }
                        .padding(14)
                        .background(WarrenTheme.darkSurface)
                        .cornerRadius(WarrenTheme.cornerSmall)
                        .overlay(
                            RoundedRectangle(cornerRadius: WarrenTheme.cornerSmall)
                                .stroke(candidate.isSelected ? WarrenTheme.brandTeal.opacity(0.4) : WarrenTheme.subtleBorder, lineWidth: 1)
                        )
                    }
                }
                .padding(.horizontal, 24)
            }
        }
        .background(WarrenTheme.darkBackground)
    }
}

public struct AIStorageView: View {
    public let candidates: [CleanupCandidate]
    public let onToggleSelection: (CleanupCandidate) -> Void
    public let onReviewSelected: () -> Void
    
    public init(
        candidates: [CleanupCandidate] = MockData.cleanupCandidates.filter { $0.category == .aiModels },
        onToggleSelection: @escaping (CleanupCandidate) -> Void = { _ in },
        onReviewSelected: @escaping () -> Void = {}
    ) {
        self.candidates = candidates
        self.onToggleSelection = onToggleSelection
        self.onReviewSelected = onReviewSelected
    }
    
    private var totalAIBytes: Int64 {
        candidates.reduce(0) { $0 + $1.sizeBytes }
    }
    
    public var body: some View {
        VStack(spacing: 20) {
            // Header
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    HStack(spacing: 8) {
                        Image(systemName: "cpu.fill")
                            .foregroundColor(WarrenTheme.aiPurple)
                        Text("Local AI Model Footprint")
                            .font(WarrenTypography.title1)
                            .foregroundColor(.white)
                    }
                    Text("Identify quantized LLM weights and diffusion checkpoints from Ollama, LM Studio, Hugging Face, and ComfyUI.")
                        .font(WarrenTypography.caption)
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                VStack(alignment: .trailing, spacing: 2) {
                    Text("Total AI Storage")
                        .font(WarrenTypography.caption)
                        .foregroundColor(.gray)
                    Text(ByteCountFormatter.string(fromByteCount: totalAIBytes, countStyle: .file))
                        .font(WarrenTypography.metricLarge)
                        .foregroundColor(WarrenTheme.aiPurple)
                }
            }
            .padding(.horizontal, 24)
            .padding(.top, 20)
            
            // Cards Grid
            ScrollView {
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 16) {
                    ForEach(candidates) { candidate in
                        WarrenCard(padding: 16) {
                            VStack(alignment: .leading, spacing: 10) {
                                HStack {
                                    Circle()
                                        .fill(WarrenTheme.aiPurple)
                                        .frame(width: 8, height: 8)
                                    
                                    Text(candidate.title)
                                        .font(WarrenTypography.headline)
                                        .foregroundColor(.white)
                                        .lineLimit(1)
                                    
                                    Spacer()
                                    
                                    Button(action: { onToggleSelection(candidate) }) {
                                        Image(systemName: candidate.isSelected ? "checkmark.circle.fill" : "circle")
                                            .font(.system(size: 18))
                                            .foregroundColor(candidate.isSelected ? WarrenTheme.aiPurple : .gray)
                                    }
                                    .buttonStyle(.plain)
                                }
                                
                                Text(candidate.itemDescription)
                                    .font(WarrenTypography.caption)
                                    .foregroundColor(.gray)
                                    .lineLimit(2)
                                
                                Divider()
                                
                                HStack {
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text("File Size")
                                            .font(WarrenTypography.caption)
                                            .foregroundColor(.gray)
                                        Text(candidate.formattedSize)
                                            .font(WarrenTypography.metricMedium)
                                            .foregroundColor(.white)
                                    }
                                    
                                    Spacer()
                                    
                                    RiskBadge(candidate.riskTier)
                                }
                            }
                        }
                    }
                }
                .padding(.horizontal, 24)
            }
        }
        .background(WarrenTheme.darkBackground)
    }
}

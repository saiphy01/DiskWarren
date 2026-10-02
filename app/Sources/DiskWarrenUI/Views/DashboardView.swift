import SwiftUI
import DiskWarrenCore

public struct DashboardView: View {
    public let volume: DiskVolumeInfo
    public let candidates: [CleanupCandidate]
    public let onStartScan: () -> Void
    public let onSelectCategory: (StorageCategory) -> Void
    public let onReviewCleanup: () -> Void
    
    public init(
        volume: DiskVolumeInfo = MockData.volumeInfo,
        candidates: [CleanupCandidate] = MockData.cleanupCandidates,
        onStartScan: @escaping () -> Void = {},
        onSelectCategory: @escaping (StorageCategory) -> Void = { _ in },
        onReviewCleanup: @escaping () -> Void = {}
    ) {
        self.volume = volume
        self.candidates = candidates
        self.onStartScan = onStartScan
        self.onSelectCategory = onSelectCategory
        self.onReviewCleanup = onReviewCleanup
    }
    
    private var totalReclaimableBytes: Int64 {
        candidates.filter { $0.isSelected }.reduce(0) { $0 + $1.sizeBytes }
    }
    
    public var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                // Header
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(volume.name)
                            .font(WarrenTypography.title1)
                            .foregroundColor(.white)
                        
                        Text("APFS Container • \(volume.formattedTotal) Total")
                            .font(WarrenTypography.caption)
                            .foregroundColor(.gray)
                    }
                    
                    Spacer()
                    
                    WarrenButton("Scan Storage", icon: WarrenIcons.scan, style: .primary) {
                        onStartScan()
                    }
                }
                
                // Top Storage Gauge & Metrics Card
                WarrenCard(padding: 20) {
                    HStack(spacing: 32) {
                        WarrenStorageGauge(
                            totalBytes: volume.totalCapacityBytes,
                            usedBytes: volume.usedBytes,
                            freeBytes: volume.freeBytes
                        )
                        
                        VStack(alignment: .leading, spacing: 16) {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("Storage Utilization")
                                    .font(WarrenTypography.headline)
                                    .foregroundColor(.white)
                                Text("\(volume.formattedUsed) used across applications, local AI models, and developer caches.")
                                    .font(WarrenTypography.body)
                                    .foregroundColor(.gray)
                            }
                            
                            // Reclaim banner
                            HStack {
                                Image(systemName: "sparkles")
                                    .foregroundColor(WarrenTheme.brandTeal)
                                
                                VStack(alignment: .leading, spacing: 2) {
                                    Text("Reclaimable Space Found")
                                        .font(WarrenTypography.caption)
                                        .foregroundColor(.gray)
                                    Text(ByteCountFormatter.string(fromByteCount: totalReclaimableBytes, countStyle: .file))
                                        .font(WarrenTypography.metricMedium)
                                        .foregroundColor(WarrenTheme.brandEmerald)
                                }
                                
                                Spacer()
                                
                                WarrenButton("Review & Reclaim", style: .subtle) {
                                    onReviewCleanup()
                                }
                            }
                            .padding(12)
                            .background(WarrenTheme.darkCard)
                            .cornerRadius(WarrenTheme.cornerSmall)
                        }
                    }
                }
                
                // Distribution breakdown
                WarrenCard(padding: 16) {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Category Distribution")
                            .font(WarrenTypography.headline)
                            .foregroundColor(.white)
                        
                        CategoryDistributionBar(
                            segments: [
                                .init(category: .system, sizeBytes: 110_000_000_000),
                                .init(category: .applications, sizeBytes: 64_000_000_000),
                                .init(category: .developer, sizeBytes: 48_000_000_000),
                                .init(category: .aiModels, sizeBytes: 36_000_000_000),
                                .init(category: .caches, sizeBytes: 18_000_000_000),
                                .init(category: .duplicates, sizeBytes: 8_000_000_000),
                                .init(category: .freeSpace, sizeBytes: volume.freeBytes)
                            ],
                            totalBytes: volume.totalCapacityBytes
                        )
                    }
                }
                
                // Reclaimable Candidates List
                VStack(alignment: .leading, spacing: 12) {
                    Text("Top Reclaim Opportunities")
                        .font(WarrenTypography.headline)
                        .foregroundColor(.white)
                    
                    ForEach(candidates.prefix(4)) { candidate in
                        HStack(spacing: 12) {
                            Image(systemName: candidate.category.iconName)
                                .foregroundColor(WarrenTheme.color(for: candidate.category))
                                .frame(width: 24)
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text(candidate.title)
                                    .font(WarrenTypography.body)
                                    .foregroundColor(.white)
                                
                                Text(candidate.itemDescription)
                                    .font(WarrenTypography.caption)
                                    .foregroundColor(.gray)
                                    .lineLimit(1)
                            }
                            
                            Spacer()
                            
                            RiskBadge(candidate.riskTier)
                            
                            Text(candidate.formattedSize)
                                .font(WarrenTypography.metricSmall)
                                .foregroundColor(.white)
                        }
                        .padding(12)
                        .background(WarrenTheme.darkSurface)
                        .cornerRadius(WarrenTheme.cornerSmall)
                        .overlay(
                            RoundedRectangle(cornerRadius: WarrenTheme.cornerSmall)
                                .stroke(WarrenTheme.subtleBorder, lineWidth: 1)
                        )
                    }
                }
            }
            .padding(24)
        }
        .background(WarrenTheme.darkBackground)
    }
}

public struct ScanProgressView: View {
    public let currentPath: String
    public let processedFiles: Int
    public let processedBytes: Int64
    public let progressFraction: Double
    public let onCancel: () -> Void
    
    public init(
        currentPath: String,
        processedFiles: Int,
        processedBytes: Int64,
        progressFraction: Double,
        onCancel: @escaping () -> Void
    ) {
        self.currentPath = currentPath
        self.processedFiles = processedFiles
        self.processedBytes = processedBytes
        self.progressFraction = progressFraction
        self.onCancel = onCancel
    }
    
    public var body: some View {
        VStack(spacing: 24) {
            ZStack {
                Circle()
                    .stroke(WarrenTheme.darkCard, lineWidth: 8)
                
                Circle()
                    .trim(from: 0, to: CGFloat(progressFraction))
                    .stroke(WarrenTheme.brandTeal, style: StrokeStyle(lineWidth: 8, lineCap: .round))
                    .rotationEffect(.degrees(-90))
                
                Image(systemName: "sparkle.magnifyingglass")
                    .font(.system(size: 32))
                    .foregroundColor(WarrenTheme.brandTeal)
            }
            .frame(width: 100, height: 100)
            
            VStack(spacing: 6) {
                Text("Analyzing Filesystem...")
                    .font(WarrenTypography.title2)
                    .foregroundColor(.white)
                
                Text(currentPath)
                    .font(WarrenTypography.caption)
                    .foregroundColor(.gray)
                    .lineLimit(1)
                    .truncationMode(.middle)
                    .frame(maxWidth: 420)
            }
            
            HStack(spacing: 24) {
                VStack(spacing: 2) {
                    Text("\(processedFiles)")
                        .font(WarrenTypography.metricMedium)
                        .foregroundColor(.white)
                    Text("Files Indexed")
                        .font(WarrenTypography.caption)
                        .foregroundColor(.gray)
                }
                
                Divider().frame(height: 24)
                
                VStack(spacing: 2) {
                    Text(ByteCountFormatter.string(fromByteCount: processedBytes, countStyle: .file))
                        .font(WarrenTypography.metricMedium)
                        .foregroundColor(.white)
                    Text("Storage Measured")
                        .font(WarrenTypography.caption)
                        .foregroundColor(.gray)
                }
            }
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(WarrenTheme.darkCard)
            .cornerRadius(WarrenTheme.cornerSmall)
            
            WarrenButton("Cancel Scan", icon: "xmark", style: .secondary) {
                onCancel()
            }
        }
        .padding(32)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(WarrenTheme.darkBackground)
    }
}

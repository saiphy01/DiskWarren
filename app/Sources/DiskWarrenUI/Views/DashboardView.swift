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
    
    private var donutItems: [DonutSliceItem] {
        let used = max(0, volume.totalCapacityBytes - volume.freeBytes)
        let toolchainBytes = max(Int64(Double(used) * 0.12), candidates.filter { $0.category == .developer }.reduce(0) { $0 + $1.sizeBytes })
        let aiBytes = max(Int64(Double(used) * 0.10), candidates.filter { $0.category == .aiModels }.reduce(0) { $0 + $1.sizeBytes })
        let appBytes = Int64(Double(used) * 0.32)
        let sysBytes = Int64(Double(used) * 0.24)
        let cacheBytes = max(Int64(Double(used) * 0.06), candidates.filter { $0.category == .caches }.reduce(0) { $0 + $1.sizeBytes })
        let userDocBytes = max(0, used - toolchainBytes - aiBytes - appBytes - sysBytes - cacheBytes)
        
        return [
            DonutSliceItem(
                name: "Free Space",
                sizeBytes: volume.freeBytes,
                formattedSize: ByteCountFormatter.string(fromByteCount: volume.freeBytes, countStyle: .file),
                color: WarrenTheme.brandEmerald,
                description: "Available APFS filesystem container capacity",
                isReclaimable: false
            ),
            DonutSliceItem(
                name: "Developer Toolchains",
                sizeBytes: toolchainBytes,
                formattedSize: ByteCountFormatter.string(fromByteCount: toolchainBytes, countStyle: .file),
                color: WarrenTheme.devCyan,
                description: "DerivedData, npm-cache, Cargo, and package registries",
                isReclaimable: true
            ),
            DonutSliceItem(
                name: "Local AI Models",
                sizeBytes: aiBytes,
                formattedSize: ByteCountFormatter.string(fromByteCount: aiBytes, countStyle: .file),
                color: WarrenTheme.aiPurple,
                description: "Ollama, LM Studio GGUF weights, and Hugging Face hub",
                isReclaimable: true
            ),
            DonutSliceItem(
                name: "Applications",
                sizeBytes: appBytes,
                formattedSize: ByteCountFormatter.string(fromByteCount: appBytes, countStyle: .file),
                color: WarrenTheme.appBlue,
                description: "Installed macOS application bundles and binaries",
                isReclaimable: false
            ),
            DonutSliceItem(
                name: "System & Core OS",
                sizeBytes: sysBytes,
                formattedSize: ByteCountFormatter.string(fromByteCount: sysBytes, countStyle: .file),
                color: WarrenTheme.systemSlate,
                description: "macOS Sealed System Volume (SSV) and kernel caches",
                isReclaimable: false
            ),
            DonutSliceItem(
                name: "Caches & Ephemeral Temp",
                sizeBytes: cacheBytes,
                formattedSize: ByteCountFormatter.string(fromByteCount: cacheBytes, countStyle: .file),
                color: WarrenTheme.tempRose,
                description: "User cache leftovers and browser compilation buffers",
                isReclaimable: true
            ),
            DonutSliceItem(
                name: "User Documents & Repos",
                sizeBytes: userDocBytes,
                formattedSize: ByteCountFormatter.string(fromByteCount: userDocBytes, countStyle: .file),
                color: Color(red: 217/255, green: 119/255, blue: 6/255),
                description: "Personal workspaces, projects, and media archives",
                isReclaimable: false
            )
        ]
    }
    
    public var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                // Header Bar with Volume Metadata & Quick Scan
                HStack(alignment: .center) {
                    VStack(alignment: .leading, spacing: 3) {
                        HStack(spacing: 8) {
                            Text(volume.name)
                                .font(WarrenTypography.title1)
                                .foregroundColor(WarrenTheme.textPrimary)
                            
                            Text("APFS • macOS")
                                .font(.system(size: 11, weight: .bold))
                                .foregroundColor(WarrenTheme.brandTeal)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 3)
                                .background(WarrenTheme.brandTeal.opacity(0.12))
                                .cornerRadius(6)
                        }
                        
                        Text("\(volume.formattedTotal) Total Capacity • \(volume.formattedUsed) Allocated (\(Int(volume.usedPercentage * 100))%)")
                            .font(WarrenTypography.caption)
                            .foregroundColor(WarrenTheme.textSecondary)
                    }
                    
                    Spacer()
                    
                    HStack(spacing: 10) {
                        WarrenButton("Review Candidates", icon: "checklist", style: .secondary) {
                            onReviewCleanup()
                        }
                        
                        WarrenButton("Scan Storage", icon: WarrenIcons.scan, style: .primary) {
                            onStartScan()
                        }
                    }
                }
                
                // Reclaimable Space Spotlight Capsule
                HStack(spacing: 16) {
                    ZStack {
                        Circle()
                            .fill(WarrenTheme.brandEmerald.opacity(0.15))
                            .frame(width: 44, height: 44)
                        Image(systemName: "sparkles")
                            .font(.system(size: 20, weight: .bold))
                            .foregroundColor(WarrenTheme.brandEmerald)
                    }
                    
                    VStack(alignment: .leading, spacing: 2) {
                        Text("RECLAIMABLE STORAGE DETECTED")
                            .font(.system(size: 10.5, weight: .bold))
                            .foregroundColor(WarrenTheme.brandEmerald)
                        
                        Text("\(ByteCountFormatter.string(fromByteCount: totalReclaimableBytes, countStyle: .file)) can be safely recycled")
                            .font(.system(size: 15, weight: .bold))
                            .foregroundColor(WarrenTheme.textPrimary)
                    }
                    
                    Spacer()
                    
                    WarrenButton("Reclaim Space", icon: "trash", style: .subtle) {
                        onReviewCleanup()
                    }
                }
                .padding(14)
                .background(WarrenTheme.cardBackground)
                .cornerRadius(WarrenTheme.cornerMedium)
                .overlay(
                    RoundedRectangle(cornerRadius: WarrenTheme.cornerMedium)
                        .stroke(WarrenTheme.brandEmerald.opacity(0.3), lineWidth: 1)
                )
                
                // The Master Space Allocation Donut Card
                WarrenCard(padding: 20) {
                    VStack(alignment: .leading, spacing: 16) {
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Storage Allocation & Partition Donut")
                                    .font(WarrenTypography.headline)
                                    .foregroundColor(WarrenTheme.textPrimary)
                                Text("Proportional capacity rings showing active container sectors.")
                                    .font(WarrenTypography.caption)
                                    .foregroundColor(WarrenTheme.textSecondary)
                            }
                            Spacer()
                        }
                        
                        Divider()
                            .background(WarrenTheme.subtleBorder)
                        
                        MasterSpaceDonutView(
                            totalBytes: volume.totalCapacityBytes,
                            freeBytes: volume.freeBytes,
                            items: donutItems,
                            onSelectSlice: { item in
                                if let cat = StorageCategory(rawValue: item.name) {
                                    onSelectCategory(cat)
                                }
                            },
                            onStageItem: { item in
                                onReviewCleanup()
                            }
                        )
                    }
                }
                
                // Top Reclaim Opportunities
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text("High-Impact Cleanup Candidates")
                            .font(WarrenTypography.headline)
                            .foregroundColor(WarrenTheme.textPrimary)
                        Spacer()
                        Text("\(candidates.count) items discovered")
                            .font(WarrenTypography.caption)
                            .foregroundColor(WarrenTheme.textSecondary)
                    }
                    
                    ForEach(candidates.prefix(4)) { candidate in
                        HStack(spacing: 14) {
                            Image(systemName: candidate.category.iconName)
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundColor(WarrenTheme.color(for: candidate.category))
                                .frame(width: 32, height: 32)
                                .background(WarrenTheme.color(for: candidate.category).opacity(0.12))
                                .cornerRadius(8)
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text(candidate.title)
                                    .font(.system(size: 13, weight: .semibold))
                                    .foregroundColor(WarrenTheme.textPrimary)
                                
                                Text(candidate.itemDescription)
                                    .font(WarrenTypography.caption)
                                    .foregroundColor(WarrenTheme.textSecondary)
                                    .lineLimit(1)
                            }
                            
                            Spacer()
                            
                            RiskBadge(candidate.riskTier)
                            
                            Text(candidate.formattedSize)
                                .font(.system(size: 13, weight: .bold, design: .monospaced))
                                .foregroundColor(WarrenTheme.textPrimary)
                        }
                        .padding(12)
                        .background(WarrenTheme.cardBackground)
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
        .background(WarrenTheme.appBackground)
    }
}

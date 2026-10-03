import SwiftUI

public struct StorageInsightsView: View {
    @State private var assets: [StorageAsset] = []
    @State private var duplicateGroups: [DuplicateAssetGroup] = []
    @State private var isScanning = false
    @State private var totalBytes: Int64 = 0
    @State private var selectedFilter: MediaFilter = .all
    @State private var selectedCategoryName: String? = nil

    private let scanner = PhotosStorageScanner()
    private let duplicateDetector = DuplicateAssetDetector()

    public init() {}

    public enum MediaFilter: String, CaseIterable, Identifiable {
        case all = "All Media"
        case videos = "4K Videos"
        case screenshots = "Screenshots"
        case duplicates = "Duplicates"

        public var id: String { rawValue }
    }

    private var videoBytes: Int64 {
        assets.filter { $0.category == .videos }.reduce(0) { $0 + $1.sizeBytes }
    }

    private var screenshotBytes: Int64 {
        assets.filter { $0.category == .screenshots }.reduce(0) { $0 + $1.sizeBytes }
    }

    private var photoBytes: Int64 {
        assets.filter { $0.category == .photos }.reduce(0) { $0 + $1.sizeBytes }
    }

    private var duplicateBytes: Int64 {
        duplicateGroups.reduce(0) { $0 + $1.totalSizeBytes }
    }

    private var reclaimableBytes: Int64 {
        screenshotBytes + duplicateBytes
    }

    private var donutSlices: [IOSDonutSlice] {
        let total = max(1, totalBytes)
        return [
            IOSDonutSlice(name: "4K & ProRes Videos", bytes: videoBytes, color: Color(red: 37/255, green: 99/255, blue: 235/255), icon: "video.fill"),
            IOSDonutSlice(name: "Screenshots & Clutter", bytes: screenshotBytes, color: Color(red: 245/255, green: 158/255, blue: 11/255), icon: "camera.viewfinder"),
            IOSDonutSlice(name: "Photos & Library", bytes: photoBytes, color: Color(red: 8/255, green: 145/255, blue: 178/255), icon: "photo.fill"),
            IOSDonutSlice(name: "Duplicate Shots", bytes: duplicateBytes, color: Color(red: 225/255, green: 29/255, blue: 72/255), icon: "doc.on.doc.fill")
        ].filter { $0.bytes > 0 }
    }

    public var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Header Status Strip
                    HStack {
                        VStack(alignment: .leading, spacing: 2) {
                            Text("DiskWarren Mobile")
                                .font(.title3.bold())
                                .foregroundStyle(.primary)
                            Text("Device Media & Photo Storage Intelligence")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                        Spacer()
                        Button {
                            Task { await runScan() }
                        } label: {
                            HStack(spacing: 6) {
                                if isScanning {
                                    ProgressView().tint(.white)
                                } else {
                                    Image(systemName: "arrow.clockwise")
                                }
                                Text(isScanning ? "Scanning..." : "Scan Media")
                            }
                            .font(.caption.bold())
                            .padding(.horizontal, 14)
                            .padding(.vertical, 8)
                            .background(Color(red: 8/255, green: 145/255, blue: 178/255))
                            .foregroundStyle(.white)
                            .clipShape(Capsule())
                        }
                        .disabled(isScanning)
                    }
                    .padding(.horizontal)

                    // Reclaimable Storage Spotlight Banner
                    HStack(spacing: 14) {
                        ZStack {
                            Circle()
                                .fill(Color(red: 16/255, green: 185/255, blue: 129/255).opacity(0.15))
                                .frame(width: 44, height: 44)
                            Image(systemName: "sparkles")
                                .font(.title3.bold())
                                .foregroundStyle(Color(red: 16/255, green: 185/255, blue: 129/255))
                        }

                        VStack(alignment: .leading, spacing: 2) {
                            Text("RECLAIMABLE CAPACITY")
                                .font(.system(size: 10, weight: .bold))
                                .foregroundStyle(Color(red: 16/255, green: 185/255, blue: 129/255))
                            Text("\(ByteCountFormatter.string(fromByteCount: reclaimableBytes, countStyle: .file)) can be reclaimed")
                                .font(.subheadline.bold())
                                .foregroundStyle(.primary)
                        }

                        Spacer()

                        HStack(spacing: 8) {
                            Button {
                                selectedFilter = .screenshots
                            } label: {
                                Text("Clear Cache")
                                    .font(.caption.bold())
                                    .padding(.horizontal, 10)
                                    .padding(.vertical, 6)
                                    .background(Color(red: 8/255, green: 145/255, blue: 178/255).opacity(0.12))
                                    .foregroundStyle(Color(red: 8/255, green: 145/255, blue: 178/255))
                                    .clipShape(Capsule())
                            }

                            Button {
                                // Quick Action Filter
                                selectedFilter = .duplicates
                            } label: {
                                Text("Review")
                                    .font(.caption.bold())
                                    .padding(.horizontal, 12)
                                    .padding(.vertical, 6)
                                    .background(Color(red: 16/255, green: 185/255, blue: 129/255).opacity(0.15))
                                    .foregroundStyle(Color(red: 16/255, green: 185/255, blue: 129/255))
                                    .clipShape(Capsule())
                            }
                        }
                    }
                    .padding(14)
                    .background(Color(.secondarySystemBackground))
                    .clipShape(RoundedRectangle(cornerRadius: 16))
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(Color(red: 16/255, green: 185/255, blue: 129/255).opacity(0.3), lineWidth: 1)
                    )
                    .padding(.horizontal)

                    // Master Space Allocation Donut
                    VStack(spacing: 16) {
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Storage Footprint Donut")
                                    .font(.headline)
                                    .foregroundStyle(.primary)
                                Text("Proportional capacity rings of indexed photo and video assets.")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                            Spacer()
                        }

                        Divider()

                        IOSStorageDonutView(
                            totalBytes: totalBytes,
                            slices: donutSlices,
                            selectedName: $selectedCategoryName
                        )
                    }
                    .padding(20)
                    .background(Color(.secondarySystemBackground))
                    .clipShape(RoundedRectangle(cornerRadius: 20))
                    .padding(.horizontal)

                    // Filter Segmented Control
                    Picker("Filter", selection: $selectedFilter) {
                        ForEach(MediaFilter.allCases) { filter in
                            Text(filter.rawValue).tag(filter)
                        }
                    }
                    .pickerStyle(.segmented)
                    .padding(.horizontal)

                    // Media Breakdown Categories
                    VStack(spacing: 10) {
                        MediaCategoryCard(
                            title: "4K & High-Framerate Videos",
                            subtitle: "Ultra-HD captures and ProRes recording clips",
                            icon: "video.fill",
                            color: Color(red: 37/255, green: 99/255, blue: 235/255),
                            count: assets.filter { $0.category == .videos }.count,
                            bytes: videoBytes,
                            totalBytes: totalBytes
                        )

                        MediaCategoryCard(
                            title: "Screenshots & Clutter",
                            subtitle: "Screen grabs, receipt captures, and temporary images",
                            icon: "camera.viewfinder",
                            color: Color(red: 245/255, green: 158/255, blue: 11/255),
                            count: assets.filter { $0.category == .screenshots }.count,
                            bytes: screenshotBytes,
                            totalBytes: totalBytes
                        )

                        MediaCategoryCard(
                            title: "Standard Photos & Live Shots",
                            subtitle: "Indexed HDR and RAW camera captures",
                            icon: "photo.on.rectangle.angled",
                            color: Color(red: 8/255, green: 145/255, blue: 178/255),
                            count: assets.filter { $0.category == .photos }.count,
                            bytes: photoBytes,
                            totalBytes: totalBytes
                        )

                        if !duplicateGroups.isEmpty {
                            MediaCategoryCard(
                                title: "Identical Duplicate Shots",
                                subtitle: "\(duplicateGroups.count) cluster(s) with identical resolution and byte profile",
                                icon: "doc.on.doc.fill",
                                color: Color(red: 225/255, green: 29/255, blue: 72/255),
                                count: duplicateGroups.reduce(0) { $0 + $1.assets.count },
                                bytes: duplicateBytes,
                                totalBytes: totalBytes
                            )
                        }
                    }
                    .padding(.horizontal)

                    // iOS System Storage Guidance Card
                    VStack(alignment: .leading, spacing: 10) {
                        HStack(spacing: 8) {
                            Image(systemName: "info.circle.fill")
                                .foregroundStyle(Color(red: 8/255, green: 145/255, blue: 178/255))
                            Text("iOS System Storage Guidance")
                                .font(.subheadline.bold())
                        }

                        Text("To clear streaming offline video caches, Safari website data, or Messages large attachments, open iPhone Storage in iOS Settings.")
                            .font(.caption)
                            .foregroundStyle(.secondary)

                        Link(destination: URL(string: UIApplication.openSettingsURLString)!) {
                            HStack {
                                Text("Open iPhone Settings > General > iPhone Storage")
                                Image(systemName: "arrow.up.forward.app")
                            }
                            .font(.caption.bold())
                            .foregroundStyle(Color(red: 8/255, green: 145/255, blue: 178/255))
                        }
                    }
                    .padding(16)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color(.tertiarySystemBackground))
                    .clipShape(RoundedRectangle(cornerRadius: 16))
                    .padding(.horizontal)
                }
                .padding(.vertical)
            }
            .navigationTitle("Storage Intelligence")
            .navigationBarTitleDisplayMode(.inline)
        }
    }

    private func runScan() async {
        isScanning = true
        let status = await scanner.requestAuthorization()
        guard status == .authorized || status == .limited else {
            isScanning = false
            return
        }

        let scanned = await scanner.scanPhotoLibrary()
        assets = scanned
        totalBytes = scanned.reduce(0) { $0 + $1.sizeBytes }
        duplicateGroups = duplicateDetector.findDuplicates(assets: scanned)
        isScanning = false
    }
}

public struct IOSDonutSlice: Identifiable {
    public let id = UUID()
    public let name: String
    public let bytes: Int64
    public let color: Color
    public let icon: String
}

public struct IOSStorageDonutView: View {
    public let totalBytes: Int64
    public let slices: [IOSDonutSlice]
    @Binding public var selectedName: String?

    public var body: some View {
        VStack(spacing: 16) {
            ZStack {
                let totalSlices = max(1, slices.reduce(0) { $0 + $1.bytes })
                let gapAngle = 0.03

                ForEach(Array(slices.enumerated()), id: \.element.id) { idx, slice in
                    let prevBytes = slices.prefix(idx).reduce(0) { $0 + $1.bytes }
                    let start = (Double(prevBytes) / Double(totalSlices)) * 2 * .pi - (.pi / 2) + (gapAngle / 2)
                    let sweep = max(0.01, (Double(slice.bytes) / Double(totalSlices)) * 2 * .pi - gapAngle)
                    let end = start + sweep
                    let isSelected = selectedName == slice.name

                    IOSDonutArc(startAngle: Angle(radians: start), endAngle: Angle(radians: end), innerRatio: isSelected ? 0.58 : 0.62)
                        .fill(slice.color)
                        .scaleEffect(isSelected ? 1.05 : 1.0)
                        .animation(.spring(response: 0.3), value: isSelected)
                        .onTapGesture {
                            selectedName = (selectedName == slice.name) ? nil : slice.name
                        }
                }

                // Center Pod
                Circle()
                    .fill(Color(.systemBackground))
                    .frame(width: 120, height: 120)
                    .shadow(color: Color.black.opacity(0.05), radius: 6, x: 0, y: 2)

                VStack(spacing: 2) {
                    if let sel = slices.first(where: { $0.name == selectedName }) {
                        Text(sel.name.uppercased())
                            .font(.system(size: 8.5, weight: .bold))
                            .foregroundStyle(.secondary)
                            .lineLimit(1)
                            .frame(maxWidth: 100)
                        Text(ByteCountFormatter.string(fromByteCount: sel.bytes, countStyle: .file))
                            .font(.system(size: 16, weight: .heavy, design: .rounded))
                            .foregroundStyle(.primary)
                        let pct = (Double(sel.bytes) / Double(max(1, totalBytes)) * 100)
                        Text(String(format: "%.1f%%", pct))
                            .font(.system(size: 9.5, weight: .bold))
                            .foregroundStyle(sel.color)
                    } else {
                        Text("INDEXED")
                            .font(.system(size: 8.5, weight: .bold))
                            .foregroundStyle(.secondary)
                        Text(ByteCountFormatter.string(fromByteCount: totalBytes, countStyle: .file))
                            .font(.system(size: 16, weight: .heavy, design: .rounded))
                            .foregroundStyle(.primary)
                        Text("Tap ring sector")
                            .font(.system(size: 8.5, weight: .semibold))
                            .foregroundStyle(.secondary)
                    }
                }
            }
            .frame(width: 210, height: 210)

            // Legend Rows
            VStack(spacing: 8) {
                ForEach(slices) { slice in
                    let pct = (Double(slice.bytes) / Double(max(1, totalBytes)) * 100)
                    let isSelected = selectedName == slice.name

                    HStack(spacing: 10) {
                        Circle()
                            .fill(slice.color)
                            .frame(width: 8, height: 8)

                        Text(slice.name)
                            .font(.caption.bold())
                            .foregroundStyle(.primary)

                        Spacer()

                        Text(ByteCountFormatter.string(fromByteCount: slice.bytes, countStyle: .file))
                            .font(.caption.monospacedDigit().bold())
                            .foregroundStyle(.primary)

                        Text(String(format: "(%.1f%%)", pct))
                            .font(.caption2)
                            .foregroundStyle(.secondary)
                    }
                    .padding(.horizontal, 10)
                    .padding(.vertical, 6)
                    .background(isSelected ? slice.color.opacity(0.12) : Color.clear)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .onTapGesture {
                        selectedName = (selectedName == slice.name) ? nil : slice.name
                    }
                }
            }
        }
    }
}

public struct IOSDonutArc: Shape {
    public var startAngle: Angle
    public var endAngle: Angle
    public var innerRatio: CGFloat

    public func path(in rect: CGRect) -> Path {
        var path = Path()
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let outerRadius = min(rect.width, rect.height) / 2
        let innerRadius = outerRadius * innerRatio

        path.addArc(center: center, radius: outerRadius, startAngle: startAngle, endAngle: endAngle, clockwise: false)
        path.addArc(center: center, radius: innerRadius, startAngle: endAngle, endAngle: startAngle, clockwise: true)
        path.closeSubpath()
        return path
    }
}

public struct MediaCategoryCard: View {
    public let title: String
    public let subtitle: String
    public let icon: String
    public let color: Color
    public let count: Int
    public let bytes: Int64
    public let totalBytes: Int64

    public var body: some View {
        let pct = (Double(bytes) / Double(max(1, totalBytes)) * 100)

        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 12) {
                Image(systemName: icon)
                    .font(.headline)
                    .foregroundStyle(color)
                    .frame(width: 32, height: 32)
                    .background(color.opacity(0.12))
                    .clipShape(RoundedRectangle(cornerRadius: 8))

                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.subheadline.bold())
                        .foregroundStyle(.primary)
                    Text(subtitle)
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }

                Spacer()

                VStack(alignment: .trailing, spacing: 2) {
                    Text(ByteCountFormatter.string(fromByteCount: bytes, countStyle: .file))
                        .font(.subheadline.bold().monospacedDigit())
                        .foregroundStyle(.primary)
                    Text("\(count) items • \(String(format: "%.1f%%", pct))")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                }
            }

            // Inline Progress Bar
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    RoundedRectangle(cornerRadius: 3)
                        .fill(Color(.tertiarySystemFill))
                        .frame(height: 6)

                    RoundedRectangle(cornerRadius: 3)
                        .fill(color)
                        .frame(width: max(4, geo.size.width * CGFloat(min(1.0, max(0.0, Double(bytes) / Double(max(1, totalBytes)))))), height: 6)
                }
            }
            .frame(height: 6)
        }
        .padding(14)
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 14))
    }
}

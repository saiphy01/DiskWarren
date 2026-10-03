import SwiftUI

public struct StorageInsightsView: View {
    @State private var assets: [StorageAsset] = []
    @State private var isScanning = false
    @State private var totalBytes: Int64 = 0

    private let scanner = PhotosStorageScanner()

    public init() {}

    public var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Header card
                    VStack(spacing: 8) {
                        Image(systemName: "internaldrive.fill")
                            .font(.system(size: 44))
                            .foregroundStyle(.linearGradient(
                                colors: [.cyan, .blue],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            ))
                            .padding(.bottom, 4)

                        Text("DiskWarren iPhone")
                            .font(.title2.bold())
                            .foregroundStyle(.primary)

                        Text("Understand what's filling your iPhone")
                            .font(.caption)
                            .foregroundStyle(.secondary)

                        Text(ByteCountFormatter.string(fromByteCount: totalBytes, countStyle: .file))
                            .font(.system(size: 34, weight: .heavy, design: .rounded))
                            .foregroundStyle(.cyan)
                            .padding(.top, 8)

                        Text("Indexed Photo Library Footprint")
                            .font(.caption2)
                            .foregroundStyle(.secondary)

                        Button {
                            Task {
                                await runScan()
                            }
                        } label: {
                            HStack {
                                if isScanning {
                                    ProgressView()
                                        .tint(.white)
                                } else {
                                    Image(systemName: "sparkles")
                                }
                                Text(isScanning ? "Scanning Library..." : "Scan Photo Library")
                            }
                            .font(.subheadline.bold())
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .background(Color.cyan)
                            .foregroundStyle(.white)
                            .clipShape(RoundedRectangle(cornerRadius: 12))
                        }
                        .disabled(isScanning)
                        .padding(.top, 12)
                    }
                    .padding(20)
                    .background(Color(.secondarySystemBackground))
                    .clipShape(RoundedRectangle(cornerRadius: 18))
                    .padding(.horizontal)

                    // Categories breakdown
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Media Breakdown")
                            .font(.headline)
                            .padding(.horizontal)

                        VStack(spacing: 1) {
                            CategoryRow(
                                title: "Videos & 4K Captures",
                                systemImage: "video.fill",
                                color: .blue,
                                count: assets.filter { $0.category == .videos }.count,
                                bytes: assets.filter { $0.category == .videos }.reduce(0) { $0 + $1.sizeBytes }
                            )

                            CategoryRow(
                                title: "Screenshots & Captures",
                                systemImage: "camera.viewfinder",
                                color: .orange,
                                count: assets.filter { $0.category == .screenshots }.count,
                                bytes: assets.filter { $0.category == .screenshots }.reduce(0) { $0 + $1.sizeBytes }
                            )

                            CategoryRow(
                                title: "Photos & Library",
                                systemImage: "photo.on.rectangle.angled",
                                color: .cyan,
                                count: assets.filter { $0.category == .photos }.count,
                                bytes: assets.filter { $0.category == .photos }.reduce(0) { $0 + $1.sizeBytes }
                            )
                        }
                        .background(Color(.secondarySystemBackground))
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                        .padding(.horizontal)
                    }

                    // System Storage Guidance card
                    VStack(alignment: .leading, spacing: 10) {
                        HStack(spacing: 8) {
                            Image(systemName: "info.circle.fill")
                                .foregroundStyle(.blue)
                            Text("iOS System Data Guidance")
                                .font(.subheadline.bold())
                        }

                        Text("To clear offline streaming downloads, Safari offline caches, or Messages attachments, open iPhone Storage in iOS Settings.")
                            .font(.caption)
                            .foregroundStyle(.secondary)

                        Link(destination: URL(string: UIApplication.openSettingsURLString)!) {
                            HStack {
                                Text("Open iOS Settings")
                                Image(systemName: "arrow.up.forward.app")
                            }
                            .font(.caption.bold())
                            .foregroundStyle(.cyan)
                        }
                    }
                    .padding(16)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color(.tertiarySystemBackground))
                    .clipShape(RoundedRectangle(cornerRadius: 14))
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
        isScanning = false
    }
}

private struct CategoryRow: View {
    let title: String
    let systemImage: String
    let color: Color
    let count: Int
    let bytes: Int64

    var body: some View {
        HStack(spacing: 14) {
            Image(systemName: systemImage)
                .font(.title3)
                .foregroundStyle(color)
                .frame(width: 28)

            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.subheadline.bold())
                Text("\(count) items")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }

            Spacer()

            Text(ByteCountFormatter.string(fromByteCount: bytes, countStyle: .file))
                .font(.subheadline.bold())
                .foregroundStyle(.primary)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 14)
    }
}

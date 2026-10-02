import SwiftUI
import DiskWarrenCore

public struct LargeFilesView: View {
    public let files: [StorageNode]
    public let onSelectFile: (StorageNode) -> Void
    public let onAddToCleanup: (StorageNode) -> Void
    
    @State private var selectedThresholdIndex: Int = 0
    private let thresholds: [(label: String, bytes: Int64)] = [
        ("> 100 MB", 104_857_600),
        ("> 500 MB", 524_288_000),
        ("> 1 GB", 1_073_741_824),
        ("> 5 GB", 5_368_709_120)
    ]
    
    public init(
        files: [StorageNode] = [
            StorageNode(name: "Xcode_15.4.xip", path: "/Users/saiph/Downloads/Xcode_15.4.xip", type: .file, sizeBytes: 12_400_000_000, category: .developer),
            StorageNode(name: "Llama-3-70B.Q4_K_M.gguf", path: "/Users/saiph/.cache/lm-studio/models/Llama-3-70B.Q4_K_M.gguf", type: .file, sizeBytes: 24_200_000_000, category: .aiModels),
            StorageNode(name: "Client_Commercial_4K_ProRes.mov", path: "/Users/saiph/Movies/Client_Commercial_4K_ProRes.mov", type: .file, sizeBytes: 8_100_000_000, category: .media),
            StorageNode(name: "Docker.raw", path: "/Users/saiph/Library/Containers/com.docker.docker/Data/vms/0/data/Docker.raw", type: .file, sizeBytes: 32_000_000_000, category: .developer)
        ],
        onSelectFile: @escaping (StorageNode) -> Void = { _ in },
        onAddToCleanup: @escaping (StorageNode) -> Void = { _ in }
    ) {
        self.files = files
        self.onSelectFile = onSelectFile
        self.onAddToCleanup = onAddToCleanup
    }
    
    private var filteredFiles: [StorageNode] {
        let minBytes = thresholds[selectedThresholdIndex].bytes
        return files.filter { $0.sizeBytes >= minBytes }.sorted { $0.sizeBytes > $1.sizeBytes }
    }
    
    public var body: some View {
        VStack(spacing: 20) {
            // Header
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    HStack(spacing: 8) {
                        Image(systemName: WarrenIcons.largeFiles)
                            .foregroundColor(WarrenTheme.brandTeal)
                        Text("Large Files Explorer")
                            .font(WarrenTypography.title1)
                            .foregroundColor(.white)
                    }
                    Text("Identify large files taking up substantial storage space across your volumes.")
                        .font(WarrenTypography.caption)
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                // Threshold selector
                Picker("Minimum Size", selection: $selectedThresholdIndex) {
                    ForEach(0..<thresholds.count, id: \.self) { index in
                        Text(thresholds[index].label).tag(index)
                    }
                }
                .pickerStyle(.segmented)
                .frame(width: 300)
            }
            .padding(.horizontal, 24)
            .padding(.top, 20)
            
            // List of large files
            ScrollView {
                VStack(spacing: 10) {
                    ForEach(filteredFiles) { file in
                        HStack(spacing: 14) {
                            Image(systemName: file.category.iconName)
                                .font(.system(size: 20))
                                .foregroundColor(WarrenTheme.color(for: file.category))
                                .frame(width: 28)
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text(file.name)
                                    .font(WarrenTypography.headline)
                                    .foregroundColor(.white)
                                
                                Text(file.path)
                                    .font(WarrenTypography.caption)
                                    .foregroundColor(.gray)
                                    .lineLimit(1)
                                    .truncationMode(.middle)
                            }
                            
                            Spacer()
                            
                            CategoryBadge(file.category)
                            
                            Text(file.formattedSize)
                                .font(WarrenTypography.metricMedium)
                                .foregroundColor(.white)
                            
                            WarrenButton("Review", style: .subtle) {
                                onAddToCleanup(file)
                            }
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
                .padding(.horizontal, 24)
            }
        }
        .background(WarrenTheme.darkBackground)
    }
}

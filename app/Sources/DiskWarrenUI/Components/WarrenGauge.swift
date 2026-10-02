import SwiftUI
import DiskWarrenCore

public struct WarrenStorageGauge: View {
    public let totalBytes: Int64
    public let usedBytes: Int64
    public let freeBytes: Int64
    
    public init(totalBytes: Int64, usedBytes: Int64, freeBytes: Int64) {
        self.totalBytes = totalBytes
        self.usedBytes = usedBytes
        self.freeBytes = freeBytes
    }
    
    private var usedFraction: Double {
        guard totalBytes > 0 else { return 0 }
        return min(1.0, max(0.0, Double(usedBytes) / Double(totalCapacity)))
    }
    
    private var totalCapacity: Int64 {
        max(1, totalBytes)
    }
    
    public var body: some View {
        ZStack {
            // Background track
            Circle()
                .stroke(WarrenTheme.darkCard, lineWidth: 18)
            
            // Used arc
            Circle()
                .trim(from: 0.0, to: CGFloat(usedFraction))
                .stroke(
                    AngularGradient(
                        gradient: Gradient(colors: [WarrenTheme.brandTeal, WarrenTheme.aiPurple]),
                        center: .center,
                        startAngle: .degrees(0),
                        endAngle: .degrees(360 * usedFraction)
                    ),
                    style: StrokeStyle(lineWidth: 18, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .animation(.easeInOut(duration: 0.8), value: usedFraction)
            
            // Center Metrics
            VStack(spacing: 4) {
                Text("\(Int(usedFraction * 100))%")
                    .font(WarrenTypography.metricLarge)
                    .foregroundColor(.white)
                
                Text("USED")
                    .font(WarrenTypography.caption)
                    .foregroundColor(Color.gray)
                
                Text("\(ByteCountFormatter.string(fromByteCount: freeBytes, countStyle: .file)) Free")
                    .font(WarrenTypography.metricSmall)
                    .foregroundColor(WarrenTheme.brandEmerald)
            }
        }
        .frame(width: 170, height: 170)
    }
}

public struct CategoryDistributionBar: View {
    public struct Segment: Identifiable {
        public let id = UUID()
        public let category: StorageCategory
        public let sizeBytes: Int64
        public let color: Color
        
        public init(category: StorageCategory, sizeBytes: Int64) {
            self.category = category
            self.sizeBytes = sizeBytes
            self.color = WarrenTheme.color(for: category)
        }
    }
    
    public let segments: [Segment]
    public let totalBytes: Int64
    
    public init(segments: [Segment], totalBytes: Int64) {
        self.segments = segments
        self.totalBytes = totalBytes
    }
    
    public var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            // Stacked Bar
            GeometryReader { geometry in
                HStack(spacing: 2) {
                    ForEach(segments) { segment in
                        let fraction = Double(segment.sizeBytes) / Double(max(1, totalBytes))
                        let width = max(4, CGFloat(fraction) * geometry.size.width)
                        
                        RoundedRectangle(cornerRadius: 3)
                            .fill(segment.color)
                            .frame(width: width, height: 14)
                            .help("\(segment.category.rawValue): \(ByteCountFormatter.string(fromByteCount: segment.sizeBytes, countStyle: .file))")
                    }
                }
            }
            .frame(height: 14)
            .background(WarrenTheme.darkCard)
            .cornerRadius(4)
            
            // Legend
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 120), spacing: 8)], spacing: 8) {
                ForEach(segments) { segment in
                    HStack(spacing: 6) {
                        Circle()
                            .fill(segment.color)
                            .frame(width: 8, height: 8)
                        
                        Text(segment.category.rawValue)
                            .font(WarrenTypography.caption)
                            .foregroundColor(.gray)
                        
                        Spacer()
                        
                        Text(ByteCountFormatter.string(fromByteCount: segment.sizeBytes, countStyle: .file))
                            .font(WarrenTypography.metricSmall)
                            .foregroundColor(.white)
                    }
                }
            }
        }
    }
}

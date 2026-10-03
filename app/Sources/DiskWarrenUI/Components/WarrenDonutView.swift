import SwiftUI
import DiskWarrenCore

public struct DonutSliceItem: Identifiable, Equatable {
    public let id = UUID()
    public let name: String
    public let sizeBytes: Int64
    public let formattedSize: String
    public let color: Color
    public let description: String
    public let isReclaimable: Bool
    
    public init(
        name: String,
        sizeBytes: Int64,
        formattedSize: String,
        color: Color,
        description: String,
        isReclaimable: Bool
    ) {
        self.name = name
        self.sizeBytes = sizeBytes
        self.formattedSize = formattedSize
        self.color = color
        self.description = description
        self.isReclaimable = isReclaimable
    }
}

public struct DonutSliceShape: Shape {
    public var startAngle: Angle
    public var endAngle: Angle
    public var innerRadiusRatio: CGFloat
    
    public var animatableData: AnimatablePair<Double, Double> {
        get { AnimatablePair(startAngle.radians, endAngle.radians) }
        set {
            startAngle = Angle(radians: newValue.first)
            endAngle = Angle(radians: newValue.second)
        }
    }
    
    public func path(in rect: CGRect) -> Path {
        var path = Path()
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let outerRadius = min(rect.width, rect.height) / 2
        let innerRadius = outerRadius * innerRadiusRatio
        
        path.addArc(
            center: center,
            radius: outerRadius,
            startAngle: startAngle,
            endAngle: endAngle,
            clockwise: false
        )
        path.addArc(
            center: center,
            radius: innerRadius,
            startAngle: endAngle,
            endAngle: startAngle,
            clockwise: true
        )
        path.closeSubpath()
        return path
    }
}

public struct MasterSpaceDonutView: View {
    public let totalBytes: Int64
    public let freeBytes: Int64
    public let items: [DonutSliceItem]
    public let onSelectSlice: ((DonutSliceItem) -> Void)?
    public let onStageItem: ((DonutSliceItem) -> Void)?
    
    @State private var hoveredSliceId: UUID? = nil
    @State private var selectedSliceId: UUID? = nil
    
    public init(
        totalBytes: Int64,
        freeBytes: Int64,
        items: [DonutSliceItem],
        onSelectSlice: ((DonutSliceItem) -> Void)? = nil,
        onStageItem: ((DonutSliceItem) -> Void)? = nil
    ) {
        self.totalBytes = max(1, totalBytes)
        self.freeBytes = freeBytes
        self.items = items
        self.onSelectSlice = onSelectSlice
        self.onStageItem = onStageItem
    }
    
    private var activeSlice: DonutSliceItem? {
        if let id = hoveredSliceId ?? selectedSliceId {
            return items.first { $0.id == id }
        }
        return nil
    }
    
    public var body: some View {
        VStack(spacing: 20) {
            // Master Donut Ring with Center Telemetry Pod
            ZStack {
                let nonZeroItems = items.filter { $0.sizeBytes > 0 }
                let totalSlicesBytes = max(1, nonZeroItems.reduce(0) { $0 + $1.sizeBytes })
                let gapRadians = 0.028
                
                ForEach(Array(nonZeroItems.enumerated()), id: \.element.id) { index, item in
                    let prevBytes = nonZeroItems.prefix(index).reduce(0) { $0 + $1.sizeBytes }
                    let rawStart = (Double(prevBytes) / Double(totalSlicesBytes)) * 2 * .pi
                    let rawSweep = (Double(item.sizeBytes) / Double(totalSlicesBytes)) * 2 * .pi
                    let start = rawStart - (.pi / 2) + (gapRadians / 2)
                    let sweep = max(0.005, rawSweep - gapRadians)
                    let end = start + sweep
                    let isHovered = hoveredSliceId == item.id || selectedSliceId == item.id
                    
                    DonutSliceShape(
                        startAngle: Angle(radians: start),
                        endAngle: Angle(radians: end),
                        innerRadiusRatio: isHovered ? 0.52 : 0.55
                    )
                    .fill(item.color)
                    .scaleEffect(isHovered ? 1.04 : 1.0)
                    .shadow(color: isHovered ? item.color.opacity(0.4) : .clear, radius: 8, x: 0, y: 0)
                    .animation(.spring(response: 0.35, dampingFraction: 0.7), value: isHovered)
                    .onHover { hovering in
                        withAnimation(.easeInOut(duration: 0.2)) {
                            hoveredSliceId = hovering ? item.id : nil
                        }
                    }
                    .onTapGesture {
                        withAnimation(.spring(response: 0.35, dampingFraction: 0.7)) {
                            if selectedSliceId == item.id {
                                selectedSliceId = nil
                            } else {
                                selectedSliceId = item.id
                                onSelectSlice?(item)
                            }
                        }
                    }
                }
                
                // Track Ring Border
                Circle()
                    .stroke(WarrenTheme.subtleBorder.opacity(0.8), lineWidth: 1.5)
                    .frame(width: 145, height: 145)
                
                // Center Telemetry Hub
                Circle()
                    .fill(WarrenTheme.cardBackground)
                    .frame(width: 140, height: 140)
                    .shadow(color: Color.black.opacity(0.06), radius: 6, x: 0, y: 2)
                
                VStack(spacing: 3) {
                    if let active = activeSlice {
                        let pct = (Double(active.sizeBytes) / Double(totalBytes) * 100)
                        Text(active.name.uppercased())
                            .font(.system(size: 9.5, weight: .bold))
                            .foregroundColor(WarrenTheme.textSecondary)
                            .lineLimit(1)
                            .frame(maxWidth: 120)
                        
                        Text(active.formattedSize)
                            .font(.system(size: 20, weight: .heavy, design: .monospaced))
                            .foregroundColor(WarrenTheme.textPrimary)
                        
                        Text(String(format: "%.1f%% ALLOCATED", pct))
                            .font(.system(size: 10, weight: .bold))
                            .foregroundColor(active.color)
                    } else {
                        let freePct = (Double(freeBytes) / Double(totalBytes) * 100)
                        Text("SYSTEM DISK")
                            .font(.system(size: 9.5, weight: .bold))
                            .foregroundColor(WarrenTheme.textSecondary)
                        
                        Text(ByteCountFormatter.string(fromByteCount: freeBytes, countStyle: .file))
                            .font(.system(size: 20, weight: .heavy, design: .monospaced))
                            .foregroundColor(WarrenTheme.textPrimary)
                        
                        Text(String(format: "%.1f%% FREE SPACE", freePct))
                            .font(.system(size: 10, weight: .bold))
                            .foregroundColor(WarrenTheme.brandEmerald)
                    }
                }
            }
            .frame(width: 250, height: 250)
            .padding(.top, 4)
            
            // Interactive Category Distribution Rows
            VStack(spacing: 8) {
                ForEach(items) { item in
                    let isHovered = hoveredSliceId == item.id || selectedSliceId == item.id
                    let pct = Double(item.sizeBytes) / Double(totalBytes) * 100
                    
                    HStack(spacing: 12) {
                        Circle()
                            .fill(item.color)
                            .frame(width: 10, height: 10)
                        
                        VStack(alignment: .leading, spacing: 2) {
                            Text(item.name)
                                .font(.system(size: 13, weight: .semibold))
                                .foregroundColor(WarrenTheme.textPrimary)
                            Text(item.description)
                                .font(.system(size: 11))
                                .foregroundColor(WarrenTheme.textSecondary)
                                .lineLimit(1)
                        }
                        
                        Spacer()
                        
                        VStack(alignment: .trailing, spacing: 2) {
                            Text(item.formattedSize)
                                .font(.system(size: 13, weight: .bold, design: .monospaced))
                                .foregroundColor(WarrenTheme.textPrimary)
                            Text(String(format: "%.1f%%", pct))
                                .font(.system(size: 10.5, weight: .semibold))
                                .foregroundColor(WarrenTheme.textSecondary)
                        }
                        
                        if item.isReclaimable {
                            Button(action: {
                                onStageItem?(item)
                            }) {
                                Text("+ Stage")
                                    .font(.system(size: 11, weight: .bold))
                                    .foregroundColor(.white)
                                    .padding(.horizontal, 9)
                                    .padding(.vertical, 4)
                                    .background(WarrenTheme.brandTeal)
                                    .cornerRadius(6)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.horizontal, 14)
                    .padding(.vertical, 8)
                    .background(
                        RoundedRectangle(cornerRadius: WarrenTheme.cornerSmall)
                            .fill(isHovered ? WarrenTheme.surfaceSubtle : Color.clear)
                    )
                    .contentShape(Rectangle())
                    .onHover { hovering in
                        hoveredSliceId = hovering ? item.id : nil
                    }
                    .onTapGesture {
                        selectedSliceId = (selectedSliceId == item.id) ? nil : item.id
                        onSelectSlice?(item)
                    }
                }
            }
        }
    }
}

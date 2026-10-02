import SwiftUI

public struct WarrenTypography {
    public static let display = Font.system(size: 28, weight: .bold, design: .default)
    public static let title1 = Font.system(size: 22, weight: .semibold, design: .default)
    public static let title2 = Font.system(size: 17, weight: .semibold, design: .default)
    public static let headline = Font.system(size: 14, weight: .semibold, design: .default)
    public static let body = Font.system(size: 13, weight: .regular, design: .default)
    public static let caption = Font.system(size: 11, weight: .regular, design: .default)
    
    // Monospaced numerical values for byte alignment
    public static let metricLarge = Font.system(size: 28, weight: .bold, design: .monospaced)
    public static let metricMedium = Font.system(size: 16, weight: .semibold, design: .monospaced)
    public static let metricSmall = Font.system(size: 12, weight: .regular, design: .monospaced)
}

public struct WarrenIcons {
    public static let scan = "sparkle.magnifyingglass"
    public static let dashboard = "gauge.medium"
    public static let treemap = "rectangle.split.3x3.fill"
    public static let largeFiles = "arrow.up.and.down.and.sparkles"
    public static let developer = "hammer.fill"
    public static let aiModels = "cpu.fill"
    public static let duplicates = "doc.on.doc.fill"
    public static let uninstaller = "trash.circle.fill"
    public static let safeCleanup = "shield.lefthalf.filled"
    public static let settings = "gearshape.fill"
    public static let alert = "exclamationmark.triangle.fill"
    public static let checkmark = "checkmark.circle.fill"
    public static let folder = "folder.fill"
    public static let chevronRight = "chevron.right"
    public static let lock = "lock.fill"
}

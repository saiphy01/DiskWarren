import SwiftUI
import DiskWarrenCore

public struct WarrenTheme {
    // MARK: - Surfaces & Backgrounds
    public static let bgPrimary = Color("bgPrimary", bundle: nil)
    public static let bgSecondary = Color("bgSecondary", bundle: nil)
    public static let bgTertiary = Color("bgTertiary", bundle: nil)
    
    // Dynamic Fallbacks for previews & standard setups
    public static let darkBackground = Color(red: 13/255, green: 17/255, blue: 23/255)
    public static let darkSurface = Color(red: 22/255, green: 27/255, blue: 34/255)
    public static let darkCard = Color(red: 33/255, green: 38/255, blue: 45/255)
    public static let subtleBorder = Color(red: 48/255, green: 54/255, blue: 61/255)
    
    // MARK: - Accents
    public static let brandTeal = Color(red: 0/255, green: 210/255, blue: 255/255)
    public static let brandEmerald = Color(red: 16/255, green: 185/255, blue: 129/255)
    public static let warningAmber = Color(red: 245/255, green: 158/255, blue: 11/255)
    public static let dangerCoral = Color(red: 239/255, green: 68/255, blue: 68/255)
    public static let aiPurple = Color(red: 168/255, green: 85/255, blue: 247/255)
    public static let devCyan = Color(red: 6/255, green: 182/255, blue: 212/255)
    public static let appBlue = Color(red: 59/255, green: 130/255, blue: 246/255)
    public static let systemSlate = Color(red: 100/255, green: 116/255, blue: 139/255)
    public static let duplicatePink = Color(red: 236/255, green: 72/255, blue: 153/255)
    
    // MARK: - Category Color Mapping
    public static func color(for category: StorageCategory) -> Color {
        switch category {
        case .developer: return devCyan
        case .aiModels: return aiPurple
        case .caches: return warningAmber
        case .duplicates: return duplicatePink
        case .applications: return appBlue
        case .system: return systemSlate
        case .media: return Color(red: 249/255, green: 115/255, blue: 22/255)
        case .documents: return Color(red: 99/255, green: 102/255, blue: 241/255)
        case .freeSpace: return brandEmerald
        case .other: return Color.gray
        }
    }
    
    public static func color(for riskTier: RiskTier) -> Color {
        switch riskTier {
        case .low: return brandEmerald
        case .review: return warningAmber
        case .restricted: return dangerCoral
        }
    }
    
    // MARK: - Dimensions & Radii
    public static let cornerSmall: CGFloat = 6
    public static let cornerMedium: CGFloat = 10
    public static let cornerLarge: CGFloat = 16
    public static let borderWidth: CGFloat = 1
}

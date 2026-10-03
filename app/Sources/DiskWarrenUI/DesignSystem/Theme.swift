import SwiftUI
import DiskWarrenCore

#if canImport(AppKit)
import AppKit
#endif

public struct WarrenTheme {
    // MARK: - Dynamic Executive Surfaces & Backgrounds
    public static var appBackground: Color {
        #if canImport(AppKit)
        return Color(nsColor: NSColor(name: nil, dynamicProvider: { appearance in
            appearance.bestMatch(from: [.aqua, .darkAqua]) == .darkAqua
                ? NSColor(red: 11/255, green: 15/255, blue: 25/255, alpha: 1.0)
                : NSColor(red: 248/255, green: 250/255, blue: 252/255, alpha: 1.0)
        }))
        #else
        return Color(red: 248/255, green: 250/255, blue: 252/255)
        #endif
    }
    
    public static var cardBackground: Color {
        #if canImport(AppKit)
        return Color(nsColor: NSColor(name: nil, dynamicProvider: { appearance in
            appearance.bestMatch(from: [.aqua, .darkAqua]) == .darkAqua
                ? NSColor(red: 17/255, green: 24/255, blue: 39/255, alpha: 1.0)
                : NSColor.white
        }))
        #else
        return Color.white
        #endif
    }
    
    public static var surfaceSubtle: Color {
        #if canImport(AppKit)
        return Color(nsColor: NSColor(name: nil, dynamicProvider: { appearance in
            appearance.bestMatch(from: [.aqua, .darkAqua]) == .darkAqua
                ? NSColor(red: 31/255, green: 41/255, blue: 55/255, alpha: 1.0)
                : NSColor(red: 241/255, green: 245/255, blue: 249/255, alpha: 1.0)
        }))
        #else
        return Color(red: 241/255, green: 245/255, blue: 249/255)
        #endif
    }
    
    public static var subtleBorder: Color {
        #if canImport(AppKit)
        return Color(nsColor: NSColor(name: nil, dynamicProvider: { appearance in
            appearance.bestMatch(from: [.aqua, .darkAqua]) == .darkAqua
                ? NSColor(red: 55/255, green: 65/255, blue: 81/255, alpha: 1.0)
                : NSColor(red: 226/255, green: 232/255, blue: 240/255, alpha: 1.0)
        }))
        #else
        return Color(red: 226/255, green: 232/255, blue: 240/255)
        #endif
    }
    
    public static var textPrimary: Color {
        #if canImport(AppKit)
        return Color(nsColor: NSColor(name: nil, dynamicProvider: { appearance in
            appearance.bestMatch(from: [.aqua, .darkAqua]) == .darkAqua
                ? NSColor(red: 249/255, green: 250/255, blue: 251/255, alpha: 1.0)
                : NSColor(red: 15/255, green: 23/255, blue: 42/255, alpha: 1.0)
        }))
        #else
        return Color(red: 15/255, green: 23/255, blue: 42/255)
        #endif
    }
    
    public static var textSecondary: Color {
        #if canImport(AppKit)
        return Color(nsColor: NSColor(name: nil, dynamicProvider: { appearance in
            appearance.bestMatch(from: [.aqua, .darkAqua]) == .darkAqua
                ? NSColor(red: 156/255, green: 163/255, blue: 175/255, alpha: 1.0)
                : NSColor(red: 100/255, green: 116/255, blue: 139/255, alpha: 1.0)
        }))
        #else
        return Color(red: 100/255, green: 116/255, blue: 139/255)
        #endif
    }

    // Backward compatibility aliases
    public static let darkBackground = Color(red: 11/255, green: 15/255, blue: 25/255)
    public static let darkSurface = Color(red: 17/255, green: 24/255, blue: 39/255)
    public static let darkCard = Color(red: 31/255, green: 41/255, blue: 55/255)
    
    // MARK: - Executive Accents (Matching tokens.json)
    public static let brandTeal = Color(red: 8/255, green: 145/255, blue: 178/255)      // Cyan 600
    public static let brandEmerald = Color(red: 16/255, green: 185/255, blue: 129/255) // Emerald 500
    public static let warningAmber = Color(red: 245/255, green: 158/255, blue: 11/255) // Amber 500
    public static let dangerCoral = Color(red: 239/255, green: 68/255, blue: 68/255)   // Red 500
    public static let aiPurple = Color(red: 139/255, green: 92/255, blue: 246/255)     // Violet 500
    public static let devCyan = Color(red: 2/255, green: 132/255, blue: 199/255)       // Sky 600
    public static let appBlue = Color(red: 37/255, green: 99/255, blue: 235/255)       // Blue 600
    public static let systemSlate = Color(red: 100/255, green: 116/255, blue: 139/255) // Slate 500
    public static let duplicatePink = Color(red: 236/255, green: 72/255, blue: 153/255)// Pink 500
    public static let tempRose = Color(red: 225/255, green: 29/255, blue: 72/255)      // Rose 600
    
    // MARK: - Category Color Mapping
    public static func color(for category: StorageCategory) -> Color {
        switch category {
        case .developer: return devCyan
        case .aiModels: return aiPurple
        case .caches: return tempRose
        case .duplicates: return duplicatePink
        case .applications: return appBlue
        case .system: return systemSlate
        case .media: return Color(red: 249/255, green: 115/255, blue: 22/255)
        case .documents: return Color(red: 217/255, green: 119/255, blue: 6/255)
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
    public static let cornerSmall: CGFloat = 8
    public static let cornerMedium: CGFloat = 12
    public static let cornerLarge: CGFloat = 18
    public static let borderWidth: CGFloat = 1
}

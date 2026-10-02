import SwiftUI

public struct KeyboardShortcuts {
    public static let scan = KeyEquivalent("s")
    public static let search = KeyEquivalent("f")
    public static let refresh = KeyEquivalent("r")
    public static let preferences = KeyEquivalent(",")
    public static let treemap = KeyEquivalent("2")
    public static let developer = KeyEquivalent("3")
    public static let aiModels = KeyEquivalent("4")
}

public struct MotionPreferences {
    public static func animation<V: Equatable>(value: V, reduceMotion: Bool) -> Animation? {
        if reduceMotion {
            return nil // Instantaneous transition without animation
        }
        return .spring(response: 0.35, dampingFraction: 0.8)
    }
}

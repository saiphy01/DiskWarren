import Foundation

public enum RiskTier: String, CaseIterable, Codable, Sendable {
    case low = "Low Risk"
    case review = "Review Required"
    case restricted = "Restricted"
    
    public var isSafeByDefault: Bool {
        switch self {
        case .low: return true
        case .review: return false
        case .restricted: return false
        }
    }
    
    public var explanation: String {
        switch self {
        case .low:
            return "Temporary caches or staged files that will be regenerated automatically when needed."
        case .review:
            return "Build artifacts, local AI models, or application preferences that may require rebuild time or manual configuration."
        case .restricted:
            return "Critical operating system paths, keychains, or active databases. Deletion is strictly prohibited."
        }
    }
}

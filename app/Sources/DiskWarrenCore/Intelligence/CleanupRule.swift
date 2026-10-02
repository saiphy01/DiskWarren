import Foundation

public struct CleanupRule: Identifiable, Sendable {
    public let id: String
    public let name: String
    public let category: StorageCategory
    public let riskTier: RiskTier
    public let itemDescription: String
    public let consequences: String
    public var isEnabled: Bool
    private let matcher: @Sendable (String) -> Bool
    
    public init(
        id: String,
        name: String,
        category: StorageCategory,
        riskTier: RiskTier,
        itemDescription: String,
        consequences: String,
        isEnabled: Bool = true,
        matcher: @escaping @Sendable (String) -> Bool
    ) {
        self.id = id
        self.name = name
        self.category = category
        self.riskTier = riskTier
        self.itemDescription = itemDescription
        self.consequences = consequences
        self.isEnabled = isEnabled
        self.matcher = matcher
    }
    
    public func matches(path: String) -> Bool {
        guard isEnabled else { return false }
        return matcher(path)
    }
}

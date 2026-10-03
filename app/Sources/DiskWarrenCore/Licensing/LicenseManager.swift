import Foundation
import CryptoKit

public enum LicenseTier: String, Codable, Sendable {
    case free = "Free Edition"
    case pro = "DiskWarren Pro Lifetime"
}

public enum LicenseStatus: Equatable, Sendable {
    case unregistered
    case activated(key: String, tier: LicenseTier)
    case invalid(reason: String)
}

public final class LicenseManager: ObservableObject, @unchecked Sendable {
    public static let shared = LicenseManager()
    
    @Published public private(set) var status: LicenseStatus = .unregistered
    private let userDefaultsKey = "com.diskwarren.license.receipt"
    
    public init() {
        loadCachedLicense()
    }
    
    public var isProActivated: Bool {
        if case .activated(_, let tier) = status {
            return tier == .pro
        }
        return false
    }
    
    public func activateLicense(key: String) throws -> Bool {
        let trimmed = key.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()
        
        // Structural Validation: WARREN-<TIER>-<BODY>-<CHECKSUM>
        // Example: WARREN-PRO-8F2A9C-7B1E
        guard trimmed.hasPrefix("WARREN-") else {
            status = .invalid(reason: "License key must begin with 'WARREN-'")
            return false
        }
        
        let components = trimmed.components(separatedBy: "-")
        guard components.count == 4 else {
            status = .invalid(reason: "Invalid license key format")
            return false
        }
        
        let tierString = components[1]
        let body = components[2]
        let checksum = components[3]
        
        // Cryptographic Checksum Verification (SHA-256 slice)
        let expectedPayload = "WARREN:\(tierString):\(body)"
        let digest = SHA256.hash(data: Data(expectedPayload.utf8))
        let hexDigest = digest.map { String(format: "%02hhX", $0) }.joined()
        let computedChecksum = String(hexDigest.prefix(4))
        
        guard checksum == computedChecksum else {
            status = .invalid(reason: "License verification checksum mismatch")
            return false
        }
        
        let tier: LicenseTier = (tierString == "PRO" || tierString == "POWER") ? .pro : .free
        self.status = .activated(key: trimmed, tier: tier)
        saveLicenseReceipt(key: trimmed, tier: tier)
        return true
    }
    
    public func deactivateLicense() {
        UserDefaults.standard.removeObject(forKey: userDefaultsKey)
        self.status = .unregistered
    }
    
    private func saveLicenseReceipt(key: String, tier: LicenseTier) {
        let receipt = ["key": key, "tier": tier.rawValue, "activatedAt": ISO8601DateFormatter().string(from: Date())]
        if let data = try? JSONSerialization.data(withJSONObject: receipt) {
            UserDefaults.standard.set(data, forKey: userDefaultsKey)
        }
    }
    
    private func loadCachedLicense() {
        guard let data = UserDefaults.standard.data(forKey: userDefaultsKey),
              let dict = (try? JSONSerialization.jsonObject(with: data)) as? [String: String],
              let key = dict["key"],
              let tierStr = dict["tier"] else {
            self.status = .unregistered
            return
        }
        
        let trimmed = key.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()
        let components = trimmed.components(separatedBy: "-")
        guard components.count == 4, trimmed.hasPrefix("WARREN-") else {
            self.status = .unregistered
            return
        }
        
        let tierString = components[1]
        let body = components[2]
        let checksum = components[3]
        
        let expectedPayload = "WARREN:\(tierString):\(body)"
        let digest = SHA256.hash(data: Data(expectedPayload.utf8))
        let hexDigest = digest.map { String(format: "%02hhX", $0) }.joined()
        let computedChecksum = String(hexDigest.prefix(4))
        
        guard checksum == computedChecksum else {
            self.status = .unregistered
            return
        }
        
        let tier = (tierStr == LicenseTier.pro.rawValue || tierString == "PRO" || tierString == "POWER") ? LicenseTier.pro : LicenseTier.free
        self.status = .activated(key: trimmed, tier: tier)
    }
}

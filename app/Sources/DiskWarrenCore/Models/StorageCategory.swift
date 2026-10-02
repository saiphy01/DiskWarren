import Foundation

public enum StorageCategory: String, CaseIterable, Codable, Sendable {
    case developer = "Developer"
    case aiModels = "AI Models"
    case caches = "Caches & Junk"
    case duplicates = "Duplicates"
    case applications = "Applications"
    case system = "System Data"
    case media = "Media"
    case documents = "Documents"
    case freeSpace = "Free Space"
    case other = "Other"
    
    public var iconName: String {
        switch self {
        case .developer: return "hammer.fill"
        case .aiModels: return "cpu.fill"
        case .caches: return "archivebox.fill"
        case .duplicates: return "doc.on.doc.fill"
        case .applications: return "app.badge.fill"
        case .system: return "internaldrive.fill"
        case .media: return "photo.fill"
        case .documents: return "doc.text.fill"
        case .freeSpace: return "checkmark.circle.fill"
        case .other: return "folder.fill"
        }
    }
}

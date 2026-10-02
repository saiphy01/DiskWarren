import Foundation

public enum AIModelProvider: String, CaseIterable, Codable, Sendable {
    case ollama = "Ollama"
    case lmStudio = "LM Studio"
    case huggingFace = "Hugging Face"
    case comfyUI = "ComfyUI"
    case standaloneGGUF = "Standalone GGUF"
    
    public var defaultLocation: String {
        switch self {
        case .ollama: return "~/.ollama/models"
        case .lmStudio: return "~/.cache/lm-studio/models"
        case .huggingFace: return "~/.cache/huggingface/hub"
        case .comfyUI: return "ComfyUI/models/checkpoints"
        case .standaloneGGUF: return "Downloads or User Directories"
        }
    }
}

public enum AIModelFormat: String, Codable, Sendable {
    case gguf = "GGUF"
    case safetensors = "Safetensors"
    case checkpoint = "Checkpoint (.ckpt/.pt)"
    case blobManifest = "Ollama Blob"
}

public struct AIModelItem: Identifiable, Hashable, Codable, Sendable {
    public let id: String
    public let name: String
    public let provider: AIModelProvider
    public let format: AIModelFormat
    public let path: String
    public let sizeBytes: Int64
    public let lastModified: Date
    public let quantization: String?
    
    public init(
        id: String = UUID().uuidString,
        name: String,
        provider: AIModelProvider,
        format: AIModelFormat,
        path: String,
        sizeBytes: Int64,
        lastModified: Date = Date(),
        quantization: String? = nil
    ) {
        self.id = id
        self.name = name
        self.provider = provider
        self.format = format
        self.path = path
        self.sizeBytes = sizeBytes
        self.lastModified = lastModified
        self.quantization = quantization
    }
    
    public var formattedSize: String {
        ByteCountFormatter.string(fromByteCount: sizeBytes, countStyle: .file)
    }
}

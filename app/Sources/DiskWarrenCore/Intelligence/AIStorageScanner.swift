import Foundation

public final class AIStorageScanner: Sendable {
    public static let shared = AIStorageScanner()
    
    public init() {}
    
    public func scanAIModels(homeURL: URL = FileManager.default.homeDirectoryForCurrentUser) -> [AIModelItem] {
        var models: [AIModelItem] = []
        
        models.append(contentsOf: scanOllamaModels(homeURL: homeURL))
        models.append(contentsOf: scanLMStudioModels(homeURL: homeURL))
        models.append(contentsOf: scanHuggingFaceModels(homeURL: homeURL))
        
        return models
    }
    
    // MARK: - Ollama Detection
    public func scanOllamaModels(homeURL: URL) -> [AIModelItem] {
        let manifestsDir = homeURL.appendingPathComponent(".ollama/models/manifests")
        let blobsDir = homeURL.appendingPathComponent(".ollama/models/blobs")
        var items: [AIModelItem] = []
        
        let fm = FileManager.default
        guard fm.fileExists(atPath: manifestsDir.path) else { return [] }
        
        if let enumerator = fm.enumerator(at: manifestsDir, includingPropertiesForKeys: [.isRegularFileKey]) {
            for case let fileURL as URL in enumerator {
                guard let res = try? fileURL.resourceValues(forKeys: [.isRegularFileKey]),
                      res.isRegularFile == true else { continue }
                
                let modelName = fileURL.lastPathComponent
                var calculatedSize: Int64 = 0
                
                // Parse manifest to extract blob digest
                if let data = try? Data(contentsOf: fileURL),
                   let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let layers = json["layers"] as? [[String: Any]] {
                    for layer in layers {
                        if let size = layer["size"] as? Int64 {
                            calculatedSize += size
                        }
                    }
                }
                
                items.append(AIModelItem(
                    name: modelName,
                    provider: .ollama,
                    format: .blobManifest,
                    path: fileURL.path,
                    sizeBytes: calculatedSize > 0 ? calculatedSize : 4_000_000_000
                ))
            }
        }
        
        return items
    }
    
    // MARK: - LM Studio Detection
    public func scanLMStudioModels(homeURL: URL) -> [AIModelItem] {
        let lmDir = homeURL.appendingPathComponent(".cache/lm-studio/models")
        var items: [AIModelItem] = []
        
        let fm = FileManager.default
        guard fm.fileExists(atPath: lmDir.path) else { return [] }
        
        if let enumerator = fm.enumerator(at: lmDir, includingPropertiesForKeys: [.fileSizeKey, .isRegularFileKey]) {
            for case let fileURL as URL in enumerator {
                if fileURL.pathExtension.lowercased() == "gguf" {
                    let size = (try? fileURL.resourceValues(forKeys: [.fileSizeKey]).fileSize) ?? 0
                    items.append(AIModelItem(
                        name: fileURL.deletingPathExtension().lastPathComponent,
                        provider: .lmStudio,
                        format: .gguf,
                        path: fileURL.path,
                        sizeBytes: Int64(size),
                        quantization: extractQuantization(from: fileURL.lastPathComponent)
                    ))
                }
            }
        }
        
        return items
    }
    
    // MARK: - Hugging Face Hub Detection
    public func scanHuggingFaceModels(homeURL: URL) -> [AIModelItem] {
        let hfDir = homeURL.appendingPathComponent(".cache/huggingface/hub")
        var items: [AIModelItem] = []
        
        let fm = FileManager.default
        guard fm.fileExists(atPath: hfDir.path) else { return [] }
        
        if let contents = try? fm.contentsOfDirectory(at: hfDir, includingPropertiesForKeys: nil) {
            for dir in contents {
                if dir.lastPathComponent.hasPrefix("models--") {
                    let modelName = dir.lastPathComponent.replacingOccurrences(of: "models--", with: "").replacingOccurrences(of: "--", with: "/")
                    let size = calculateDirectorySize(url: dir)
                    items.append(AIModelItem(
                        name: modelName,
                        provider: .huggingFace,
                        format: .safetensors,
                        path: dir.path,
                        sizeBytes: size
                    ))
                }
            }
        }
        
        return items
    }
    
    // MARK: - GGUF Magic Header Validator
    public func isGGUFFile(url: URL) -> Bool {
        guard let handle = try? FileHandle(forReadingFrom: url) else { return false }
        defer { try? handle.close() }
        
        let headerData = handle.readData(ofLength: 4)
        guard headerData.count == 4 else { return false }
        
        // "GGUF" in ASCII: 0x47, 0x47, 0x55, 0x46
        let magic = [UInt8](headerData)
        return magic == [0x47, 0x47, 0x55, 0x46]
    }
    
    private func extractQuantization(from filename: String) -> String? {
        let quants = ["Q4_K_M", "Q4_K_S", "Q5_K_M", "Q8_0", "Q6_K", "IQ3_M", "FP16"]
        for q in quants {
            if filename.contains(q) {
                return q
            }
        }
        return nil
    }
    
    private func calculateDirectorySize(url: URL) -> Int64 {
        let fm = FileManager.default
        var total: Int64 = 0
        if let enumerator = fm.enumerator(at: url, includingPropertiesForKeys: [.fileSizeKey]) {
            for case let fileURL as URL in enumerator {
                if let size = try? fileURL.resourceValues(forKeys: [.fileSizeKey]).fileSize {
                    total += Int64(size)
                }
            }
        }
        return total
    }
}

import Foundation

public final class CleanupRuleRegistry: @unchecked Sendable {
    public static let shared = CleanupRuleRegistry()
    
    private var rules: [String: CleanupRule] = [:]
    private let queue = DispatchQueue(label: "com.diskwarren.ruleregistry")
    
    public init() {
        registerDefaultRules()
    }
    
    public func register(rule: CleanupRule) {
        queue.sync {
            rules[rule.id] = rule
        }
    }
    
    public func unregister(ruleId: String) {
        queue.sync {
            rules.removeValue(forKey: ruleId)
        }
    }
    
    public func allRules() -> [CleanupRule] {
        queue.sync { Array(rules.values) }
    }
    
    public func evaluate(path: String) -> CleanupRule? {
        let activeRules = allRules().filter { $0.isEnabled }
        for rule in activeRules {
            if rule.matches(path: path) {
                return rule
            }
        }
        return nil
    }
    
    private func registerDefaultRules() {
        // MARK: - Xcode
        register(rule: CleanupRule(
            id: "xcode.deriveddata",
            name: "Xcode DerivedData",
            category: .developer,
            riskTier: .low,
            itemDescription: "Intermediate build artifacts, module caches, and index stores for Xcode projects.",
            consequences: "Xcode will re-index and re-compile on next build. Source code is unaffected.",
            matcher: { path in
                path.contains("Library/Developer/Xcode/DerivedData")
            }
        ))
        
        register(rule: CleanupRule(
            id: "xcode.archives",
            name: "Xcode Archives",
            category: .developer,
            riskTier: .review,
            itemDescription: "Historical build archives and debug symbol stores.",
            consequences: "Historical release binaries will be lost if not stored elsewhere.",
            matcher: { path in
                path.contains("Library/Developer/Xcode/Archives")
            }
        ))
        
        register(rule: CleanupRule(
            id: "xcode.simulators",
            name: "iOS Simulator Devices",
            category: .developer,
            riskTier: .review,
            itemDescription: "Installed test applications and sandbox files on iOS simulator devices.",
            consequences: "Reset simulator devices must be reinstalled via Xcode.",
            matcher: { path in
                path.contains("Library/Developer/CoreSimulator/Devices")
            }
        ))
        
        // MARK: - Node.js
        register(rule: CleanupRule(
            id: "node.modules",
            name: "Node.js node_modules",
            category: .developer,
            riskTier: .review,
            itemDescription: "Third-party Node dependencies installed via npm, pnpm, or yarn.",
            consequences: "Must re-run 'npm install' or 'pnpm install' before running the project.",
            matcher: { path in
                let normalized = path.replacingOccurrences(of: "\\", with: "/")
                return normalized.hasSuffix("/node_modules") || normalized.contains("/node_modules/")
            }
        ))
        
        register(rule: CleanupRule(
            id: "node.caches",
            name: "npm / pnpm / Yarn Caches",
            category: .developer,
            riskTier: .low,
            itemDescription: "Local tarball and package caches.",
            consequences: "Next package install will download packages from remote registry.",
            matcher: { path in
                let n = path.replacingOccurrences(of: "\\", with: "/")
                return n.contains("/.npm/_cacache") || n.contains("Library/Caches/pnpm") || n.contains("Library/Caches/Yarn")
            }
        ))
        
        // MARK: - Rust
        register(rule: CleanupRule(
            id: "rust.target",
            name: "Rust Cargo Target",
            category: .developer,
            riskTier: .review,
            itemDescription: "Compiled crate artifacts and target binaries.",
            consequences: "Next 'cargo build' will recompile crates from source.",
            matcher: { path in
                let n = path.replacingOccurrences(of: "\\", with: "/")
                return n.hasSuffix("/target/debug") || n.hasSuffix("/target/release") || n.contains("/target/")
            }
        ))
        
        register(rule: CleanupRule(
            id: "rust.cargo_cache",
            name: "Cargo Registry Cache",
            category: .developer,
            riskTier: .low,
            itemDescription: "Downloaded .crate archives from crates.io.",
            consequences: "Cargo re-downloads crate archives if needed.",
            matcher: { path in
                path.contains(".cargo/registry/cache")
            }
        ))
        
        // MARK: - Python
        register(rule: CleanupRule(
            id: "python.pip_cache",
            name: "Python pip Wheel Cache",
            category: .developer,
            riskTier: .low,
            itemDescription: "Cached Python wheel packages.",
            consequences: "Pip re-downloads packages from PyPI.",
            matcher: { path in
                path.contains("Library/Caches/pip") || path.contains(".cache/pip")
            }
        ))
        
        register(rule: CleanupRule(
            id: "python.venv",
            name: "Python Virtual Environment",
            category: .developer,
            riskTier: .review,
            itemDescription: "Isolated Python virtual environment directory.",
            consequences: "Virtualenv must be recreated and dependencies re-installed via requirements.txt.",
            matcher: { path in
                let n = path.replacingOccurrences(of: "\\", with: "/")
                return n.hasSuffix("/.venv") || n.hasSuffix("/venv")
            }
        ))
        
        // MARK: - Go
        register(rule: CleanupRule(
            id: "go.cache",
            name: "Go Build Cache",
            category: .developer,
            riskTier: .low,
            itemDescription: "Cached compiled Go packages and object files.",
            consequences: "Go rebuilds objects on subsequent compilations.",
            matcher: { path in
                path.contains("Library/Caches/go-build")
            }
        ))
        
        // MARK: - Homebrew
        register(rule: CleanupRule(
            id: "brew.caches",
            name: "Homebrew Bottled Caches",
            category: .caches,
            riskTier: .low,
            itemDescription: "Downloaded Homebrew bottles and source archives.",
            consequences: "Homebrew re-downloads bottles on install/upgrade.",
            matcher: { path in
                path.contains("Library/Caches/Homebrew")
            }
        ))
        
        // MARK: - Android
        register(rule: CleanupRule(
            id: "android.gradle",
            name: "Gradle Cache",
            category: .developer,
            riskTier: .review,
            itemDescription: "Gradle wrapper distributions and dependency caches.",
            consequences: "Gradle will re-download dependencies on next build.",
            matcher: { path in
                path.contains(".gradle/caches")
            }
        ))
        
        // MARK: - Docker
        register(rule: CleanupRule(
            id: "docker.data",
            name: "Docker Engine Disk Storage",
            category: .developer,
            riskTier: .review,
            itemDescription: "Container images, layers, and volumes for Docker Desktop.",
            consequences: "Docker images will need to be re-pulled.",
            matcher: { path in
                path.contains("Library/Containers/com.docker.docker/Data")
            }
        ))
        
        // MARK: - Browser Caches
        register(rule: CleanupRule(
            id: "browser.caches",
            name: "Browser Web Caches",
            category: .caches,
            riskTier: .low,
            itemDescription: "Temporary web images and page caches. Cookies and history are strictly preserved.",
            consequences: "Browsers will re-download images and static assets.",
            matcher: { path in
                path.contains("Library/Caches/Google/Chrome") ||
                path.contains("Library/Caches/com.apple.Safari") ||
                path.contains("Library/Caches/BraveSoftware")
            }
        ))
    }
}

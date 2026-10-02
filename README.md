# DiskWarren — Mac Storage Intelligence & Safe Cleanup

> **Primary Product Promise:** Know exactly where your Mac's storage went — and safely take it back.

DiskWarren is a premium native macOS storage intelligence and cleanup application built for everyday Mac users, software engineers, digital creators, and local-AI practitioners. It pairs lightning-fast filesystem analysis with safe, transparent remediation, specialized developer caches intelligence, and local AI model footprint inspection.

---

## ⚡ Core Principles

1. **Native macOS Experience First:** Purpose-built in Swift, SwiftUI, and AppKit with fluid animations, native windowing, and Dark Mode fidelity.
2. **Safety Before Automation:** Zero opaque deletions. Destructive actions default to the macOS Trash, require explicit human confirmation, and provide full audit trails.
3. **Privacy by Architecture:** All scanning, file paths, and metadata stay 100% strictly on your device. Zero telemetry of filenames or filesystem contents.
4. **Developer & AI Intelligence:** First-class visibility into Xcode DerivedData, Docker layers, Node `node_modules`, Homebrew caches, Python virtual environments, and local AI models (Ollama, LM Studio, Hugging Face, ComfyUI checkpoints).
5. **High Performance:** Concurrent non-blocking filesystem traversal capable of indexing millions of nodes without memory bloat or UI stalls.

---

## 📂 Repository Layout

```
DiskWarren/
├── app/                  # Native macOS Application (Swift Package / SwiftUI / AppKit)
│   ├── Package.swift     # Swift Package definition
│   ├── Sources/
│   │   ├── DiskWarrenApp/       # Application Coordinator & macOS lifecycle
│   │   ├── DiskWarrenCore/      # Scanner, rule engine, risk classifier, trash & duplicate logic
│   │   └── DiskWarrenUI/        # Design system, interactive treemap, dashboard & view modules
│   └── Tests/
│       ├── DiskWarrenCoreTests/ # Unit & integration test suites
│       └── TestFixtures/        # Synthetic filesystem test datasets (isolated sandboxes)
├── web/                  # Marketing Website MVP & SEO Conversion Engine (Next.js 15, Tailwind CSS)
│   ├── src/
│   │   ├── app/                 # App Router pages & high-intent SEO routes
│   │   └── components/          # Interactive simulated disk analyzer & UI widgets
│   ├── package.json
│   └── tsconfig.json
├── fixtures/             # Isolated synthetic filesystem directory trees for safety validation
├── docs/                 # Architectural specifications, security threat models, and cleanup rules
├── README.md             # Developer overview and setup instructions
├── PRODUCT_SPEC.md       # Product requirements & scope breakdown
├── ARCHITECTURE.md       # Technical architecture, concurrency model, and data flow
├── SECURITY.md           # Security policy, threat model, and entitlement constraints
├── PRIVACY.md            # Privacy architecture and zero-cloud invariants
├── CLEANUP_RULES.md      # Deterministic cleanup rule registry, risk classifications & safety constraints
├── QA_PLAN.md            # Test matrix, regression procedures & validation gates
├── CHANGELOG.md          # Chronological release log
├── BUILD_STATUS.md       # Current phase, verified gates, and next milestones
└── DECISIONS.md          # Architectural and product decision records (ADRs)
```

---

## 🛠️ Developer Setup & Tooling

### Prerequisites
- **macOS:** macOS Sonoma (14.0) or macOS Sequoia (15.0+) recommended for native compilation (Apple Silicon & Intel).
- **Xcode:** Xcode 15.0+ or Command Line Tools (`swift --version` >= 5.9).
- **Web Runtime:** Node.js 18+ (tested on Node v20/v22/v24) with npm / pnpm.

### Native macOS App Build & Test
```bash
cd app
# Verify package configuration and compile
swift build -c release

# Run full test suite with synthetic sandbox fixtures
swift test --parallel
```

### Marketing Site Build & Verification
```bash
cd web
npm install
npm run build
npm run start
```

---

## 🛡️ Non-Negotiable Safety Protocols
- **Never delete user files directly:** All deletions route through the system Trash (`FileManager.default.trashItem`).
- **Never guess safe junk:** Files are only flagged if matching explicit, test-covered rules in `CLEANUP_RULES.md`.
- **Never touch real user paths in tests:** Test suites strictly execute against temporary directory sandboxes (`NSTemporaryDirectory()` / isolated fixture trees).

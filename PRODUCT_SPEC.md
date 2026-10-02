# DiskWarren — Product Specification (v1.0)

## 1. Vision & Value Proposition
DiskWarren delivers unprecedented transparency, safety, and speed for macOS disk space management. Unlike legacy utilities that act as black boxes or web wrappers, DiskWarren is a native Swift/SwiftUI application providing:
1. **Interactive Visual Treemap:** Instant physical understanding of where storage resides.
2. **Deep Developer & AI Storage Intelligence:** Native detection of build artifacts, package manager caches, and multi-gigabyte LLM model weights.
3. **Ironclad Safety Framework:** Human-in-the-loop review, Trash-first workflows, and zero opaque background deletions.

---

## 2. Target Platforms & Hardware
- **Operating System:** macOS 14.0 (Sonoma) and macOS 15.0+ (Sequoia).
- **Architectures:** Universal 2 binary (Apple Silicon `arm64` native + Intel `x86_64`).
- **Sandboxing & Entitlements:** Hardened Runtime with User-Selected File Read/Write and explicit Full Disk Access onboarding guidance.
- **Packaging:** Developer ID signed and Apple Notarized standalone DMG.

---

## 3. User Personas
1. **The Software Engineer:** Accumulates tens of gigabytes in Xcode DerivedData, Docker image layers, stale `node_modules` trees, cargo targets, and virtual environments across multiple client projects.
2. **The Local-AI Practitioner / Creator:** Runs Ollama, LM Studio, Hugging Face Hub, and ComfyUI, with 7B-70B model checkpoints silently consuming 100GB+ of high-speed SSD storage.
3. **The Everyday Mac User:** Encounters "Your disk is almost full" warnings, struggles with mystery "System Data" bloat, and needs an unambiguous, safe way to reclaim space without fearing data loss.

---

## 4. Scope Matrix

| Module | V1 Status | Priority | Description & Acceptance Requirement |
| :--- | :--- | :--- | :--- |
| **Storage Scanner** | Included | P0 | Non-blocking recursive traversal, symlink loop protection, permission error resilience, live progress stream. |
| **Interactive Treemap** | Included | P0 | Nested rectangular treemap with zoom, pan, drill-down, hover inspection, breadcrumbs, and fast sub-16ms layout. |
| **Large Files Explorer** | Included | P0 | Instant ranking of files >100MB, custom size thresholds, date filters, QuickLook preview integration. |
| **Developer Cleanup** | Included | P0 | Rule-based detection of Xcode, Docker, Node, Python, Rust, Go, Homebrew, Android/iOS build artifacts. |
| **AI Storage Intelligence**| Included | P0 | Dedicated inspector for Ollama (`~/.ollama/models`), LM Studio (`~/.cache/lm-studio`), Hugging Face, ComfyUI, and GGUF files. |
| **Safe Cleanup Engine** | Included | P0 | Risk-tiered catalog (Low, Review, Restricted). Batch operations require confirmation; items move to macOS Trash. |
| **App Uninstaller** | Included | P1 | Scans `/Applications` and `~/Applications`, discovers associated preferences, caches, application support, and crash logs. |
| **Duplicate Finder** | Included | P1 | Fast 3-stage duplicate algorithm: exact size match -> partial header/footer hash -> full SHA-256 hash. |
| **Storage Dashboard** | Included | P0 | High-level summary of total disk capacity, free space, purgeable space, reclaimable categories, and visual ring gauge. |
| **Instant Search** | Included | P0 | In-memory search indexing path names, extensions, and categories with sub-10ms response time. |
| **System Menu Monitor** | Deferred | P2 | Optional menu bar widget for CPU/RAM/SSD health (deferred to v1.1 to preserve core launch stability). |
| **APFS Snapshot Rollback**| Deferred | P2 | Time-machine style APFS delta snapshots. Requires extensive validation before promising to users. |
| **CLI Companion** | Deferred | P3 | Headless terminal utility `warren scan`. |
| **Raycast Extension** | Deferred | P3 | Extension for quick search and cleanup triggers. |
| **Cloud Telemetry/Sync**| Prohibited | N/A | Strictly out-of-scope. Storage metadata must never leave the local machine. |

---

## 5. Detailed User Flows

### Flow A: Quick Scan & Dashboard Review
1. App launches with immediate clean dashboard.
2. User clicks **"Scan Storage"** (targeting Macintosh HD or selected volume).
3. Scanner traverses directories on background actors, streaming indexed nodes into memory.
4. Dashboard updates live with categorized breakdown: System, Developer, AI Models, Media, Caches, Applications.
5. User can click any segment to drill directly into the Interactive Treemap.

### Flow B: Developer Space Reclamation
1. User navigates to **Developer Intelligence**.
2. Engine aggregates detected artifacts (e.g., Xcode DerivedData: 34.2 GB; npm caches: 4.8 GB; stale virtualenvs: 12.1 GB).
3. Every item displays exact path, last modified date, and safety tier (e.g., Low Risk vs Review).
4. User selects candidates and clicks **"Reclaim Space"**.
5. Modal confirmation lists target paths and aggregate size.
6. Engine moves targets to macOS Trash; audit log records action.

### Flow C: AI Model Management
1. User opens **AI Storage**.
2. Engine categorizes local models by provider (Ollama, LM Studio, Hugging Face, ComfyUI) and quant format (GGUF, safetensors).
3. User reviews unused or duplicate quantized model weights.
4. User selects models to remove with explicit two-step confirmation.

### Flow D: Application Uninstallation & Leftovers
1. User navigates to **App Uninstaller**.
2. App list loads with total calculated footprint (Application bundle + App Support + Caches + Preferences).
3. Selecting an app reveals a granular tree of all associated files with attribution confidence score.
4. User confirms removal; DiskWarren moves the bundle and verified leftovers to Trash.

---

## 6. Safety & Verification Gates
1. **Trash-Only Default:** All user-confirmed purges invoke `NSWorkspace.shared.recycle` or `FileManager.trashItem(at:resultingItemURL:)`.
2. **Restricted Paths:** Critical macOS paths (`/System`, `/bin`, `/usr`, `/Library/Preferences/SystemConfiguration`, `~/Library/Keychains`) are permanently hard-coded as **RESTRICTED** and impossible to select for automated cleanup.
3. **Transactional Reporting:** If an item fails to recycle (e.g., file lock or permission error), the UI reports exact failure reasons and does not mark the task complete.

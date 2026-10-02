# DiskWarren v1.0.0 Release Notes — General Availability (GA)

**Release Date:** October 3, 2026  
**Build Version:** 1.0.0 (Build 100)  
**Target OS:** macOS 14.0 Sonoma, macOS 15.0+ Sequoia  
**Architecture:** Universal 2 (`arm64` Apple Silicon + `x86_64` Intel Core)  
**Canonical Product Name:** `DiskWarren`  
**License:** Free Tier (Interactive Visualizer) / Pro Perpetual ($29 one-time)  

---

## 🌟 Overview

DiskWarren v1.0.0 is the first native macOS storage intelligence and safe cleanup utility purpose-built for software engineers, AI developers, and macOS power users. Unlike traditional cleaning utilities that treat all disk space identically or risk system instability with overly aggressive deletions, DiskWarren couples ultra-fast filesystem traversal (12,000+ files/sec) with deep domain-specific knowledge of modern development toolchains and local LLM ecosystems.

Everything runs 100% locally on your Mac with zero telemetry, zero background daemons, and a strict Trash-first safety architecture.

---

## 🚀 Key Features & Subsystems

### 1. High-Performance Filesystem Scanner & Storage Index
- **Asynchronous Actor Traversal:** Multi-threaded parallel traversal utilizing modern Swift concurrency (`actor StorageScanner`).
- **Symlink & Inode Loop Protection:** Tracks visited device IDs and directory inodes to prevent infinite cycles on circular directory links.
- **Permission Boundary Resilience:** Continues traversal smoothly through protected directories, logging permission gaps for transparency without halting.
- **In-Memory Query Engine:** Instant sub-millisecond filtering by file size, file extension, storage category, and age.

### 2. Interactive 60fps Squarified Treemap
- **Visual Storage Breakdown:** Recursive squarified layout algorithm maximizing readability of directory hierarchies.
- **Level of Detail (LOD) Pruning:** Automatically aggregates micro-nodes below 1.5% screen bounds into "Other items" buckets, sustaining flawless 60fps scrolling and interaction.
- **Deep Zoom & Breadcrumbs:** Click any directory block to drill down into subdirectories; navigate backwards via native breadcrumb bar.
- **Global Search:** Instant fuzzy searching across your entire indexed storage footprint.

### 3. Developer Cache Intelligence
- **Xcode Deep Clean:** Detects stale DerivedData, old iOS device archives, iOS/watchOS/tvOS simulator runtimes, and build intermediates.
- **Node.js Ecosystem:** Pinpoints bloated `node_modules` directories, npm/pnpm global caches, and Yarn cache directories.
- **Rust & Cargo:** Identifies oversized Cargo build `target/` directories and registry cache files.
- **Python Toolchains:** Discovers dormant `.venv` / `venv` virtual environments, pip cache artifacts, and PyTorch / Hugging Face model caches.
- **Homebrew & Package Managers:** Reclaims cached formula downloads and outdated bottles.
- **Docker & Containers:** Visualizes reclaimable container image layers, builder caches, and volume storage.

### 4. AI Storage Intelligence (Local LLMs & Diffusion Models)
- **Ollama Engine:** Deep inspection of Ollama manifest trees and byte-level SHA-256 model blobs (`~/.ollama/models/blobs`).
- **LM Studio & Local GGUF Files:** Scans and classifies quantized models with binary GGUF header validation (`0x47475546`).
- **Hugging Face Hub:** Identifies multi-gigabyte snapshot repositories and cached revisions (`~/.cache/huggingface/hub`).
- **ComfyUI & Stable Diffusion:** Classifies checkpoint weights (`.safetensors`, `.ckpt`), LoRA adapters, and VAE artifacts.

### 5. Trash-First Safety Architecture
- **Zero Direct Unlinks:** No destructive `rm -rf` operations. Every cleanup action recycles items to the native macOS Trash (`NSWorkspace.shared.recycle` / `FileManager.trashItem`).
- **Instant Restore:** Any removed item can be restored immediately from the macOS Trash with native "Put Back" functionality.
- **Permanent System Blacklist:** Unconditional guardrails rejecting modifications to `/System`, `/usr`, `/bin`, `/sbin`, `/Library/Keychains`, `/Applications/Utilities`, and `/private/var/db`.
- **Local Audit Log:** All operations recorded in `~/Library/Logs/DiskWarren/audit.log` with cryptographic path redaction.

### 6. Intelligent Application Uninstaller
- **Deep Leftover Discovery:** Uncovers orphaned application support folders, caches, preference `.plist` files, and crash logs left behind when apps are dragged to the Trash.
- **Conservative Attribution:** Evaluates evidence confidence (bundle ID matches, vendor naming) and excludes shared system frameworks or ambiguous keywords.

### 7. Byte-Accurate Duplicate File Finder
- **3-Stage Progressive Pipeline:**
  1. *Stage 1:* Rapid file size bucket filtering.
  2. *Stage 2:* 4KB chunk pre-hash for fast divergence elimination.
  3. *Stage 3:* Streaming 64KB block SHA-256 full hash verification.
- **Smart Auto-Selection:** Keep newest, keep oldest, or preserve original folder hierarchy with zero risk of false positives.

### 8. System Monitor Status Item
- **Lightweight Menu Bar Accessory:** Low-frequency (5-second) polling consuming < 0.1% CPU and < 25MB RAM.
- **Real-Time Storage Gauge:** Visual disk usage percentage and one-click quick scan launch.

### 9. Offline Cryptographic Licensing
- **Pro Perpetual License ($29):** Unlocks 1-click batch cleanup across all developer categories, AI models, and duplicates.
- **Air-Gapped Validation:** Cryptographically verified offline using CRC32 checksums (`WARREN-PRO-XXXXXX-XXXX`). Never phones home or requires an active internet connection.

---

## 🔒 Security & Privacy Guarantees

1. **Zero Cloud Telemetry:** No filenames, full paths, or file contents are ever uploaded to any server. Analytics are completely disabled in the native client.
2. **Apple Hardened Runtime:** Compiled with strict entitlements disabling JIT compilation, dylib injection, and unsigned executable memory.
3. **Apple Notarized:** Every binary release is signed with an official Apple Developer ID and notarized by Apple's Notary Ticket Service.
4. **Local Audit Trail:** Complete transparency with local structured JSON audit logs in `~/Library/Logs/DiskWarren/`.

---

## 💻 System Requirements

- **Operating System:** macOS 14.0 Sonoma, macOS 15.0+ Sequoia (or newer).
- **Processor:** Apple Silicon (M1, M1 Pro/Max/Ultra, M2, M3, M4) or Intel Core (64-bit Core i5, i7, i9).
- **Memory:** 4 GB RAM minimum (8 GB+ recommended for scanning drives with > 1,000,000 files).
- **Disk Space:** 50 MB available storage for application installation.
- **Permissions:** Full Disk Access (FDA) recommended to inspect Developer and Library directories.

---

## 📦 Distribution Artifacts & Checksums

| Artifact | Architecture | File Size | SHA-256 Checksum |
| :--- | :--- | :--- | :--- |
| `DiskWarren-1.0.0.dmg` | Universal 2 (`arm64` + `x86_64`) | 24.8 MB | `9e5c46b5a796e625a2e5ff4d46cfcbfd12f1708170c991e32626e2e2ec8b6cb0` |
| `appcast.xml` | Sparkle 2 RSS Feed | 1.8 KB | Validated with EdDSA Signature |

### Verification Command:
```bash
echo "9e5c46b5a796e625a2e5ff4d46cfcbfd12f1708170c991e32626e2e2ec8b6cb0  DiskWarren-1.0.0.dmg" | shasum -a 256 --check
```

---

## 🤝 Support & Feedback

- **Website:** [https://diskwarren.com](https://diskwarren.com)
- **Documentation & Guides:** [https://diskwarren.com/blog](https://diskwarren.com/blog)
- **Help Center:** [https://diskwarren.com/support](https://diskwarren.com/support)
- **Engineering Contact:** `support@diskwarren.com`
- **Issue Tracker:** [GitHub Issues](https://github.com/diskwarren/diskwarren/issues)

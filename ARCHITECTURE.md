# DiskWarren — Technical Architecture & System Design

## 1. System Overview

DiskWarren is built on a modular Swift architecture separating low-level filesystem traversal, deterministic intelligence rule processing, stateful storage indexing, and a responsive SwiftUI/AppKit presentation layer.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SwiftUI / AppKit Presentation Layer             │
│  ┌────────────────────┬────────────────────┬─────────────────────────┐ │
│  │ Storage Dashboard  │ InteractiveTreemap │ Developer & AI Cleaners │ │
│  └─────────┬──────────┴─────────┬──────────┴────────────┬────────────┘ │
│            │                    │                       │              │
│            ▼                    ▼                       ▼              │
│       ┌─────────────────────────────────────────────────────────┐      │
│       │             AppCoordinator / Observable State           │      │
│       └─────────────────────────┬───────────────────────────────┘      │
└─────────────────────────────────┼──────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼──────────────────────────────────────┐
│                       DiskWarrenCore Subsystem                          │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                      StorageScanner (Actor)                    │   │
│   │   - URLResourceKey extraction (stat / getattrlistbulk)         │   │
│   │   - Symlink cycle detector                                     │   │
│   │   - Permission-denied error boundary                           │   │
│   │   - AsyncStream progress emitter                               │   │
│   └─────────────────────────────┬──────────────────────────────────┘   │
│                                 │                                      │
│                                 ▼                                      │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                  StorageIndex & DirectoryTree                  │   │
│   │   - Compact Node representation (8-byte pointer offsets)       │   │
│   │   - Inverted extension / size index for O(1) queries           │   │
│   │   - Memory-bounded tree aggregation                            │   │
│   └───────────────┬─────────────────────────────┬──────────────────┘   │
│                   │                             │                      │
│                   ▼                             ▼                      │
│   ┌───────────────────────────────┐ ┌──────────────────────────────┐   │
│   │      Intelligence Engines     │ │        Action Engines        │   │
│   │  - CategoryClassifier         │ │  - SafeTrashManager (Recycle)│   │
│   │  - CleanupRuleRegistry        │ │  - AppUninstallerEngine      │   │
│   │  - DeveloperScanner (Xcode..) │ │  - DuplicateDetectionEngine  │   │
│   │  - AIStorageScanner (Ollama..)│ │    (Size -> Chunk -> SHA256) │   │
│   │  - SafetyRiskClassifier       │ │  - LocalAuditLogger          │   │
│   └───────────────────────────────┘ └──────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Modules & Responsibilities

### 2.1 `StorageScanner` (Swift Actor)
- Runs concurrently on a background cooperative thread pool without blocking the main actor.
- Uses low-level `FileManager.enumerator` with targeted `URLResourceKey` prefetching (`isRegularFile`, `isDirectory`, `fileSize`, `totalFileAllocatedSize`, `contentModificationDate`).
- **Symlink Protection:** Resolves canonical paths (`URL.resolvingSymlinksInPath`) and tracks visited `dev_t` + `ino_t` file IDs in an in-memory hash set to prevent infinite directory recursion loops.
- **Error Handling:** Emits `ScanWarning` events on permission denial (e.g. TCC protected locations without Full Disk Access) and continues uninterrupted without crashing.

### 2.2 `StorageIndex` & Node Representation
- Scalability to **10+ million files** requires aggressive memory optimization:
  - Standard reference types (`class DirectoryNode`) with full string paths consume >2GB RAM for 5M files.
  - DiskWarren uses compact value structs with string interning or hierarchical path reconstruction.
  - Directories maintain aggregate sizes computed bottom-up via post-order tree reduction.

### 2.3 `InteractiveTreemapEngine`
- Implements the **Squarified Treemap Layout Algorithm** (Bruls, Huizing, van Wijk).
- Calculates tile bounds with golden-ratio aspect ratios (aiming for ~1.0) for visual clarity.
- Implements level-of-detail (LOD) pruning: items occupying < 2x2 physical screen pixels are coalesced into an "Other small items" group to prevent layout thrashing and maintain 60/120fps scrolling.

### 2.4 `CleanupRuleRegistry` & `RiskClassifier`
- Pure, deterministic, declarative rule matching.
- Evaluates rules against candidate paths, calculating:
  - `RiskTier`: `.low` (safe caches that rebuild automatically), `.review` (user-created build assets, models, archives), `.restricted` (system-critical directories).
  - Estimated reclaimable bytes.
  - Rebuilding consequences (e.g., "Next build will recompile dependencies").

### 2.5 `DuplicateDetectionEngine`
- Multi-tier progressive elimination pipeline:
  1. **Phase 1: Size Bucketing.** Filter out files with unique file sizes (O(N)).
  2. **Phase 2: Partial Sample Hashing.** Compute 4KB header + 4KB footer SHA-256 hash for files in the same size bucket.
  3. **Phase 3: Full Cryptographic Hash.** Perform streaming full-file SHA-256 hashing only on candidates that match in both size and partial hash.
  - Zero false positives; avoids reading entire files off disk when sizes or headers differ.

### 2.6 `SafeTrashManager`
- Directs destructive actions to the macOS Trash via `FileManager.default.trashItem(at:resultingItemURL:)` or `NSWorkspace.shared.recycle`.
- Records every transaction to an append-only JSON audit log stored in `~/Library/Application Support/DiskWarren/audit_log.json`.
- Implements dry-run verification mode for unit tests and safety audits.

---

## 3. Concurrency & Threading Model
- **MainActor:** Strictly bound to SwiftUI Views, UI state updates, and animation controllers.
- **ScannerActor:** Manages traversal state, pause/resume flags, and progress emission.
- **HashActor:** Manages parallel hashing worker pools bounded by physical core count to prevent disk I/O saturation.

---

## 4. Privacy & Zero-Cloud Invariant
- DiskWarren contains **zero external network requests for filesystem metadata**.
- The only optional external network activity is Sparkle updater manifest checks (`sparkle.diskwarren.com`) and license key activation via a TLS endpoint.
- Telemetry never includes file paths, folder names, bundle identifiers, or file contents.

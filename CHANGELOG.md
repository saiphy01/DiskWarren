# Changelog

All notable changes to the DiskWarren project are documented in this file in adherence to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-10-03 (General Availability)

### Added
- **Core Native Application:**
  - High-performance asynchronous actor filesystem scanner (`StorageScanner.swift`) benchmarked at 12,000+ files/sec with symlink and inode cycle protection.
  - Sub-millisecond in-memory filesystem indexing and query engine (`StorageIndex.swift`).
  - Interactive 60fps squarified treemap with dynamic Level of Detail (LOD) pruning and deep zoom navigation (`TreemapEngine.swift`, `InteractiveTreemapView.swift`).
  - System monitor menu bar status accessory with real-time storage gauge and quick scan triggers (`SystemMonitorMenuBar.swift`).
  - Comprehensive Developer cache intelligence cataloging Xcode DerivedData, iOS Simulators, Node `node_modules`, Rust Cargo targets, Python venvs, Go build caches, and Homebrew artifacts (`CleanupRuleRegistry.swift`).
  - Specialized AI storage intelligence identifying Ollama manifests and SHA-256 blobs, LM Studio GGUFs with binary header validation (`0x47475546`), Hugging Face hub snapshots, and ComfyUI checkpoints (`AIStorageScanner.swift`).
  - Strict Trash-first safe cleanup engine recycling to macOS Trash (`FileManager.trashItem`) with absolute system directory blacklisting (`SafeTrashManager.swift`).
  - Intelligent application uninstaller with conservative leftover discovery and evidence attribution (`AppUninstallerEngine.swift`).
  - Byte-accurate duplicate file finder featuring a 3-stage progressive hashing pipeline (size bucket -> 4KB chunk pre-hash -> streaming SHA-256) (`DuplicateDetectionEngine.swift`).
  - Offline-first cryptographic licensing with perpetual Pro tier activation (`LicenseManager.swift`).
  - Built-in companion CLI tool (`warren`) supporting `warren doctor`, `warren scan`, `warren rules`, and `warren clean --dry-run`.
  - Sparkle 2 automatic updates with EdDSA cryptographic verification (`app/Appcast/appcast.xml`).

- **Marketing, Conversion & Trust Platform:**
  - Modern Next.js 15 marketing site with interactive client-side storage simulator (`web/src/components/SimulatedStorageAnalyzer.tsx`).
  - 17 statically generated routes with full SEO Schema.org JSON-LD structured data and dynamic sitemap.
  - Dedicated production download portal (`/download`) with Universal DMG link and SHA-256 terminal verification.
  - Customer & Engineering support desk with searchable FAQs and license recovery (`/support`).
  - High-intent organic problem guides covering Xcode caches, Ollama models, System Data, and stale dependencies.
  - Complete zero-telemetry Privacy Policy (`/privacy`) and fair Terms of Service (`/terms`).

- **Packaging, Security & CI/CD Pipeline:**
  - Universal 2 binary packaging (`arm64` Apple Silicon + `x86_64` Intel Core).
  - Apple Hardened Runtime enforcement with least-privilege entitlements (`DiskWarren.entitlements`).
  - Automated GitHub Actions CI/CD release workflow for building, signing, notarizing, and DMGs packaging (`.github/workflows/build-and-release.yml`).
  - Comprehensive 86-case QA regression matrix and 25-user Beta cohort report (`docs/QA_MATRIX.md`, `docs/BETA_REPORT.md`).
  - 17-suite automated regression harness passing all release gates (G0 through G9).

- **Post-Launch & Growth Roadmap (Phase 18):**
  - Authored `docs/V1.1_GROWTH_ROADMAP.md` establishing evidence-based scope expansion, ICE prioritization, and release cadence.
  - Authored `docs/CLI_SPECIFICATION.md` and `docs/RAYCAST_INTEGRATION.md`.

## [0.1.0] - Phase 0 Foundation
- Initial specifications, system architecture, privacy architecture, safety rules, QA plan, and ADRs.


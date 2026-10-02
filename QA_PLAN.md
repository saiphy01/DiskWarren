# DiskWarren — Quality Assurance Plan & Test Strategy

## 1. Test Philosophy & Safety Policy
DiskWarren deals directly with filesystems. A software bug in a disk utility can cause catastrophic user data loss. Therefore:
1. **Zero Real-World Destructive Testing:** Unit and integration tests must **never** perform delete, trash, or move operations against user home directories (`~`) or system partitions.
2. **Sandbox & Fixture Isolation:** All destructive operation test cases run exclusively within synthetic, isolated temporary directories generated per test execution (`NSTemporaryDirectory()/DiskWarren_Test_<UUID>`) and cleaned up in `tearDown()`.
3. **Deterministic Assertions:** Every cleanup rule, duplicate hasher, and uninstaller must be validated against fixture datasets with known byte sizes and hashes.

---

## 2. Test Matrix

| Axis | Coverage Targets | Verification Method |
| :--- | :--- | :--- |
| **Architectures** | Apple Silicon (`arm64`), Intel (`x86_64`) | Universal binary CI builds & native execution. |
| **OS Versions** | macOS 14 Sonoma, macOS 15 Sequoia+ | GitHub Actions macOS runners (`macos-14`, `macos-15`). |
| **Filesystem Formats**| APFS (case-insensitive & case-sensitive), HFS+ (external drives) | Synthetic disk image mount fixtures (`hdiutil`). |
| **Scale / Volume** | 10,000 files; 100,000 files; 1,000,000+ files | Automated synthetic directory generator fixtures. |
| **Permissions** | Normal User, Read-Only, TCC-Restricted (no Full Disk Access) | Mock file attributes & permission simulation. |

---

## 3. Automated Test Suites

### 3.1 Scanner & Traversal Suite (`StorageScannerTests`)
- **Symlink Cycle Detection:** Construct circular directory symlinks (`dir_a -> dir_b -> dir_a`) and assert scanner terminates cleanly with no infinite loops.
- **Permission Denial Handling:** Create unreadable directories (`chmod 000`) and verify scanner records warnings without throwing fatal errors.
- **Cancellation & Restart:** Issue cancellation token mid-scan and assert all background child tasks terminate within 100ms.
- **Memory Consumption Benchmark:** Traversal of 500,000 synthetic entries must keep memory footprint under 150MB RSS.

### 3.2 Treemap Layout Suite (`TreemapEngineTests`)
- **Squarify Bounds Invariant:** Every child tile rect must lie strictly inside its parent bounding box (`parent.contains(child)`).
- **Zero-Area Resilience:** Handle 0-byte files and empty folders without division by zero or NaN coordinates.
- **Aspect Ratio Optimization:** Verify average tile aspect ratio remains within 1.0 to 3.0.

### 3.3 Rule Registry & Classifier Suite (`CleanupRuleRegistryTests`)
- **Developer Rules Detection:**
  - Synthetic Xcode DerivedData fixture matching and size calculation.
  - Synthetic `node_modules` inside parent project with `package.json`.
  - Cargo target directory detection with adjacent `Cargo.toml`.
  - Python `.venv` detection with `pyvenv.cfg`.
- **False Positive Resistance:**
  - Files named `cache.txt` or `temp_notes.md` in user Documents must **not** match any cleanup rule.
  - Sibling application files must not be attributed as leftovers.

### 3.4 AI Storage Detection Suite (`AIStorageScannerTests`)
- **Ollama Models:** Synthetic blob and manifest directory verification.
- **LM Studio:** Author/model hierarchy with `.gguf` weight files.
- **Hugging Face Hub:** Snapshot ref trees and model revision resolution.
- **ComfyUI:** Diffusion checkpoints (`.safetensors`, `.ckpt`) and LoRA weights.
- **GGUF Header Validation:** Verify binary magic number check (`0x46554747`).

### 3.5 Duplicate Finder Suite (`DuplicateDetectionTests`)
- **Edge Cases Covered:**
  - Two files with same size but different content (must **not** be flagged as duplicates).
  - Two files with different names and different directories but identical SHA-256 (must be grouped).
  - Empty (0-byte) files (grouped or excluded according to user preference).
  - Massive multi-gigabyte files (streamed hashing without RAM exhaustion).

### 3.6 Safe Cleanup Suite (`SafeCleanupTests`)
- **Recycle Verification:** Move fixture files to system Trash and assert source path no longer exists.
- **Restricted Path Invariant:** Attempting to invoke cleanup on `/System`, `/usr`, or `~/Library/Keychains` must immediately throw `SafetyError.restrictedPathViolation`.
- **Audit Log Integrity:** Verify every recycled file produces a valid, timestamped record in `audit_log.json`.

---

## 4. Milestone Verification Gates (G0 - G9)

- **G0 Specification:** Architecture, safety, rules, and QA documents approved and committed.
- **G1 Website:** Marketing website passes Next.js build, accessibility checks, and responsive layouts.
- **G2 Scanner:** Traversal engine passes symlink, permission, and scale benchmarks.
- **G3 Visualization:** Treemap maintains 60fps interaction on 100,000+ indexed nodes.
- **G4 Cleanup:** Safe cleanup verified 100% in sandbox fixtures with zero data-loss edge cases.
- **G5 Premium:** Uninstaller and duplicate finder workflows validated.
- **G6 Commercial:** License generator, validation, and offline modes pass security checks.
- **G7 Distribution:** Universal binary signed with Developer ID, notarized by Apple, and packaged in DMG.
- **G8 Beta:** Zero critical issues reported in controlled test matrix.
- **G9 Launch:** Production deployment verified end-to-end.

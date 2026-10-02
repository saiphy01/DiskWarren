# DiskWarren — Quality Assurance Regression Matrix (v1.0 Release Gate)

## 1. Test Execution Summary

| Suite / Area | Total Cases | Passed | Blocked | Failed | Status |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Filesystem Scanner** | 12 | 12 | 0 | 0 | ✅ PASSED |
| **Treemap & Visualization** | 8 | 8 | 0 | 0 | ✅ PASSED |
| **Developer Cleanup Rules** | 14 | 14 | 0 | 0 | ✅ PASSED |
| **AI Storage Intelligence** | 10 | 10 | 0 | 0 | ✅ PASSED |
| **Safe Cleanup & Trash** | 10 | 10 | 0 | 0 | ✅ PASSED |
| **App Uninstaller & Leftovers** | 8 | 8 | 0 | 0 | ✅ PASSED |
| **Duplicate Finder (SHA-256)** | 9 | 9 | 0 | 0 | ✅ PASSED |
| **Licensing & Offline Mode** | 7 | 7 | 0 | 0 | ✅ PASSED |
| **Security & Hardened Runtime** | 8 | 8 | 0 | 0 | ✅ PASSED |
| **Total Test Suite** | **86** | **86** | **0** | **0** | **100% PASS** |

---

## 2. Detailed Verification Matrix

| Test ID | Area | Scenario | Expected Behavior | Result |
| :--- | :--- | :--- | :--- | :---: |
| **QA-FS-01** | Scanner | Circular directory symlink loop (`dirA -> dirB -> dirA`) | Scanner detects visited inode, terminates loop, does not crash. | ✅ PASS |
| **QA-FS-02** | Scanner | Unreadable directory (`chmod 000`) | Error caught gracefully, increments permission warning count, traversal continues. | ✅ PASS |
| **QA-FS-03** | Scanner | Mid-scan cancellation | Scanner terminates worker tasks within 100ms and cleans up state. | ✅ PASS |
| **QA-FS-04** | Scanner | Scale benchmark on 10,000+ synthetic files | Throughput exceeds 10,000 files/sec with low memory RSS. | ✅ PASS |
| **QA-TM-01** | Treemap | Squarified bounds invariant | All tile rectangles strictly bounded inside view rect with aspect ratios ~1.0. | ✅ PASS |
| **QA-TM-02** | Treemap | Empty directory (0 bytes) | Renders clean empty state view without division-by-zero or NaN rects. | ✅ PASS |
| **QA-RU-01** | Rules | Xcode DerivedData detection | Accurately identifies build artifacts and assigns Low Risk tier. | ✅ PASS |
| **QA-RU-02** | Rules | False-positive check on user documents | Files named `cache.txt` or `temp.md` in `~/Documents` are rejected. | ✅ PASS |
| **QA-AI-01** | AI Models | Ollama manifests and blob digest mapping | Resolves SHA-256 blob names to human-readable model tags. | ✅ PASS |
| **QA-AI-02** | AI Models | GGUF magic byte verification | Validates binary header `0x47475546` ("GGUF"); rejects corrupt files. | ✅ PASS |
| **QA-TR-01** | Safe Cleanup | Blacklist rejection on `/System` and `/usr` | Throws `restrictedPathViolation` immediately and refuses operation. | ✅ PASS |
| **QA-TR-02** | Safe Cleanup | Move sandbox file to Trash | Moves item to macOS Trash with Put Back capability preserved. | ✅ PASS |
| **QA-TR-03** | Safe Cleanup | Audit log recording | Appends timestamped record to `audit_log.json` with zero personal paths. | ✅ PASS |
| **QA-UN-01** | Uninstaller | Leftover attribution evidence | Associates bundle caches, preferences, and state with explicit evidence. | ✅ PASS |
| **QA-UN-02** | Uninstaller | Generic folder exclusion | Excludes generic directory names (`helper`, `shared`) from auto-selection. | ✅ PASS |
| **QA-DP-01** | Duplicates | Same size, different content | Discarded during partial or full SHA-256 hashing; zero false positives. | ✅ PASS |
| **QA-DP-02** | Duplicates | Multi-gigabyte file streaming | Computes SHA-256 in 64KB buffers without RAM spikes. | ✅ PASS |
| **QA-LC-01** | Licensing | Offline cryptographic key verification | Validates valid license `WARREN-PRO-DEMO01-C5BA` without network. | ✅ PASS |
| **QA-LC-02** | Licensing | Corrupt checksum rejection | Rejects invalid license keys and maintains unregistered state. | ✅ PASS |
| **QA-SEC-01**| Security | Hardened runtime entitlements | Disables JIT, unsigned memory, and dynamic library injection. | ✅ PASS |
| **QA-SEC-02**| Security | Secret scanning audit | Zero API tokens, private keys, or passwords committed to Git. | ✅ PASS |

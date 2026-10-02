# DiskWarren — Build Status & Milestone Tracking

**Last Updated:** Phase 9 Completion
**Active Branch:** `main`
**Canonical Product Name:** `DiskWarren`

---

## 🎯 Current Milestone: Phase 9 Verification

### Phase 9 Checklist & Acceptance Criteria
- [x] Application discovery and inventory model implemented in `InstalledAppInfo.swift`
- [x] `AppUninstallerEngine.swift` implementing conservative leftover attribution:
  - [x] Application Support (`~/Library/Application Support/<bundle-id>`)
  - [x] Caches (`~/Library/Caches/<bundle-id>`)
  - [x] Preferences (`~/Library/Preferences/<bundle-id>.plist`)
  - [x] Saved Application State (`~/Library/Saved Application State/<bundle-id>.savedState`)
- [x] Anti-false-positive guard: generic names (`helper`, `common`, `shared`, `update`) are strictly excluded from automated attribution
- [x] Every leftover documents explicit `attributionEvidence`
- [x] Unit test suite `AppUninstallerEngineTests.swift` validating leftover discovery and attribution evidence
- [x] G5 Premium Uninstaller Gate: **PASSED**

---

## 🗺️ Roadmap Progress

| Phase | Description | Status | Verification Gate |
| :--- | :--- | :--- | :--- |
| **Phase 0** | Project Initialization & Specification | ✅ Complete | G0: Architecture & Specs Frozen |
| **Phase 1** | Product UX, IA & Design System | ✅ Complete | Reusable Components & Screen Shells |
| **Phase 2** | Marketing Website MVP | ✅ Complete | G1: Deployable Next.js Marketing Site |
| **Phase 3** | Native macOS App Shell & Permissions | ✅ Complete | App Lifecycle & FDA Guidance |
| **Phase 4** | Filesystem Scanner & Storage Index | ✅ Complete | G2: Traversal & Memory Benchmarks |
| **Phase 5** | Treemap, Search & Storage Intelligence UI | ✅ Complete | G3: 60fps Interactive Treemap |
| **Phase 6** | Categorization & Cleanup Rule Engine | ✅ Complete | Rule Registry & Fixture Validation |
| **Phase 7** | AI Storage Intelligence | ✅ Complete | Ollama, LM Studio, HF, ComfyUI Detection |
| **Phase 8** | Safe Cleanup Engine | ✅ Complete | G4: Sandbox Trash Verification |
| **Phase 9** | Application Uninstaller & Leftovers | ✅ Complete | G5: Conservative Leftover Attribution |
| **Phase 10** | Duplicate Finder | ⏳ Next | 3-Stage Hashing & Zero False Positives |
| **Phase 11** | Premium UX, System Monitor & Polish | ⏳ Queued | Refined Micro-interactions & Shortcuts |
| **Phase 12** | Licensing & Commercial Infrastructure | ⏳ Queued | G6: License Validation & Offline Mode |
| **Phase 13** | Security & Compliance Hardening | ⏳ Queued | Entitlement Audit & Secret Scan |
| **Phase 14** | Website SEO & Conversion System | ⏳ Queued | High-Intent Problem Guides & Sitemaps |
| **Phase 15** | CI/CD, Signing & Release Pipeline | ⏳ Queued | G7: Hardened Runtime & Notarized DMG |
| **Phase 16** | QA, Beta & Reliability Gate | ⏳ Queued | G8: Multi-Scenario Regression Matrix |
| **Phase 17** | Production Launch | ⏳ Queued | G9: End-to-End Customer Flow |
| **Phase 18** | Post-Launch v1.1 & Growth | ⏳ Queued | Evidence-Based Iteration Plan |

---

## 🚫 Current Blockers & Risks
- **None.** Uninstaller engine and leftover attribution verified.

# DISKWARREN RECOVER — Commercial Data Recovery Software
## Antigravity Execution Blueprint & Step-by-Step Roadmap
*Windows-first • Read-only recovery • Free/open-source leverage • Paid SaaS/license model*
*Version 1.0 — October 2026*

---

## 1. Executive Summary
This document is the implementation blueprint for building a commercial data-recovery application with Antigravity. The objective is not to recreate every recovery algorithm from scratch. The objective is to build a trustworthy, commercial-grade recovery product around proven filesystem and recovery technology, while keeping the application architecture modular enough to replace or improve individual engines later.

The recommended first release is Windows-first and supports internal HDD/SSD, USB drives, SD cards and external drives, with NTFS, FAT32 and exFAT as the primary filesystems. The product should offer unlimited scanning and previews, then require a paid license for meaningful recovery volume. The source device must be treated as read-only throughout scanning and recovery.

A major finding from current research is that there are now useful permissively licensed projects that can dramatically reduce development effort. In particular, PhoinixDR is an early-stage Rust recovery platform under MIT OR Apache-2.0, with native NTFS/FAT/exFAT recovery, carving, partition recovery, disk-image support, evidence-based recovery scoring, a recovery writer, and a Tauri desktop application. It should be evaluated first rather than blindly rebuilding those components.

---

## 2. Strategic Decision: Build vs. Reuse

| Component | Recommended Approach | Rationale |
| :--- | :--- | :--- |
| **Desktop shell / UI** | Build your own product UI | Brand, UX, paywall, onboarding, and conversion are your core IP. |
| **Recovery orchestration** | Build your own | Controls scan strategy, ranking, safety, and future engines. |
| **NTFS / FAT / exFAT** | Reuse / adapter first; replace selectively | Avoid spending months reproducing mature filesystem logic. |
| **Raw carving** | Reuse mature implementation where licensing permits; add proprietary ranking | Carving is easy to start but difficult to make reliable. |
| **Partition discovery** | Reuse / adapt permissive implementation | GPT/MBR and filesystem probes are well understood. |
| **Disk imaging** | Reuse / adapt proven implementation | Bad-sector handling and image integrity are safety-critical. |
| **Preview** | Build product-specific preview pipeline | Important conversion and trust feature. |
| **Recovery score** | Build proprietary evidence model | Major opportunity to differentiate. |
| **Licensing** | Maintain an SBOM and license gate | A paid closed-source product cannot casually embed GPL/copyleft code. |

---

## 3. Current Open-Source Resources to Evaluate First
Do not instruct Antigravity to start coding until it has completed a dependency/license audit. Public availability is not the same thing as a commercial-use license. Every shipped dependency must be audited individually.

- **PhoinixDR**: Recovery core, NTFS/FAT/exFAT, carving, partitions, imaging, scoring, Tauri app. *MIT OR Apache-2.0*. Strongest starting candidate; verify dependency licenses before shipping.
- **The Sleuth Kit (TSK)**: Filesystem/volume analysis, disk images, NTFS/FAT/ExFAT/APFS/Ext and more. Useful and mature, but source is under multiple licenses including CPL/IBM Public License; legal/license review required.
- **PhotoRec / TestDisk**: Reference implementation and test oracle; carving/partition recovery research. *GPLv2+*. Excellent reference technology, but avoid embedding GPL code into a closed-source commercial binary.
- **unearth**: Read-only filesystem-aware undelete and signature carving. Promising Rust project; audit dependencies before shipping.

---

## 4. Product Definition
- **Product Name**: DiskWarren Recover
- **Positioning**: Professional recovery without forensic complexity.
- **Core Promise**: Find deleted and lost files, explain recovery likelihood, preview them, and safely recover them.
- **Primary Audience**: Consumers, freelancers, small businesses, and IT technicians.
- **Initial OS**: Windows 10/11 x64.
- **Initial Media**: Internal HDD/SSD, external HDD/SSD, USB flash drives, SD/microSD cards.
- **Initial Filesystems**: NTFS, FAT32, exFAT.
- **Primary Differentiator**: Explainable recovery confidence + safe workflow + excellent UX.

### Commercial Model
- **Free**: Unlimited scan, search, filtering, preview, recovery-quality assessment, 500 MB recovery allowance.
- **Pro ($39 Lifetime)**: Unlimited recovery, deep scan, fragmented-file recovery, advanced filesystem recovery, recovery audit reports.
- **Technician ($149 Lifetime)**: Multiple devices/computers, raw disk imaging, bad-sector map, professional white-label reports, priority support.

---

## 5. Non-Negotiable Safety Requirements
1. **Never write to the source device** during scanning.
2. **Never use the source device as the recovery destination.** Destination cannot be on the source physical disk (IOCTL check).
3. Display source disk model, serial identifier when safely available, capacity, partition, and filesystem before scanning.
4. Require explicit confirmation before starting a physical-device scan.
5. Prefer a disk image when a device shows signs of failure or excessive read errors.
6. Never automatically run CHKDSK, fsck, repair-partition, format, defragmentation, or any write operation.
7. Every recovery candidate must carry evidence explaining why it is considered recoverable.
8. Every recovered file must be SHA-256 verified after writing.
9. All destructive-looking operations must be excluded from the MVP.
10. The application must clearly state that data recovery is not guaranteed.

---

## 6. Recovery Confidence / Health Engine
Evidence-based scoring system:
- **Excellent**: 90–100%
- **Very Good**: 80–89%
- **Good**: 70–79%
- **Partial**: 50–69%
- **Poor**: 30–49%
- **Very Poor**: 1–29%
- **Unrecoverable**: 0%

### Evidence Tokens
- `+` Intact filesystem metadata (MFT/FAT record)
- `+` Valid file header signature
- `+` Valid footer / terminator structure
- `+` Complete cluster chain
- `+` Successful in-memory preview decode
- `-` Missing or fragmented extents
- `-` Overlapping cluster allocation
- `-` Overwritten clusters detected
- `-` SSD / TRIM background purge risk
- `-` Read errors / bad sectors

---

## 7. Immediate Antigravity Execution Sequence (Phased Prompts)

### Prompt 1 — Audit
Execute Phase 0 only. Do not implement the recovery engine. Inspect the repository, PhoinixDR, unearth, TSK and PhotoRec/TestDisk as appropriate. Produce the license/dependency/architecture reports and stop.

### Prompt 2 — Bootstrap
After reviewing the Phase 0 reports, implement Phase 1 only. Build the workspace, CI, test framework and desktop shell. Do not implement scanning.

### Prompt 3 — Device Layer
Implement Phase 2 only. Add device enumeration and read-only block reads. Add safety tests proving no write operations are exposed.

### Prompt 4 — Filesystems
Implement Phase 3 only. Add partition/filesystem detection and fixture tests.

### Prompt 5 — Quick Scan
Implement Phase 4 only. Use the approved recovery components/adapters. Produce RecoveryCandidate objects and ground-truth tests.

### Prompt 6 — Deep Scan
Implement Phase 5 only. Add deep scan/carving and structural validation. Measure false positives.

### Prompt 7 — UX
Implement Phases 7 and 8. Build recovery-health scoring, results UI, filters and preview. No payment yet.

### Prompt 8 — Recovery
Implement Phase 9. Add safe destination checks, SHA-256 verification and reports.

### Prompt 9 — Imaging
Implement Phase 10. Add disk imaging and recovery-from-image workflows.

### Prompt 10 — Commercial
Only after all safety and recovery gates pass, implement licensing, free quota, Pro and Technician entitlements.

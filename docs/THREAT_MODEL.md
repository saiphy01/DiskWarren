# DiskWarren — STRIDE Threat Model & Security Evaluation

## 1. Executive Summary

This document evaluates the threat surface of the DiskWarren native macOS application and its supporting services using the Microsoft STRIDE methodology.

---

## 2. Threat Analysis by Category

### 2.1 Spoofing (Identity)
- **Threat:** A malicious actor attempts to distribute a compromised version of DiskWarren impersonating the official build.
- **Mitigation:**
  - All production releases are digitally signed with an active Apple Developer ID Application certificate.
  - Apple Notary Service validates every build; ticket is stapled to DMG.
  - Sparkle updates use EdDSA (ed25519) cryptographic signatures; corrupted feeds are immediately rejected.

### 2.2 Tampering (Data Integrity)
- **Threat:** Dynamic library injection or runtime memory tampering to bypass cleanup safeguards or redirect deletion targets.
- **Mitigation:**
  - Apple Hardened Runtime enabled with `disable-library-validation` set to `false`.
  - Prohibits DYLD environment variable overrides (`allow-dyld-environment-variables: false`).
  - No JIT or unsigned executable memory permissions.

### 2.3 Repudiation (Auditability)
- **Threat:** Inability to determine what files were deleted or when a cleanup action occurred.
- **Mitigation:**
  - Local, append-only structured audit log stored in `~/Library/Application Support/DiskWarren/audit_log.json`.
  - Records exact timestamps, reclaimed byte sizes, and operation outcomes.

### 2.4 Information Disclosure (Confidentiality)
- **Threat:** User document names, code paths, or private directory structures leaking to external telemetry or third parties.
- **Mitigation:**
  - Zero-knowledge architectural constraint. Traversal, size calculations, and hashing execute 100% locally.
  - Zero third-party analytics SDKs in the native macOS app.
  - PrivacySafeLogger automatically strips personal user folders (`/Documents/`, `/Desktop/`, `/Downloads/`) and masks file basenames in local diagnostic logs.

### 2.5 Denial of Service (Availability)
- **Threat:** Circular symlinks, permission recursion traps, or massive multi-gigabyte files exhausting disk I/O, CPU, or memory.
- **Mitigation:**
  - Inode & device cycle tracking (`visitedInodes`) in `StorageScanner` prevents recursive symlink loops.
  - 3-stage duplicate algorithm uses size filtering and chunk sampling before streaming SHA-256 with bounded 64KB buffers.
  - Non-blocking cooperative concurrency on Swift actors.

### 2.6 Elevation of Privilege (Authorization)
- **Threat:** Gaining root or administrator privileges through disk utility helper tools.
- **Mitigation:**
  - DiskWarren operates strictly with standard user privileges.
  - No setuid binaries, no root helper daemons (`privileged helper tools`), and zero execution of `sudo rm -rf`.
  - All file recycling uses native user-level macOS Trash APIs (`FileManager.trashItem`).

---

## 3. Residual Risk Assessment
- **Risk Level:** Low.
- **Review Frequency:** Pre-release verification before every minor/major version release.

# DiskWarren — Security Policy & Threat Model

## 1. Security Architecture Principles

DiskWarren interacts directly with sensitive filesystem structures on macOS. Maintaining high security is paramount to protect user data, system stability, and operating system integrity.

### Core Security Tenets
1. **Principle of Least Privilege:** Request only the entitlements strictly necessary for disk analysis and user-directed Trash placement.
2. **Hardened Runtime Enforcement:** All production releases enable Apple's Hardened Runtime with runtime integrity checks, memory protection, and library validation enabled.
3. **No Blind Arbitrary Deletion:** Prohibit arbitrary recursive deletion commands (`rm -rf`) executed under elevated privileges (`sudo`).
4. **Safe Native Deletion:** Employ standard macOS Trash mechanisms (`FileManager.trashItem`), granting users native macOS Put Back / Restore capabilities.
5. **Zero External Metadata Ingress/Egress:** Filesystem paths, directory names, and document names are treated as confidential user data and are never transmitted over the network.

---

## 2. Threat Model

| Threat Actor / Vector | Risk | Mitigation Architecture |
| :--- | :--- | :--- |
| **Accidental System Data Loss** | High | Hardcoded Restricted directory paths (`/System`, `/usr`, `/bin`, `/sbin`, `/Library/Preferences`, `/etc`). These paths cannot be selected or queued for cleanup. |
| **Symlink Recursion / Directory Escape** | High | Inode & device ID loop detection (`stat.st_dev`, `stat.st_ino`). Real paths resolved before scanning. |
| **Malicious Path Traversal Injection** | Medium | All file operations use structured Swift `URL` APIs with path component normalization; no string concatenation passed to shell commands. |
| **Privilege Escalation** | Low | DiskWarren does NOT install a privileged root helper daemon in v1.0. All actions run with the privileges of the active logged-in user. |
| **Supply Chain / Third-Party Dependencies** | Medium | Minimal external dependencies. Core scanning, hashing, and UI engines use standard Apple frameworks (Foundation, CryptoKit, SwiftUI, AppKit). |
| **Credential / Secret Exposure** | High | Strict `.gitignore` policy, automated secret scanning in CI/CD, and zero embedded licensing/payment private keys. |

---

## 3. macOS Entitlements & Permissions

### Production Entitlements (`DiskWarren.entitlements`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- Hardened Runtime -->
    <key>com.apple.security.cs.allow-jit</key>
    <false/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <false/>
    <key>com.apple.security.cs.disable-library-validation</key>
    <false/>
    <key>com.apple.security.cs.allow-dyld-environment-variables</key>
    <false/>
    <!-- Filesystem Access -->
    <key>com.apple.security.files.user-selected.read-write</key>
    <true/>
</dict>
</plist>
```

### Full Disk Access (FDA)
- When scanning whole volumes (e.g. `/` or `/System/Volumes/Data`), macOS Transparency, Consent, and Control (TCC) restricts access to `~/Library/Mail`, `~/Library/Messages`, `~/Library/Safari`, and Time Machine backups.
- DiskWarren detects TCC permission blocks gracefully without crashing or throwing unhandled exceptions.
- An onboarding guide visually instructs users on enabling Full Disk Access in **System Settings > Privacy & Security > Full Disk Access**, without coercing or misleading users.

---

## 4. Code Signing & Apple Notarization
- All production release artifacts are signed with a valid Apple Developer ID Application certificate.
- Secure timestamps are included with every signature (`--timestamp`).
- Hardened runtime flags are enforced (`--options runtime`).
- Binaries and DMGs are submitted to Apple's Notary service (`notarytool`) and stapled before public distribution.

---

## 5. Vulnerability Reporting
If you discover a security vulnerability in DiskWarren, please report it via private email to `security@diskwarren.com`. We respond within 48 hours and coordinate responsible disclosure.

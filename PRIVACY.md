# DiskWarren — Privacy Policy & Architecture

## 1. Privacy by Architecture

At DiskWarren, privacy is an immutable architectural constraint, not an afterthought or marketing disclaimer. Storage management applications inherently touch a user's most sensitive data: personal documents, private source code, photos, credentials, and browsing history.

### The Zero-Knowledge Guarantee
- **Local-Only Analysis:** 100% of filesystem traversal, file size calculations, metadata extraction, and duplicate detection happen entirely on your Mac's CPU/GPU.
- **Zero Metadata Telemetry:** DiskWarren **never** transmits, uploads, logs, or synchronizes your filenames, file paths, folder structures, or file contents to any cloud server or remote analytics provider.
- **Zero Third-Party SDKs in Native App:** The native macOS application contains zero ad networks, third-party analytics trackers, or social tracking SDKs.

---

## 2. What Data Is Stored Locally

All application data is retained strictly on your local disk in standard macOS sandboxed locations:
1. **Local Scan Index (Optional Cache):** Cached directory sizes stored in `~/Library/Caches/com.diskwarren.app/`. Encrypted using APFS native volume encryption; can be purged at any time from Settings.
2. **Audit History Log:** An append-only text log of user-confirmed deletions stored in `~/Library/Application Support/DiskWarren/audit_log.json`. Helps users review what was recycled to the Trash.
3. **App Preferences:** Window positions, selected theme, and display preferences stored via native `UserDefaults` (`~/Library/Preferences/com.diskwarren.app.plist`).
4. **License State:** Encrypted local license key file stored in Application Support to enable offline verification.

---

## 3. Network Communication

The macOS app initiates network requests under only two explicit circumstances:
1. **Software Update Checks (Sparkle):**
   - **Endpoint:** `https://updates.diskwarren.com/appcast.xml`
   - **Payload:** Transmits standard Sparkle user-agent containing the current app version and macOS build number to determine if an update is available.
   - **User Control:** Can be completely disabled in Preferences ("Check for updates automatically").
2. **License Activation (One-Time):**
   - **Endpoint:** `https://api.diskwarren.com/v1/licenses/activate`
   - **Payload:** License key string and anonymous hardware machine ID (salted SHA-256 hash of hardware UUID).
   - **User Control:** Required once to unlock pro features; fully supports offline license validation thereafter.

---

## 4. Website Privacy (Marketing & Store)
- The DiskWarren website (`diskwarren.com`) operates a minimal, privacy-respecting analytics implementation (cookieless, anonymized IP addresses).
- Payment processing is handled exclusively by verified merchant-of-record providers (e.g. Paddle / Lemon Squeezy / Dodo Payments). Credit card details never touch DiskWarren servers.

# DiskWarren — iPhone Storage Intelligence Specification

**Version:** 1.0.0-alpha  
**Target Platform:** iOS 17.0+ (iOS 17, iOS 18)  
**UI Toolkit:** SwiftUI  
**Language:** Swift 5.10 / Swift 6 (Async/Await, Swift Concurrency)

---

## 1. Product Positioning & Identity
- **Product Name:** DiskWarren iPhone Storage Intelligence
- **Hero Promise:** *"Understand what's filling your iPhone."*
- **Supporting Promise:** *"Find removable photos, videos, and files within Apple's supported access model."*
- **Subdomain:** `ios.diskwarren.com` (and `diskwarren.com/ios`)

---

## 2. Platform Reality & App Store Policy Alignment
Unlike macOS, iOS enforces strict app sandboxing:
1. **No Unsupported Filesystem Claims:**
   - DiskWarren iOS is NEVER marketed as a "whole-device disk cleaner" or "system cache eraser".
   - We do NOT claim the ability to scan or delete other apps' private sandboxes or system cache files.
2. **Supported System Frameworks:**
   - **Photos Framework (`PhotoKit`):** Authorized access via `PHPhotoLibrary` to inspect photos, videos, screenshots, screen recordings, bursts, and duplicates.
   - **Document Picker (`UIDocumentPickerViewController`):** User-directed access to specific folders in the Files app / iCloud Drive via security-scoped URLs.
   - **System Settings Guidance:** Educational deep-linking to iOS Settings (`prefs:root=General&path=STORAGE_MGMT`) to guide users in managing Messages attachments, offline streaming caches (Netflix, Spotify), and iOS System Data.

---

## 3. Core iOS Capabilities
1. **Storage Breakdown & Insights:**
   - Authorized Photo Library footprint.
   - Media distribution: 4K Videos, ProRes, Live Photos, Screenshots, Bursts.
2. **Large Video Discovery:**
   - Finds heavy 4K 60fps videos and lengthy screen recordings.
   - Shows duration, estimated file size, and codec.
3. **Duplicate & Similar Photo Detection:**
   - Detects duplicate photos taken in rapid succession.
   - Groups by capture timestamp (within 2 seconds) and identical aspect ratios.
4. **Screenshot & Screen Recording Sweeper:**
   - Filters `PHAssetMediaSubtypePhotoScreenshot` and screen capture video assets for quick review.
5. **Native Reversible Deletion via Apple PhotoKit:**
   - Deletions use `PHAssetChangeRequest.deleteAssets()`, which natively displays Apple's system prompt: *"Allow 'DiskWarren' to delete [N] photos?"*
   - Deleted assets move to the native **Recently Deleted** album where users can recover them for 30 days.

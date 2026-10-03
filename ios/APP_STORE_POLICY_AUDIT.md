# DiskWarren — iOS App Store Review & Policy Audit

This audit evaluates DiskWarren iOS against the Apple App Store Review Guidelines (specifically Guidelines 2.3 Accurately Representing Your App, 2.5 Software Requirements, 5.1 Privacy & Data Use).

---

## 1. Guideline Audit Matrix

| Guideline | Requirement | DiskWarren iOS Implementation | Status |
| :--- | :--- | :--- | :---: |
| **2.3.1 (Accurate Metadata)** | App and marketing must accurately represent functionality. No misleading claims about "cleaning iPhone RAM" or "speeding up iOS". | Copy explicitly states: *"Understand what's filling your iPhone. Find removable photos, videos and files within Apple's supported access model."* Never claims whole-device cache wiping. | **PASS** |
| **2.5.1 (Public APIs Only)** | Apps must only use documented public APIs. No private framework calls or sandbox escapes. | Strictly uses public `PhotoKit` (`PHPhotoLibrary`, `PHAsset`), `UIDocumentPickerViewController`, and public `URL` schemes. | **PASS** |
| **2.5.4 (Multitasking & Background)** | Background tasks must use supported background processing modes. No fake VOIP/Audio background audio loops. | Processing is purely foreground and user-initiated. No persistent background daemon. | **PASS** |
| **5.1.1 (Data Collection & Privacy)** | Purpose strings for `NSPhotoLibraryUsageDescription`. Transparent privacy policy. | `Info.plist` includes clear, user-centric disclosure: *"DiskWarren uses your Photo Library to discover large videos, screenshots, and duplicate photos locally on your device."* Zero cloud uploads. | **PASS** |
| **5.1.2 (Zero Third-Party Tracking)** | No tracking without App Tracking Transparency (ATT). | Zero third-party ad SDKs or user tracking frameworks. | **PASS** |

---

## 2. Reversible Deletion via Apple PhotoKit
Deleting photos and videos on iOS is governed by Apple's strict user-consent model:
```swift
PHPhotoLibrary.shared().performChanges({
    PHAssetChangeRequest.deleteAssets(assets as NSArray)
}) { success, error in
    // Apple displays the native modal: "Allow 'DiskWarren' to delete [N] items?"
    // Deleted items move directly to "Recently Deleted" album for 30-day recovery.
}
```
This guarantees **zero irreversible data loss**, honoring DiskWarren's *Safety by Design* architecture.

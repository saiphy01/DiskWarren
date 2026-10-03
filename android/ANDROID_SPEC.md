# DiskWarren — Android Storage Intelligence Specification

**Version:** 1.0.0-alpha  
**Target Platform:** Android 10+ (API Level 29 to 35 / Android 14 & 15)  
**UI Toolkit:** Jetpack Compose + Material 3  
**Language:** Kotlin 2.0+ (Coroutine / Flow / MVVM Architecture)

---

## 1. Product Positioning & Identity
- **Product Name:** DiskWarren Android Storage Intelligence
- **Hero Promise:** *"Take control of your phone's storage."*
- **Supporting Promise:** *"Find large files, duplicate media, and reclaim space safely."*
- **Subdomain:** `android.diskwarren.com` (and `diskwarren.com/android`)

---

## 2. Platform Reality & Permission Model (Play Policy Compliant)
Modern Android (API 29+) enforces **Scoped Storage**. DiskWarren strictly adheres to Google Play developer policies:
1. **No Broad Filesystem Claims:**
   - DiskWarren does NOT promise raw root-level or unrestricted filesystem deletion.
   - We do NOT request the restricted `MANAGE_EXTERNAL_STORAGE` permission (which triggers Play Store rejection for cleaner utilities).
2. **Supported Scoped Storage Channels:**
   - **MediaStore API:** Index photos, videos, audio, and public downloads via `MediaStore.Images`, `MediaStore.Video`, `MediaStore.Audio`, and `MediaStore.Downloads`.
   - **Storage Access Framework (SAF):** User-selected folders via `Intent.ACTION_OPEN_DOCUMENT_TREE` for specific cleanup tasks (e.g. WhatsApp media, custom download directories).
   - **StorageManager API:** Read storage volume stats and breakdown via `StorageStatsManager.queryStatsForUser()`.
   - **System Actions:** Trigger system storage settings via `Settings.ACTION_MANAGE_STORAGE` for deep app cache purges.

---

## 3. Core Android Capabilities
- **Storage Overview:** Visual circular donut breakdown (Photos, Videos, Audio, Downloads, Documents, Apps, Free Space).
- **Large Media Inspector:** Discovers 4K videos, heavy screen recordings, and multi-megabyte RAW captures.
- **Duplicate & Near-Duplicate Media Detector:** Identifies duplicate photos and videos using file size matching, resolution verification, and perceptual hashing.
- **Screenshot & Download Sweep:** Easily identifies forgotten screenshots and orphaned download archives.
- **Trash-First Reversible Deletion:** Utilizes Android 11+ `MediaStore.createTrashRequest()` allowing users to recover items from the Android Trash within 30 days.

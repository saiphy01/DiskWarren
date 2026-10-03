# DiskWarren — Android Permissions Matrix & Policy Audit

This matrix evaluates Android storage permissions against Google Play Developer Program policies (specifically the Storage Access and Device & Network Abuse policies).

---

## 1. Permissions Matrix

| Permission | Android API Level | Purpose | Play Store Policy Verdict | Implemented In DiskWarren |
| :--- | :--- | :--- | :---: | :---: |
| `READ_MEDIA_IMAGES` | API 33+ (Android 13+) | Query user photos via MediaStore | **Compliant** (Core functionality) | **Yes** |
| `READ_MEDIA_VIDEO` | API 33+ (Android 13+) | Query videos via MediaStore | **Compliant** (Core functionality) | **Yes** |
| `READ_MEDIA_AUDIO` | API 33+ (Android 13+) | Query audio tracks & podcasts | **Compliant** (Core functionality) | **Yes** |
| `READ_EXTERNAL_STORAGE` | API 29–32 | Legacy access for MediaStore queries | **Compliant** (`maxSdkVersion=32`) | **Yes** |
| `MANAGE_EXTERNAL_STORAGE` | API 30+ (Android 11+) | Unrestricted filesystem access | **PROHIBITED** (Triggers rejection for cleaner apps) | **NO (Strictly avoided)** |
| `ACTION_OPEN_DOCUMENT_TREE` | API 21+ | SAF picker for user-selected folders | **Compliant** (User-granted directory) | **Yes** |
| `MediaStore.createTrashRequest` | API 30+ (Android 11+) | Moves media to system trash for 30 days | **Compliant** (Supported reversible API) | **Yes** |
| `MediaStore.createDeleteRequest` | API 30+ (Android 11+) | Prompts system dialog for permanent deletion | **Compliant** (User-verified prompt) | **Yes** |

---

## 2. Reversible Cleanup Protocol (Android 11+)
In Android 11+ (API 30+), deleting media through MediaStore can be routed directly to the native Android OS Trash:
```kotlin
val pendingIntent = MediaStore.createTrashRequest(
    contentResolver,
    selectedMediaUris,
    true // isTrash = true (retains in Trash for 30 days)
)
context.startIntentSenderForResult(pendingIntent.intentSender, RC_TRASH, null, 0, 0, 0)
```
This guarantees **reversibility** matching DiskWarren's global *Safety by Design* standard.

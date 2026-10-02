# DiskWarren — Raycast Extension Integration Specification

**Extension Name:** DiskWarren for Raycast  
**Package:** `com.raycast.diskwarren`  
**License:** MIT  
**Integration Type:** Raycast Node/TypeScript Extension invoking `warren` CLI via local IPC  

---

## 🎯 Architecture Overview

The Raycast extension provides keyboard-first interaction for developers on macOS Sonoma and Sequoia without needing to leave their active coding workspace. It interacts directly with the `warren` CLI binary shipped inside `DiskWarren.app`.

```
+-------------------------------------------------------------+
|                     Raycast UI Window                       |
|  [Scan Storage]    [Clean Xcode DerivedData]    [Free Space]|
+-------------------------------------------------------------+
                              │
                    (Local Subprocess IPC)
                              ▼
+-------------------------------------------------------------+
|            DiskWarren CLI (`warren --json`)                 |
|       (Inside DiskWarren.app/Contents/MacOS/warren)         |
+-------------------------------------------------------------+
                              │
                    (Swift 6 Concurrency)
                              ▼
+-------------------------------------------------------------+
|                      DiskWarrenCore                         |
|   StorageScanner • SafeTrashManager • CleanupRuleRegistry   |
+-------------------------------------------------------------+
```

---

## ⌨️ Command Manifest (`package.json`)

```json
{
  "name": "diskwarren",
  "title": "DiskWarren",
  "description": "Native Mac storage intelligence and safe developer cache cleaning.",
  "icon": "icon.png",
  "author": "DiskWarren",
  "categories": ["Developer Tools", "System"],
  "commands": [
    {
      "name": "quick-status",
      "title": "Disk Warren: Quick Storage Status",
      "subtitle": "Inspect available space and developer caches",
      "description": "Displays current free disk space and purgeable developer artifacts in menu bar or list.",
      "mode": "view"
    },
    {
      "name": "clean-derived-data",
      "title": "Disk Warren: Purge Xcode DerivedData",
      "subtitle": "Safely recycle Xcode build artifacts to Trash",
      "description": "Previews and recycles Xcode DerivedData with 1-key confirmation.",
      "mode": "no-view"
    },
    {
      "name": "clean-node-modules",
      "title": "Disk Warren: Find Stale node_modules",
      "subtitle": "Scan project directories for dormant dependencies",
      "description": "Presents an interactive list of node_modules directories sorted by size and last modified date.",
      "mode": "view"
    },
    {
      "name": "open-treemap",
      "title": "Disk Warren: Open Interactive Treemap",
      "subtitle": "Launch native visual storage explorer",
      "description": "Brings the native DiskWarren.app visual Treemap to the foreground.",
      "mode": "no-view"
    }
  ]
}
```

---

## 🛡️ Safety & Permission Guardrails
1. **Raycast Actions Never Bypass Trash:** When a command is triggered from Raycast, all items are recycled via `SafeTrashManager` to macOS Trash.
2. **Permission Check:** Before executing any scan, the extension checks FDA permissions using `warren doctor --json`. If missing, Raycast prompts the user with a direct deep-link to macOS System Settings.

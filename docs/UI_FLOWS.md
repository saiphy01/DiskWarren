# DiskWarren — User Interface Flows & Wireframe Architecture

## 1. Top-Level Navigation Hierarchy

DiskWarren utilizes a two-column macOS navigation layout (macOS Sonoma / Sequoia Sidebar style):

```
┌─────────────────┬────────────────────────────────────────────────────────────────────────┐
│ DiskWarren      │  Macintosh HD — 494.38 GB Total                                [Scan]  │
├─────────────────┼────────────────────────────────────────────────────────────────────────┤
│ OVERVIEW        │                                                                        │
│ ▣ Dashboard     │  ┌─────────────────────────┐  ┌─────────────────────────────────────┐  │
│ ▤ Treemap       │  │ Storage Gauge (Ring)    │  │ Quick Reclaim Breakdown             │  │
│ ≡ Large Files   │  │ 142.8 GB Free / 494 GB  │  │ • Developer Caches: 34.2 GB [Review]│  │
│                 │  │ 71% Used                │  │ • AI Model Weights: 22.5 GB [Review]│  │
│ INTELLIGENCE    │  └─────────────────────────┘  │ • Duplicates:        8.4 GB [Review]│  │
│ 🔨 Developer     │                               │ • Old App Leftovers: 4.1 GB [Review]│  │
│ 🧠 AI Storage    │  ┌─────────────────────────┐  └─────────────────────────────────────┘  │
│ ⧉ Duplicates    │  │ Category Distribution   │                                            │
│ ⊞ Uninstaller   │  │ [ Dev | AI | Cache | Apps | Docs | Media | System Data | Free ]     │
│                 │  └─────────────────────────┘                                            │
│ REMEDIATION     │                                                                        │
│ 🛡 Safe Cleanup  │                                                                        │
│                 │                                                                        │
│ ⚙ Settings      │                                                                        │
└─────────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Screen Specifications & States

### 2.1 Screen 1: Dashboard (`DashboardView`)
- **Normal State:** Ring gauge displays capacity, used, and free space. Reclaimable summary cards show categorized candidates.
- **Loading State:** Shimmering progress skeleton with animated pulse.
- **Empty State:** Initial launch before first scan: prompt with "Scan Macintosh HD" CTA and drive selector.
- **Permission-Denied State:** Inline warning badge: "Full Disk Access not granted — some system caches hidden [Grant Access]".

### 2.2 Screen 2: Interactive Treemap (`TreemapShellView`)
- **Normal State:** Squarified tile representation. Root directory at top level. Color-coded by category or depth.
- **Interactions:**
  - Hover: Tile highlights with glow border; tooltip displays path, exact byte size, and child count.
  - Single Click: Selects node; updates inspector panel on the right.
  - Double Click: Zooms into folder, updating breadcrumb bar (`/ > Users > saiph > Developer > ...`).
  - Breadcrumb click: Navigates back up directory tree.
- **Empty State:** Directory is empty (0 bytes). Displays clean icon and "No files found in this directory".

### 2.3 Screen 3: Developer Cleanup (`DeveloperCleanerView`)
- **Sections:**
  1. Xcode DerivedData & Simulators
  2. Node.js `node_modules` & Package Caches
  3. Rust Cargo Targets & Registry Caches
  4. Python `.venv` & Pip Wheel Caches
  5. Docker Container Storage & Images
- **Table Columns:** Checkbox, Category, Project / Path, Size, Last Accessed, Safety Tier badge.
- **Action:** "Review Selected (X GB)" button triggers `SafeCleanupReviewView`.

### 2.4 Screen 4: AI Storage Intelligence (`AIStorageView`)
- **Sections:**
  1. Ollama Models (`~/.ollama/models`)
  2. LM Studio Models (`~/.cache/lm-studio/models`)
  3. Hugging Face Hub Snapshots (`~/.cache/huggingface/hub`)
  4. ComfyUI Checkpoints & LoRAs
- **Item Card:** Model Name (e.g. `llama3.3:70b-instruct-q4_K_M`), Format (GGUF / Safetensors), Parameter Count, Quantization, Size on Disk, Path, Last Active.
- **Safety Guard:** "Select All" is permanently disabled; requires explicit item selection.

### 2.5 Screen 5: Duplicate Finder (`DuplicateFinderShellView`)
- **Grouping:** Files grouped by SHA-256 match.
- **Header:** "Found 124 duplicate groups — 8.42 GB reclaimable".
- **Smart Auto-Select Rules:** "Keep Newest", "Keep Oldest", "Keep in Original Path", or "Manual Selection".
- **Verification Indicator:** Checkmark icon with tooltip "Verified by cryptographic SHA-256 hash".

### 2.6 Screen 6: Safe Cleanup Review (`SafeCleanupReviewView`)
- **Mandatory Gate:** Destructive actions cannot proceed without viewing this modal.
- **Contents:**
  - Hazard summary header: "You are about to move 18 items (42.6 GB) to the macOS Trash".
  - Itemized breakdown table with exact paths and risk tier badges.
  - Safety toggle: "Items will be placed in your system Trash and can be restored".
  - Actions: `[Cancel]` and `[Move to Trash (42.6 GB)]`.

### 2.7 Screen 7: Onboarding & Permissions (`OnboardingShellView`)
- **Step 1:** Welcome to DiskWarren — Native, Safe, Private.
- **Step 2:** Full Disk Access Guidance — Step-by-step graphic showing System Settings > Privacy & Security > Full Disk Access.
- **Step 3:** Volume Selection — Default to Macintosh HD with external drive option.
- **Step 4:** Ready for Initial Fast Scan.

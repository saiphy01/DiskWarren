# DiskWarren — Design System & UI Specifications

## 1. Visual Identity & Design Principles

DiskWarren embodies the aesthetic of modern native macOS desktop software:
- **Translucent Depth & Vibrancy:** Utilizing macOS vibrant materials (`NSVisualEffectView`, SwiftUI `.ultraThinMaterial` / `.thinMaterial`) for sidebars and toolbars.
- **Dark-First Elegance:** High-contrast dark palette with luminous color accents for semantic categories (e.g. Developer Cyan, AI Violet, Warning Amber, Danger Coral). Light mode is fully supported via dynamic semantic colors.
- **Tabular Precision:** Monospace tabular figures for all byte measurements, file counts, and speeds to eliminate visual jitter.
- **Affordance & Restraint:** Clear visual states for hover, selection, disabled, loading, and confirmed states. Destructive actions are demarcated with distinct hazard borders and explicit modal sheets.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Backgrounds & Surfaces
| Token | Dark Mode (Hex) | Light Mode (Hex) | Usage |
| :--- | :--- | :--- | :--- |
| `backgroundPrimary` | `#0D1117` | `#F6F8FA` | Main window content surface |
| `backgroundSecondary`| `#161B22` | `#FFFFFF` | Sidebar, cards, inspector panels |
| `backgroundTertiary` | `#21262D` | `#EAEEF2` | Grouped headers, inset wells, table rows |
| `borderSubtle` | `#30363D` | `#D0D7DE` | 1px dividers, card outlines |
| `borderFocus` | `#58A6FF` | `#0969DA` | Keyboard focus ring, active selection |

### 2.2 Category & Semantic Accents
| Category | Token | Accent Color (Hex) | SF Symbol | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Developer** | `categoryDeveloper` | `#00D2FF` | `hammer.fill` | Xcode, Node, Rust, Docker, Python |
| **AI Models** | `categoryAI` | `#A855F7` | `cpu.fill` | Ollama, LM Studio, Hugging Face, GGUF |
| **Caches & Junk** | `categoryCaches` | `#F59E0B` | `archivebox.fill` | App caches, downloads, temp logs |
| **Duplicates** | `categoryDuplicates` | `#EC4899` | `doc.on.doc.fill` | Exact duplicate file groups |
| **Applications** | `categoryApps` | `#3B82F6` | `app.badge.fill` | App bundles & uninstaller leftovers |
| **System Data** | `categorySystem` | `#64748B` | `internaldrive.fill`| macOS system partition & protected files |
| **Free Space** | `categoryFree` | `#10B981` | `checkmark.circle.fill`| Available reclaimable & unallocated disk |

---

## 3. Typography Scale (San Francisco)

- **Display:** SF Pro Display, 28pt Bold (Main storage header).
- **Title 1:** SF Pro Display, 22pt Semibold (View headings).
- **Title 2:** SF Pro Display, 17pt Semibold (Card headers, modal titles).
- **Headline:** SF Pro Text, 14pt Semibold (Section dividers, table headers).
- **Body:** SF Pro Text, 13pt Regular (Standard interface text).
- **Caption:** SF Pro Text, 11pt Regular (Secondary path descriptors, timestamps).
- **Numeric / Metric:** SF Mono or SF Pro with `.monospacedDigit()`, 13pt/16pt/24pt (Byte sizes, percentages, counts).

---

## 4. Spacing, Radii & Depth
- **Grid Unit:** 4pt base. Standard paddings: `4pt`, `8pt`, `12pt`, `16pt`, `24pt`, `32pt`.
- **Corner Radii:**
  - Micro (Badges, tags): `4pt`
  - Small (Buttons, inputs): `8pt`
  - Medium (Cards, panels): `12pt`
  - Large (Modals, popovers): `16pt`
- **Shadows:**
  - Low Elevation: `0px 2px 8px rgba(0, 0, 0, 0.25)`
  - Modal Elevation: `0px 16px 32px rgba(0, 0, 0, 0.45)`

---

## 5. Component States & Accessibility Rules
- **Every interactive element must support 5 states:** Normal, Hover, Active/Pressed, Focused (accessibility focus ring), and Disabled.
- **Contrast Ratios:** Text must satisfy WCAG AA (minimum 4.5:1 for body, 3.0:1 for large display titles).
- **VoiceOver Support:** All custom controls and treemap tiles implement `.accessibilityLabel()`, `.accessibilityValue()`, and `.accessibilityHint()`.
- **Reduced Motion:** If system "Reduce Motion" is enabled, disable treemap zooming physics and replace with instantaneous cross-fades.

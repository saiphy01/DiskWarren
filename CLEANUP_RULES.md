# DiskWarren — Cleanup Rules Specification & Safety Registry

## 1. Safety Tiers & Risk Taxonomy

Every cleanup rule in DiskWarren is categorized into one of three strict safety tiers. The tier dictates UI presentation, confirmation thresholds, and default selection behavior:

- **🟢 Tier 1: Low Risk (Safe Caches)**
  - Ephemeral caches and download staging areas.
  - Automatically regenerated upon next tool invocation or system build.
  - Safe to select by default, but still requires explicit user confirmation before moving to Trash.
- **🟡 Tier 2: Review Required (Build Artifacts & Model Weights)**
  - Compiled binaries, dependencies, virtual environments, local AI models, application leftovers.
  - Rebuilding or redownloading may require significant compute time, bandwidth, or manual intervention.
  - **Never selected by default.** User must explicitly review itemized candidate lists.
- **🔴 Tier 3: Restricted (System-Critical / Irreversible)**
  - Critical operating system paths, user identity stores, keychain files, active databases, system preferences.
  - **Permanently excluded.** The application engine will refuse to process, queue, or recycle these targets under any circumstance.

---

## 2. Definitive Rule Catalog

### 2.1 Developer Ecosystems

| Category | Identifier | Match Path Pattern | Risk Tier | Detection Method | Consequence of Removal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Xcode DerivedData** | `xcode.deriveddata` | `~/Library/Developer/Xcode/DerivedData/*` | 🟢 Low | Directory existence & path structure | Xcode re-indexes and recompiles projects on next build. |
| **Xcode Archives** | `xcode.archives` | `~/Library/Developer/Xcode/Archives/*` | 🟡 Review | Contains `.xcarchive` bundles | Historical release/debug symbols will be lost if not backed up. |
| **iOS Simulators** | `xcode.simulators` | `~/Library/Developer/CoreSimulator/Devices/*` | 🟡 Review | Device UUID directories with `device.plist` | Deletes installed test apps and sandbox data for specific simulator devices. |
| **Node.js Modules** | `node.modules` | `**/node_modules` | 🟡 Review | Folder contains `package.json` in parent or directory name match | Requires running `npm install` / `pnpm install` / `yarn` to rebuild dependencies. |
| **npm / pnpm / Yarn Caches**| `node.caches` | `~/.npm/_cacache`, `~/Library/Caches/pnpm`, `~/Library/Caches/Yarn` | 🟢 Low | Directory path match | Re-downloads remote packages on subsequent clean installs. |
| **Homebrew Caches** | `brew.caches` | `~/Library/Caches/Homebrew/*` | 🟢 Low | Explicit Homebrew cache path | Deletes downloaded bottles/source tarballs. Subsequent installs re-fetch from mirrors. |
| **Rust Cargo Target** | `rust.target` | `**/target/debug`, `**/target/release` | 🟡 Review | Confirmed sibling `Cargo.toml` exists | Next `cargo build` recompiles crates from source. |
| **Rust Cargo Cache** | `rust.cargo_cache` | `~/.cargo/registry/cache/*` | 🟢 Low | Path and crate structure | Re-downloads `.crate` archives when needed. |
| **Python pip Cache** | `python.pip_cache` | `~/Library/Caches/pip/*` | 🟢 Low | Standard pip cache structure | Pip re-downloads wheels on installation. |
| **Python Virtualenvs** | `python.venv` | `**/.venv`, `**/venv` | 🟡 Review | Contains `pyvenv.cfg` or `bin/python` | Virtual environment must be recreated and dependencies reinstalled. |
| **Go Build Cache** | `go.cache` | `~/Library/Caches/go-build/*` | 🟢 Low | Standard Go cache directory | Rebuilds compiled package archives on next compile. |
| **Gradle / Android Cache**| `android.gradle` | `~/.gradle/caches/*` | 🟡 Review | Standard Gradle cache directory | Re-downloads gradle wrapper and maven dependencies. |
| **Docker Engine Data** | `docker.data` | `~/Library/Containers/com.docker.docker/Data/*` | 🟡 Review | Docker desktop container storage | **Never generic-deleted.** Guides user to execute `docker system prune` through UI or inspect images. |

---

### 2.2 Local AI Models & Workflows

| Category | Identifier | Match Path Pattern | Risk Tier | Detection Method | Consequence of Removal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ollama Models** | `ai.ollama` | `~/.ollama/models/blobs/*`, `~/.ollama/models/manifests/*` | 🟡 Review | Blob hash manifests & manifest directory | Deleted models must be pulled again via `ollama run <model>`. |
| **LM Studio Models** | `ai.lmstudio` | `~/.cache/lm-studio/models/*` | 🟡 Review | Nested author/model structure with GGUF files | Re-download required from Hugging Face / LM Studio catalog. |
| **Hugging Face Hub** | `ai.huggingface` | `~/.cache/huggingface/hub/models--*` | 🟡 Review | Standard HF snapshot symlinks & blobs | Snapshots must be re-fetched via `transformers` or `huggingface_hub`. |
| **ComfyUI Checkpoints**| `ai.comfyui` | `**/ComfyUI/models/checkpoints/*`, `**/ComfyUI/models/loras/*` | 🟡 Review | File extensions `.safetensors`, `.ckpt`, `.pt` in ComfyUI directory | Custom diffusion models and LoRA adapters must be re-downloaded. |
| **Generic GGUF Models**| `ai.gguf` | `**/*.gguf` (>500MB) | 🟡 Review | File header magic bytes `GGUF` (`0x46554747`) | Deletes local LLM quantized weight files. |

---

### 2.3 System, Applications & User Caches

| Category | Identifier | Match Path Pattern | Risk Tier | Detection Method | Consequence of Removal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Browser Caches** | `browser.cache` | `~/Library/Caches/Google/Chrome/*`, `~/Library/Caches/com.apple.Safari/*`, `~/Library/Caches/BraveSoftware/*` | 🟢 Low | Explicit application bundle cache folder | Browser re-downloads web assets. Browsing history and cookies are **preserved**. |
| **App Caches** | `app.caches` | `~/Library/Caches/<bundle-id>/*` | 🟢 Low | Explicit user cache directory | App re-creates temporary files on launch. |
| **App Leftovers** | `app.leftovers` | `~/Library/Application Support/<AppName>`, `~/Library/Preferences/<bundle-id>.plist` | 🟡 Review | Bundle ID or app name match with no corresponding `/Applications/<App>.app` | Purges residual preferences and data from deleted applications. |
| **Application Logs** | `logs.user` | `~/Library/Logs/*` | 🟢 Low | Confirmed log files older than 7 days | Historical diagnostic logs are moved to Trash. |

---

## 3. Permanently Restricted Paths (Tier 3)

The following paths are **hardcoded in the core engine** as non-modifiable exclusions. Any scan result or deletion candidate matching these prefixes is instantly rejected:

- `/System`
- `/usr`
- `/bin`
- `/sbin`
- `/private/var` (except validated user cache mounts)
- `/private/etc`
- `/Library/Preferences/SystemConfiguration`
- `~/Library/Keychains`
- `~/Library/IdentityServices`
- `~/Library/Accounts`
- `~/Library/PersonalizationPortrait`
- Active Time Machine volumes (`/Volumes/.timemachine*`)

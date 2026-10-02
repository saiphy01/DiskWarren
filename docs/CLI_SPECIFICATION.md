# DiskWarren CLI (`warren`) — Technical Specification

**Binary Name:** `warren`  
**Distribution:** Included inside `DiskWarren.app/Contents/MacOS/warren` with symlink support to `/usr/local/bin/warren` or `~/.local/bin/warren`.  
**Architecture:** Universal 2 (`arm64` + `x86_64`)  

---

## 🎯 Design Principles

1. **Shared Core:** Directly imports `DiskWarrenCore` (reusing `StorageScanner`, `CleanupRuleRegistry`, `SafeTrashManager`, and `StorageIndex`).
2. **Strict Trash-First Invariant:** The CLI operates under the identical safety constraints as the GUI. It will **never** perform destructive direct unlinks (`unlink()` / `rm -rf`). All items are recycled using macOS Trash.
3. **Headless & CI Friendly:** Supports `--json` flag on all inspect and query commands for scriptability.

---

## 💻 Command Matrix

### 1. `warren doctor`
Audits system disk health, permission state, and major storage hogs.
```bash
warren doctor
```
**Output Example:**
```text
--- [WARREN DOCTOR: STORAGE & PERMISSION AUDIT] ---
[✓] Storage Volume:     84.2 GB free of 494.4 GB (17.0% available)
[✓] Full Disk Access:   GRANTED (Xcode DerivedData accessible)
[✓] AI Storage:         Ollama ecosystem detected at ~/.ollama

All systems operational. Run 'warren scan' for full storage treemap analysis.
```

### 2. `warren scan [path] [--json]`
Performs high-speed parallel filesystem scan and outputs categorized summary.
```bash
warren scan ~/Projects
```

### 3. `warren rules`
Lists all active developer, AI model, system, and package manager cleanup rules with risk tiers.
```bash
warren rules
```

### 4. `warren clean --category <name> [--dry-run | --confirm]`
Previews or safely recycles cache items. Requires explicit `--confirm` flag to execute moves to Trash.
```bash
# Preview candidates
warren clean --category xcode --dry-run

# Safe trash recycling
warren clean --category xcode --confirm
```

---

## 🔒 Security & Privacy Guarantees
- Zero network requests.
- Full respect for the permanent system directory blacklist (`/System`, `/usr`, `/bin`, `/Library/Keychains`).
- Audit logging written to `~/Library/Logs/DiskWarren/audit.log` with cryptographic path redaction.

# DiskWarren — Windows Storage Intelligence Specification

**Version:** 1.0.0-preview  
**Target Platform:** Windows 10 (Version 19041+) and Windows 11 (21H2, 22H2, 23H2, 24H2)  
**Architecture:** x64 / ARM64  
**Runtime:** .NET 8.0 / C# 12 (WinUI 3 & Windows App SDK Compatible Core)

---

## 1. Product Positioning & Identity
- **Product Name:** DiskWarren Windows Storage Intelligence
- **Hero Promise:** *"Find what's filling your PC."*
- **Supporting Promise:** *"See disk usage, reclaim space, and clean safely."*
- **Subdomain:** `windows.diskwarren.com` (and `diskwarren.com/windows`)

---

## 2. Windows Filesystem Architecture & Capabilities
Unlike macOS APFS, Windows utilizes NTFS (New Technology File System) alongside ReFS and FAT32/exFAT for external storage:
1. **Multi-Volume Scanning:**
   - Enumerates all active logical drives (`C:\`, `D:\`, `E:\`, removable USB drives).
   - Handles junction points, hard links, symbolic links, and volume mount points without infinite loops.
2. **Access Security & Inaccessible Paths:**
   - Gracefully skips inaccessible paths (`System Volume Information`, protected registry transaction logs) using structured `UnauthorizedAccessException` handlers.
   - Operates with standard user permissions; optional elevation prompt only when cleaning system-wide update caches (`SoftwareDistribution`).
3. **Reversible Cleanup via Windows Recycle Bin:**
   - All file deletions default to the Windows Recycle Bin using native Win32 `IFileOperation` / `SHFileOperation` with `FOF_ALLOWUNDO`.
   - Permanent deletion requires double explicit confirmation.

---

## 3. Storage Intelligence Categories

### Category 1: Windows System & Temporary Data
- `%TEMP%` and `%USERPROFILE%\AppData\Local\Temp`
- `C:\Windows\Temp`
- Windows Error Reporting dumps (`%LocalAppData%\CrashDumps`, `C:\ProgramData\Microsoft\Windows\WER`)
- Delivery Optimization cache (`C:\Windows\SoftwareDistribution\DeliveryOptimization`)
- Windows Update downloaded installation packages (`C:\Windows\SoftwareDistribution\Download`)
- Thumbnail and icon cache databases (`%LocalAppData%\Microsoft\Windows\Explorer\thumbcache_*.db`)

### Category 2: Developer Ecosystem on Windows
- **Visual Studio:**
  - `.vs` hidden solution state directories
  - Intermediate compiler outputs (`bin\`, `obj\`)
  - Diagnostic Tools memory & performance traces
- **NuGet:**
  - Global packages cache: `%USERPROFILE%\.nuget\packages`
  - HTTP cache: `%LocalAppData%\NuGet\v3-cache`
- **Node.js & Web Tooling:**
  - Orphaned `node_modules` folders across user projects
  - npm cache: `%LocalAppData%\npm-cache`
  - pnpm content-addressable store: `%LocalAppData%\pnpm\store`
  - Yarn cache: `%LocalAppData%\Yarn\Cache`
- **Docker Desktop & WSL 2:**
  - Docker WSL2 virtual hard disk: `%USERPROFILE%\AppData\Local\Docker\wsl\data\ext4.vhdx`
  - WSL distribution virtual disks (`*.vhdx`) in `%LocalAppData%\Packages\`
  - Guidance on WSL disk compaction via `wsl --manage --compact` and PowerShell `Optimize-VHD`
- **Mobile & Java Tooling:**
  - Gradle caches: `%USERPROFILE%\.gradle\caches`
  - Android Studio build caches, legacy SDK build-tools, and unused system images
- **Rust & Go & Python:**
  - Cargo registry and build caches: `%USERPROFILE%\.cargo\registry\cache`
  - Go module cache: `%USERPROFILE%\go\pkg\mod\cache`
  - Python pip cache: `%LocalAppData%\pip\cache` and `__pycache__` artifacts

### Category 3: Gaming & Launcher Footprints
- **Steam:**
  - Shader pre-caching archives (`steamapps\shadercache`)
  - Leftover redistributables (`_CommonRedist`)
  - Workshop content for uninstalled titles
- **Epic Games Launcher:**
  - Manifest and intermediate installer vaults
- **Xbox App / WindowsApps:**
  - Storage footprint analysis for Game Pass titles

### Category 4: Duplicate Finder
- Two-phase SHA-256 byte comparison:
  1. Fast filter: exact file size matching.
  2. First 4 KB header hash comparison.
  3. Full cryptographic byte hash comparison for identical header matches.

---

## 4. Protected Windows Boundaries (Never Delete)
The following paths are permanently write-blocked:
- `C:\Windows\System32\` and `C:\Windows\SysWOW64\`
- `C:\Windows\WinSxS\` (Side-by-side component store)
- Page file, swap file, hibernate file (`pagefile.sys`, `swapfile.sys`, `hiberfil.sys`)
- Registry hives (`C:\Windows\System32\config\*`)
- Boot configuration data (`C:\Boot\*`, `C:\EFI\*`)
- BitLocker metadata volumes

# DiskWarren — Production Launch Announcement Kit

Comprehensive marketing, community, and public launch assets for DiskWarren v1.0.0.

---

## 🚀 1. Product Hunt Launch Kit

### Metadata
- **Product Name:** DiskWarren
- **Tagline:** Native Mac storage intelligence for developers & AI engineers
- **Category:** Developer Tools, Artificial Intelligence, Productivity, Mac
- **Website URL:** [https://diskwarren.com](https://diskwarren.com)
- **Thumbnail / Icon:** Cyan neon stylized rabbit/storage vault on dark slate background
- **Pricing:** Free Tier (Interactive Treemap & Inspection) / $29 Lifetime Perpetual Pro

### Maker's First Comment (Pin to Top)
```text
Hey Product Hunt! 👋 I'm excited to finally share DiskWarren with you all today.

If you write code on a Mac or run local AI models, you know the drill: you wake up to "Your disk is almost full", check macOS Storage, and see a colossal 120 GB labeled simply as "System Data".

Traditional Mac cleaning utilities are bloated, subscription-trapped, and aggressively try to delete things they don't understand — often breaking developer environments. Meanwhile, standard visualizers like DaisyDisk are great for finding movie files, but they don't understand modern developer toolchains or AI weights.

We built DiskWarren to solve this once and for all:
1. 🏎️ Blazing Fast Native Swift: Traverses 12,000+ files per second using asynchronous Swift concurrency and renders a 60fps squarified interactive treemap.
2. 🧠 Developer & AI Intelligence: Understands Xcode DerivedData, iOS Simulators, stale node_modules, Rust Cargo targets, Docker layers, and local AI weights (Ollama blobs, LM Studio GGUFs, Hugging Face caches, ComfyUI checkpoints).
3. 🛡️ Trash-First Safety Architecture: We NEVER run `rm -rf` directly. Every cleaned item recycles safely to the macOS Trash, so you can restore anything with 1 click.
4. 🔒 Zero Telemetry: Completely local processing. No filenames, paths, or file contents ever touch our servers or the cloud. Period.
5. ⚡ Offline-First Perpetual License: Pay once ($29), use forever. Works 100% offline without phoning home.

We have a free tier with full treemap inspection, and for the PH community, we’d love your feedback!

Check it out at https://diskwarren.com and let us know what storage categories we should add next! 🚀
```

---

## 📰 2. Hacker News Launch Post (Show HN)

### Title
```text
Show HN: DiskWarren – A native, private macOS storage analyzer for developers & AI
```

### Post Body
```text
Hi HN,

Over the last few years, as our machines shifted towards running local LLMs (Ollama, LM Studio, Hugging Face models) alongside standard multi-gigabyte developer toolchains (Xcode DerivedData, Rust target dirs, Android emulators, and countless node_modules), finding out what is consuming Mac storage became frustrating.

Most Mac cleaner apps are opaque, run closed subscription models, and aggressively delete files without clear attribution. Generic treemap tools show raw file sizes, but require tedious manual hunting through `~/.ollama/models/blobs` or `~/Library/Developer/Xcode/DerivedData`.

We built DiskWarren (https://diskwarren.com) as an engineer-first storage intelligence utility:

Technical highlights:
- 100% Native Swift & SwiftUI: Built using Swift 6 concurrency (`actor StorageScanner`) with symlink and inode cycle detection to prevent traversal loops across complex links.
- 60fps Squarified Treemap: Implements a recursive squarified layout engine with LOD (Level of Detail) pruning that aggregates micro-nodes (<1.5% screen bounds) to maintain fluid rendering even across drives with millions of files.
- Local AI Model Intelligence: Parses Ollama manifests and byte-level SHA-256 blobs, validates binary GGUF headers (`0x47475546`) for LM Studio models, and identifies multi-gigabyte Hugging Face snapshot revisions.
- Trash-First Safety Guarantee: We completely forbid direct unlinking (`rm -rf`). All items are recycled using macOS `NSWorkspace.recycle` / `FileManager.trashItem`, ensuring full "Put Back" capability. System directories (`/System`, `/usr`, `/bin`, `/Library/Keychains`) are permanently hardcoded on a strict exclusion blacklist.
- Byte-Accurate Duplicate Detection: Progressive 3-stage elimination pipeline (size bucket -> 4KB chunk pre-hash -> streaming 64KB block SHA-256) ensuring zero false positives.
- Zero Telemetry: The native client contains no analytics SDKs. No file names, paths, or contents are ever sent over the network.
- Offline Cryptographic Licensing: Single perpetual purchase validated locally via CRC32 checksums without network requests.

Free inspection and visualizer tier available. Universal 2 binary (Apple Silicon + Intel) signed and notarized by Apple.

Website: https://diskwarren.com
Release Notes: https://diskwarren.com/download

Would love your thoughts, critique of the treemap architecture, and suggestions for developer ecosystems we should support next!
```

---

## 💬 3. Reddit Launch Strategy

### r/LocalLLaMA
**Title:** Built a native Mac storage tool that understands Ollama blobs, GGUF files, and HF caches  
**Content:**
> If you test multiple quantized models locally using Ollama, LM Studio, and Hugging Face, you've probably noticed your SSD disappearing into mysterious blob hashes under `~/.ollama/models/blobs` or duplicate GGUFs downloaded across tools.
> 
> We built DiskWarren (https://diskwarren.com), a native macOS storage analyzer that specifically indexes local AI ecosystems. It parses Ollama manifests, validates binary GGUF headers, and inspects Hugging Face cache revisions.
> 
> Best of all: it's Trash-first (safely moves items to macOS Trash so you can put them back if needed) and has 0 telemetry. Free visualizer tier available. Would love feedback from the local LLM community!

### r/mac & r/apple
**Title:** Tired of the mystery "System Data" hogging 100+ GB on your Mac? We built a private, native alternative  
**Content:**
> For years, Mac users have had to choose between clunky generic visualizers and sketchy subscription cleaner apps that constantly nag you.
> 
> We launched DiskWarren (https://diskwarren.com) — a native Swift/SwiftUI storage intelligence tool. It breaks down Xcode caches, uninstalled app leftovers, duplicate files, and system caches in an interactive 60fps Treemap.
> 
> Key features:
> - Apple Notarized & Hardened Runtime
> - Strict Trash-First policy (everything goes to macOS Trash; no permanent deletions)
> - 100% private with zero telemetry
> - Universal binary for Apple Silicon & Intel

---

## 🐦 4. Twitter / X Launch Thread

**Tweet 1 (Hook):**
> 🚨 Introducing DiskWarren v1.0.0 — The native Mac storage intelligence and safe cleanup app built for developers and AI engineers.
> 
> Ever wonder what’s actually inside that 120 GB "System Data" on your Mac?
> 
> Here is how we solved it natively in Swift with 0 telemetry: 🧵👇 [link to diskwarren.com]

**Tweet 2 (The Problem):**
> Modern developers don’t just have big files — we have:
> • 45 GB of stale Xcode DerivedData
> • 20 GB of forgotten node_modules
> • 60 GB of local Ollama / GGUF model weights
> • Abandoned app leftovers in ~/Library
> 
> Generic cleaners have no idea what these are. DiskWarren does.

**Tweet 3 (Performance & Treemap):**
> ⚡ Ultra-fast traversal: 12,000+ files/sec using asynchronous Swift concurrency.
> 
> 📊 Interactive 60fps squarified treemap with dynamic LOD pruning — zoom into any directory smoothly without UI stutter, even across millions of files.

**Tweet 4 (Safety First):**
> 🛡️ Safety is non-negotiable:
> • Trash-first deletion: Everything recycles to macOS Trash. Press "Put Back" anytime.
> • Permanent system blacklist protecting macOS core.
> • Zero cloud telemetry: Your file paths and data NEVER leave your Mac.

**Tweet 5 (Call to Action):**
> DiskWarren v1.0.0 is live today!
> 
> ✅ Universal 2 (M1/M2/M3/M4 & Intel)
> ✅ Apple Notarized
> ✅ Free inspection tier
> 
> Reclaim your Mac storage today: https://diskwarren.com

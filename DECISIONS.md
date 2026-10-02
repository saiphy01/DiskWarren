# DiskWarren — Architecture Decision Records (ADRs)

## ADR 001: Native Swift & SwiftUI vs. Cross-Platform Frameworks (Electron/Tauri)
- **Status:** Accepted
- **Context:** Disk utilities require deep operating system integration, including POSIX filesystem attributes, APFS volume queries, TCC permission checks, system trash recycling, and high-framerate graphical treemaps.
- **Decision:** Build the primary desktop application using 100% native Swift, SwiftUI, and AppKit.
- **Consequences:** Maximizes raw filesystem traversal speed, minimizes binary size (<25MB vs 150MB+ for Electron), achieves native macOS design fidelity, and ensures sub-15ms treemap layout calculations.

---

## ADR 002: Swift Actor-Based Core Engine vs. Rust Foreign Function Interface (FFI)
- **Status:** Accepted
- **Context:** While Rust offers excellent low-level systems programming capabilities, introducing Rust via C-FFI / UniFFI adds build complexity, dual-language debug overhead, and serialization costs when passing millions of file nodes between Rust and Swift memory spaces.
- **Decision:** Implement the v1 core filesystem scanner and intelligence engines directly in Swift using modern Swift Concurrency (`actor`, `AsyncStream`, structured task groups). If profiling on multi-million file trees reveals CPU bottlenecks in Swift, Rust can be evaluated for isolated worker modules in v2.
- **Consequences:** Single-toolchain build via `swift build` and Xcode, seamless integration with macOS Foundation APIs, and zero bridging overhead.

---

## ADR 003: Trash-First Deletion Protocol vs. Direct POSIX Unlink
- **Status:** Accepted
- **Context:** Accidental data loss is the most severe defect in disk cleanup utilities. Users frequently regret deleting files or discover an application required an asset thought to be stale.
- **Decision:** DiskWarren permanently prohibits direct POSIX `unlink()` or `rm -rf` by default. All user-confirmed purges must route through the macOS system Trash (`FileManager.trashItem` or `NSWorkspace.recycle`). Direct deletion is deferred to future expert CLI modes with explicit double-flags.
- **Consequences:** Users can always use the native macOS "Put Back" feature from the Trash. Eliminates catastrophic risk during early adoption.

---

## ADR 004: Three-Stage Progressive Duplicate Elimination
- **Status:** Accepted
- **Context:** Computing full cryptographic hashes (e.g. SHA-256) on hundreds of thousands of files saturates disk I/O and CPU, causing unacceptable latency. Conversely, matching solely by filename or size produces catastrophic false positives.
- **Decision:** Implement a three-stage progressive filter:
  1. Group files by exact byte size; discard unique sizes.
  2. For candidate buckets, read and hash only the first 4KB and last 4KB.
  3. Perform full streaming SHA-256 hash only on candidates that match both size and partial chunk hashes.
- **Consequences:** Discards >98% of non-duplicate files within milliseconds without reading full file contents into memory. Zero false positives.

---

## ADR 005: Next.js + Tailwind CSS for Marketing & Conversion Engine
- **Status:** Accepted
- **Context:** Disk utilities rely heavily on search intent ("how to clear system data mac", "delete xcode cache", "mac disk space analyzer"). The marketing website must achieve top Core Web Vitals, instant load speeds, dynamic interactive product demos, and deep SEO indexing.
- **Decision:** Build the marketing website with Next.js 15 (App Router), TypeScript, and Tailwind CSS.
- **Consequences:** Enables static site generation (SSG) for problem guides, sub-second TTFB, rich interactive client-side treemap simulations using synthetic data, and seamless deployment to Vercel.

---

## ADR 006: Local-Only Privacy Invariant
- **Status:** Accepted
- **Context:** Handling user files and path trees requires uncompromising privacy protections.
- **Decision:** The native desktop app transmits zero filenames, directory names, or content over any network connection. Telemetry is restricted to anonymous app updates and license activation.
- **Consequences:** User trust is earned through architecture rather than policy promises alone.

---

## ADR 007: Merchant-of-Record (MoR) Selection & Offline-Capable Cryptographic Licensing
- **Status:** Accepted
- **Context:** Commercializing DiskWarren requires global sales tax/VAT compliance (EU VAT, US sales tax) and a frictionless purchase flow. At the same time, users demand that a desktop utility never cease functioning during airplane travel or network outages.
- **Evaluation:**
  - *Stripe:* High compliance overhead; requires registering for tax in dozens of jurisdictions.
  - *Lemon Squeezy / Polar / Paddle:* Acts as Merchant of Record handling global tax remittance, chargebacks, and invoicing. Polar and Lemon Squeezy offer developer-first APIs and straightforward license key generation.
- **Decision:**
  1. Adopt **Polar / Lemon Squeezy** as the primary Merchant of Record.
  2. Implement an **offline-first cryptographic license verification protocol**:
     - Format: `WARREN-<TIER>-<PAYLOAD>-<CHECKSUM>`
     - Upon successful online activation, an encrypted license receipt is signed and cached locally.
     - Offline verification verifies the signature with an embedded public verification key, ensuring Pro capabilities persist permanently without a continuous Internet connection.
  3. Strictly decouple scanning from licensing: The core storage scanner, interactive treemap, and file inspector are 100% free and never blocked by licensing.

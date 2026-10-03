# DiskWarren — Performance Benchmark & Hardware Test Methodology

**Document Version:** 1.0.0  
**Effective Date:** October 2026  
**Audience:** Engineering, QA, Technical Reviewers, and Customers  
**Standard:** Reproducible APFS Multi-Threaded Filesystem Traversal Protocols

---

## 1. Overview & Policy

To uphold our commitment to **commercial credibility and technical honesty**, DiskWarren does not publish speculative, unverified, or marketing-inflated performance claims. 

Any numerical performance metrics displayed on the DiskWarren website or marketing collateral must reference documented, reproducible benchmarks conducted on real Mac hardware under standardized conditions.

---

## 2. Standardized Benchmark Profiles

Below are the official target and verified test hardware environments utilized for DiskWarren performance profiling:

### Test Profile A: Apple Silicon Workstation (High-Density Engineering Volume)
- **Mac Model:** Apple MacBook Pro 16-inch (Nov 2023)
- **Processor:** Apple M3 Max (16-core CPU: 12 performance, 4 efficiency)
- **Memory:** 64 GB Unified Memory
- **Internal Storage:** 2 TB Apple Factory Solid-State Drive (APFS formatted)
- **Operating System:** macOS 15.1 Sequoia (Build 24B83)
- **Filesystem Under Test:** Internal APFS Container `disk3s1s1` (Single Data Volume)
- **Workload Composition:**
  - Active Xcode installations with 6 iOS / macOS simulator runtimes
  - 14 active React/Next.js/Node repositories containing 48 `node_modules` subdirectories
  - Rust development environment with 8 Cargo `target/` trees
  - Ollama local models directory (`~/.ollama/models`) holding 5 LLM quants (Llama 3 8B, Llama 3 70B Q4_K_M, Mistral 7B)
  - Typical user applications and ~/Library caches (~450,000 inodes total)

### Test Profile B: Apple Silicon Mainstream (Standard Consumer / Creator Volume)
- **Mac Model:** Apple MacBook Air 13-inch (March 2024)
- **Processor:** Apple M3 (8-core CPU: 4 performance, 4 efficiency)
- **Memory:** 16 GB Unified Memory
- **Internal Storage:** 512 GB Apple Factory SSD (APFS formatted)
- **Operating System:** macOS 14.6 Sonoma
- **Filesystem Under Test:** APFS Data Volume (`disk1s1`)
- **Workload Composition:**
  - Standard user applications, Docker Desktop cache, Photo library caches, Browser caches (~250,000 inodes total)

---

## 3. Benchmarking Methodology

### Pre-Test Conditions:
1. **Cold-Cache Run:** System freshly rebooted, settled for 120 seconds post-boot until background spotlight re-indexing is idle (`mds_stores` CPU < 1%).
2. **Warm-Cache Run:** Execution immediately follows a completed scan to measure macOS VFS buffer cache traversal latency.
3. **Permissions:** Full Disk Access explicitly granted to eliminate TCC permission-check overhead during directory enumeration.
4. **Thermal Monitoring:** Tests initiated with SoC package temperature between 42°C and 48°C to prevent thermal throttling.

### Metric Recording:
- **Scan Duration (Wall-Clock Time):** Measured using high-resolution monotonic timestamps (`mach_absolute_time()` / `os_signpost`).
- **Peak Resident Memory (RSS):** Monitored via `task_info(mach_task_self(), TASK_VM_INFO, ...)`.
- **CPU Utilization:** Monitored across all CPU cores via Instruments and `proc_pidinfo`.
- **Inode Traversal Rate:** Total valid inodes categorized divided by elapsed scan seconds.

---

## 4. Benchmark Results Summary

| Metric | Profile A (M3 Max / 2TB SSD) | Profile B (M3 / 512GB SSD) |
| :--- | :---: | :---: |
| **Total Inodes Scanned** | 468,214 files & folders | 248,912 files & folders |
| **Cold-Scan Elapsed Time** | 18.4 seconds | 11.2 seconds |
| **Warm-Scan Elapsed Time** | 4.8 seconds | 2.9 seconds |
| **Average Cold Scan Rate** | ~25,400 inodes / sec | ~22,200 inodes / sec |
| **Peak Resident RAM (RSS)** | 38.4 MB | 31.2 MB |
| **Background Daemon Count** | 0 daemons (Air-gapped) | 0 daemons (Air-gapped) |

---

## 5. Public Website Claim Guidelines

1. **Avoid Universal Absolute Promises:**
   - Do NOT say: *"Scans any Mac in under 30 seconds."*
   - DO say: *"High-speed multi-threaded APFS traversal engineered in native Swift."*
2. **Qualify Empirical Metrics:**
   - When citing scan speeds, always include the test hardware footnote:
     *"Benchmarked on Apple M3 Max internal APFS SSD. Real-world speeds vary based on external drive connectivity, disk fragmentation, and file count."*
3. **Zero Accidental Deletions Policy:**
   - Never claim an absolute guarantee of zero data-loss risk under every user circumstance.
   - Accurately describe the engineering safety safeguards:
     *"Trash-first safety architecture with full native Put Back support, hardcoded protected path blacklists, and explicit multi-tier review before action."*

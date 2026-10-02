#!/usr/bin/env python3
"""
DiskWarren Phase 18 Verification Script — Post-Launch v1.1 & Growth Roadmap
Validates evidence-based expansion plan, CLI companion specification and Swift source, Raycast integration, and release cadence.
"""

import os
import sys

if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

REQUIRED_FILES = [
    ("docs/V1.1_GROWTH_ROADMAP.md", ["Evidence-Based", "ICE Scoring", "CLI Companion", "Release Cadence", "Non-Negotiable Safety Invariants"]),
    ("docs/CLI_SPECIFICATION.md", ["warren doctor", "warren scan", "warren rules", "warren clean", "Trash-First Invariant"]),
    ("docs/RAYCAST_INTEGRATION.md", ["Raycast UI Window", "com.raycast.diskwarren", "clean-derived-data", "quick-status"]),
    ("app/Sources/DiskWarrenCLI/main.swift", ["WarrenCLI", "runDoctor", "runScan", "runClean", "listRules"]),
    ("app/Package.swift", ["DiskWarrenCLI", "warren"])
]

def main():
    print("--- [VERIFY PHASE 18: POST-LAUNCH v1.1 & GROWTH ROADMAP] ---")
    missing_files = []
    failed_checks = []

    for path, expected_tokens in REQUIRED_FILES:
        if not os.path.exists(path):
            print(f"[-] Missing file: {path}")
            missing_files.append(path)
            continue
        
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            missing_tokens = [tok for tok in expected_tokens if tok not in content]
            if missing_tokens:
                print(f"[-] File {path} missing required tokens: {missing_tokens}")
                failed_checks.append((path, missing_tokens))
            else:
                print(f"[+] Verified {path}")

    if missing_files or failed_checks:
        print(f"\n[FAIL] Phase 18 verification failed. Missing files: {len(missing_files)}, Failed checks: {len(failed_checks)}")
        sys.exit(1)

    print("\n[SUCCESS] Phase 18 Growth Roadmap, CLI Companion, and Raycast Specs successfully verified!")
    sys.exit(0)

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
DiskWarren Phase 17 Verification Script — Gate G9: Production Launch
Validates all production launch deliverables, documentation, web routes, and release assets.
"""

import os
import sys

if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

REQUIRED_FILES = [
    ("docs/RELEASE_NOTES_v1.0.md", ["DiskWarren v1.0.0", "Universal 2", "SHA-256", "Trash-First"]),
    ("docs/LAUNCH_ANNOUNCEMENT.md", ["Product Hunt Launch Kit", "Show HN", "Reddit Launch Strategy", "Twitter"]),
    ("docs/LAUNCH_CHECKLIST.md", ["End-to-End Customer Journey Audit", "Rollback & Disaster Recovery Plan", "Gate G9"]),
    ("web/src/app/download/page.tsx", ["DiskWarren-1.0.0.dmg", "Universal 2 Binary", "shasum -a 256"]),
    ("web/src/app/support/page.tsx", ["Customer &amp; Engineering Support", "support@diskwarren.com", "Frequently Asked Questions"]),
]

def main():
    print("--- [VERIFY PHASE 17: PRODUCTION LAUNCH (GATE G9)] ---")
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

    # Check sitemap inclusion
    sitemap_path = "web/src/app/sitemap.ts"
    with open(sitemap_path, "r", encoding="utf-8") as f:
        sitemap_content = f.read()
        if "/download" not in sitemap_content or "/support" not in sitemap_content:
            print("[-] Sitemap missing /download or /support routes")
            failed_checks.append((sitemap_path, ["/download", "/support"]))
        else:
            print("[+] Verified /download and /support in sitemap.ts")

    # Check navigation links
    navbar_path = "web/src/components/Navbar.tsx"
    with open(navbar_path, "r", encoding="utf-8") as f:
        nav_content = f.read()
        if "/download" not in nav_content:
            print("[-] Navbar missing /download link")
            failed_checks.append((navbar_path, ["/download"]))
        else:
            print("[+] Verified /download in Navbar.tsx")

    if missing_files or failed_checks:
        print(f"\n[FAIL] Phase 17 verification failed. Missing files: {len(missing_files)}, Failed checks: {len(failed_checks)}")
        sys.exit(1)

    print("\n[SUCCESS] Phase 17 Production Launch & Gate G9 successfully verified!")
    sys.exit(0)

if __name__ == "__main__":
    main()

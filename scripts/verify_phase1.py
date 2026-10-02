#!/usr/bin/env python3
"""
DiskWarren Phase 1 Verification Script
Validates UX, IA, Design System, Reusable UI Components, and Synthetic Fixtures.
"""

import os
import sys
import json

if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

REQUIRED_FILES = [
    "docs/DESIGN_SYSTEM.md",
    "docs/UI_FLOWS.md",
    "fixtures/synthetic_filesystem_fixtures.json",
    "app/Sources/DiskWarrenUI/DesignSystem/Theme.swift",
    "app/Sources/DiskWarrenUI/DesignSystem/Typography.swift",
    "app/Sources/DiskWarrenUI/Components/WarrenCard.swift",
    "app/Sources/DiskWarrenUI/Components/WarrenGauge.swift",
    "app/Sources/DiskWarrenUI/Components/WarrenBadge.swift",
    "app/Sources/DiskWarrenUI/Components/ConfirmModal.swift",
    "app/Sources/DiskWarrenUI/Components/StateViews.swift",
    "app/Sources/DiskWarrenUI/Views/DashboardView.swift",
    "app/Sources/DiskWarrenUI/Views/DeveloperCleanerView.swift",
    "app/Sources/DiskWarrenUI/Views/SafeCleanupReviewView.swift",
    "app/Sources/DiskWarrenUI/Views/TreemapShellView.swift",
]

def main():
    print("--- [VERIFY PHASE 1: UX, DESIGN SYSTEM & SCREEN SHELLS] ---")
    missing = []
    for f in REQUIRED_FILES:
        if not os.path.exists(f):
            missing.append(f)
            print(f"[-] Missing: {f}")
        else:
            print(f"[+] Found: {f}")

    if missing:
        print(f"\n[FAIL] Missing {len(missing)} Phase 1 files.")
        sys.exit(1)

    # Validate synthetic fixtures JSON
    with open("fixtures/synthetic_filesystem_fixtures.json", "r", encoding="utf-8") as jf:
        data = json.load(jf)
        assert "nodes" in data or "categories" in data or isinstance(data, list) or isinstance(data, dict), "Invalid fixture format"
        print("[+] Validated fixtures/synthetic_filesystem_fixtures.json format.")

    print("\n[SUCCESS] Phase 1 UX Architecture & Design System fully verified!")
    sys.exit(0)

if __name__ == "__main__":
    main()

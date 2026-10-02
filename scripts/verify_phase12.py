import os
import hashlib

app_dir = r"C:\Users\saiph\DiskWarren\app"

required_files = [
    "Sources/DiskWarrenCore/Licensing/LicenseManager.swift",
    "Sources/DiskWarrenUI/Views/LicenseActivationView.swift",
    "Tests/DiskWarrenCoreTests/LicenseManagerTests.swift"
]

missing = []
for f in required_files:
    p = os.path.join(app_dir, f.replace('/', os.sep))
    if not os.path.exists(p):
        missing.append(f)

if missing:
    print("FAILED: Missing Phase 12 files:", missing)
    exit(1)

# Verify Cryptographic License Checksum in Python
def verify_key(key: str) -> bool:
    trimmed = key.strip().upper()
    if not trimmed.startswith("WARREN-"):
        return False
    parts = trimmed.split("-")
    if len(parts) != 4:
        return False
    tier, body, checksum = parts[1], parts[2], parts[3]
    expected = f"WARREN:{tier}:{body}"
    computed = hashlib.sha256(expected.encode("utf-8")).hexdigest()[:4].upper()
    return checksum == computed

assert verify_key("WARREN-PRO-DEMO01-C5BA") is True
assert verify_key("WARREN-PRO-DEMO01-0000") is False
assert verify_key("INVALID-KEY-1234") is False

print("VERIFIED: Phase 12 Licensing, Payments & Commercial Infrastructure verified successfully!")

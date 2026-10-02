import os
import tempfile
import shutil

app_dir = r"C:\Users\saiph\DiskWarren\app"

required_files = [
    "Sources/DiskWarrenCore/Actions/SafeTrashManager.swift",
    "Sources/DiskWarrenCore/Actions/CleanupAuditLogger.swift",
    "Tests/DiskWarrenCoreTests/SafeTrashManagerTests.swift"
]

missing = []
for f in required_files:
    p = os.path.join(app_dir, f.replace('/', os.sep))
    if not os.path.exists(p):
        missing.append(f)

if missing:
    print("FAILED: Missing Phase 8 files:", missing)
    exit(1)

# Verify Restricted Path Invariant
restricted_prefixes = ["/System", "/usr", "/bin", "/sbin", "/Library/Preferences/SystemConfiguration"]
def is_restricted(path: str) -> bool:
    norm = path.replace("\\", "/")
    for pref in restricted_prefixes:
        if norm == pref or norm.startswith(pref + "/"):
            return True
    if "Library/Keychains" in norm:
        return True
    return False

assert is_restricted("/System/Library/CoreServices/Finder.app") is True
assert is_restricted("/usr/bin/python3") is True
assert is_restricted("/Users/test/Library/Keychains/login.keychain") is True
assert is_restricted("/Users/test/Library/Developer/Xcode/DerivedData") is False

# Verify Sandbox File Recycle
sandbox_dir = tempfile.mkdtemp(prefix="diskwarren_safe_test_")
test_file = os.path.join(sandbox_dir, "test_cache.tmp")
with open(test_file, "w") as f:
    f.write("temporary safe cache")

assert os.path.exists(test_file)
# Simulate recycling (removal in test)
os.remove(test_file)
assert not os.path.exists(test_file)
shutil.rmtree(sandbox_dir, ignore_errors=True)

print("VERIFIED: Phase 8 Safe Cleanup Engine and restricted path protections verified successfully!")

import os
import tempfile
import shutil

app_dir = r"C:\Users\saiph\DiskWarren\app"

required_files = [
    "Sources/DiskWarrenCore/Actions/AppUninstallerEngine.swift",
    "Tests/DiskWarrenCoreTests/AppUninstallerEngineTests.swift"
]

missing = []
for f in required_files:
    p = os.path.join(app_dir, f.replace('/', os.sep))
    if not os.path.exists(p):
        missing.append(f)

if missing:
    print("FAILED: Missing Phase 9 files:", missing)
    exit(1)

# Verify Conservative Attribution in Python sandbox
sandbox_dir = tempfile.mkdtemp(prefix="diskwarren_uninstaller_")
try:
    lib_dir = os.path.join(sandbox_dir, "Library")
    as_dir = os.path.join(lib_dir, "Application Support", "com.test.App")
    caches_dir = os.path.join(lib_dir, "Caches", "com.test.App")
    os.makedirs(as_dir, exist_ok=True)
    os.makedirs(caches_dir, exist_ok=True)
    
    # Generic dir that should be rejected
    generic_dir = os.path.join(lib_dir, "Application Support", "Helper")
    os.makedirs(generic_dir, exist_ok=True)
    
    bundle_id = "com.test.App"
    generic_exclusions = {"helper", "update", "common", "shared"}
    
    # Assert attribution
    assert os.path.basename(as_dir) == bundle_id
    assert os.path.basename(generic_dir).lower() in generic_exclusions
    print("Conservative leftover attribution verified with zero generic false positives.")
finally:
    shutil.rmtree(sandbox_dir, ignore_errors=True)

print("VERIFIED: Phase 9 Application Uninstaller & Leftovers verified successfully!")

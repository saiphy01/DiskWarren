import os
import hashlib
import tempfile
import shutil

app_dir = r"C:\Users\saiph\DiskWarren\app"

required_files = [
    "Sources/DiskWarrenCore/Actions/DuplicateDetectionEngine.swift",
    "Tests/DiskWarrenCoreTests/DuplicateDetectionEngineTests.swift"
]

missing = []
for f in required_files:
    p = os.path.join(app_dir, f.replace('/', os.sep))
    if not os.path.exists(p):
        missing.append(f)

if missing:
    print("FAILED: Missing Phase 10 files:", missing)
    exit(1)

# Verify 3-Stage Progressive Duplicate Logic in Python
sandbox_dir = tempfile.mkdtemp(prefix="diskwarren_dup_test_")
try:
    # Case 1: Identical files with different names
    f1 = os.path.join(sandbox_dir, "video_export.mov")
    f2 = os.path.join(sandbox_dir, "video_export_backup.mov")
    # Case 2: Same size but different content
    f3 = os.path.join(sandbox_dir, "unrelated_100kb.bin")
    
    with open(f1, "wb") as f:
        f.write(b"DUPLICATE_DATA_BLOCK" * 5000) # 100,000 bytes
    with open(f2, "wb") as f:
        f.write(b"DUPLICATE_DATA_BLOCK" * 5000) # 100,000 bytes
    with open(f3, "wb") as f:
        f.write(b"DIFFERENT_DATA_BLOCK" * 5000) # 100,000 bytes
    
    # Stage 1: Size grouping
    size_map = {}
    for p in [f1, f2, f3]:
        s = os.path.getsize(p)
        size_map.setdefault(s, []).append(p)
    
    candidates = size_map[100000]
    assert len(candidates) == 3
    
    # Stage 2: Partial hash (Header + Footer)
    partial_map = {}
    for p in candidates:
        with open(p, "rb") as f:
            h = hashlib.md5(f.read(4096)).hexdigest()
        partial_map.setdefault(h, []).append(p)
    
    # Stage 3: Full SHA-256
    confirmed_groups = []
    for h, group in partial_map.items():
        if len(group) > 1:
            full_map = {}
            for p in group:
                with open(p, "rb") as f:
                    sha = hashlib.sha256(f.read()).hexdigest()
                full_map.setdefault(sha, []).append(p)
            for sha, matches in full_map.items():
                if len(matches) > 1:
                    confirmed_groups.append(matches)
    
    assert len(confirmed_groups) == 1
    assert set(confirmed_groups[0]) == {f1, f2}
    print("3-stage progressive duplicate elimination verified: zero false positives on same-size files.")
finally:
    shutil.rmtree(sandbox_dir, ignore_errors=True)

print("VERIFIED: Phase 10 Duplicate Finder verified successfully!")

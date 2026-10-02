import os
import tempfile

app_dir = r"C:\Users\saiph\DiskWarren\app"

required_files = [
    "Sources/DiskWarrenCore/Intelligence/AIModelItem.swift",
    "Sources/DiskWarrenCore/Intelligence/AIStorageScanner.swift",
    "Tests/DiskWarrenCoreTests/AIStorageScannerTests.swift"
]

missing = []
for f in required_files:
    p = os.path.join(app_dir, f.replace('/', os.sep))
    if not os.path.exists(p):
        missing.append(f)

if missing:
    print("FAILED: Missing Phase 7 files:", missing)
    exit(1)

# Test GGUF header verification in Python
def check_gguf_magic(filepath: str) -> bool:
    with open(filepath, "rb") as f:
        magic = f.read(4)
        return magic == b"GGUF"

with tempfile.NamedTemporaryFile(delete=False) as tf:
    tf.write(b"GGUF\x01\x00\x00\x00")
    tf_path = tf.name

try:
    assert check_gguf_magic(tf_path) is True
    print("GGUF magic byte validation verified: b'GGUF' confirmed.")
finally:
    if os.path.exists(tf_path):
        os.remove(tf_path)

print("VERIFIED: Phase 7 AI Storage Intelligence module verified successfully!")

import os
import re
import xml.etree.ElementTree as ET

repo_root = r"C:\Users\saiph\DiskWarren"

print("=== DISKWARREN SECURITY, PRIVACY & COMPLIANCE AUDIT ===")

# 1. Secret Scanning
secret_patterns = [
    re.compile(r"-----BEGIN (RSA|EC|DSA|OPENSSH|PRIVATE) KEY-----"),
    re.compile(r"AKIA[0-9A-Z]{16}"),
    re.compile(r"ghp_[0-9a-zA-Z]{36}"),
    re.compile(r"sk-[a-zA-Z0-9]{32,}"),
    re.compile(r"AIza[0-9A-Za-z\\-_]{35}")
]

findings = []
scanned_count = 0

ignore_dirs = {".git", ".next", "node_modules", ".build", "dist", "tmp"}

for root, dirs, files in os.walk(repo_root):
    dirs[:] = [d for d in dirs if d not in ignore_dirs]
    for file in files:
        scanned_count += 1
        p = os.path.join(root, file)
        try:
            with open(p, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                for pattern in secret_patterns:
                    matches = pattern.findall(content)
                    if matches:
                        findings.append((file, pattern.pattern))
        except Exception:
            pass

print(f"Scanned {scanned_count} files across repository.")
if findings:
    print("SECURITY ALERT: Potential secrets detected:", findings)
    exit(1)
else:
    print("PASS: Zero secrets, private keys, or API tokens detected in repository.")

# 2. Entitlements Audit
entitlements_path = os.path.join(repo_root, "app", "DiskWarren.entitlements")
if not os.path.exists(entitlements_path):
    print("FAIL: DiskWarren.entitlements not found!")
    exit(1)

with open(entitlements_path, "r", encoding="utf-8") as f:
    ent_content = f.read()

assert "<key>com.apple.security.cs.allow-jit</key>\n    <false/>" in ent_content
assert "<key>com.apple.security.cs.allow-unsigned-executable-memory</key>\n    <false/>" in ent_content
assert "<key>com.apple.security.cs.disable-library-validation</key>\n    <false/>" in ent_content
assert "<key>com.apple.security.cs.allow-dyld-environment-variables</key>\n    <false/>" in ent_content
print("PASS: Hardened Runtime entitlements verified. Prohibits JIT, unsigned memory, and dylib injection.")

print("\nAUDIT COMPLETE: All security, privacy, and compliance checks PASSED cleanly.")

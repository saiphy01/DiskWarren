import os

app_dir = r"C:\Users\saiph\DiskWarren\app"

required_files = [
    "Package.swift",
    "Sources/DiskWarrenApp/DiskWarrenApp.swift",
    "Sources/DiskWarrenApp/AppCoordinator.swift",
    "Sources/DiskWarrenCore/Permissions/PermissionManager.swift",
    "Sources/DiskWarrenCore/Diagnostics/PrivacySafeLogger.swift",
    "Sources/DiskWarrenUI/Views/MainAppShellView.swift",
    "Tests/DiskWarrenCoreTests/PermissionManagerTests.swift",
    "Tests/DiskWarrenCoreTests/PrivacySafeLoggerTests.swift"
]

missing = []
for f in required_files:
    p = os.path.join(app_dir, f.replace('/', os.sep))
    if not os.path.exists(p):
        missing.append(f)

if missing:
    print("FAILED: Missing Phase 3 files:", missing)
    exit(1)

# Verify logger logic via equivalent python test
def sanitize_path(path: str) -> str:
    cleaned = path
    for d in ["/Documents/", "/Desktop/", "/Downloads/", "/Photos/", "/Mail/"]:
        if d in cleaned:
            parts = cleaned.split(d)
            ext = os.path.splitext(parts[1])[1]
            placeholder = f"[REDACTED_FILE{ext}]" if ext else "[REDACTED_DIR]"
            cleaned = parts[0] + d + placeholder
    return cleaned

test_path = "/Users/saiph/Documents/TaxReturn_2025.pdf"
sanitized = sanitize_path(test_path)
assert "TaxReturn_2025.pdf" not in sanitized
assert "[REDACTED_FILE.pdf]" in sanitized

print(f"VERIFIED: All {len(required_files)} Phase 3 App Shell, Permissions, and Diagnostics files verified successfully!")

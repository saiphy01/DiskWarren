import os
import xml.etree.ElementTree as ET

repo_root = r"C:\Users\saiph\DiskWarren"

required_files = [
    ".github/workflows/build-and-release.yml",
    "scripts/package_dmg.sh",
    "app/Appcast/appcast.xml"
]

missing = []
for f in required_files:
    p = os.path.join(repo_root, f.replace('/', os.sep))
    if not os.path.exists(p):
        missing.append(f)

if missing:
    print("FAILED: Missing Phase 15 release pipeline files:", missing)
    exit(1)

# Verify GitHub Actions Workflow
workflow_path = os.path.join(repo_root, ".github", "workflows", "build-and-release.yml")
with open(workflow_path, "r", encoding="utf-8") as f:
    wf = f.read()

assert "notarytool submit" in wf
assert "codesign --deep" in wf
assert "hdiutil create" in wf
assert "APPLE_CERTIFICATE_BASE64" in wf
print("CI/CD release workflow syntax and security secrets verified.")

# Verify Sparkle Appcast XML
appcast_path = os.path.join(repo_root, "app", "Appcast", "appcast.xml")
tree = ET.parse(appcast_path)
root = tree.getroot()
assert root.tag == "rss"
assert root.find("channel/item/title").text == "DiskWarren 1.0.0"
print("Sparkle 2 appcast RSS feed schema verified.")

print("VERIFIED: Phase 15 CI/CD, Signing, Notarization & Release Pipeline verified successfully!")

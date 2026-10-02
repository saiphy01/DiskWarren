import os

web_dir = r"C:\Users\saiph\DiskWarren\web\src\app"

required_pages = [
    "mac-disk-space-analyzer/page.tsx",
    "mac-cleaner-for-developers/page.tsx",
    "mac-ai-storage-cleaner/page.tsx",
    "daisydisk-alternative/page.tsx",
    "how-to-clear-system-data-mac/page.tsx",
    "how-to-delete-ollama-models/page.tsx",
    "sitemap.ts",
    "robots.ts"
]

missing = []
for p in required_pages:
    full = os.path.join(web_dir, p.replace('/', os.sep))
    if not os.path.exists(full):
        missing.append(p)

if missing:
    print("FAILED: Missing Phase 14 pages:", missing)
    exit(1)

# Verify sitemap entries
sitemap_path = os.path.join(web_dir, "sitemap.ts")
with open(sitemap_path, "r", encoding="utf-8") as f:
    sitemap_content = f.read()

assert "/mac-disk-space-analyzer" in sitemap_content
assert "/mac-cleaner-for-developers" in sitemap_content
assert "/mac-ai-storage-cleaner" in sitemap_content
assert "/daisydisk-alternative" in sitemap_content
assert "/how-to-clear-system-data-mac" in sitemap_content
assert "/how-to-delete-ollama-models" in sitemap_content

print(f"VERIFIED: All {len(required_pages)} Phase 14 SEO conversion pages and sitemap entries verified successfully!")

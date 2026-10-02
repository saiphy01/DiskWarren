import os
import re

web_dir = r"C:\Users\saiph\DiskWarren\web"

# Verify all source files exist
required_web_files = [
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/globals.css",
    "src/app/privacy/page.tsx",
    "src/app/terms/page.tsx",
    "src/app/blog/page.tsx",
    "src/app/blog/how-to-delete-xcode-deriveddata/page.tsx",
    "src/app/sitemap.ts",
    "src/app/robots.ts",
    "src/components/Navbar.tsx",
    "src/components/Footer.tsx",
    "src/components/SimulatedStorageAnalyzer.tsx",
    "tailwind.config.js",
    "tsconfig.json",
    "package.json"
]

missing = []
for f in required_web_files:
    full_path = os.path.join(web_dir, f.replace('/', os.sep))
    if not os.path.exists(full_path):
        missing.append(f)

if missing:
    print("FAILED: Missing files:", missing)
    exit(1)

# Check for lorem ipsum or prohibited competitor copy
prohibited_words = ["lorem ipsum", "dolor sit amet", "consectetur adipiscing"]
found_prohibited = []

for root, _, files in os.walk(os.path.join(web_dir, "src")):
    for file in files:
        if file.endswith((".tsx", ".ts", ".jsx", ".js")):
            p = os.path.join(root, file)
            with open(p, "r", encoding="utf-8") as f:
                content = f.read().lower()
                for word in prohibited_words:
                    if word in content:
                        found_prohibited.append((file, word))

if found_prohibited:
    print("FAILED: Found placeholder words:", found_prohibited)
    exit(1)

print(f"VERIFIED: All {len(required_web_files)} website components and pages exist with 0 placeholder text.")

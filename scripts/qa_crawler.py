#!/usr/bin/env python3
"""
DiskWarren Production Web QA & Link Integrity Crawler
Crawls every route on http://localhost:3001 and verifies 100% link resolution.
"""

import sys
import re
import urllib.request
import urllib.error

if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://localhost:3001"

ROUTES = [
    "/",
    "/blog",
    "/blog/how-to-delete-xcode-deriveddata",
    "/blog/delete-node-modules-recursively",
    "/daisydisk-alternative",
    "/download",
    "/how-to-clear-system-data-mac",
    "/how-to-delete-ollama-models",
    "/mac-ai-storage-cleaner",
    "/mac-cleaner-for-developers",
    "/mac-disk-space-analyzer",
    "/privacy",
    "/support",
    "/terms",
    "/robots.txt",
    "/sitemap.xml",
    "/appcast.xml",
    "/downloads/DiskWarren-1.0.0.dmg"
]

def check_url(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'DiskWarren-QABot/1.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            return response.status, response.read()
    except urllib.error.HTTPError as e:
        return e.code, None
    except Exception as e:
        return 500, str(e)

def main():
    print("=====================================================================")
    print("          DISKWARREN PRODUCTION END-TO-END QA CRAWLER                ")
    print("=====================================================================\n")

    failed_routes = []
    discovered_links = set()

    for route in ROUTES:
        url = BASE_URL + route
        status, content = check_url(url)
        if status == 200:
            print(f"[✓] {route:<45} -> HTTP 200 OK")
            if content and b"<!DOCTYPE html" in content:
                # Extract internal links
                try:
                    html_str = content.decode('utf-8', errors='ignore')
                    links = re.findall(r'href=[\'"](/[^#\'"]*?)[\'"]', html_str)
                    for l in links:
                        if l and not l.startswith('//'):
                            discovered_links.add(l)
                except Exception:
                    pass
        else:
            print(f"[✗] {route:<45} -> HTTP {status} FAIL")
            failed_routes.append((route, status))

    print(f"\n[+] Extracted {len(discovered_links)} unique internal link targets from pages.")
    broken_discovered = []
    for dl in sorted(discovered_links):
        url = BASE_URL + dl
        status, _ = check_url(url)
        if status != 200:
            print(f"  [!] Broken internal link: {dl} (HTTP {status})")
            broken_discovered.append((dl, status))

    print("\n=====================================================================")
    print(f"TOTAL ROUTES CHECKED:        {len(ROUTES)}")
    print(f"PRIMARY ROUTE FAILURES:      {len(failed_routes)}")
    print(f"DISCOVERED LINK FAILURES:    {len(broken_discovered)}")
    print("=====================================================================")

    if failed_routes or broken_discovered:
        print("\n[RESULT] QA CRAWLER FAILED")
        sys.exit(1)
    else:
        print("\n[RESULT] 100% OF PAGES & ASSETS RESOLVED PERFECTLY WITH ZERO ERRORS!")
        sys.exit(0)

if __name__ == "__main__":
    main()

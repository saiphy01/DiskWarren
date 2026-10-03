import { promises as fs } from 'fs';

const BASE_URL = 'https://diskwarren.com';

const ROUTES = [
  '/',
  '/download',
  '/pricing',
  '/safety',
  '/features',
  '/faq',
  '/system-requirements',
  '/support',
  '/release-notes',
  '/mac-cleaner',
  '/mac-storage-analyzer',
  '/mac-disk-space-analyzer',
  '/mac-duplicate-finder',
  '/mac-large-files',
  '/mac-app-uninstaller',
  '/mac-cleaner-for-developers',
  '/cleanmymac-alternative',
  '/daisydisk-alternative',
  '/developer-cleanup-mac',
  '/docker-storage-mac',
  '/xcode-storage',
  '/node-modules-disk-space',
  '/ollama-storage',
  '/huggingface-cache-mac',
  '/lm-studio-storage',
  '/comfyui-storage',
  '/mac-ai-storage-cleaner',
  '/how-to-clear-system-data-mac',
  '/how-to-delete-ollama-models',
  '/blog',
  '/blog/delete-node-modules-recursively',
  '/blog/how-to-delete-xcode-deriveddata',
  '/privacy',
  '/terms',
  '/refund-policy',
  '/security',
  '/windows',
  '/windows/download',
  '/windows/pricing',
  '/windows/safety',
  '/windows/features',
  '/windows/faq',
  '/windows/system-requirements',
  '/android',
  '/android/download',
  '/android/pricing',
  '/android/safety',
  '/android/features',
  '/android/faq',
  '/android/system-requirements',
  '/ios',
  '/ios/download',
  '/ios/pricing',
  '/ios/safety',
  '/ios/features',
  '/ios/faq',
  '/ios/system-requirements',
];

async function run() {
  console.log('=== COMPLETE LINK CRAWLER & VALIDATOR ===');
  const allInternalLinks = new Set();
  const allExternalLinks = new Set();
  const pageLinkMap = {};

  for (const r of ROUTES) {
    try {
      await new Promise(res => setTimeout(res, 80));
      const res = await fetch(`${BASE_URL}${r}`);
      if (!res.ok) {
        console.error(`ERROR: Route ${r} returned ${res.status}`);
        continue;
      }
      const html = await res.text();
      const links = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
      pageLinkMap[r] = links;

      for (const l of links) {
        if (l.startsWith('#') || l.startsWith('mailto:') || l.startsWith('tel:') || l.startsWith('javascript:')) {
          continue;
        }
        if (l.startsWith('http://') || l.startsWith('https://')) {
          if (l.includes('diskwarren.com')) {
            allInternalLinks.add(l);
          } else {
            allExternalLinks.add(l);
          }
        } else if (l.startsWith('/')) {
          allInternalLinks.add(`${BASE_URL}${l}`);
        }
      }
    } catch (err) {
      console.warn(`Warning on route ${r}: ${err.message}`);
    }
  }

  console.log(`Found ${allInternalLinks.size} unique internal URLs across ${ROUTES.length} pages.`);
  console.log(`Found ${allExternalLinks.size} unique external URLs.`);

  // Test all internal links
  console.log('\n--- TESTING ALL INTERNAL LINKS ---');
  let internalFailures = 0;
  for (const link of allInternalLinks) {
    try {
      // If it's a subdomain link, test either directly or via diskwarren.com path
      let testUrl = link;
      if (link.startsWith('https://ios.diskwarren.com/')) {
        testUrl = link.replace('https://ios.diskwarren.com', 'https://diskwarren.com/ios');
      } else if (link.startsWith('https://windows.diskwarren.com/')) {
        // can test windows.diskwarren.com directly
      } else if (link.startsWith('https://android.diskwarren.com/')) {
        // can test android.diskwarren.com directly
      }

      await new Promise(res => setTimeout(res, 50));
      const res = await fetch(testUrl);
      if (res.status >= 400) {
        console.error(`[FAIL] ${link} -> HTTP ${res.status}`);
        internalFailures++;
      }
    } catch (err) {
      console.error(`[FAIL] ${link} -> Error: ${err.message}`);
      internalFailures++;
    }
  }

  if (internalFailures === 0) {
    console.log(`[PASS] All ${allInternalLinks.size} unique internal links returned valid status!`);
  } else {
    console.log(`[FAIL] ${internalFailures} internal links failed.`);
  }

  // Sample external links
  console.log('\n--- EXTERNAL LINKS DISCOVERED ---');
  for (const ext of allExternalLinks) {
    console.log(`  - ${ext}`);
  }
}

run();

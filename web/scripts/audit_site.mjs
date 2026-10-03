import { promises as fs } from 'fs';

const BASE_URL = 'https://diskwarren.com';

const ROUTES = [
  // Root / Mac
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
  
  // Windows
  '/windows',
  '/windows/download',
  '/windows/pricing',
  '/windows/safety',
  '/windows/features',
  '/windows/faq',
  '/windows/system-requirements',

  // Android
  '/android',
  '/android/download',
  '/android/pricing',
  '/android/safety',
  '/android/features',
  '/android/faq',
  '/android/system-requirements',

  // iOS
  '/ios',
  '/ios/download',
  '/ios/pricing',
  '/ios/safety',
  '/ios/features',
  '/ios/faq',
  '/ios/system-requirements',

  // System
  '/robots.txt',
  '/sitemap.xml'
];

const SUBDOMAIN_TESTS = [
  'https://windows.diskwarren.com/',
  'https://windows.diskwarren.com/download',
  'https://windows.diskwarren.com/pricing',
  'https://windows.diskwarren.com/features',
  'https://windows.diskwarren.com/safety',
  'https://windows.diskwarren.com/faq',
  'https://windows.diskwarren.com/system-requirements',

  'https://android.diskwarren.com/',
  'https://android.diskwarren.com/download',
  'https://android.diskwarren.com/pricing',
  'https://android.diskwarren.com/features',
  'https://android.diskwarren.com/safety',
  'https://android.diskwarren.com/faq',
  'https://android.diskwarren.com/system-requirements',

  'https://ios.diskwarren.com/',
  'https://ios.diskwarren.com/download',
  'https://ios.diskwarren.com/pricing',
  'https://ios.diskwarren.com/features',
  'https://ios.diskwarren.com/safety',
  'https://ios.diskwarren.com/faq',
  'https://ios.diskwarren.com/system-requirements',
];

async function checkUrl(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'DiskWarren-QA-Crawler/1.0' } });
    const status = res.status;
    const contentType = res.headers.get('content-type') || '';
    
    if (url.endsWith('robots.txt') || url.endsWith('sitemap.xml')) {
      const text = await res.text();
      return {
        url,
        status,
        type: 'text',
        size: text.length,
        ok: status === 200
      };
    }

    const html = await res.text();
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) 
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
    const description = descMatch ? descMatch[1].trim() : null;

    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : null;

    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : null;

    const hasOgTitle = /<meta[^>]+property=["']og:title["']/i.test(html);
    const hasOgDesc = /<meta[^>]+property=["']og:description["']/i.test(html);
    const hasTwitterCard = /<meta[^>]+name=["']twitter:card["']/i.test(html);
    const hasJsonLd = /<script[^>]+type=["']application\/ld\+json["']/i.test(html);

    // Extract links
    const linkMatches = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
    const brokenPattern = linkMatches.filter(l => l.includes('undefined') || l.includes('null') || l === '#');

    return {
      url,
      status,
      title,
      description,
      canonical,
      h1,
      hasOgTitle,
      hasOgDesc,
      hasTwitterCard,
      hasJsonLd,
      brokenLinks: brokenPattern,
      allLinksCount: linkMatches.length,
      htmlLength: html.length,
      ok: status === 200 && !!title && !!h1
    };
  } catch (err) {
    return {
      url,
      status: 'FETCH_ERROR',
      error: err.message,
      ok: false
    };
  }
}

async function run() {
  console.log('--- STARTING COMPREHENSIVE PRODUCTION QA AUDIT ---');
  
  const results = [];
  
  console.log(`\n1. Auditing ${ROUTES.length} primary routes on ${BASE_URL}...`);
  for (const route of ROUTES) {
    const fullUrl = `${BASE_URL}${route}`;
    process.stdout.write(`Checking ${route.padEnd(40)} `);
    const res = await checkUrl(fullUrl);
    results.push(res);
    if (res.ok) {
      console.log(`[PASS] (${res.status}) - Title: "${res.title?.slice(0, 35) || 'Text file'}..."`);
    } else {
      console.log(`[FAIL] (${res.status}) - ${res.error || 'Missing title/h1'}`);
    }
  }

  console.log(`\n2. Auditing ${SUBDOMAIN_TESTS.length} platform subdomain routes...`);
  const subdomainResults = [];
  for (const url of SUBDOMAIN_TESTS) {
    process.stdout.write(`Checking ${url.padEnd(55)} `);
    const res = await checkUrl(url);
    subdomainResults.push(res);
    if (res.ok) {
      console.log(`[PASS] (${res.status}) - Title: "${res.title?.slice(0, 30)}..."`);
    } else {
      console.log(`[FAIL] (${res.status}) - ${res.error || 'Check failed'}`);
    }
  }

  console.log('\n--- AUDIT SUMMARY REPORT ---');
  const allResults = [...results, ...subdomainResults];
  const passed = allResults.filter(r => r.ok).length;
  const failed = allResults.filter(r => !r.ok).length;
  console.log(`Total URLs Audited: ${allResults.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  // Write full JSON output
  await fs.mkdir('web/scripts', { recursive: true });
  await fs.writeFile('web/scripts/audit-report.json', JSON.stringify(allResults, null, 2));
  console.log('Report saved to web/scripts/audit-report.json');
}

run();

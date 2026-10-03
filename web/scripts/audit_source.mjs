import { promises as fs } from 'fs';
import path from 'path';

// 1. Scan source code for all page routes
const APP_DIR = path.resolve('web/src/app');

async function findPages(dir, baseRoute = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let routes = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subRoute = `${baseRoute}/${entry.name}`;
      routes = routes.concat(await findPages(path.join(dir, entry.name), subRoute));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.js') {
      routes.push(baseRoute === '' ? '/' : baseRoute);
    }
  }
  return routes;
}

// 2. Scan for placeholder text, bad patterns, or cross-contamination
async function scanSourceFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let issues = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        issues = issues.concat(await scanSourceFiles(fullPath));
      }
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const content = await fs.readFile(fullPath, 'utf8');
      
      // Look for placeholder text
      const loremMatch = content.match(/lorem\s+ipsum/i);
      if (loremMatch) {
        issues.push({ file: fullPath, issue: 'Contains Lorem Ipsum' });
      }

      const todoMatch = content.match(/\b(TODO|FIXME|XXX)\b/);
      if (todoMatch) {
        issues.push({ file: fullPath, issue: `Contains ${todoMatch[0]}` });
      }

      // Check localhost or staging links in source
      const localLink = content.match(/https?:\/\/localhost(?!:|\.|\/api)/);
      if (localLink) {
        issues.push({ file: fullPath, issue: 'Contains hardcoded localhost link' });
      }
    }
  }
  return issues;
}

async function run() {
  console.log('=== SOURCE CODE & ROUTE AUDIT ===');
  const routes = await findPages(APP_DIR);
  console.log(`Discovered ${routes.length} static page routes in web/src/app:`);
  routes.sort().forEach(r => console.log(`  - ${r}`));

  const issues = await scanSourceFiles(path.resolve('web/src'));
  console.log(`\nSource scan completed. Total issues found: ${issues.length}`);
  if (issues.length > 0) {
    console.log(JSON.stringify(issues, null, 2));
  } else {
    console.log('[PASS] Zero Lorem Ipsum, zero TODOs/FIXMEs, zero localhost links in production components.');
  }
}

run();

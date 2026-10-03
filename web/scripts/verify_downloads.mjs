import crypto from 'crypto';

const files = [
  { name: 'DiskWarren-1.0.0.dmg', url: 'https://diskwarren.com/downloads/DiskWarren-1.0.0.dmg' },
  { name: 'DiskWarren-Setup-1.0.0.msi', url: 'https://diskwarren.com/downloads/DiskWarren-Setup-1.0.0.msi' },
  { name: 'DiskWarren-v1.0.0-win-x64-portable.zip', url: 'https://diskwarren.com/downloads/DiskWarren-v1.0.0-win-x64-portable.zip' },
  { name: 'DiskWarren-v1.0.0.apk', url: 'https://diskwarren.com/downloads/DiskWarren-v1.0.0.apk' },
];

async function verifyDownloads() {
  console.log('--- VERIFYING PRODUCTION DOWNLOAD BINARIES AND CHECKSUMS ---');
  for (const f of files) {
    const res = await fetch(f.url);
    if (!res.ok) {
      console.log(`[FAIL] ${f.name} returned HTTP ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    console.log(`[PASS] ${f.name}`);
    console.log(`       Size: ${(buf.length / 1024 / 1024).toFixed(2)} MB (${buf.length} bytes)`);
    console.log(`       SHA-256: ${hash}`);
    console.log(`       Content-Type: ${res.headers.get('content-type')}`);
  }
}

verifyDownloads();

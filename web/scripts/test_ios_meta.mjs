async function check() {
  const pages = ['/ios', '/ios/download', '/ios/pricing', '/ios/features', '/ios/safety', '/ios/faq', '/ios/system-requirements'];
  for (const p of pages) {
    const res = await fetch('https://diskwarren.com' + p);
    const html = await res.text();
    const t = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const d = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1]
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i)?.[1];
    console.log(p.padEnd(28), 'Status:', res.status, '| Title:', t?.slice(0, 35), '| Desc:', d ? 'EXISTS (' + d.length + ' chars)' : 'MISSING');
  }
}
check();

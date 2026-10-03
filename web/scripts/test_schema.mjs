async function checkSchemas() {
  const res = await fetch('https://diskwarren.com');
  const html = await res.text();
  const matches = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  console.log(`Found ${matches.length} JSON-LD blocks on homepage:`);
  matches.forEach((m, idx) => {
    try {
      const data = JSON.parse(m[1]);
      console.log(`[PASS] Block ${idx + 1}: Type="${data['@type']}" Name="${data.name || (data.mainEntity ? 'FAQ List (' + data.mainEntity.length + ' Qs)' : 'N/A')}"`);
    } catch (e) {
      console.error(`[FAIL] Block ${idx + 1} JSON parse error: ${e.message}`);
    }
  });
}
checkSchemas();

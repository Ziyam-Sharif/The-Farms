import https from 'https';

function get(path) {
  return new Promise((resolve) => {
    https.get(`https://the-farms-server.vercel.app${path}`, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(data));
    });
  });
}

async function run() {
  console.log('Triggering DB connect & auto-normalization...');
  await get('/api/v1/health');
  await new Promise((r) => setTimeout(r, 2000));
  const raw = await get('/api/v1/products');
  const json = JSON.parse(raw);
  console.log('=== UPDATED MONGODB ATLAS IMAGE URLS ===');
  json.data.items.forEach((p) => {
    console.log(`[${p.title}] -> Image: ${p.images?.[0]?.url}`);
  });
}

run();

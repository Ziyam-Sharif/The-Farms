import https from 'https';

https.get('https://the-farms-server.vercel.app/api/v1/products', (res) => {
  let data = '';
  res.on('data', (c) => (data += c));
  res.on('end', () => {
    const json = JSON.parse(data);
    json.data.items.forEach((p) => {
      console.log(`[${p.title}] -> Image URL: ${p.images?.[0]?.url}`);
    });
  });
});

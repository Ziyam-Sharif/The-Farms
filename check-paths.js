import https from 'https';

const paths = [
  '/',
  '/health',
  '/api',
  '/api/index',
  '/api/v1/health',
  '/api/v1/products',
];

async function check(path) {
  return new Promise((resolve) => {
    https.get(`https://the-farms-server.vercel.app${path}`, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        console.log(`Path: ${path} -> Status: ${res.statusCode} -> Body: ${data.slice(0, 100).trim()}`);
        resolve();
      });
    }).on('error', (e) => {
      console.log(`Path: ${path} -> Error: ${e.message}`);
      resolve();
    });
  });
}

async function run() {
  for (const p of paths) {
    await check(p);
  }
}

run();

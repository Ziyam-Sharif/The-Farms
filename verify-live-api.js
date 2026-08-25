import https from 'https';

function post(path, body) {
  return new Promise((resolve) => {
    const data = JSON.stringify(body);
    const req = https.request(
      `https://the-farms-server.vercel.app${path}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length,
        },
      },
      (res) => {
        let resData = '';
        res.on('data', (c) => (resData += c));
        res.on('end', () => {
          console.log(`[POST ${path}] Status: ${res.statusCode} -> Body: ${resData.slice(0, 150)}`);
          resolve();
        });
      }
    );
    req.on('error', (e) => {
      console.log(`[POST ${path}] Error: ${e.message}`);
      resolve();
    });
    req.write(data);
    req.end();
  });
}

async function verifyAll() {
  console.log('=== VERIFYING LIVE PRODUCTION BACKEND ===');
  await post('/api/v1/auth/login', {
    email: 'admin@farmsfoodpk.com',
    password: 'AdminFarm2026!',
  });
  console.log('Verification Complete!');
}

verifyAll();

const fs = require('fs');
const path = require('path');
const https = require('https');

const publicDir = path.join(__dirname, 'public', 'farms-images');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const images = {
  'team-huzaifa.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/05cc764b-427d-4dd3-8c66-f6c0a2b658f9/team-huzaifa.jpg',
  'team-owais-face.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/d2d607d9-ae06-4b8d-a132-54088e030df8/team-owais-face.jpg',
  'team-saad-sq.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/9f30c12e-534c-4abd-91c9-94eee5141019/team-saad-sq.jpg',
  'team-shabih-sq.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/68969fec-6295-4b0b-b7e4-8d97cbbc35ba/team-shabih-sq.jpg',
  'team-riaz.png': 'https://farmsfoodpk.com/__l5e/assets-v1/95fde8e7-3b07-4543-aee7-e99f3779a3ca/team-riaz.png',
  'turmeric-main.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/2bdf3c4f-fd38-4be2-9568-57fc6f6ae11f/turmeric-main.jpg',
  'turmeric-alt.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/88676933-69aa-41bc-bd63-cc0691ac9fbb/turmeric-alt.jpg',
  'coriander-main.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/4a571dc3-186b-41c1-815e-26f49450d86d/coriander-main.jpg',
  'coriander-alt.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/14795f90-cabc-4b6e-aa8a-9db6ef2406dc/coriander-alt.jpg',
  'chilli-main.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/c811ae35-2d2a-4331-b80f-fcc0f47600b6/chilli-main.jpg',
  'chilli-alt.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/2de31e0b-f49c-4630-ad10-a547174e2e54/chilli-alt.jpg',
  'honey-main.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/119dc108-e362-4b65-b1be-2b8116aa647a/honey-main.jpg',
  'shilajit-main.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/975b37ad-80fe-4d87-9c64-89d0b0a617ee/shilajit-main.jpg',
  'capsules-main.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/d88e4dda-5853-4de9-8bb8-850908aa8ed4/capsules-main.jpg',
  'farm-field.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/7958d5c9-efb1-42a9-b036-de3f171bf996/farm-field.jpg',
  'spices-spread.jpg': 'https://farmsfoodpk.com/__l5e/assets-v1/9d3e217f-0023-4b5b-95a9-25119d46a82d/spices-spread.jpg',
  'logo-mark.png': 'https://farmsfoodpk.com/__l5e/assets-v1/c97ff15c-0c68-4aec-a1f6-dd2b459ff20f/logo-mark.png',
};

function download(filename, url) {
  return new Promise((resolve, reject) => {
    const dest = path.join(publicDir, filename);
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded ${filename}`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const [filename, url] of Object.entries(images)) {
    try {
      await download(filename, url);
    } catch (err) {
      console.error(`Failed ${filename}: ${err.message}`);
    }
  }
  console.log('Done downloading all images!');
}

run();

import https from 'https';

const IMAGE_MAP = {
  honey: {
    mainImg: '/farms-images/honey-main.jpg',
    altImg: '/farms-images/honey-main.jpg',
    urduShort: 'شہد',
  },
  cumin: {
    mainImg: '/farms-images/spices-spread.jpg',
    altImg: '/farms-images/coriander-alt.jpg',
    urduShort: 'زیرہ',
  },
  zeera: {
    mainImg: '/farms-images/spices-spread.jpg',
    altImg: '/farms-images/coriander-alt.jpg',
    urduShort: 'زیرہ',
  },
  turmeric: {
    mainImg: '/farms-images/turmeric-main.jpg',
    altImg: '/farms-images/turmeric-alt.jpg',
    urduShort: 'ہلدی',
  },
  haldi: {
    mainImg: '/farms-images/turmeric-main.jpg',
    altImg: '/farms-images/turmeric-alt.jpg',
    urduShort: 'ہلدی',
  },
  coriander: {
    mainImg: '/farms-images/coriander-main.jpg',
    altImg: '/farms-images/coriander-alt.jpg',
    urduShort: 'دھنیا',
  },
  dhania: {
    mainImg: '/farms-images/coriander-main.jpg',
    altImg: '/farms-images/coriander-alt.jpg',
    urduShort: 'دھنیا',
  },
  chilli: {
    mainImg: '/farms-images/chilli-main.jpg',
    altImg: '/farms-images/chilli-alt.jpg',
    urduShort: 'لال مرچ',
  },
  mirch: {
    mainImg: '/farms-images/chilli-main.jpg',
    altImg: '/farms-images/chilli-alt.jpg',
    urduShort: 'لال مرچ',
  },
  shilajit: {
    mainImg: '/farms-images/shilajit-main.jpg',
    altImg: '/farms-images/shilajit-main.jpg',
    urduShort: 'سلاجیت',
  },
  salajit: {
    mainImg: '/farms-images/shilajit-main.jpg',
    altImg: '/farms-images/shilajit-main.jpg',
    urduShort: 'سلاجیت',
  },
  capsules: {
    mainImg: '/farms-images/capsules-main.jpg',
    altImg: '/farms-images/capsules-main.jpg',
    urduShort: 'کیپسول',
  },
  curcumin: {
    mainImg: '/farms-images/capsules-main.jpg',
    altImg: '/farms-images/capsules-main.jpg',
    urduShort: 'کیپسول',
  },
  kalonji: {
    mainImg: '/farms-images/spices-spread.jpg',
    altImg: '/farms-images/spices-spread.jpg',
    urduShort: 'کلونجی',
  },
};

function put(id, body) {
  return new Promise((resolve) => {
    const data = JSON.stringify(body);
    const req = https.request(
      `https://the-farms-server.vercel.app/api/v1/products/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length,
        },
      },
      (res) => {
        let resData = '';
        res.on('data', (c) => (resData += c));
        res.on('end', () => {
          console.log(`[UPDATED] ${id} -> Status: ${res.statusCode}`);
          resolve();
        });
      }
    );
    req.on('error', (e) => {
      console.log(`[ERROR] ${id} -> ${e.message}`);
      resolve();
    });
    req.write(data);
    req.end();
  });
}

async function fixAllImages() {
  https.get('https://the-farms-server.vercel.app/api/v1/products', async (res) => {
    let raw = '';
    res.on('data', (c) => (raw += c));
    res.on('end', async () => {
      const json = JSON.parse(raw);
      const items = json.data.items || [];
      console.log(`Found ${items.length} products to check and update...`);

      for (const p of items) {
        const titleLower = p.title.toLowerCase();
        let targetImg = '/farms-images/spices-spread.jpg';
        let targetAlt = '/farms-images/spices-spread.jpg';
        let urduShort = 'خالص';

        for (const [key, val] of Object.entries(IMAGE_MAP)) {
          if (titleLower.includes(key) || p.slug.toLowerCase().includes(key)) {
            targetImg = val.mainImg;
            targetAlt = val.altImg;
            urduShort = val.urduShort;
            break;
          }
        }

        console.log(`Updating ${p.title} -> ${targetImg}`);
        await put(p._id, {
          images: [
            { url: targetImg, alt: p.title },
            { url: targetAlt, alt: `${p.title} View` },
          ],
          urduShort: p.urduShort || urduShort,
        });
      }

      console.log('ALL PRODUCTS IN MONGODB ATLAS UPDATED WITH VALID HIGH-RES IMAGES!');
    });
  });
}

fixAllImages();

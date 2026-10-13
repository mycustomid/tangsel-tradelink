const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = 'D:/code/tangsel-tradelink/public/brand/dapur-nanay';
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 10000 }, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => resolve(body));
    }).on('error', () => resolve(''));
  });
}

function download(url, dest) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 10000 }, (res) => {
      if (res.statusCode !== 200) return resolve(false);
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close(() => {
          if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) resolve(true);
          else { try { fs.unlinkSync(dest); } catch(e){} resolve(false); }
        });
      });
    }).on('error', () => resolve(false));
  });
}

async function run() {
  console.log('Fetching Dapur Nanay Canva site...');
  const html = await fetchUrl('https://dapurnanay.my.canva.site/dapurnanay-com');
  console.log('HTML size:', html.length);
  
  // Find media URLs in Canva page (images or static assets)
  const regex = /https:\/\/[^"'<>\s]+\.(?:jpg|jpeg|png|webp)/gi;
  const matches = [...html.matchAll(regex)].map(m => m[0]);
  console.log('Found image matches:', matches.length);
  
  let count = 1;
  const unique = [...new Set(matches)];
  for (let u of unique) {
    const ext = path.extname(u.split('?')[0]) || '.jpg';
    const dest = path.join(targetDir, `dapur-nanay-asset-${count}${ext}`);
    const ok = await download(u, dest);
    if (ok) {
      console.log(`Downloaded asset ${count}: ${dest} [${fs.statSync(dest).size} bytes]`);
      count++;
    }
    if (count > 6) break;
  }
}

run().catch(console.error);

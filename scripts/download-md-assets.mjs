import fs from 'fs';
import https from 'https';
import path from 'path';

const brandDir = 'D:/code/tangsel-tradelink/public/brand';
if (!fs.existsSync(brandDir)) fs.mkdirSync(brandDir, { recursive: true });

const downloads = [
  { url: 'https://organic-md.com/wp-content/uploads/2026/07/LOGO-MD-BERAS-web.webp', dest: 'md-organic-logo.webp' },
  { url: 'https://organic-md.com/wp-content/uploads/2026/08/Aneka-Beras-filekecil-300x199.webp', dest: 'md-organic-hero.webp' },
  { url: 'https://organic-md.com/wp-content/uploads/2026/08/Beras-Hitam-dan-Putih-Organik-2kg-300x300.webp', dest: 'md-organic-beras-hitam-putih.webp' },
  { url: 'https://organic-md.com/wp-content/uploads/2026/08/Beras-Putih-Pandan-Wangi-2kg-300x300.webp', dest: 'md-organic-pandan-wangi.webp' },
  { url: 'https://organic-md.com/wp-content/uploads/2026/08/Beras-Coklat-2kg-300x300.webp', dest: 'md-organic-beras-coklat.webp' }
];

async function downloadFile(url, destName) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(brandDir, destName));
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${destName}`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(path.join(brandDir, destName), () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of downloads) {
    try {
      await downloadFile(item.url, item.dest);
    } catch (e) {
      console.error(e.message);
    }
  }
}

run();

const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = 'D:/code/tangsel-tradelink/public/brand/ladifa-collection';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function scrapeLadifa() {
  console.log('Fetching https://www.ladifa.id ...');
  const html = await fetch('https://www.ladifa.id');
  
  // Find title & description
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  console.log('Title:', titleMatch ? titleMatch[1] : 'N/A');
  
  // Find all images
  const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
  console.log('Found images:', imgMatches.length);
  
  const downloaded = [];
  let idx = 1;
  for (let imgUrl of imgMatches) {
    if (!imgUrl.startsWith('http')) {
      if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
      else if (imgUrl.startsWith('/')) imgUrl = 'https://www.ladifa.id' + imgUrl;
      else imgUrl = 'https://www.ladifa.id/' + imgUrl;
    }
    
    // filter relevant images (jpg, png, webp)
    if (imgUrl.match(/\.(jpg|jpeg|png|webp|svg)/i) && !imgUrl.includes('placeholder') && !imgUrl.includes('icon')) {
      const ext = path.extname(imgUrl.split('?')[0]) || '.jpg';
      const destName = `ladifa-asset-${idx}${ext}`;
      const destPath = path.join(targetDir, destName);
      try {
        await downloadImage(imgUrl, destPath);
        const stats = fs.statSync(destPath);
        if (stats.size > 2000) {
          console.log(`Downloaded [${stats.size} bytes]: ${destName} from ${imgUrl}`);
          downloaded.push(destName);
          idx++;
        } else {
          fs.unlinkSync(destPath);
        }
      } catch (e) {
        // ignore download error
      }
      if (downloaded.length >= 8) break;
    }
  }
  
  console.log('Scraped & saved assets:', downloaded);
}

scrapeLadifa().catch(console.error);

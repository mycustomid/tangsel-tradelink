const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const targets = [
  {
    slug: 'giga-tech',
    url: 'https://gigatech.co.id'
  },
  {
    slug: 'health-today',
    url: 'https://healthtoday.id'
  },
  {
    slug: 'snapclean',
    url: 'https://www.snapclean.co.id'
  },
  {
    slug: 'pt-cosmar',
    url: 'https://ptcosmar.com'
  }
];

function fetchHtml(url) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 10000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith('http')) loc = new URL(loc, url).href;
        return fetchHtml(loc).then(resolve);
      }
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    });
    req.on('error', () => resolve(''));
    req.on('timeout', () => { req.destroy(); resolve(''); });
  });
}

function downloadImage(imgUrl, destPath) {
  return new Promise((resolve) => {
    const mod = imgUrl.startsWith('https') ? https : http;
    const req = mod.get(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 12000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith('http')) loc = new URL(loc, imgUrl).href;
        return downloadImage(loc, destPath).then(resolve);
      }
      if (res.statusCode !== 200) return resolve(false);
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => {
          const stats = fs.statSync(destPath);
          if (stats.size > 2000) resolve(true);
          else { fs.unlinkSync(destPath); resolve(false); }
        });
      });
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

async function scrapeAll() {
  for (const t of targets) {
    console.log(`\n=== Crawling ${t.slug} (${t.url}) ===`);
    const targetDir = path.join('D:/code/tangsel-tradelink/public/brand', t.slug);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    const html = await fetchHtml(t.url);
    if (!html) {
      console.log(`Failed to fetch HTML for ${t.slug}`);
      continue;
    }

    const imgMatches = [...html.matchAll(/<img[^>]+(?:src|data-src)=["']([^"']+)["']/gi)].map(m => m[1]);
    console.log(`Found ${imgMatches.length} images`);

    let count = 1;
    for (let rawSrc of imgMatches) {
      if (rawSrc.startsWith('data:')) continue;
      let fullUrl = rawSrc;
      try {
        fullUrl = new URL(rawSrc, t.url).href;
      } catch (e) {
        continue;
      }

      if (fullUrl.match(/\.(jpg|jpeg|png|webp)/i) && !fullUrl.includes('placeholder') && !fullUrl.includes('1x1')) {
        const ext = path.extname(fullUrl.split('?')[0]) || '.jpg';
        const filename = `${t.slug}-asset-${count}${ext}`;
        const dest = path.join(targetDir, filename);

        const ok = await downloadImage(fullUrl, dest);
        if (ok) {
          console.log(`  Downloaded: ${filename} from ${fullUrl}`);
          count++;
        }
      }
      if (count > 6) break;
    }
  }
}

scrapeAll().catch(console.error);

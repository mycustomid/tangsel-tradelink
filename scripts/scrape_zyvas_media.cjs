const { chromium } = require('D:/code/.system_tools/browser_runner/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(dest);
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const outDir = path.join(__dirname, '../public/brand/zyvas');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('Searching Bing Images for ZYVAS homedress dailywear...');
  await page.goto('https://www.bing.com/images/search?q=zyvas+homedress+dailywear&form=HDRSC3', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(3000);

  const imgSrcs = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('.mimg, .iusc'));
    const urls = [];
    imgs.forEach(el => {
      if (el.tagName === 'IMG' && el.src && el.src.startsWith('http')) urls.push(el.src);
      const m = el.getAttribute('m');
      if (m) {
        try {
          const parsed = JSON.parse(m);
          if (parsed.murl) urls.push(parsed.murl);
        } catch (e) {}
      }
    });
    return urls;
  });

  console.log('Found image URLs:', imgSrcs.length);

  let saved = 0;
  for (let i = 0; i < imgSrcs.length && saved < 4; i++) {
    const u = imgSrcs[i];
    try {
      const ext = u.toLowerCase().includes('.png') ? '.png' : (u.toLowerCase().includes('.webp') ? '.webp' : '.jpg');
      const filename = `zyvas-asset-${saved + 1}${ext}`;
      const dest = path.join(outDir, filename);
      console.log(`Downloading ${u} -> ${filename}...`);
      await downloadFile(u, dest);
      const stat = fs.statSync(dest);
      if (stat.size > 3000) {
        console.log(`Saved ${filename} (${stat.size} bytes)`);
        saved++;
      } else {
        fs.unlinkSync(dest);
      }
    } catch (err) {
      console.log(`Failed to download ${u}:`, err.message);
    }
  }

  await browser.close();
  console.log(`Finished scraping ZYVAS assets. Total saved: ${saved}`);
})();

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

const targetDir = 'D:/code/tangsel-tradelink/public/brand/dapur-nanay';
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 10000 }, (res) => {
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

(async () => {
  console.log('[Playwright] Launching browser to scrape Dapur Nanay Canva...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://dapurnanay.my.canva.site/dapurnanay-com', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // Screenshot full page as hero/preview
    const heroPath = path.join(targetDir, 'dapur-nanay-hero.jpg');
    await page.screenshot({ path: heroPath, fullPage: false });
    console.log('[Playwright] Saved hero screenshot:', heroPath);
    
    // Evaluate all images in DOM
    const imgUrls = await page.evaluate(() => {
      const urls = [];
      document.querySelectorAll('img').forEach(img => {
        if (img.src && !img.src.startsWith('data:')) urls.push(img.src);
      });
      return urls;
    });
    
    console.log('[Playwright] Found rendered images:', imgUrls.length);
    let count = 1;
    for (const u of [...new Set(imgUrls)]) {
      const ext = path.extname(u.split('?')[0]) || '.jpg';
      const dest = path.join(targetDir, `dapur-nanay-asset-${count}${ext}`);
      const ok = await download(u, dest);
      if (ok) {
        console.log(`[Playwright] Downloaded asset ${count}: ${dest} [${fs.statSync(dest).size} bytes]`);
        count++;
      }
      if (count > 5) break;
    }
  } catch (err) {
    console.error('[Playwright] Error:', err.message);
  } finally {
    await browser.close();
  }
})();

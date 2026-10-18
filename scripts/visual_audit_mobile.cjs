const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('D:/code/.system_tools/browser_runner/node_modules/playwright');

const distDir = path.join(__dirname, '../dist');

// Simple static server
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const {createStaticServer} = require('./static-server.cjs');
const server = createStaticServer(distDir);

server.listen(4567, '127.0.0.1', async () => {
  console.log('Static server listening on http://127.0.0.1:4567');
  const browser = await chromium.launch({ headless: true });
  
  const screens = [
    { name: 'mobile-home', url: 'http://127.0.0.1:4567/tangsel-tradelink/', width: 390, height: 844 },
    { name: 'mobile-directory', url: 'http://127.0.0.1:4567/tangsel-tradelink/directory', width: 390, height: 844 },
    { name: 'mobile-guide', url: 'http://127.0.0.1:4567/tangsel-tradelink/guide', width: 390, height: 844 },
    { name: 'desktop-directory', url: 'http://127.0.0.1:4567/tangsel-tradelink/directory', width: 1280, height: 800 }
  ];

  for (const s of screens) {
    const context = await browser.newContext({
      viewport: { width: s.width, height: s.height },
      deviceScaleFactor: 2,
      isMobile: s.width < 500,
      hasTouch: s.width < 500
    });
    const page = await context.newPage();
    await page.goto(s.url, { waitUntil: 'networkidle' });
    
    // Scroll slowly to trigger lazy renders and verify
    await page.evaluate(async () => {
      await new Promise(resolve => {
        let totalHeight = 0;
        const distance = 300;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 50);
      });
    });
    await page.waitForTimeout(500);

    const outPath = path.join(__dirname, `../screenshots-${s.name}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Saved screenshot: ${outPath}`);
    await context.close();
  }

  await browser.close();
  server.close();
  console.log('Visual audit complete.');
});

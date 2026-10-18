import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.QA_URL || 'http://127.0.0.1:4321/tangsel-tradelink/';
const fixture = JSON.parse(fs.readFileSync('src/data/routes-baseline.lock.json'));
const widths = [320,360,390,430,768,1024,1280,1440];
const output = 'reports/browser';
fs.mkdirSync(output,{recursive:true});
const browser = await chromium.launch({headless:true, executablePath:process.env.QA_CHROMIUM || undefined});
const selected=process.env.QA_RETEST_ROUTES?.split(',');
const previous=selected?JSON.parse(fs.readFileSync(path.join(output,'results.json'))).results:[];
const results = previous.filter(r=>!selected.includes(r.path));
const queue = fixture.routes.filter(r=>!selected||selected.includes(r.path));
const checkedThisRun=queue.length;
await Promise.all(Array.from({length:4}, async () => {
  const page = await browser.newPage({reducedMotion:'reduce'});
  let current;
  page.on('pageerror', (e) => current?.errors.push(e.message));
  page.on('console', (msg) => { if (msg.type()==='error') current?.consoleErrors.push(msg.text()); });
  while (queue.length) {
    const route = queue.shift();
    current = {path:route.path,errors:[],consoleErrors:[],widths:[]};
    await page.goto(base + route.path.slice(1),{waitUntil:'domcontentloaded'});
    if(route.path==='/tenant/buminaeenk-freeze-dried/')await page.waitForURL('**/tenant/raja-freeze-dried');
    for (const width of widths) {
      await page.setViewportSize({width,height:900});
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const state = await page.evaluate(() => ({
        overflow:document.documentElement.scrollWidth > innerWidth + 1,
        h1:document.querySelectorAll('h1').length,
        main:document.querySelectorAll('main').length,
        unnamedLinks:[...document.querySelectorAll('a[href]')].filter(a=>!a.textContent.trim()&&!a.getAttribute('aria-label')&&!a.querySelector('img[alt]')).length,
        brokenImages:[...document.images].filter(i=>i.getAttribute('src')&&i.complete&&!i.naturalWidth&&!i.src.startsWith('https://')).map(i=>i.src),
      }));
      current.widths.push({width,...state});
    }
    results.push(current);
    if (results.length % 40 === 0) console.log(`Inspected ${results.length}/${fixture.routes.length} pages`);
  }
  await page.close();
}));
const page = await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
await page.goto(base + 'directory/?q=emping%20jagung&sector=invalid&view=grid');
await page.waitForFunction(() => document.querySelector('[data-results]')?.dataset.view === 'grid');
assert.ok(await page.locator('[data-tenant-card]:visible').count() > 0, 'product search must find existing evidence');
assert.ok(!new URL(page.url()).searchParams.has('sector'), 'invalid sector must normalize');
await page.locator('[data-search]').fill('no-matching-tenant-12345');
await page.waitForFunction(() => !document.querySelector('[data-no-results]').hidden);
assert.equal(await page.locator('[data-tenant-card]:visible').count(),0);
await page.locator('[data-reset]').click();
assert.equal(await page.locator('[data-tenant-card]:visible').count(),151);
await page.keyboard.press('Tab');
await page.goto(base,{waitUntil:'domcontentloaded'});
await page.keyboard.press('Tab');
assert.equal(await page.locator('.skip-link').evaluate(el=>el===document.activeElement),true,'skip link is first keyboard stop');
await page.keyboard.press('Enter');
assert.equal(await page.locator('#main-content').evaluate(el=>el===document.activeElement),true,'skip link focuses content');
await page.goto(base+'tenant/lalisha-food/',{waitUntil:'domcontentloaded'});
const zoom=page.locator('.js-lightbox-trigger[tabindex="0"]').first();
await zoom.focus();
await page.keyboard.press('Enter');
assert.equal(await page.locator('dialog').evaluate(el=>el.open),true,'keyboard opens gallery');
await page.keyboard.press('Escape');
assert.equal(await page.locator('dialog').evaluate(el=>el.open),false,'Escape closes gallery');
const representatives=selected?[]:['','directory/','tenant/lika-snack/','tenant/lalisha-food/','tenant/roemah-koffie/','tenant/cma-cgm/','tenant/pemkot-tangsel/','tenant/toyota-motor-manufacturing-indonesia-pt-tmmin/'];
for (const route of representatives) {
  await page.goto(base + route,{waitUntil:'domcontentloaded'});
  for (const width of [390,1440]) {
    await page.setViewportSize({width,height:900});
    await page.evaluate(async () => { for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,15));}scrollTo(0,0); });
    await page.evaluate(() => Promise.race([Promise.all([...document.images].filter(i=>i.getAttribute('src')).map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,3000))]));
    await page.screenshot({path:path.join(output,`${route.replaceAll('/','-')||'home'}-${width}.png`),fullPage:true});
  }
}
await browser.close();
results.sort((a,b)=>a.path.localeCompare(b.path));
const failures=results.flatMap(r=>[...r.errors.map(e=>`${r.path}: ${e}`),...r.consoleErrors.map(e=>`${r.path}: ${e}`),...r.widths.filter(w=>w.overflow||w.unnamedLinks||w.brokenImages.length).map(w=>({path:r.path,...w}))]);
fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({pages:results.length,widths,checks:results.length*widths.length,failures,results},null,2));
console.log(`Browser QA: ${results.length} verified pages (${checkedThisRun} checked this run) × ${widths.length} widths; ${failures.length} failures`);
assert.equal(failures.length,0,JSON.stringify(failures.slice(0,12),null,2));

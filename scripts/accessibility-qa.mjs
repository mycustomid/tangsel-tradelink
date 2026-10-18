import fs from 'node:fs';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const browser=await chromium.launch({headless:true,executablePath:process.env.QA_CHROMIUM||undefined});
const base=process.env.QA_URL||'http://127.0.0.1:4321/tangsel-tradelink/';
const previous=process.env.QA_RETEST_FAILED?JSON.parse(fs.readFileSync('reports/browser/accessibility.json')):[];
const routes=process.env.QA_RETEST_FAILED?previous.filter(r=>r.violations.length).map(r=>r.route):process.env.QA_ALL?JSON.parse(fs.readFileSync('src/data/routes-baseline.lock.json')).routes.map(r=>r.path.slice(1)):['','directory/','tenant/lika-snack/','tenant/lalisha-food/','tenant/roemah-koffie/','tenant/cma-cgm/','tenant/pemkot-tangsel/','tenant/toyota-motor-manufacturing-indonesia-pt-tmmin/'];
const queue=[...routes],results=previous.filter(r=>!r.violations.length);
fs.mkdirSync('reports/browser',{recursive:true});
await Promise.all(Array.from({length:2},async()=>{
 const context=await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844}});const page=await context.newPage();
 while(queue.length){const route=queue.shift();await page.goto(base+route,{waitUntil:'domcontentloaded'});
 if(route==='tenant/buminaeenk-freeze-dried/')await page.waitForURL('**/tenant/raja-freeze-dried');
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 results.push({route,violations:audit.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:audit.incomplete.map(v=>v.id)});
 if(results.length%20===0)console.log(`Axe ${results.length}/${routes.length}`);
 }
 await context.close();
}));
await browser.close();results.sort((a,b)=>a.route.localeCompare(b.route));fs.writeFileSync('reports/browser/accessibility.json',JSON.stringify(results,null,2));
const count=results.reduce((n,r)=>n+r.violations.length,0);console.log(`Axe WCAG AA: ${results.length} verified pages (${routes.length} checked this run), ${count} violations`);for(const r of results)if(r.violations.length)console.log(r.route,r.violations.map(v=>v.id+':'+v.nodes.length).join(', '));if(count)process.exitCode=1;

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const baseline = JSON.parse(fs.readFileSync(path.join(root, 'src/data/routes-baseline.lock.json')));
const lock = JSON.parse(fs.readFileSync(path.join(root, 'src/data/tenant-permalinks.lock.json')));
const dist = path.join(root, 'dist');
const origin = 'https://mycustomid.github.io';
const decode = (value) => value.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&amp;/g, '&').replace(/&quot;/g, '"');
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));
const walk = (dir) => fs.readdirSync(dir, {withFileTypes:true}).flatMap((item) => item.isDirectory() ? walk(path.join(dir,item.name)) : [path.join(dir,item.name)]);
const pages = walk(dist).filter((file) => file.endsWith('.html'));
const outputRoutes = pages.map((file) => '/' + path.relative(dist,file).replaceAll('\\','/').replace(/index\.html$/, '')).sort();
assert.deepEqual(outputRoutes, baseline.routes.map((item) => item.path).sort(), 'Complete baseline route set changed');
const tenantRoutes = outputRoutes.filter((route) => /^\/tenant\/[^/]+\/$/.test(route)).map((route) => origin + baseline.base.replace(/\/$/,'') + route).sort();
assert.deepEqual(tenantRoutes, [...lock.urls].sort(), 'Built NFC routes differ from 154 locked URLs');
let links = 0;
const failures = [];
for (const item of baseline.routes) {
  const file = path.join(dist, item.path, 'index.html');
  const html = fs.readFileSync(file,'utf8');
  const tags = [...html.matchAll(/<(?:a|link|img|script)\b[^>]*>/g)].map(([tag]) => ({tag, a:attrs(tag)}));
  const canonical = tags.find(({a}) => a.rel === 'canonical')?.a.href;
  const slug = item.path.split('/')[2];
  const alias = baseline.legacyCanonicalTargets[slug];
  const expected = origin + baseline.base.replace(/\/$/,'') + (alias ? `/tenant/${alias}/` : item.path);
  if (canonical !== expected) failures.push(`${item.path}: canonical ${canonical} != ${expected}`);
  const external = new Set(tags.filter(({tag,a}) => tag.startsWith('<a ') && /^(https?:|mailto:|tel:)/.test(a.href || '')).map(({a}) => a.href));
  for (const href of item.externalLinks) if (!external.has(href)) failures.push(`${item.path}: published destination removed: ${href}`);
  for (const {tag,a} of tags) {
    const href = a.href || a.src;
    if (!href || /^(data:|mailto:|tel:|javascript:|#)/.test(href)) continue;
    const url = new URL(href, origin + baseline.base.replace(/\/$/,'') + item.path);
    if (url.origin !== origin) continue;
    if (url.pathname === baseline.base.slice(0,-1)) url.pathname += '/';
    if (!url.pathname.startsWith(baseline.base)) { failures.push(`${item.path}: escaped BASE_URL ${href}`); continue; }
    const relative = decodeURIComponent(url.pathname.slice(baseline.base.length));
    const target = path.join(dist, relative);
    if (![target, target + '.html', path.join(target,'index.html')].some((p) => fs.existsSync(p) && fs.statSync(p).isFile())) failures.push(`${item.path}: missing internal asset/link ${href}`);
    if (tag.startsWith('<a ')) links++;
  }
}
for (const [file, hash] of Object.entries(baseline.protectedAssets)) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'), hash, `Protected Lalisha asset changed: ${file}`);
if (failures.length) throw new Error(failures.join('\n'));
console.log(`Output verified: ${pages.length} pages, ${tenantRoutes.length} NFC routes, ${links} internal links, all published external destinations and ${Object.keys(baseline.protectedAssets).length} Lalisha assets preserved.`);

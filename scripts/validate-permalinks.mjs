import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const tenants = readJson('src/data/tenants.json');
const extras = readJson('src/data/tenants-extra.json');
const lock = readJson('src/data/tenant-permalinks.lock.json');
const legacySlugs = ['buminaeenk-freeze-dried', 'ninauka', 'shayfara'];
const dataSlugs = [...new Set([...tenants, ...extras].map((item) => item.slug).filter(Boolean))];
const extraSlugs = [...new Set(extras.map((item) => item.slug).filter(Boolean))];
const rawDataSlugs = [...tenants, ...extras].map((item) => item.slug).filter(Boolean);
const duplicateDataSlugs = rawDataSlugs.filter((slug, index) => rawDataSlugs.indexOf(slug) !== index);
if (duplicateDataSlugs.length) throw new Error(`Duplicate tenant slug(s): ${[...new Set(duplicateDataSlugs)].join(', ')}`);
for (const slug of rawDataSlugs) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Unsafe tenant slug: ${slug}`);
}
const expectedSlugs = [...new Set([...dataSlugs, ...legacySlugs])].sort();
const lockedSlugs = lock.urls.map((url) => {
  const prefix = 'https://mycustomid.github.io/tangsel-tradelink/tenant/';
  if (!url.startsWith(prefix) || !url.endsWith('/')) throw new Error(`Invalid locked tenant URL: ${url}`);
  return url.slice(prefix.length, -1);
}).sort();

if (lock.count !== lock.urls.length) throw new Error(`Permalink lock count mismatch: ${lock.count} vs ${lock.urls.length}`);
if (JSON.stringify(expectedSlugs) !== JSON.stringify(lockedSlugs)) {
  const missing = expectedSlugs.filter((slug) => !lockedSlugs.includes(slug));
  const unexpected = lockedSlugs.filter((slug) => !expectedSlugs.includes(slug));
  throw new Error(`Tenant permalink drift detected. Missing: ${missing.join(', ') || 'none'}; unexpected: ${unexpected.join(', ') || 'none'}`);
}
for (const slug of extraSlugs) {
  const route = path.join(root, 'src/pages/tenant', `${slug}.astro`);
  if (!fs.existsSync(route)) throw new Error(`Dedicated tenant route missing: /tenant/${slug}/`);
}
for (const slug of legacySlugs) {
  const route = path.join(root, 'src/pages/tenant', `${slug}.astro`);
  if (!fs.existsSync(route)) throw new Error(`Legacy NFC route missing: /tenant/${slug}/`);
}
const dynamicRoute = path.join(root,'src/pages/tenant/[slug].astro');
if (!fs.existsSync(dynamicRoute)) throw new Error('Dynamic tenant route missing');
const dynamicSource = fs.readFileSync(dynamicRoute, 'utf8');
if (!/\(tenants as Tenant\[\]\)\.map/.test(dynamicSource)) throw new Error('Dynamic route no longer enumerates the primary tenant dataset');
console.log(`Permalink lock OK: ${lock.urls.length} tenant URLs protected.`);

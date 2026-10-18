import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const tenants = JSON.parse(read('src/data/tenants.json'));
const extras = JSON.parse(read('src/data/tenants-extra.json'));
const lock = JSON.parse(read('src/data/tenant-permalinks.lock.json'));
const expected = [...new Set([...tenants,...extras].map(t=>t.slug).filter(Boolean).concat(['buminaeenk-freeze-dried','ninauka','shayfara']))]
  .sort().map(slug=>`https://mycustomid.github.io/tangsel-tradelink/tenant/${slug}/`);

test('all published tenant permalinks are immutable', () => {
  assert.equal(lock.count, expected.length);
  assert.deepEqual(lock.urls, expected);
});

test('homepage and directory never hard-code stale tenant totals', () => {
  const source = read('src/pages/index.astro') + read('src/pages/directory.astro');
  assert.doesNotMatch(source, /141 Tenant|141 tenant|141 profil/);
});

test('directory keeps exact tenant slug route shape', () => {
  const source = read('src/pages/directory.astro');
  assert.match(source, /tenant\/\$\{tenant\.slug\}\//);
});

test('discovery page exposes search, sector, hall and view controls', () => {
  const source = read('src/pages/directory.astro');
  assert.match(source, /data-search/);
  assert.match(source, /data-cat-filter/);
  assert.match(source, /data-hall-filter/);
  assert.match(source, /data-view-toggle/);
});

test('homepage uses dynamic tenant total and a single primary directory action', () => {
  const source = read('src/pages/index.astro');
  assert.match(source, /tenantList\.length/);
  assert.match(source, /class="hero-primary"/);
});

test('production build script includes immutable permalink validation', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.match(pkg.scripts.build, /validate:permalinks/);
  assert.equal(pkg.scripts['validate:permalinks'], 'node scripts/validate-permalinks.mjs');
});

test('every extra tenant has a dedicated static route', () => {
  for (const tenant of extras) {
    assert.ok(fs.existsSync(path.join(root, 'src/pages/tenant', `${tenant.slug}.astro`)), `missing dedicated route for ${tenant.slug}`);
  }
});

test('tenant navigation labels point to the actual directory route', () => {
  const adaptive = read('src/components/AdaptiveTenantShowcase.astro');
  const smart = read('src/components/SmartNfcShowcase.astro');
  assert.match(adaptive, /directoryUrl/);
  assert.match(smart, /directoryUrl/);
});

test('Lika canonical preserves the exact NFC permalink shape', () => {
  const source = read('src/pages/tenant/lika-snack.astro');
  assert.match(source, /canonical=\{`\$\{baseUrl\}tenant\/\$\{tenant\.slug\}\/`\}/);
});

test('patch apply helpers include the validator scripts directory', () => {
  assert.match(read('apply-patch.sh'), /public scripts src tests/);
  assert.match(read('apply-patch.ps1'), /'public','scripts','src','tests'/);
});

test('permalink validator guards dedicated extra routes and duplicate slugs', () => {
  const source = read('scripts/validate-permalinks.mjs');
  assert.match(source, /Dedicated tenant route missing/);
  assert.match(source, /Duplicate tenant slug/);
  assert.match(source, /Unsafe tenant slug/);
});

test('discovery controls keep mobile-friendly touch targets', () => {
  const css = read('src/styles/discovery-editorial.css');
  assert.match(css, /\.view-toggle button\{min-width:48px;min-height:48px/);
  assert.match(css, /\.reset-filter-btn\{min-height:48px/);
  assert.match(css, /@media\(max-width:680px\)\{\.chip\{min-height:48px\}/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), 'utf8');
const readJson = (path) => JSON.parse(read(path));
const extras = readJson('src/data/tenants-extra.json');
const component = read('src/components/RichTenantShowcase.astro');
const specs = [
  { slug:'my-aicustom', palette:{bg:'#08111d',accent:'#36d6ff',surface:'#0e1a29'}, experience:'precision-ai' },
  { slug:'raja-freeze-dried', palette:{bg:'#0f291e',accent:'#10b981',surface:'#0a1a13'}, experience:'agro-lab' },
  { slug:'bumina-eenk', palette:{bg:'#0c231a',accent:'#10b981',surface:'#143327'}, experience:'hospitality-retreat' },
  { slug:'samara-from-home', palette:{bg:'#faf7f2',accent:'#c2593f',surface:'#4a5d3f'}, experience:'culinary-atelier' },
];

test('four canonical showcases are registered once and use the premium engine', () => {
  assert.equal(extras.some((t) => t.slug === 'buminaeenk-freeze-dried'), false);
  for (const { slug } of specs) {
    assert.equal(extras.filter((t) => t.slug === slug).length, 1, `${slug}: expected exactly one directory registration`);
    const page = read(`src/pages/tenant/${slug}.astro`);
    assert.match(page, /BaseLayout/);
    assert.match(page, /(EnhancedRichTenantShowcase|SmartNfcShowcase)/);
  }
});

test('showcase configs have distinct palettes, complete editorial data and verification provenance', () => {
  for (const { slug, palette } of specs) {
    const config = readJson(`src/data/showcases/${slug}.json`);
    assert.deepEqual({bg:config.palette.bg,accent:config.palette.accent,surface:config.palette.surface}, palette);
    assert.ok(config.story?.title && config.story?.body);
    assert.ok(config.stats.length >= 4 && config.highlights.length >= 4 && (config.gallery?.length >= 2) && config.actions.length >= 3);
    assert.ok(config.heroImage.startsWith('/brand/'));
    assert.ok(config.verification?.checkedAt === '2026-10-13');
    assert.ok(config.verification?.sources?.length >= 1);
  }
});

test('shared component exposes distinct experience modes and source ledger', () => {
  for (const { slug, experience } of specs) {
    const label = readJson(`src/data/showcases/${slug}.json`).brandLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    assert.match(component, new RegExp(`'${label}':\\s*\\{\\s*mode: '${experience}'`));
  }
  assert.match(component, /source-ledger/);
  assert.match(component, /fetchpriority="high"/);
  assert.match(component, /fetchpriority="low"/);
});

test('high-risk claims are not promoted as TradeLink guarantees', () => {
  const raja = JSON.stringify(readJson('src/data/showcases/raja-freeze-dried.json'));
  assert.doesNotMatch(raja, /98%|95%|25\s*(th|tahun)/i);
  const bumina = JSON.stringify(readJson('src/data/showcases/bumina-eenk.json'));
  assert.doesNotMatch(bumina, /4\.9★|4\.9\/5/i);
});

test('Samara labels marketplace routes conservatively', () => {
  const samara = readJson('src/data/showcases/samara-from-home.json');
  assert.ok(samara.actions.some((a) => a.key === 'shopee'));
  assert.ok(samara.actions.some((a) => a.key === 'tokopedia'));
});

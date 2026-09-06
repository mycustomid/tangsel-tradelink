import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const showcaseSlugs = [
  'sanfood-internasional',
  'tempe-azaki',
  'toyota-motor-manufacturing-indonesia-pt-tmmin',
  'tatalogam-lestari-pt',
  'aroma-prima-livindo-pt-morris-perfume',
  'dragon-prima-farma',
  'clean-matic',
  'sinar-mas-land',
  'himki',
];

function readJson(path) {
  return JSON.parse(fs.readFileSync(new URL(path, import.meta.url), 'utf8'));
}

const showcaseConfigs = showcaseSlugs.map((slug) => ({
  slug,
  config: readJson(`../src/data/showcases/${slug}.json`),
}));

const roemah = readJson('../src/data/flagships/roemah-koffie.json');
const richComponent = fs.readFileSync(new URL('../src/components/RichTenantShowcase.astro', import.meta.url), 'utf8');
const brandIcon = fs.readFileSync(new URL('../src/components/BrandIcon.astro', import.meta.url), 'utf8');

test('rich showcases avoid screenshot-proxy media and define real brand identity', () => {
  for (const { slug, config } of showcaseConfigs) {
    assert.ok(config.logoDomain, `${slug}: expected logoDomain`);
    assert.ok(config.story?.title, `${slug}: expected story.title`);
    assert.ok(config.story?.body, `${slug}: expected story.body`);
    assert.ok(Array.isArray(config.stats) && config.stats.length >= 3, `${slug}: expected at least 3 stats`);
    assert.ok(Array.isArray(config.gallery) && config.gallery.length >= 3, `${slug}: expected at least 3 gallery items`);
    assert.ok(Array.isArray(config.actions) && config.actions.length >= 3, `${slug}: expected at least 3 actions`);

    const serialized = JSON.stringify(config);
    assert.equal(serialized.includes('image.thum.io'), false, `${slug}: must not depend on thum.io screenshots`);
  }
});

test('rich showcase component has designed visual fallbacks instead of blank media', () => {
  assert.match(richComponent, /visual-fallback/);
  assert.match(richComponent, /onerror=/);
  assert.match(richComponent, /stats/);
  assert.match(richComponent, /story/);
});

test('brand icons do not hotlink maps or marketplace logos from Wikimedia', () => {
  assert.equal(brandIcon.includes('upload.wikimedia.org'), false);
  assert.match(brandIcon, /tokopedia/);
  assert.match(brandIcon, /shopee/);
  assert.match(brandIcon, /maps/);
});

test('Roemah Koffie avoids expiring media URLs and external marketplace logo images', () => {
  const serialized = JSON.stringify(roemah);
  assert.equal(serialized.includes('x-expires='), false);
  assert.equal(serialized.includes('upload.wikimedia.org'), false);
  assert.ok(roemah.menus.every((item) => item.image && item.imageAlt));
  assert.ok(roemah.locationGallery.every((item) => item.image && item.caption));
});

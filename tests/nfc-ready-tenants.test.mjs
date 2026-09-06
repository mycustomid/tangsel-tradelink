import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ready = [
  ['roemah-koffie', '../src/data/flagships/roemah-koffie.json'],
  ['sanfood-internasional', '../src/data/showcases/sanfood-internasional.json'],
  ['tempe-azaki', '../src/data/showcases/tempe-azaki.json'],
  ['toyota-motor-manufacturing-indonesia-pt-tmmin', '../src/data/showcases/toyota-motor-manufacturing-indonesia-pt-tmmin.json'],
  ['tatalogam-lestari-pt', '../src/data/showcases/tatalogam-lestari-pt.json'],
  ['aroma-prima-livindo-pt-morris-perfume', '../src/data/showcases/aroma-prima-livindo-pt-morris-perfume.json'],
  ['dragon-prima-farma', '../src/data/showcases/dragon-prima-farma.json'],
  ['clean-matic', '../src/data/showcases/clean-matic.json'],
  ['sinar-mas-land', '../src/data/showcases/sinar-mas-land.json'],
  ['himki', '../src/data/showcases/himki.json'],
];

for (const [slug, path] of ready) {
  test(`${slug} has an NFC-ready visual profile`, () => {
    const config = JSON.parse(fs.readFileSync(new URL(path, import.meta.url), 'utf8'));
    assert.ok(config.tagline?.length > 8, 'tagline required');
    assert.ok(/^https:\/\//.test(config.heroImage || ''), 'remote hero image required');
    assert.ok(Array.isArray(config.highlights) && config.highlights.length >= 3, 'at least 3 highlights required');
    assert.ok(Array.isArray(config.actions) && config.actions.length >= 2, 'at least 2 official actions required');
    assert.ok(Array.isArray(config.gallery) && config.gallery.length >= 2, 'at least 2 visual gallery items required');
    assert.equal(config.actions.some((action) => /linktr\.ee/i.test(action.url || '')), false, 'Linktree must not be visitor-facing');
  });
}

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const config = JSON.parse(fs.readFileSync(new URL('../src/data/showcases/rumah-batik-setu.json', import.meta.url), 'utf8'));
const page = fs.readFileSync(new URL('../src/pages/tenant/rumah-batik-setu.astro', import.meta.url), 'utf8');

test('Rumah Batik Setu has a premium direct route with supplied Instagram and Maps links', () => {
  assert.equal(config.actions[0].url, 'https://www.instagram.com/rumahbatiksetu/');
  assert.equal(config.actions[1].url, 'https://share.google/kzvdtx47TCfX9K5Tu');
  assert.ok(config.gallery.length >= 3);
  assert.match(page, /EnhancedRichTenantShowcase/);
  assert.match(page, /rumah-batik-setu-wordmark\.svg/);
});

test('Rumah Batik Setu visuals are local and do not claim to be official product photography', () => {
  for (const file of ['rumah-batik-setu-wordmark.svg','rumah-batik-setu-hero.svg','rumah-batik-setu-motif.svg','rumah-batik-setu-toska.svg','rumah-batik-setu-craft.svg']) {
    assert.ok(fs.existsSync(new URL(`../public/brand/${file}`, import.meta.url)), `missing ${file}`);
  }
  assert.ok(config.gallery.every((item) => /not an official|Editorial/i.test(item.caption || '')));
});
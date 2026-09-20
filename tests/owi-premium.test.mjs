import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const config = JSON.parse(fs.readFileSync(new URL('../src/data/showcases/owi-rajut.json', import.meta.url), 'utf8'));
const page = fs.readFileSync(new URL('../src/pages/tenant/[slug].astro', import.meta.url), 'utf8');

test('Owi Rajut uses a premium editorial showcase instead of the generic tenant template', () => {
  assert.equal(config.brandLabel, 'OWI RAJUT');
  assert.match(config.heroImage, /owi-rajut-hero\.svg$/);
  assert.equal(config.actions[0].url, 'https://www.instagram.com/owi.rajut/');
  assert.equal(config.actions[1].url, 'https://share.google/Ene44rW2OTbtqHg39');
  assert.ok(config.gallery.length >= 3);
  assert.match(page, /import owiRajutShowcase/);
  assert.match(page, /'owi-rajut': owiRajutShowcase/);
});

test('Owi editorial visuals are local assets and explicitly avoid fake product claims', () => {
  for (const file of ['owi-rajut-hero.svg','owi-rajut-texture.svg','owi-rajut-yarn.svg']) {
    assert.ok(fs.existsSync(new URL(`../public/brand/${file}`, import.meta.url)), `missing ${file}`);
  }
  assert.ok(config.gallery.every((item) => /not (a product photograph|an official product image)|TradeLink editorial/i.test(item.caption || '')));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const extras = JSON.parse(fs.readFileSync(new URL('../src/data/tenants-extra.json', import.meta.url), 'utf8'));
const config = JSON.parse(fs.readFileSync(new URL('../src/data/showcases/sepatu-wanita-naa.json', import.meta.url), 'utf8'));
const page = fs.readFileSync(new URL('../src/pages/tenant/sepatu-wanita-naa.astro', import.meta.url), 'utf8');

test('Sepatu Wanita NAA is listed with client supplied social, WhatsApp and Maps routes', () => {
  assert.ok(extras.some((tenant) => tenant.slug === 'sepatu-wanita-naa'));
  const actions = Object.fromEntries(config.actions.map((a) => [a.label, a.url]));
  assert.equal(actions['Instagram · @sepatu_wanita_naa'], 'https://www.instagram.com/sepatu_wanita_naa/');
  assert.equal(actions['WhatsApp · NAA Shoes'], 'https://wa.me/message/63AO3V4U5XLVB1');
  assert.equal(actions['Google Maps · NAA Shoes'], 'https://maps.app.goo.gl/bdwuTbR7Efwaiudf7?g_st=awb');
  assert.match(page, /EnhancedRichTenantShowcase/);
  assert.equal(page.includes('Griya'), false, 'private home address should not be rendered as text');
});

test('NAA premium visual assets are local and the gallery has real brand-specific directions', () => {
  for (const file of ['naa-shoes-wordmark.svg','naa-shoes-hero.svg','naa-shoes-classic.svg','naa-shoes-ecoprint.svg','naa-shoes-request.svg']) {
    assert.ok(fs.existsSync(new URL(`../public/brand/${file}`, import.meta.url)), `missing ${file}`);
  }
  const photos = [
    'naa-shoes-classic-mules.jpeg',
    'naa-shoes-classic-flats-mocha.jpeg',
    'naa-shoes-ecoprint-flats.jpeg',
    'naa-shoes-ecoprint-heels-earthy.jpeg',
    'naa-shoes-classic-flats-black.jpeg',
    'naa-shoes-bestseller-collection.jpeg',
    'naa-shoes-brand-story.jpeg'
  ];
  for (const photo of photos) {
    assert.ok(fs.existsSync(new URL(`../public/brand/naa-shoes/${photo}`, import.meta.url)), `missing photo ${photo}`);
  }
  assert.ok(config.gallery.length >= 3);
  assert.match(config.story.body, /home industry/i);
  assert.ok(config.highlights.some((item) => /request/i.test(item.title + item.body)));
});
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
  assert.equal(actions['Threads · @sepatu_wanita_naa'], 'https://www.threads.com/@sepatu_wanita_naa');
  assert.equal(actions['WhatsApp · NAA Shoes'], 'https://wa.me/message/63AO3V4U5XLVB1');
  assert.equal(actions['Google Maps · NAA Shoes'], 'https://maps.app.goo.gl/bdwuTbR7Efwaiudf7?g_st=awb');
  assert.match(page, /EnhancedRichTenantShowcase/);
  assert.equal(page.includes('Griya'), false, 'private home address should not be rendered as text');
});

test('NAA premium visual assets use authentic client photography', () => {
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
  assert.ok(config.gallery.length >= 7);
  assert.match(config.story.body, /home industry/i);
  assert.ok(config.highlights.some((item) => /request/i.test(item.title + item.body)));
});

test('NAA copy avoids unsupported material, safety, sustainability and performance claims', () => {
  const text = JSON.stringify(config).toLowerCase();
  for (const unsupported of ['anti-slip', 'tanpa limbah', 'ramah lingkungan', 'natural botanical dye', 'bahan berkualitas tinggi', 'pengiriman cepat']) {
    assert.equal(text.includes(unsupported), false, `unsupported claim leaked into profile: ${unsupported}`);
  }
  assert.ok(fs.existsSync(new URL('../public/icons/brands/threads.svg', import.meta.url)), 'Threads icon must be stored locally');
});
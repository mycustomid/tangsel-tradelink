import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const extras = JSON.parse(fs.readFileSync(new URL('../src/data/tenants-extra.json', import.meta.url), 'utf8'));
const config = JSON.parse(fs.readFileSync(new URL('../src/data/showcases/vietrade.json', import.meta.url), 'utf8'));
const page = fs.readFileSync(new URL('../src/pages/tenant/vietrade.astro', import.meta.url), 'utf8');

test('VIETRADE is registered in tenants-extra and configured with authentic state credentials', () => {
  assert.ok(extras.some((t) => t.slug === 'vietrade'));
  const actions = Object.fromEntries(config.actions.map((a) => [a.key, a.url]));
  assert.equal(actions['website'], 'http://www.vietrade.gov.vn');
  assert.equal(actions['zalo'], 'https://zalo.me/84828807986');
  assert.equal(actions['whatsapp'], 'https://wa.me/84828807986');
  assert.equal(actions['facebook'], 'https://www.facebook.com/share/1EcwSiGKGU/');
  assert.equal(actions['email'], 'mailto:tamtrang.vietrade@gmail.com');
  assert.match(actions['maps'], /L%C3%BD\+Th%C6%B0%E1%BB%9Dng\+Ki%E1%BB%87t/);
  assert.match(page, /SmartNfcShowcase/);
  assert.match(page, /BaseLayout/);
});

test('VIETRADE visual assets exist on disk and meet high-resolution mobile standards', () => {
  const assets = [
    'vietrade-hero.webp',
    'vietrade-card.webp',
    'vietrade-card-front.webp',
    'vietrade-logo.webp',
    'vietrade-hq-hanoi.webp',
    'vietnam-value-brand.webp',
    'vietnam-expo-matchmaking.webp',
    'vietrade-digital-sourcing.webp'
  ];
  for (const asset of assets) {
    assert.ok(fs.existsSync(new URL(`../public/brand/vietrade/${asset}`, import.meta.url)), `missing asset ${asset}`);
  }
  assert.equal(config.heroImage, '/brand/vietrade/vietrade-hero.webp');
  assert.equal(config.gallery.length, 5);
  assert.equal(config.verification?.status, 'verified-authoritative');
});

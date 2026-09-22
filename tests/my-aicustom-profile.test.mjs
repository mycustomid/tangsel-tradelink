import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const extras = JSON.parse(fs.readFileSync(new URL('../src/data/tenants-extra.json', import.meta.url), 'utf8'));
const config = JSON.parse(fs.readFileSync(new URL('../src/data/showcases/my-aicustom.json', import.meta.url), 'utf8'));
const page = fs.readFileSync(new URL('../src/pages/tenant/my-aicustom.astro', import.meta.url), 'utf8');

test('MY-AICUSTOM is listed as a premium Tangsel tenant with official channels', () => {
  assert.ok(extras.some((tenant) => tenant.slug === 'my-aicustom'));
  const actions = Object.fromEntries(config.actions.map((a) => [a.label, a.url]));
  assert.equal(actions['Official Website · my-aicustom.com'], 'https://my-aicustom.com/');
  assert.equal(actions['Instagram · @myaicustom'], 'https://www.instagram.com/myaicustom/');
  assert.equal(actions['WhatsApp · Konsultasi AI'], 'https://wa.me/6282121292938');
  assert.equal(actions['Email · myaicustom@gmail.com'], 'mailto:myaicustom@gmail.com');
  assert.match(page, /EnhancedRichTenantShowcase/);
});

test('MY-AICUSTOM premium visuals are stored locally in the repository', () => {
  for (const file of ['my-aicustom-hero.svg','my-aicustom-control-plane.svg','my-aicustom-delivery.svg','my-aicustom-stack.svg']) {
    assert.ok(fs.existsSync(new URL(`../public/brand/${file}`, import.meta.url)), `missing ${file}`);
  }
  assert.ok(config.gallery.length >= 3);
});
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), 'utf8');
const readJson = (path) => JSON.parse(read(path));

const tenants = readJson('src/data/tenants-extra.json');
const component = read('src/components/RichTenantShowcase.astro');

const specs = [
  {
    slug: 'my-aicustom',
    palette: { bg: '#08111d', accent: '#36d6ff', surface: '#0e1a29' },
    experience: 'precision-ai',
  },
  {
    slug: 'buminaeenk-freeze-dried',
    palette: { bg: '#0f291e', accent: '#10b981', surface: '#0a1a13' },
    experience: 'agro-lab',
  },
  {
    slug: 'raja-freeze-dried',
    palette: { bg: '#0f291e', accent: '#10b981', surface: '#0a1a13' },
    experience: 'agro-lab',
  },
  {
    slug: 'bumina-eenk',
    palette: { bg: '#0c231a', accent: '#10b981', surface: '#143327' },
    experience: 'hospitality-retreat',
  },
  {
    slug: 'samara-from-home',
    palette: { bg: '#faf7f2', accent: '#c2593f', surface: '#4a5d3f' },
    experience: 'culinary-atelier',
  },
];

test('three SSS tenant showcases are registered and use the premium one-page engine', () => {
  for (const { slug } of specs) {
    assert.ok(tenants.some((tenant) => tenant.slug === slug), `${slug}: missing tenants-extra registration`);
    const page = read(`src/pages/tenant/${slug}.astro`);
    assert.match(page, /BaseLayout/);
    assert.match(page, /EnhancedRichTenantShowcase/);
  }
});

test('showcase configs preserve the requested art direction and complete storytelling data', () => {
  for (const { slug, palette } of specs) {
    const config = readJson(`src/data/showcases/${slug}.json`);
    assert.deepEqual(
      { bg: config.palette.bg, accent: config.palette.accent, surface: config.palette.surface },
      palette,
    );
    assert.ok(config.story?.title && config.story?.body);
    assert.ok(config.stats.length >= 4);
    assert.ok(config.highlights.length >= 4);
    assert.ok(config.gallery.length >= 3);
    assert.ok(config.actions.length >= 3);
    assert.ok(config.heroImage.startsWith('/brand/'), `${slug}: hero must be a local brand asset`);
  }
});

test('tenant-specific modes and local editorial assets are present', () => {
  for (const { slug, experience } of specs) {
    const brandLabel = readJson(`src/data/showcases/${slug}.json`).brandLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    assert.match(component, new RegExp(`'${brandLabel}':\\s*\\{\\s*mode: '${experience}'`));
  }

  for (const asset of [
    'public/brand/raja-freeze-dried-hero.jpg',
    'public/brand/raja-freeze-dried-process.svg',
    'public/brand/raja-freeze-dried-export.svg',
    'public/brand/samara-from-home-hero.svg',
    'public/brand/samara-from-home-pantry.svg',
    'public/brand/samara-from-home-foodservice.svg',
  ]) {
    assert.ok(fs.existsSync(new URL(asset, root)), `missing ${asset}`);
  }
});

test('new editorial SVG assets contain only valid XML entities', () => {
  for (const asset of [
    'public/brand/raja-freeze-dried-process.svg',
    'public/brand/raja-freeze-dried-export.svg',
    'public/brand/samara-from-home-hero.svg',
    'public/brand/samara-from-home-pantry.svg',
    'public/brand/samara-from-home-foodservice.svg',
  ]) {
    assert.doesNotMatch(read(asset), /&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[\da-f]+;)/i, `${asset}: invalid XML entity`);
  }
});

test('official contact routes are used without inventing a Samara phone number', () => {
  const raja = readJson('src/data/showcases/buminaeenk-freeze-dried.json');
  const samara = readJson('src/data/showcases/samara-from-home.json');
  assert.ok(raja.actions.some((action) => action.url === 'https://wa.me/6282124985339'));
  assert.ok(raja.actions.some((action) => action.url === 'https://rajafreezdriedfood.com/'));
  assert.ok(samara.actions.some((action) => action.url === 'https://www.instagram.com/samara.fromhome/'));
  assert.equal(samara.actions.some((action) => /wa\.me/.test(action.url)), false);
});

test('local development serves the brief URLs at root without changing the production base', () => {
  const astroConfig = read('astro.config.mjs');
  assert.match(astroConfig, /isDev/);
  assert.match(astroConfig, /base:\s*isDev\s*\?\s*['"]\/['"]\s*:\s*['"]\/tangsel-tradelink['"]/);
});

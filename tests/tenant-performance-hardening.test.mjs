import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), 'utf8');
const json = (path) => JSON.parse(read(path));
const stat = (path) => fs.statSync(new URL(path, root));

test('shared premium renderer prioritizes only the hero and lazily loads gallery media', () => {
  const component = read('src/components/RichTenantShowcase.astro');
  assert.match(component, /loading="eager" fetchpriority="high"/);
  assert.match(component, /loading="lazy" decoding="async" fetchpriority="low"/);
  assert.match(component, /requestAnimationFrame\(updateProgress\)/);
  assert.match(component, /content-visibility:auto/);
  assert.match(component, /prefers-reduced-data:reduce/);
});

test('Roemah Koffie uses the same high/low priority discipline and throttled scroll work', () => {
  const component = read('src/components/RoemahKoffieFlagship.astro');
  assert.match(component, /fetchpriority="high"/);
  assert.match(component, /fetchpriority="low"/);
  assert.match(component, /requestAnimationFrame\(update\)/);
  assert.match(component, /content-visibility:auto/);
});

test('generic tenant logos have stable intrinsic dimensions', () => {
  const header = read('src/components/TenantHeader.astro');
  assert.match(header, /width="76" height="76"/);
  assert.match(header, /decoding="async"/);
});

test('directory cards skip offscreen painting', () => {
  const index = read('src/styles/discovery-editorial.css');
  assert.match(index, /content-visibility:\s*auto/);
  assert.match(index, /contain-intrinsic-size:\s*120px/);
});

test('oversized Raja product PNG is no longer referenced by either Raja config', () => {
  for (const slug of ['raja-freeze-dried','buminaeenk-freeze-dried']) {
    const data = json(`src/data/showcases/${slug}.json`);
    const serialized = JSON.stringify(data);
    assert.doesNotMatch(serialized, /raja-freeze-dried-product\.png/);
    assert.equal(data.heroImage, '/brand/raja-freeze-dried-hero.webp');
    assert.ok(data.gallery.length >= 3);
  }
});

test('optimized local hero assets stay under public-mobile budgets', () => {
  assert.ok(stat('public/brand/raja-freeze-dried-hero.webp').size < 300 * 1024, 'Raja hero exceeds 300KB');
  assert.ok(stat('public/brand/samara-real-1.webp').size < 80 * 1024, 'Samara hero exceeds 80KB');
  const samara = json('src/data/showcases/samara-from-home.json');
  assert.equal(samara.heroImage, '/brand/samara-real-1.webp');
});

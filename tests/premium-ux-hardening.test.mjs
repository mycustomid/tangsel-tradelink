import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const ROOT = new URL('../', import.meta.url);
const read = (rel) => readFile(new URL(rel, ROOT), 'utf8');

test('shared premium wrapper prioritizes one hero action and provides a mobile thumb-zone CTA', async () => {
  const enhanced = await read('src/components/EnhancedRichTenantShowcase.astro');
  assert.match(enhanced, /const primaryAction = enhancedConfig\.actions\?\.\[0\]/);
  assert.match(enhanced, /class="premium-mobile-cta"/);
  assert.match(enhanced, /data-name-length/);
});

test('Roemah Koffie receives the same mobile action hierarchy without changing its bespoke page', async () => {
  const route = await read('src/pages/tenant/[slug].astro');
  assert.match(route, /roemahPrimaryAction/);
  assert.match(route, /class="premium-mobile-cta roemah-mobile-cta"/);
});

test('premium UX layer enforces touch targets, safe areas, one hero CTA, and long-name protection', async () => {
  const css = await read('src/styles/premium-tenant-ux.css');
  assert.match(css, /min-height:48px/);
  assert.match(css, /env\(safe-area-inset-bottom/);
  assert.match(css, /hero-actions a:not\(:first-child\)/);
  assert.match(css, /data-name-length="long"/);
  assert.match(css, /data-name-length="xlong"/);
  assert.match(css, /\.rk-onepage \.actions a:not\(:first-child\)/);
});

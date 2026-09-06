import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const rich = fs.readFileSync(new URL('../src/components/RichTenantShowcase.astro', import.meta.url), 'utf8');
const roemah = fs.readFileSync(new URL('../src/components/RoemahKoffieFlagship.astro', import.meta.url), 'utf8');
const slug = fs.readFileSync(new URL('../src/pages/tenant/[slug].astro', import.meta.url), 'utf8');

const visitorFacing = `${rich}\n${roemah}`;

test('premium tenant pages do not expose platform navigation or directory branding', () => {
  assert.doesNotMatch(visitorFacing, /Tangsel TradeLink/i);
  assert.doesNotMatch(visitorFacing, /Tenant directory/i);
  assert.doesNotMatch(visitorFacing, /Powered by/i);
});

test('premium tenant pages behave as scroll-led one-page stories', () => {
  assert.match(rich, /data-chapter=/);
  assert.match(rich, /scroll-progress/);
  assert.match(rich, /IntersectionObserver/);
  assert.match(rich, /100svh/);
  assert.match(roemah, /data-chapter=/);
  assert.match(roemah, /scroll-progress/);
});

test('premium routes use brand-only document titles and tenant-specific favicons', () => {
  assert.doesNotMatch(slug, /\$\{tenant\.name\} — Tangsel TradeLink/);
  assert.match(slug, /favicon=/);
  assert.match(slug, /makeMonogramFavicon/);
});

test('Toyota receives a deterministic favicon fallback instead of relying on a remote favicon proxy', () => {
  assert.match(slug, /toyota-motor-manufacturing-indonesia-pt-tmmin/);
  assert.match(slug, /makeMonogramFavicon/);
  assert.doesNotMatch(slug, /google\.com\/s2\/favicons/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const rich = fs.readFileSync(new URL('../src/components/RichTenantShowcase.astro', import.meta.url), 'utf8');
const roemah = fs.readFileSync(new URL('../src/components/RoemahKoffieFlagship.astro', import.meta.url), 'utf8');
const base = fs.readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const mobile = fs.readFileSync(new URL('../src/styles/mobile-nfc.css', import.meta.url), 'utf8');
const combined = `${rich}\n${roemah}`;

test('mobile viewport supports edge-to-edge safe areas without disabling zoom', () => {
  assert.match(base, /viewport-fit=cover/);
  assert.doesNotMatch(base, /user-scalable\s*=\s*no|maximum-scale\s*=\s*1/i);
  assert.match(mobile, /env\(safe-area-inset-bottom/);
  assert.match(mobile, /env\(safe-area-inset-top/);
});

test('mobile primary actions move into a persistent thumb zone with large targets', () => {
  assert.match(mobile, /\.premium-onepage \.hero-actions/);
  assert.match(mobile, /\.rk-onepage \.actions/);
  assert.match(mobile, /position:\s*fixed/);
  assert.match(mobile, /min-height:\s*48px/);
});

test('mobile experience keeps a full first fold and swipeable proof/media strips', () => {
  assert.match(combined, /100svh/);
  assert.match(mobile, /scroll-snap-type:\s*x\s+proximity/);
  assert.match(mobile, /overflow-x:\s*auto/);
});

test('below-the-fold imagery remains lazy-loaded', () => {
  assert.match(rich, /loading="lazy"/);
  assert.match(roemah, /loading="lazy"/);
});

test('motion respects reduced-motion preference', () => {
  assert.match(combined, /prefers-reduced-motion:\s*reduce/);
  assert.match(mobile, /prefers-reduced-motion:\s*reduce/);
});

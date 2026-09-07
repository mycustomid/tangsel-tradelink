import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const rich = fs.readFileSync(new URL('../src/components/RichTenantShowcase.astro', import.meta.url), 'utf8');
const roemah = fs.readFileSync(new URL('../src/components/RoemahKoffieFlagship.astro', import.meta.url), 'utf8');
const base = fs.readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');

const combined = `${rich}\n${roemah}`;

test('mobile viewport supports edge-to-edge safe areas without disabling zoom', () => {
  assert.match(base, /viewport-fit=cover/);
  assert.doesNotMatch(base, /user-scalable\s*=\s*no|maximum-scale\s*=\s*1/i);
  assert.match(combined, /env\(safe-area-inset-bottom/);
});

test('mobile primary actions use thumb-friendly persistent CTA treatment', () => {
  assert.match(combined, /mobile-cta/);
  assert.match(combined, /min-height:\s*48px/);
  assert.match(combined, /position:\s*fixed/);
});

test('mobile experience has intentional first-fold and horizontal proof treatment', () => {
  assert.match(combined, /100svh/);
  assert.match(combined, /scroll-snap-type:\s*x\s+proximity/);
  assert.match(combined, /overflow-x:\s*auto/);
});

test('mobile media is lazy and responsive rather than desktop-only', () => {
  assert.match(combined, /loading="lazy"/);
  assert.match(combined, /sizes=/);
});

test('motion respects reduced-motion preference', () => {
  assert.match(combined, /prefers-reduced-motion:\s*reduce/);
});

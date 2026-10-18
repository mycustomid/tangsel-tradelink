import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { TENANT_ART_DIRECTIONS } from '../src/data/tenant-art-directions.mjs';

const root = process.cwd();
const lock = JSON.parse(fs.readFileSync(path.join(root,'src/data/tenant-permalinks.lock.json'),'utf8'));
const publishedSlugs = lock.urls.map((url) => url.replace(/\/$/,'').split('/').pop());

test('every published tenant URL has an explicit art-direction fingerprint', () => {
  assert.equal(publishedSlugs.length, lock.count);
  for (const slug of publishedSlugs) {
    const direction = TENANT_ART_DIRECTIONS[slug];
    assert.ok(direction, `missing direction for ${slug}`);
    for (const key of ['archetype','layout','hero','type','surface','motion','accent','media']) {
      assert.ok(direction[key], `${slug} missing ${key}`);
    }
  }
});

test('published tenants receive business-led compositions rather than random fingerprints', () => {
  const signatures = publishedSlugs.map((slug) => {
    const d = TENANT_ART_DIRECTIONS[slug];
    return [d.archetype,d.layout,d.hero,d.type,d.surface,d.motion,d.media,d.accent].join('|');
  });
  const unique = new Set(signatures);
  assert.ok(unique.size >= 12, 'distinct business families need distinct composition choices');
  for (const slug of publishedSlugs) assert.ok(TENANT_ART_DIRECTIONS[slug].rationale.length > 30);
  assert.doesNotMatch(fs.readFileSync(path.join(root,'src/data/tenant-art-directions.mjs'),'utf8'), /Math\.random|Math\.imul/);
});

test('generic tenant route uses adaptive showcase instead of the old link-card fallback', () => {
  const route = fs.readFileSync(path.join(root,'src/pages/tenant/[slug].astro'),'utf8');
  assert.match(route, /AdaptiveTenantShowcase/);
  assert.doesNotMatch(route, /class="tenant-card"/);
});

test('adaptive renderer exposes design dimensions as semantic data attributes', () => {
  const component = fs.readFileSync(path.join(root,'src/components/AdaptiveTenantShowcase.astro'),'utf8');
  for (const attr of ['data-archetype','data-layout','data-hero','data-type','data-surface','data-motion','data-media']) {
    assert.match(component, new RegExp(attr));
  }
});

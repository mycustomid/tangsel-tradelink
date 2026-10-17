import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const ROOT = new URL('../', import.meta.url);

async function read(rel) {
  return readFile(new URL(rel, ROOT), 'utf8');
}

test('every exported tenant has an explicit art-direction fingerprint', async () => {
  const exportData = JSON.parse(await read('tenant_alphabetical_export.json'));
  const slugs = Object.values(exportData.groups).flat().map((tenant) => tenant.slug);
  const { TENANT_ART_DIRECTIONS } = await import('../src/data/tenant-art-directions.mjs');

  assert.equal(slugs.length, 97, 'directory export must remain at 97 tenants for this patch');
  assert.equal(new Set(slugs).size, 97, 'tenant slugs must stay unique');
  assert.equal(Object.keys(TENANT_ART_DIRECTIONS).length, 97, 'registry must explicitly cover all 97 tenant slugs');

  for (const slug of slugs) {
    const art = TENANT_ART_DIRECTIONS[slug];
    assert.ok(art, `missing art direction for ${slug}`);
    for (const key of ['archetype', 'layout', 'hero', 'type', 'surface', 'motion', 'accent', 'media']) {
      assert.equal(typeof art[key], 'string', `${slug}.${key} must be a string`);
      assert.ok(art[key].length > 0, `${slug}.${key} must not be empty`);
    }
  }

  const signatures = slugs.map((slug) => {
    const art = TENANT_ART_DIRECTIONS[slug];
    return [art.archetype, art.layout, art.hero, art.type, art.surface, art.motion, art.accent, art.media].join('|');
  });
  assert.ok(new Set(signatures).size >= 80, 'art direction must create at least 80 distinct tenant fingerprints');
});

test('generic tenant route uses adaptive showcase instead of the old link-card fallback', async () => {
  const route = await read('src/pages/tenant/[slug].astro');
  assert.match(route, /AdaptiveTenantShowcase/);
  assert.doesNotMatch(route, /<TenantHeader/);
  assert.doesNotMatch(route, /<LinkButton/);
});

test('adaptive renderer exposes design dimensions as semantic data attributes', async () => {
  const component = await read('src/components/AdaptiveTenantShowcase.astro');
  for (const attribute of ['data-archetype', 'data-layout', 'data-hero', 'data-type', 'data-surface', 'data-motion', 'data-media']) {
    assert.ok(component.includes(attribute), `adaptive renderer must expose ${attribute}`);
  }
  const css = await read('src/styles/adaptive-tenant-showcase.css');
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /content-visibility/);
});

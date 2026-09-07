import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const component = fs.readFileSync(
  new URL('../src/components/RichTenantShowcase.astro', import.meta.url),
  'utf8',
);

const expectedExperiences = [
  ['TMMIN', 'industrial'],
  ['TATALOGAM', 'architectural'],
  ['MORRIS', 'fragrance'],
  ['SANFOOD', 'family-food'],
  ['AZAKI TEMPE', 'natural-export'],
  ['DRAGON', 'heritage-wellness'],
  ['CLEAN MATIC', 'utility-design'],
  ['SINAR MAS LAND', 'placemaking'],
  ['HIMKI', 'craft-network'],
];

test('each rich tenant gets a distinct flagship-level art direction', () => {
  assert.match(component, /data-experience=/);
  for (const [brand, mode] of expectedExperiences) {
    assert.ok(component.includes(brand), `expected brand-specific direction for ${brand}`);
    assert.ok(component.includes(mode), `expected ${mode} experience mode`);
  }
});

test('shared showcase no longer exposes generic template copy', () => {
  const genericPhrases = [
    'A closer look.',
    'Products, places and processes that define the business.',
    'Continue with {label}.',
    'Official destinations only.',
  ];
  for (const phrase of genericPhrases) {
    assert.equal(component.includes(phrase), false, `generic template phrase still present: ${phrase}`);
  }
});

test('every art direction has dedicated layout styling', () => {
  for (const [, mode] of expectedExperiences) {
    assert.ok(
      component.includes(`[data-experience="${mode}"]`),
      `expected dedicated CSS for ${mode}`,
    );
  }
});

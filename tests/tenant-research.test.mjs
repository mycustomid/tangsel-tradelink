import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const readJson = (relativePath) => JSON.parse(readFileSync(new URL(relativePath, import.meta.url), 'utf8'));
const base = readJson('../src/data/tenants.json');
const research = Object.assign(
  {},
  readJson('../src/data/research-food.json'),
  readJson('../src/data/research-manufactured.json'),
  readJson('../src/data/research-industrial.json'),
  readJson('../src/data/research-furniture.json'),
);

test('research layer covers all 85 floorplan tenants with profile copy', () => {
  assert.equal(base.length, 85);
  assert.equal(Object.keys(research).length, 85);
  for (const tenant of base) {
    assert.ok(research[tenant.slug], `missing research for ${tenant.slug}`);
    assert.ok(research[tenant.slug].description?.length >= 45, `thin description for ${tenant.slug}`);
  }
});

test('verified links cover a useful majority while unresolved tenants remain link-free', () => {
  const rows = Object.values(research);
  assert.ok(rows.filter((x) => x.website).length >= 60);
  assert.ok(rows.filter((x) => x.whatsapp).length >= 20);
  assert.ok(rows.filter((x) => x.instagram).length >= 8);
  assert.ok(rows.filter((x) => x.researchStatus === 'web-verified').length >= 70);
  assert.equal(research.candra.researchStatus, 'floorplan-only');
  assert.equal(research.candra.website, undefined);
});

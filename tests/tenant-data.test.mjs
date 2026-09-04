import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const tenants = JSON.parse(fs.readFileSync(new URL('../src/data/tenants.json', import.meta.url), 'utf8'));

test('floorplan seed contains a meaningful verified tenant set', () => {
  assert.ok(tenants.length >= 80, `expected at least 80 floorplan tenants, got ${tenants.length}`);
});

test('known floorplan exhibitors are assigned to their source halls', () => {
  const byName = new Map(tenants.map((tenant) => [tenant.name, tenant]));

  assert.equal(byName.get('TEMPE AZAKI')?.hall, '2');
  assert.equal(byName.get('TOYOTA MOTOR MANUFACTURING INDONESIA, PT (TMMIN)')?.hall, '6');
  assert.equal(byName.get('PEMKOT TANGSEL')?.hall, '8');
  assert.equal(byName.get('HIMKI')?.hall, '9');
});

test('unavailable digital links remain empty rather than fabricated', () => {
  for (const tenant of tenants) {
    for (const field of ['whatsapp', 'instagram', 'maps', 'website', 'catalog', 'email', 'logo']) {
      assert.ok(!tenant[field], `${tenant.name}: expected ${field} to stay empty until sourced`);
    }
  }
});

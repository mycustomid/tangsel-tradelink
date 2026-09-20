import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const tenants = JSON.parse(fs.readFileSync(new URL('../src/data/tenants.json', import.meta.url), 'utf8'));
const research = JSON.parse(fs.readFileSync(new URL('../src/data/research-fashion.json', import.meta.url), 'utf8'))['owi-rajut'];

test('Owi Rajut is generated with supplied links and cross-checked OSINT data', () => {
  assert.ok(tenants.some((tenant) => tenant.slug === 'owi-rajut'));
  assert.equal(research.instagram, 'https://www.instagram.com/owi.rajut/');
  assert.equal(research.maps, 'https://share.google/Ene44rW2OTbtqHg39');
  assert.equal(research.mapsFallback, 'https://www.google.com/maps/search/?api=1&query=-6.35540522545654%2C106.712101733721');
  assert.equal(research.trademarkApplication, 'DID2021064524');
  assert.equal(research.trademarkFiledAt, '2021-09-27');
  assert.equal(research.trademarkClass, '23');
  assert.deepEqual(research.trademarkGoods, ['benang rajut', 'benang untuk rajutan tangan']);
  assert.equal(research.latitude, -6.35540522545654);
  assert.equal(research.longitude, 106.712101733721);
  assert.ok(research.sources.some((url) => url.includes('dgip.go.id')));
  assert.ok(research.sources.some((url) => url.includes('unpam.ac.id')));
  assert.equal(research.researchStatus, 'web-verified');
});
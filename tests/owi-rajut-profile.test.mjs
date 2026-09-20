import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const tenants = JSON.parse(fs.readFileSync(new URL('../src/data/tenants.json', import.meta.url), 'utf8'));
const research = JSON.parse(fs.readFileSync(new URL('../src/data/research-fashion.json', import.meta.url), 'utf8'))['owi-rajut'];

test('Owi Rajut is generated with the supplied Instagram and Google Maps links', () => {
  assert.ok(tenants.some((tenant) => tenant.slug === 'owi-rajut'));
  assert.equal(research.instagram, 'https://www.instagram.com/owi.rajut/');
  assert.equal(research.maps, 'https://share.google/Ene44rW2OTbtqHg39');
  assert.ok(research.sources.some((url) => url.includes('dgip.go.id')));
  assert.ok(research.sources.some((url) => url.includes('unpam.ac.id')));
  assert.equal(research.researchStatus, 'web-verified');
});
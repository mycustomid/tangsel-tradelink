import test from 'node:test';
import assert from 'node:assert/strict';
import { filterTenants, getTenantLinks, resolveTheme, uniqueValues } from '../src/lib/tenant-utils.mjs';

const tenants = [
  { name: 'Alpha Foods', category: 'Food & Beverage', hall: '1', booth: 'A-01' },
  { name: 'Beta Tools', category: 'Industrial', hall: '2', booth: 'B-02' },
  { name: 'Gamma Snack', category: 'Food & Beverage', hall: '1', booth: 'A-03' },
];

test('filterTenants searches and combines exact filters', () => {
  assert.deepEqual(filterTenants(tenants, { query: 'gamma', category: 'Food & Beverage', hall: '1' }), [tenants[2]]);
  assert.deepEqual(filterTenants(tenants, { query: 'tools', hall: '1' }), []);
});

test('uniqueValues ignores empty values and sorts', () => {
  assert.deepEqual(uniqueValues([...tenants, { hall: '' }], 'hall'), ['1', '2']);
});

test('resolveTheme respects explicit theme and derives a category fallback', () => {
  assert.equal(resolveTheme({ theme: 'beauty', category: 'Industrial' }), 'beauty');
  assert.equal(resolveTheme({ category: 'Food & Beverage' }), 'food');
  assert.equal(resolveTheme({ category: 'Unknown' }), 'default');
});

test('getTenantLinks hides empty or unsafe links and normalizes phone/email', () => {
  const links = getTenantLinks({
    whatsapp: '+62 812-3456-7890',
    email: 'hello@example.com',
    website: 'javascript:alert(1)',
    maps: '',
    instagram: 'https://instagram.com/example',
    catalog: '/catalog/example.pdf',
  });

  assert.deepEqual(links.map((link) => link.key), ['whatsapp', 'instagram', 'catalog', 'email']);
  assert.equal(links[0].href, 'https://wa.me/6281234567890');
  assert.equal(links.at(-1).href, 'mailto:hello@example.com');
});

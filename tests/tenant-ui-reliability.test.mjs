import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { getTenantLinks, getTenantLogo } from '../src/lib/tenant-utils.mjs';

const readJson = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url), 'utf8'));
const tenants = readJson('../src/data/tenants.json');
const research = Object.assign(
  {},
  readJson('../src/data/research-food.json'),
  readJson('../src/data/research-manufactured.json'),
  readJson('../src/data/research-industrial.json'),
  readJson('../src/data/research-furniture.json'),
  readJson('../src/data/research-fashion.json'),
);

test('every tenant exposes a Maps discovery link without inventing a pin', () => {
  for (const base of tenants) {
    const tenant = { ...base, ...(research[base.slug] || {}) };
    const maps = getTenantLinks(tenant).find((link) => link.key === 'maps');
    assert.ok(maps?.href?.startsWith('https://www.google.com/maps/search/'), `missing Maps search for ${base.slug}`);
  }
});

test('website-backed tenants use a remote brand/site icon instead of a generated letter', () => {
  for (const base of tenants) {
    const tenant = { ...base, ...(research[base.slug] || {}) };
    if (tenant.website || tenant.logo) {
      assert.match(getTenantLogo(tenant), /^https?:\/\//, `missing logo source for ${base.slug}`);
    }
  }
});

test('brand fallback icon is hidden unless the remote icon fails', () => {
  const component = fs.readFileSync(new URL('../src/components/BrandIcon.astro', import.meta.url), 'utf8');
  assert.match(component, /\.brand-fallback\{[^}]*display:none/);
  assert.match(component, /onerror=.*previousElementSibling\.style\.display='block'/);
});
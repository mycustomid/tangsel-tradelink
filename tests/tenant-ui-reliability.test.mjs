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

test('every tenant exposes a valid Maps discovery link', () => {
  for (const base of tenants) {
    const tenant = { ...base, ...(research[base.slug] || {}) };
    const maps = getTenantLinks(tenant).find((link) => link.key === 'maps');
    assert.ok(maps?.href, `missing Maps link for ${base.slug}`);
    assert.match(maps.href, /^https:\/\//, `invalid Maps URL for ${base.slug}`);
    assert.ok(
      maps.href.includes('google.com/maps') || maps.href.includes('share.google'),
      `unexpected Maps provider for ${base.slug}: ${maps.href}`
    );
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

test('platform icons are stored locally in the repository', () => {
  const component = fs.readFileSync(new URL('../src/components/BrandIcon.astro', import.meta.url), 'utf8');
  const required = [
    'facebook.svg',
    'google-maps.svg',
    'whatsapp.svg',
    'instagram.svg',
    'tiktok.svg',
    'youtube.svg',
  ];

  for (const icon of required) {
    assert.match(component, new RegExp(icon.replace('.', '\\.')));
    assert.ok(
      fs.existsSync(new URL(`../public/icons/brands/${icon}`, import.meta.url)),
      `missing local icon asset: ${icon}`
    );
  }

  assert.equal(component.includes('cdn.simpleicons.org'), false, 'platform icons must not depend on remote CDN');
});

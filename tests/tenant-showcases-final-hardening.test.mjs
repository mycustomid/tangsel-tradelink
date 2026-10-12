import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root = new URL('../', import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), 'utf8');
const json = (path) => JSON.parse(read(path));

test('legacy Raja/Bumina duplicate is removed from discovery and becomes a canonical redirect', () => {
  const extras = json('src/data/tenants-extra.json');
  assert.equal(extras.some((tenant) => tenant.slug === 'buminaeenk-freeze-dried'), false);
  const alias = read('src/pages/tenant/buminaeenk-freeze-dried.astro');
  assert.match(alias, /http-equiv="refresh"/i);
  assert.match(alias, /tenant\/raja-freeze-dried/);
  assert.match(alias, /noindex,follow/i);
});

test('Bumina evidence is current and does not present the disputed Booking.com rating as verified', () => {
  const data = json('src/data/showcases/bumina-eenk.json');
  assert.ok(data.stats.some((item) => /25/.test(item.value)));
  assert.doesNotMatch(JSON.stringify(data), /4\.9★|4\.9\/5/i);
  assert.equal(data.verification?.status, 'primary-plus-ota');
  assert.ok(data.verification.sources.some((source) => /booking\.com/.test(source.url)));
});

test('Raja avoids unsupported nutrition and 25-year guarantees in TradeLink copy', () => {
  const data = json('src/data/showcases/raja-freeze-dried.json');
  const aliasData = json('src/data/showcases/buminaeenk-freeze-dried.json');
  const copy = JSON.stringify(data);
  assert.doesNotMatch(copy, /98%|95%|25\s*(th|tahun)/i);
  assert.equal(data.verification?.status, 'primary-source-checked');
  assert.doesNotMatch(JSON.stringify(aliasData), /98%|95%|25\s*(th|tahun)/i);
});

test('Samara differentiates corroborated social identity from unverified marketplace routes', () => {
  const data = json('src/data/showcases/samara-from-home.json');
  assert.equal(data.verification?.status, 'partial-osint');
  const instagram = data.verification.channels.find((channel) => channel.key === 'instagram');
  assert.equal(instagram?.status, 'corroborated');
  const stores = data.verification.channels.filter((channel) => ['shopee','tokopedia'].includes(channel.key));
  assert.ok(stores.length >= 2 && stores.every((channel) => channel.status === 'brand-listed'));
  const page = read('src/pages/tenant/samara-from-home.astro');
  assert.doesNotMatch(page, /researchStatus:\s*['"]web-verified['"]/);
});

test('four showcase pages expose canonical/social metadata through BaseLayout', () => {
  const base = read('src/layouts/BaseLayout.astro');
  assert.match(base, /property="og:title"/);
  assert.match(base, /name="twitter:card"/);
  assert.match(base, /rel="canonical"/);
  assert.match(base, /application\/ld\+json/);
  for (const slug of ['my-aicustom','raja-freeze-dried','bumina-eenk','samara-from-home']) {
    const page = read(`src/pages/tenant/${slug}.astro`);
    assert.match(page, /canonical=/);
    assert.match(page, /image=/);
    assert.match(page, /structuredData=/);
  }
});

test('shared showcase renders provenance and a dedicated Bumina hospitality art direction', () => {
  const component = read('src/components/RichTenantShowcase.astro');
  assert.match(component, /source-ledger/);
  assert.match(component, /hospitality-retreat/);
  assert.match(component, /data-experience="hospitality-retreat"/);
});

test('directory gives the four flagship additions a curated visual entry point', () => {
  const index = read('src/pages/index.astro');
  for (const slug of ['my-aicustom','raja-freeze-dried','bumina-eenk','samara-from-home']) {
    assert.match(index, new RegExp(slug));
  }
  assert.match(index, /featured-showcase/);
});

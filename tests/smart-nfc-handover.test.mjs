import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL(path, import.meta.url), 'utf8');
const json = (path) => JSON.parse(read(path));

const files = {
  samara: '../src/data/showcases/samara-from-home.json',
  hhb: '../src/data/showcases/hhb.json',
  aranomiya: '../src/data/showcases/aranomiya.json',
  dbumbu: '../src/data/showcases/dbumbu-aurelshop.json',
  zahhab: '../src/data/showcases/zahhab.json',
  ourherb: '../src/data/showcases/our-herb.json',
};

test('smart NFC component keeps NFC actions large and mobile-friendly', () => {
  const component = read('../src/components/SmartNfcShowcase.astro');
  assert.match(component, /min-height:52px/);
  assert.match(component, /min-height:58px/);
  assert.match(component, /mobile-quick/);
  assert.match(component, /safe-area-inset-bottom/);
  assert.match(component, /loading="lazy"/);
  assert.match(component, /fetchpriority="high"/);
});

test('only Samara uses Samara photography', () => {
  for (const [key, path] of Object.entries(files)) {
    const config = json(path);
    if (key === 'samara') assert.match(config.heroImage, /samara-real-1\.webp$/);
    else assert.doesNotMatch(config.heroImage || '', /samara/i);
  }
});

test('Samara uses authentic client menu pricelist image and respects removal of retail pricing blocks', () => {
  const config = json(files.samara);
  assert.equal(config.tagline, 'Healthy, delicious cooking made easy for everyone');
  assert.match(config.pricelistImage, /samara-pricelist\.webp$/);
  assert.equal(config.hideCommercialBlocks, true);
  assert.equal(config.hideStats, true);
  assert.equal(config.gallery[0].label, 'GIFT PACKAGE');
  assert.equal(config.gallery[1].label, 'B2B');
  assert.equal(config.gallery[2].label, 'made with fresh ingredients!');
  assert.doesNotMatch(JSON.stringify(config), /GrabFood|Go-Food/i);
});

test('HHB uses official public scale and marks handover rates as indicative', () => {
  const config = json(files.hhb);
  const text = JSON.stringify(config);
  assert.match(text, /8\+/);
  assert.match(text, /50\+/);
  assert.match(text, /Indicative/);
  assert.match(text, /hhb\.co\.id/);
  assert.match(text, /cs@hhb\.co\.id/);
});

test('ARANOMIYA is corrected to natural soap / personal care', () => {
  const config = json(files.aranomiya);
  assert.match(JSON.stringify(config), /Natural Soap/i);
  assert.doesNotMatch(config.story.body, /handicraft/i);
  const page = read('../src/pages/tenant/aranomiya.astro');
  assert.match(page, /Health, Beauty & Personal Care/);
});

test('DBumbu copy is grounded in the public AurelShop2018 catalog', () => {
  const config = json(files.dbumbu);
  assert.match(JSON.stringify(config.actions), /aurelshop2018/i);
  assert.doesNotMatch(config.story.body, /ribuan pelanggan/i);
  assert.doesNotMatch(config.story.body, /tahan simpan/i);
});

test('Zahhab removes generic placeholder marketplace/social URLs and medical claims', () => {
  const config = json(files.zahhab);
  const text = JSON.stringify(config);
  assert.match(text, /susu kurma/i);
  assert.match(text, /lemon kurma/i);
  assert.doesNotMatch(text, /https:\/\/www\.facebook\.com["/]/);
  assert.doesNotMatch(text, /https:\/\/shopee\.co\.id["/]/);
  assert.doesNotMatch(config.story.body, /imunitas|menyembuhkan|terapi|khasiat/i);
});

test('Our Herb uses Rumah Kurasi facts and no generic Facebook placeholder', () => {
  const config = json(files.ourherb);
  const text = JSON.stringify(config);
  assert.match(text, /200 box/i);
  assert.match(text, /kurasi\.tangerangselatankota\.go\.id\/produk\/134/);
  assert.doesNotMatch(text, /https:\/\/www\.facebook\.com["/]/);
});

test('all six pages use the compact SmartNfcShowcase component', () => {
  for (const file of [
    'samara-from-home.astro','hhb.astro','aranomiya.astro',
    'dbumbu-aurelshop.astro','zahhab.astro','our-herb.astro'
  ]) {
    const content = read(`../src/pages/tenant/${file}`);
    assert.match(content, /SmartNfcShowcase/);
    assert.doesNotMatch(content, /EnhancedRichTenantShowcase/);
  }
});

test('Aranomiya directory category matches corrected public positioning', () => {
  const list = json('../src/data/tenants-extra.json');
  const item = list.find((x) => x.slug === 'aranomiya');
  assert.equal(item?.category, 'Health, Beauty & Personal Care');
});


test('ARANOMIYA uses a BaseLayout theme that actually exists in the baseline repo', () => {
  const page = read('../src/pages/tenant/aranomiya.astro');
  assert.match(page, /theme=['"]beauty['"]/);
  assert.doesNotMatch(page, /theme=['"]wellness['"]/);
});

test('traceable real-world imagery is lazy and source-linked where available', () => {
  const component = read('../src/components/SmartNfcShowcase.astro');
  const aranomiya = json(files.aranomiya);
  const ourherb = json(files.ourherb);
  assert.match(component, /loading="lazy"/);
  assert.match(component, /onerror="this\.style\.display='none'"/);
  assert.match(aranomiya.gallery[0].url, /linkumkm\.id/);
  assert.match(ourherb.gallery[0].url, /pknstan\.ac\.id/);
});

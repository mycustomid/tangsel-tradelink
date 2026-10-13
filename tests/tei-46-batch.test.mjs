import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const slugs = ["titik-kurniasih", "ladifa-collection", "euis-siti-khodijah", "fenda-iriani", "den-bagus", "shirudo-lab", "haira", "lika-snack", "daniscakelicio", "pt-cosmar", "dapur-nanay", "pempek-wak-ebot", "zyvas", "pt-niaga-citra-mandiri", "rhr-snack", "ery-mamaw", "rosniati", "eni-chandra", "jahe-hayatiqu", "ochokat", "fennycroche", "elleta", "kartika-bela", "snapclean", "nurazlinda", "fevy", "health-today", "batinos-pastry", "meraki", "giga-tech", "lalisha-food", "tokibi-coffee", "mba-wanti", "datik-batik", "peddler-indonesia", "dodol-betawi-haji-imang", "larrisa-food", "cv-makmur-jaya-sentosa"];
const read = (p) => fs.readFileSync(new URL(p, import.meta.url), 'utf8');

test('batch contains 38 unique new profiles because Ladifa #3/#8 is consolidated', () => {
  assert.equal(slugs.length, 38);
  assert.equal(new Set(slugs).size, 38);
  assert.ok(slugs.includes('ladifa-collection'));
});

for (const slug of slugs) {
  test(`${slug} has a showcase and Astro page`, () => {
    const configPath = new URL(`../src/data/showcases/${slug}.json`, import.meta.url);
    const pagePath = new URL(`../src/pages/tenant/${slug}.astro`, import.meta.url);
    assert.ok(fs.existsSync(configPath), 'showcase JSON missing');
    assert.ok(fs.existsSync(pagePath), 'Astro page missing');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const page = fs.readFileSync(pagePath, 'utf8');
    assert.ok(config.tagline?.length > 8);
    assert.ok(config.story?.body?.length > 30);
    assert.ok(Array.isArray(config.stats) && config.stats.length >= 4);
    assert.ok(Array.isArray(config.highlights) && config.highlights.length >= 4);
    assert.ok(Array.isArray(config.actions));
    assert.match(config.heroImage || '', /^\/brand\//);
    assert.match(page, /SmartNfcShowcase/);
    assert.match(page, /8-7C/);
    assert.doesNotMatch(JSON.stringify(config), /samara-real-1|placeholder\.com|example\.com/i);
    for (const action of config.actions) {
      assert.match(action.url, /^(https:\/\/|mailto:)/);
      assert.doesNotMatch(action.url, /^https:\/\/(www\.)?(facebook\.com|shopee\.co\.id)\/?$/i);
    }
  });
}

test('tenants-extra keeps previous extras and registers all new unique slugs without duplicates', () => {
  const extras = JSON.parse(read('../src/data/tenants-extra.json'));
  const extraSlugs = extras.map((x) => x.slug);
  assert.equal(extras.length, 50);
  assert.equal(extraSlugs.length, new Set(extraSlugs).size);
  for (const slug of slugs) assert.ok(extraSlugs.includes(slug), `${slug} not registered`);
  for (const legacy of ['my-aicustom','raja-freeze-dried','bumina-eenk','md-organic','hhb']) {
    assert.ok(extraSlugs.includes(legacy), `legacy extra lost: ${legacy}`);
  }
});

test('official audit remains 46 rows while duplicate Ladifa rows share one canonical profile', () => {
  const audit = JSON.parse(read('../audit_46_status.json'));
  assert.equal(audit.length, 46);
  assert.ok(audit.every((x) => x.hasShowcase && x.hasPage));
  assert.equal(audit.find((x)=>x.no===3).slug, 'ladifa-collection');
  assert.equal(audit.find((x)=>x.no===8).slug, 'ladifa-collection');
  assert.equal(new Set(audit.map((x)=>x.slug)).size, 45);
});

test('SmartNfcShowcase exposes verification labels and visual modes without breaking old configs', () => {
  const c = read('../src/components/SmartNfcShowcase.astro');
  assert.match(c, /handover-verified/);
  assert.match(c, /links-pending/);
  assert.match(c, /data-visual-mode/);
  assert.match(c, /--hero-fit/);
  for (const mode of ['fashion','food','craft','beauty','beverage','industrial','tech']) {
    assert.match(c, new RegExp(`data-visual-mode="${mode}"`));
  }
});

test('known real assets are used for Snapclean and Health Today', () => {
  const snap = JSON.parse(read('../src/data/showcases/snapclean.json'));
  const health = JSON.parse(read('../src/data/showcases/health-today.json'));
  assert.match(snap.heroImage, /^\/brand\/snapclean\//);
  assert.match(health.heroImage, /^\/brand\/health-today\//);
  assert.equal(snap.heroFit, 'contain');
  assert.equal(health.heroFit, 'contain');
});

test('handover infrastructure and payment fields are excluded from patch data', () => {
  const files = [
    '../src/data/tenants-extra.json',
    '../audit_46_status.json',
    ...slugs.map((slug)=>`../src/data/showcases/${slug}.json`),
  ];
  const text = files.map(read).join('\\n');
  for (const forbiddenLabel of [
    'WA Gateway VPS',
    'Server IP',
    'Tenant ID',
    'Container PostgreSQL',
    'Rekening Pembayaran Klien',
    'a.n. Najmi Syaula'
  ]) {
    assert.equal(text.includes(forbiddenLabel), false, `handover-only field leaked: ${forbiddenLabel}`);
  }
});


test('public-source-checked profiles have a non-handover public source', () => {
  for (const slug of slugs) {
    const config = JSON.parse(read(`../src/data/showcases/${slug}.json`));
    const verification = config.verification || {};
    if (verification.status !== 'public-source-checked') continue;
    assert.ok(Array.isArray(verification.sources) && verification.sources.length > 0, `${slug}: sources required`);
    assert.ok(
      verification.sources.some((source) =>
        /^https:\/\//.test(source.url || '') &&
        !/mycustomid\.github\.io\/tangsel-tradelink\/?$/.test(source.url || '')
      ),
      `${slug}: a real public source is required`
    );
  }
});

test('weak OSINT matches stay handover/pending instead of being falsely promoted', () => {
  for (const slug of ['titik-kurniasih','haira','meraki','giga-tech','peddler-indonesia']) {
    const config = JSON.parse(read(`../src/data/showcases/${slug}.json`));
    assert.notEqual(config.verification.status, 'public-source-checked');
  }
});

test('manual OSINT pass upgrades concrete tenant facts', () => {
  const den = JSON.parse(read('../src/data/showcases/den-bagus.json'));
  const rhr = JSON.parse(read('../src/data/showcases/rhr-snack.json'));
  const eni = JSON.parse(read('../src/data/showcases/eni-chandra.json'));
  const tokibi = JSON.parse(read('../src/data/showcases/tokibi-coffee.json'));
  const mjs = JSON.parse(read('../src/data/showcases/cv-makmur-jaya-sentosa.json'));

  assert.match(JSON.stringify(den), /Terminal 2/);
  assert.match(JSON.stringify(rhr), /1 ton/);
  assert.match(JSON.stringify(eni), /Aliya's Cookies/);
  assert.match(JSON.stringify(tokibi), /green-bean|green bean/i);
  assert.match(JSON.stringify(mjs), /export-import|export import/i);
});

test('OSINT source ledger exists', () => {
  const ledger = read('../docs/OSINT-SOURCE-LEDGER.md');
  assert.match(ledger, /public-source-checked/);
  assert.match(ledger, /handover-verified/);
});


test('profiles without verified public channels render an explicit pending state instead of an empty action grid', () => {
  const component = read('../src/components/SmartNfcShowcase.astro');
  assert.match(component, /Contact channel not published yet/);
  assert.match(component, /channel-pending/);
  assert.match(component, /actions\.length > 0/);
});

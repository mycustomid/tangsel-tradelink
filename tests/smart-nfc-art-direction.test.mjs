import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const ROOT = new URL('../', import.meta.url);
const read = (rel) => readFile(new URL(rel, ROOT), 'utf8');

const dedicatedSlugs = [
  'amood-healthy-foods','aranomiya','arjuna-68','batinos-pastry','bopet-pagaruyung','bumina-eenk','buminaeenk-freeze-dried',
  'cuan-dong','cv-makmur-jaya-sentosa','daniscakelicio','dapur-nanay','datik-batik','dbumbu-aurelshop','den-bagus',
  'dodol-betawi-haji-imang','elleta','eni-chandra','ery-mamaw','euis-siti-khodijah','fenda-iriani','fennycroche','fevy','giga-tech',
  'haira','health-today','hhb','jahe-hayatiqu','kartika-bela','kenyess-food','kule-perfume','kusuma-kencana-mulya','ladifa-collection',
  'lalisha-food','larrisa-food','lika-snack','mba-wanti','md-organic','meraki','my-aicustom','ninauka','nurazlinda','ochokat',
  'our-herb','peddler-indonesia','pempek-wak-ebot','pt-cosmar','pt-niaga-citra-mandiri','raja-freeze-dried','rhr-snack','rosniati',
  'rumah-batik-setu','samara-from-home','sapa-legend-coffee','sepatu-wanita-naa','shayfara','shirudo-lab','snack-santuy','snapclean',
  'the-munching-queen','titik-kurniasih','tokibi-coffee','vietrade','zahhab','zyvas'
];

test('SmartNfcShowcase consumes the same multi-axis art-direction system as the 97-tenant adaptive renderer', async () => {
  const component = await read('src/components/SmartNfcShowcase.astro');
  assert.match(component, /getTenantArtDirectionForAnySlug/);
  for (const attr of ['data-archetype','data-layout','data-hero','data-type','data-surface','data-motion','data-media']) {
    assert.ok(component.includes(attr), `SmartNfcShowcase must expose ${attr}`);
  }
  assert.match(component, /smart-nfc-art-direction\.css/);
});

test('dedicated tenant slugs receive mostly unique design fingerprints instead of category templates', async () => {
  const { getTenantArtDirectionForAnySlug } = await import('../src/data/tenant-art-directions.mjs');
  const signatures = dedicatedSlugs.map((slug) => {
    const d = getTenantArtDirectionForAnySlug(slug);
    assert.ok(d, `missing fallback direction for ${slug}`);
    return [d.archetype,d.layout,d.hero,d.type,d.surface,d.motion,d.accent,d.media].join('|');
  });
  assert.ok(new Set(signatures).size >= 60, `expected >=60 distinct fingerprints, got ${new Set(signatures).size}`);
});

test('Smart NFC art-direction CSS changes composition on desktop and mobile, not only palette', async () => {
  const css = await read('src/styles/smart-nfc-art-direction.css');
  for (const layout of ['split-left','split-right','editorial-offset','poster-stack','ledger','gallery-first','manifesto','index','map-grid','product-stage']) {
    assert.match(css, new RegExp(`data-layout=["']${layout}["']`));
  }
  assert.match(css, /@media\(max-width:820px\)/);
  assert.match(css, /data-layout="gallery-first"/);
  assert.match(css, /data-layout="poster-stack"/);
  assert.match(css, /data-hero="billboard"/);
  assert.match(css, /data-type="condensed"/);
});

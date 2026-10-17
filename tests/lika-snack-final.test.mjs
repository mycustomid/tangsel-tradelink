import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const ROOT = new URL('../', import.meta.url);
const read = (rel) => readFile(new URL(rel, ROOT), 'utf8');

test('Lika Snack publishes the supplied Instagram and both Google Maps routes', async () => {
  const config = JSON.parse(await read('src/data/showcases/lika-snack.json'));
  const urls = (config.actions || []).map((action) => action.url);
  assert.ok(urls.includes('https://www.instagram.com/likasnack.id/'));
  assert.ok(urls.includes('https://maps.app.goo.gl/UVLpADewTTFCSyELA'));
  assert.ok(urls.includes('https://maps.app.goo.gl/gvrePUrXNPe1PXJ26'));
});

test('Lika Snack ships a local brand-safe context visual plus an honest external category reference', async () => {
  const config = JSON.parse(await read('src/data/showcases/lika-snack.json'));
  assert.ok((config.gallery || []).length >= 2);
  const [localVisual, externalVisual] = config.gallery;
  assert.match(String(localVisual.image || ''), /^\/brand\/lika-snack\//);
  assert.match(`${localVisual.label || ''} ${localVisual.caption || ''}`, /context|visual|bukan foto kemasan resmi/i);
  await access(new URL(`public${localVisual.image}`, ROOT));
  assert.match(String(externalVisual.image || ''), /^https:\/\//);
  assert.match(`${externalVisual.label || ''} ${externalVisual.caption || ''}`, /reference|referensi|not official|bukan produk|bukan.*resmi/i);
});

test('Lika Snack copy reflects corroborated product variants and current verification date', async () => {
  const config = JSON.parse(await read('src/data/showcases/lika-snack.json'));
  const copy = JSON.stringify(config).toLowerCase();
  for (const term of ['balado', 'jagung bakar', 'barbeque', 'rengginang', 'slondok']) {
    assert.ok(copy.includes(term), `missing corroborated Lika Snack term: ${term}`);
  }
  assert.equal(config.verification?.checkedAt, '2026-10-17');
});

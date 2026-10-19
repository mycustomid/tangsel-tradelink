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

test('Lika Snack ships local authentic brand photography and verified assets', async () => {
  const config = JSON.parse(await read('src/data/showcases/lika-snack.json'));
  assert.ok((config.gallery || []).length >= 2);
  const [localVisual] = config.gallery;
  assert.match(String(localVisual.image || ''), /^\/brand\/lika-snack\//);
  await access(new URL(`public${localVisual.image}`, ROOT));
});

test('Lika Snack copy reflects corroborated product variants and verification metadata', async () => {
  const config = JSON.parse(await read('src/data/showcases/lika-snack.json'));
  const copy = JSON.stringify(config).toLowerCase();
  for (const term of ['balado', 'jagung bakar', 'barbeque', 'rengginang', 'slondok']) {
    assert.ok(copy.includes(term), `missing corroborated Lika Snack term: ${term}`);
  }
  assert.ok(config.verification?.checkedAt);
});

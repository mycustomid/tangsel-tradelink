import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const config = JSON.parse(fs.readFileSync(new URL('../src/data/showcases/li-uli.json', import.meta.url), 'utf8'));

test('LI-ULI uses canonical public links and a local brand favicon', () => {
  const byLabel = Object.fromEntries(config.actions.map((action) => [action.label, action.url]));
  assert.equal(byLabel['Instagram · Fashion'], 'https://www.instagram.com/liuli_fashion/');
  assert.equal(byLabel['Instagram · Craft'], 'https://www.instagram.com/liulicraft/');
  assert.equal(byLabel['TikTok · @liuli_craft_official'], 'https://www.tiktok.com/@liuli_craft_official');
  assert.equal(byLabel['Shopee · Li-Uli'], 'https://shopee.co.id/tokoliuli');
  assert.equal(byLabel['Li-Uli Brand Story'], 'https://liulicraft.wordpress.com/');
  assert.equal(byLabel['Karya Perempuan'], 'https://www.karyaperempuan.id/product/tas-hampers-qgfe1');
  assert.ok(config.actions.every((action) => /^https:\/\//.test(action.url)), 'all LI-ULI actions must be HTTPS');
  assert.ok(fs.existsSync(new URL('../public/brand/li-uli-mark.svg', import.meta.url)), 'LI-ULI local brand favicon must exist');
});

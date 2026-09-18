import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const config = JSON.parse(fs.readFileSync(new URL('../src/data/showcases/li-uli.json', import.meta.url), 'utf8'));
const research = JSON.parse(fs.readFileSync(new URL('../src/data/research-fashion.json', import.meta.url), 'utf8'))['li-uli'];

test('LI-ULI uses the client supplied contact channels and canonical links', () => {
  const byLabel = Object.fromEntries(config.actions.map((action) => [action.label, action.url]));
  assert.equal(byLabel['WhatsApp · LI-ULI'], 'https://wa.me/6281280902454');
  assert.equal(byLabel['TikTok · @liulicraft1'], 'https://www.tiktok.com/@liulicraft1?_r=1&_t=ZS-99pJDrdmjUC');
  assert.equal(byLabel['Instagram · Fashion'], 'https://www.instagram.com/liuli_fashion/');
  assert.equal(byLabel['Instagram · Craft'], 'https://www.instagram.com/liulicraft/');
  assert.equal(byLabel['Shopee · Li-Uli'], 'https://shopee.co.id/tokoliuli');
  assert.equal(byLabel['Li-Uli Brand Story'], 'https://liulicraft.wordpress.com/');
  assert.equal(byLabel['Karya Perempuan'], 'https://www.karyaperempuan.id/product/tas-hampers-qgfe1');
  assert.match(byLabel['Google Maps · BSD'], /^https:\/\/www\.google\.com\/maps\/search\//);
  assert.equal(research.whatsapp, '+6281280902454');
  assert.equal(research.tiktok, 'https://www.tiktok.com/@liulicraft1?_r=1&_t=ZS-99pJDrdmjUC');
  assert.ok(research.address.includes('Vermont Parkland'));
  assert.ok(config.actions.every((action) => /^https:\/\//.test(action.url)), 'all LI-ULI actions must be HTTPS');
});
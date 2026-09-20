import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const research = JSON.parse(fs.readFileSync(new URL('../src/data/research-fashion.json', import.meta.url), 'utf8'))['ilalang-craft'];

test('Ilalang Craft uses tenant supplied Instagram and WhatsApp plus OSINT-backed identity', () => {
  assert.equal(research.whatsapp, 'https://wa.me/6287779132379');
  assert.equal(research.instagram, 'https://www.instagram.com/ilalangcraft.co/');
  assert.match(research.address, /Griya Asri Pamulang/);
  assert.equal(research.logo, 'https://mycustomid.github.io/tangsel-tradelink/brand/ilalang-craft-profile.svg');
  assert.ok(fs.existsSync(new URL('../public/brand/ilalang-craft-profile.svg', import.meta.url)));
  assert.ok(research.sources.some((url) => url.includes('budiluhur.ac.id')));
  assert.ok(research.sources.some((url) => url.includes('dgip.go.id')));
});
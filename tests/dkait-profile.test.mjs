import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const research = JSON.parse(fs.readFileSync(new URL('../src/data/research-fashion.json', import.meta.url), 'utf8'))['dkait-craft'];

test('Dkait Craft uses client supplied contact channels and OSINT-backed business data', () => {
  assert.equal(research.whatsapp, 'https://wa.me/628170703054');
  assert.equal(research.instagram, 'https://www.instagram.com/dkait_craft/');
  assert.equal(research.tiktok, 'https://www.tiktok.com/@dkait_craft');
  assert.equal(research.maps, 'https://share.google/K6OtiiVM3xm83aIGg');
  assert.match(research.address, /Puri Flamboyan/);
  assert.equal(research.logo, '/brand/dkait-craft-wordmark.svg');
  assert.ok(fs.existsSync(new URL('../public/brand/dkait-craft-wordmark.svg', import.meta.url)));
});
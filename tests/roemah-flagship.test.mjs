import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const configPath = new URL('../src/data/flagships/roemah-koffie.json', import.meta.url);

test('Roemah Koffie flagship config contains rich NFC destinations', () => {
  assert.equal(fs.existsSync(configPath), true, 'flagship config must exist');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  assert.equal(config.tagline, 'Exploring the World through Indonesian Coffee');
  assert.ok(config.primaryActions.some((item) => item.key === 'whatsapp'));
  assert.ok(config.primaryActions.some((item) => item.key === 'reservation'));
  assert.equal(config.menus.length, 3);
  assert.ok(config.locations.length >= 5);
  assert.equal(config.marketplaces.length, 3);
  assert.ok(config.membership?.url);
  assert.ok(config.franchise?.url);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const readJson = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url), 'utf8'));

const roemah = readJson('../src/data/flagships/roemah-koffie.json');

test('Roemah Koffie v2 uses image-led menus and locations without Linktree branding', () => {
  assert.equal('linktree' in roemah, false, 'Linktree must not be exposed as a destination');
  assert.ok(roemah.menus.every((item) => item.image), 'every menu card needs a thumbnail image');
  assert.ok(Array.isArray(roemah.locationGallery) && roemah.locationGallery.length >= 2, 'location section needs visual gallery imagery');
  assert.ok(roemah.locations.every((item) => item.url), 'every location needs a Google Maps destination');
});

for (const slug of ['sanfood-internasional', 'tempe-azaki']) {
  test(`${slug} has a rich showcase config ready for gradual rollout`, () => {
    const profile = readJson(`../src/data/showcases/${slug}.json`);
    assert.ok(profile.heroImage, 'showcase needs a hero image');
    assert.ok(profile.tagline, 'showcase needs a tagline');
    assert.ok(Array.isArray(profile.highlights) && profile.highlights.length >= 3, 'showcase needs at least 3 highlights');
    assert.ok(Array.isArray(profile.actions) && profile.actions.length >= 2, 'showcase needs at least 2 useful actions');
  });
}

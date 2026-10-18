import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildDiscoveryProfiles, normalizeSearch, matchesDiscovery } from '../src/lib/discovery.mjs';
import { getTenantArtDirection } from '../src/data/tenant-art-directions.mjs';

test('discovery enriches products from evidence without changing directory identity', () => {
  const [profile] = buildDiscoveryProfiles([{slug:'sample',name:'Original',category:'Food',hall:'8',booth:'8-7C'}], {sample:{name:'Wrong',slug:'wrong',description:'Café cocoa',website:'https://example.com'}}, {sample:{tagline:'Emping jagung',highlights:[{title:'Kencur'}]}});
  assert.equal(profile.slug, 'sample');
  assert.equal(profile.name, 'Original');
  assert.ok(matchesDiscovery(profile, {q:'cafe jagung'}));
  assert.ok(matchesDiscovery(profile, {q:'8-7c kencur',hall:'8',sector:'food'}));
  assert.equal(matchesDiscovery(profile, {q:'missing'}), false);
  assert.equal(matchesDiscovery(profile, {hall:'3'}), false);
});
test('search normalizes accents and repeated whitespace', () => assert.equal(normalizeSearch('  CAFÉ  Cocoa '), 'cafe cocoa'));
test('business strategies distinguish manufacturing, logistics, civic and craft', () => {
  assert.equal(getTenantArtDirection('toyota-motor-manufacturing-indonesia-pt-tmmin').family,'industrial');
  assert.equal(getTenantArtDirection('cma-cgm').family,'logistics');
  assert.equal(getTenantArtDirection('pemkot-tangsel').family,'civic');
  assert.equal(getTenantArtDirection('owi-rajut').family,'craft');
});
test('both data sets are validated', () => assert.match(fs.readFileSync('scripts/validate-tenants.mjs','utf8'), /tenants-extra\.json/));
test('build validates generated output after Astro', () => assert.match(JSON.parse(fs.readFileSync('package.json')).scripts.build, /astro build && node scripts\/validate-output\.mjs/));
test('installers include exact dependency lock and Astro config', () => {
  for (const file of ['apply-patch.sh','apply-patch.ps1']) {
    const s=fs.readFileSync(file,'utf8');
    assert.ok(s.includes('package-lock.json'));
    assert.ok(s.includes('astro.config.mjs'));
  }
});

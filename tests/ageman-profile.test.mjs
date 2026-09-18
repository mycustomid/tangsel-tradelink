import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const config = JSON.parse(fs.readFileSync(new URL('../src/data/showcases/ageman-ecoprint.json', import.meta.url), 'utf8'));
const research = JSON.parse(fs.readFileSync(new URL('../src/data/research-fashion.json', import.meta.url), 'utf8'))['ageman-ecoprint'];

test('Ageman Ecoprint uses client supplied channels and verified public identity data', () => {
  const byLabel = Object.fromEntries(config.actions.map((action) => [action.label, action.url]));
  assert.equal(byLabel['WhatsApp · Ageman'], 'https://wa.me/6281234538838');
  assert.equal(byLabel['Official Website'], 'https://agemanecoprint.netlify.app/');
  assert.equal(byLabel['Instagram · @agemanecoprint'], 'https://www.instagram.com/agemanecoprint/');
  assert.equal(byLabel['TikTok · @agemanecoprint'], 'https://www.tiktok.com/@agemanecoprint');
  assert.equal(byLabel['TikTok Shop'], 'https://vt.tokopedia.com/t/ZS926vL7Vkdup-OZqd7/');
  assert.equal(byLabel['YouTube · Ageman Ecoprint'], 'https://www.youtube.com/@agemanecoprint');
  assert.equal(byLabel['Company Profile'], 'https://drive.google.com/drive/folders/1YsGGTu76f3Pdh6BpsLJjH_s-NBfk0DOz?usp=drive_link');
  assert.equal(byLabel['Google Maps · Ageman'], 'https://share.google/W2hrypk2hTS8xlefp');
  assert.equal(research.whatsapp, 'https://wa.me/6281234538838');
  assert.match(research.address, /Puspiptek/);
  assert.ok(config.gallery.length >= 3);
});
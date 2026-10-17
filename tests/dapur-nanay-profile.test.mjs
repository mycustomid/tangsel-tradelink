import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const config = JSON.parse(fs.readFileSync(new URL('../src/data/showcases/dapur-nanay.json', import.meta.url), 'utf8'));
const page = fs.readFileSync(new URL('../src/pages/tenant/dapur-nanay.astro', import.meta.url), 'utf8');

test('Dapur Nanay gallery excludes unwanted screenshots and poster visuals', () => {
  const galleryImages = config.gallery.map((g) => g.image);
  assert.ok(!galleryImages.includes('/brand/dapur-nanay/dapur-nanay-sambal-cumi.webp'), 'WA screenshot chat + selfie must be removed');
  assert.ok(!galleryImages.includes('/brand/dapur-nanay/dapur-nanay-ig-12.jpg'), 'False Mendag poster must be removed');
  assert.ok(galleryImages.includes('/brand/dapur-nanay/dapur-nanay-ig-14.jpg'), 'Top 20 UMKM Meta & Kemendag credential must be included');
  assert.ok(config.gallery.length >= 4, 'Gallery must have authentic items');
  for (const item of config.gallery) {
    assert.ok(fs.existsSync(new URL(`../public${item.image}`, import.meta.url)), `Gallery asset must exist on disk: ${item.image}`);
  }
});

test('Dapur Nanay Cheese Stick highlights removes "berlebih" and strictly states 100% tanpa MSG', () => {
  const cheeseStick = config.highlights.find((h) => h.title.includes('Cheese Stick'));
  assert.ok(cheeseStick, 'Cheese Stick highlight must exist');
  assert.ok(!cheeseStick.body.includes('berlebih'), 'Word "berlebih" must be removed');
  assert.match(cheeseStick.body, /tanpa bahan pengawet & tanpa MSG/i);
});

test('Dapur Nanay commercial blocks contain 100% accurate pricelist per 16 October', () => {
  const allItems = config.commercialBlocks.flatMap((b) => b.items);
  const itemsMap = Object.fromEntries(allItems.map((i) => [i.label, i.value]));

  assert.equal(itemsMap['Naytaste Cheese Stick Edam (Pouch 150g)'], 'Rp25.000');
  assert.equal(itemsMap['Naytaste Cheese Stick Edam (Pouch 85g)'], 'Rp20.000');
  assert.equal(itemsMap['Kentang Mustofa Dieng Balado (Pouch 100g)'], 'Rp25.000');
  assert.equal(itemsMap['Kentang Mustofa Dieng Balado (Pouch 250g)'], 'Rp45.000');
  assert.equal(itemsMap['Kentang Mustofa Dieng Balado (Toples Segel 250g)'], 'Rp50.000');
  assert.equal(itemsMap['Stik Bawang Harum Seledri (Pouch 100g)'], 'Rp20.000');
  assert.equal(itemsMap['Aneka Sambal Botol Pilihan (Botol 150ml)'], 'Rp35.000');
  assert.equal(itemsMap['Bebek Bakar/Goreng Potongan Besar (Potong 4 + Sambal + Lalapan)'], 'Rp35.000');
  assert.equal(itemsMap['Bebek Goreng/Bakar Potongan Kecil (Potong 8 + Sambal + Lalapan)'], 'Rp25.000');
  assert.equal(itemsMap['Ayam Bakar/Goreng (Potong 4 + Sambal + Lalapan)'], 'Rp15.000');
  assert.equal(itemsMap['Paket Nasi Box'], 'Rp25.000 – Rp50.000');
  assert.equal(itemsMap['Paket Snack Box'], 'Rp10.000 – Rp35.000');
});

test('Dapur Nanay retail partners place Krisna Jogja, Transmart, K3Mart at the front', () => {
  assert.match(config.story.body, /Toko Oleh-oleh Krisna Jogja,\s*Transmart,\s*K3Mart/i);
  const retailDisplay = config.gallery.find((g) => g.image.includes('retail-display'));
  if (retailDisplay) {
    assert.match(retailDisplay.caption, /Toko Oleh-oleh Krisna Jogja,\s*Transmart,\s*K3Mart/i);
  }
});

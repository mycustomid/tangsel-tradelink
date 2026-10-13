# 📋 HANDOVER BRIEF & MASTER TASK DIRECTIVE: 46 TENANT TEI 2026, WA GATEWAY, & SMART NFC

> **DOKUMEN INI ADALAH INSTRUKSI RESMI END-TO-END (E2E) UNTUK CHATGPT / AGENT PELAKSANA**  
> Melanjutkan dan menuntaskan seluruh pendampingan digital peserta **Trade Expo Indonesia (TEI) 2026 ICE BSD** binaan Dinas Perindustrian dan Perdagangan (Disperindag) Kota Tangerang Selatan, integrasi Kartu Smart NFC (Rp150.000 all-in), pembaruan showcase, serta pelengkapan data & aset media seluruh 46 tenant.

---

## 📌 1. ENVIRONMENT & ARSITEKTUR WORKSPACE

- **Repository Workspace:** `D:\code\tangsel-tradelink\` (Astro 5 + Tailwind CSS v4).
- **Disk Policy:** **D: Drive ONLY**. Sesuai *Disk C Preservation Protocol*, dilarang keras membuat file cache/proyek baru di C:.
- **GitHub Live Repository:** `https://github.com/mycustomid/tangsel-tradelink.git` (Branch: `main`).
- **Live Preview URL:** `https://mycustomid.github.io/tangsel-tradelink/`
- **Asset Vault:** `D:\code\tangsel-tradelink\public\brand\`
- **Komponen Standar Halaman Tenant Baru:** Wajib menggunakan `SmartNfcShowcase.astro` dipadukan dengan konfigurasi JSON di `src/data/showcases/<slug>.json` dan layout `BaseLayout.astro`.
- **Standar Desain:** *Indonesian Public Service Design System / Warm Editorial Light-Mode* (Sesuai kaidah Awwwards, background `#faf7f2`, serif/sans hierarki presisi, touch target minimal 48px, zero generic AI-slop).
- **WA Gateway VPS Coolify:**
  - Server IP: `163.61.44.41`
  - Nomor Pribadi Bos (8231): `6285771518231` (Tenant `seto`, Tenant ID: `27e2d6fc-1364-4782-9360-548b07391854`)
  - Nomor Official My AI Custom: `6282121292938` (Tenant `ai custom`, Tenant ID: `be29e379-c096-4c74-ba6b-a232069d2b8a`)
  - Rekening Pembayaran Klien: **BCA 5475815766 a.n. Najmi Syaula** (Rp150.000 all-in).

---

## 📊 2. AUDIT STATUS 46 TENANT REKAP PAK EENG

Hasil cross-check akurat antara daftar 46 tenant resmi TEI 2026 arahan Pak Eeng dengan direktori `tangsel-tradelink`:

### ✅ KELOMPOK A: 7 TENANT SUDAH SELESAI (LIVE & TERUJI)
Semua telah memiliki file showcase JSON, halaman Astro, dan registrasi di `src/data/tenants-extra.json`:
1. **#1 PT Harmoni Harapan Bersama (HHB)** (Bu Fifi) 👉 `/tenant/hhb`
2. **#12 Samara from Home** (Faye Yolody) 👉 `/tenant/samara-from-home`
3. **#20 Zahhab Healthy Drink** (Kak Ety) 👉 `/tenant/zahhab`
4. **#21 Teh Telang Our Herb (OH)** (Kumala A. Haryono) 👉 `/tenant/our-herb`
5. **#27 DBumbu Aurelshop** (Henny Kartika Wati) 👉 `/tenant/dbumbu-aurelshop`
6. **#31 ARANOMIYA** (Shasty Pramahesty) 👉 `/tenant/aranomiya`
7. **#35 MD Organic (Beras Organik)** (Sinta) 👉 `/tenant/md-organic` *(Hasil scraping web organik-md.com & teruji)*

---

### ⏳ KELOMPOK B: 39 TENANT YANG PERLU DIBUATKAN / DILENGKAPI
Berikut adalah daftar 39 tenant sisa lengkap beserta hasil riset/scraping media, tautan sosmed, dan blueprint pembuatannya:

| No | Nama Brand & Owner | Kategori Usaha | Target Slug | Sosmed / Web Resmi (Hasil Scraping/Recon) | Status Data & Aset |
|---|---|---|---|---|---|
| **#2** | **Titik Kurniasih** (Batik Tangsel) | Fashion & Craft | `titik-kurniasih` | Batik khas Tangsel | Naskah UMKM Tangsel |
| **#3** | **Ladifa Collection** (Dewi Krisliawati / Bu Lia) | Modest Fashion & Busana Muslim | `ladifa-collection` | Minat daftar NFC. WA: Bu Lia. | Menunggu link IG & marketplace |
| **#4** | **Euis Siti Khodijah** | Kerajinan / Aksesoris | `euis-siti-khodijah` | Binaan Dekranasda Tangsel | Rekap Pak Eeng |
| **#5** | **Fenda Iriani** | Kriya & Handycraft | `fenda-iriani` | Kriya Kreatif Tangsel | Rekap Pak Eeng |
| **#6** | **Den Bagus** (Mimin) | Kuliner & Makanan Ringan | `den-bagus` | Kuliner Tangsel | Rekap Pak Eeng |
| **#7** | **Shirudo Lab** (Lingsia) | Health, Wellness & Skincare | `shirudo-lab` | IG: `@shirudolabindonesia`, BPOM & Halal | Data web & IG ready |
| **#8** | **Ladifa Collection** | Fashion & Hijab | `ladifa-collection` | Identik dengan #3 | Konsolidasi profil |
| **#9** | **Haira** (Rizka Fauziah) | Fashion Hijab & Busana Muslim | `haira` | IG: `@hafra__id` / Konveksi Hijab | Riset pasar fashion |
| **#10** | **Lika Snack** (Poniyem) | Camilan Olahan Nusantara | `lika-snack` | Snack tradisional Tangsel | Rekap Pak Eeng |
| **#11** | **DANISCAKELICIO** (Nani) | Pastry, Cookies & Cheese Stick | `daniscakelicio` | IG: `@daniscakelicio` & `@daniscookies` | Profil kue kering premium |
| **#13** | **PT Cosmar** | OEM/ODM Skincare & Cosmetics | `pt-cosmar` | Web: `https://ptcosmar.com` | Manufaktur kosmetik skala industri |
| **#14** | **Dapur Nanay** (Amalia) | Kuliner Kentang Mustofa & Cheese Stick | `dapur-nanay` | IG: `@dapur_nanay`, Benda Baru Pamulang | Produk camilan favorit |
| **#15** | **Pempek Wak Ebot** (Vera) | Kuliner Olahan Ikan Pempek Palembang | `pempek-wak-ebot` | Kuliner Nusaloka BSD Tangsel | Spesialis pempek cuko asli |
| **#16** | **ZYVAS** (Nia Alina) | Fashion & Modest Wear | `zyvas` | IG: `@zyvas__`, Komunitas ASIPA Tangsel | Desain pakaian kontemporer |
| **#17** | **PT Niaga Citra Mandiri** | Perdagangan & Komoditas | `pt-niaga-citra-mandiri` | Badan usaha binaan ekspor | Rekap Pak Eeng |
| **#18** | **RHR Snack** (Kerupuk RHR) | Aneka Kerupuk & Kripik Renyah | `rhr-snack` | Kerupuk olahan khas Tangsel | Rekap Pak Eeng |
| **#19** | **Ery Mamaw** | Kuliner Rumahan Tangsel | `ery-mamaw` | Aneka olahan lauk praktis | Rekap Pak Eeng |
| **#22** | **Rosniati** | Makanan Kering & Olahan Pangan | `rosniati` | Binaan Disperindag Tangsel | Rekap Pak Eeng |
| **#23** | **Eni Chandra Shanti** | Kerajinan & Olahan Kreatif | `eni-chandra` | Chat masuk minat kartu NFC | Menunggu pengiriman data final |
| **#24** | **Jahe Hayatiqu** (Nanik Haryati) | Minuman Herbal Jahe Merah Instan | `jahe-hayatiqu` | IG: `@jahemerah_hayatiqu`, CV SR Herbal | Minuman rimpang higienis |
| **#25** | **OChokat** (Bela) | Olahan Cokelat & Artisan Cacao | `ochokat` | Toko cokelat Griya Loka BSD | Produk cokelat artisan |
| **#26** | **FENNYCROCHE** (Fenny Luckyharti) | Kriya Rajut & Handmade Crochet | `fennycroche` | IG: `@fennycroche`, Dekranasda Tangsel | Tas & aksesori rajutan tangan |
| **#28** | **ELLETA** (Joanita Kusumawati) | Wastra Batik & Tenun Modern | `elleta` | IG: `@elleta.official` / `@elleta.butik` | **PRIORITAS CHAT**: Minta kartu Google Review! |
| **#29** | **Kartika Bela** | Kuliner & Makanan Ringan | `kartika-bela` | Camilan khas keluarga | Rekap Pak Eeng |
| **#30** | **Snapclean** (Estie K.W) | Cleaning Chemicals & Deterjen Ramah Lingkungan | `snapclean` | Web: `https://snapclean.co.id`, Aset tersimpan di `/brand/snapclean/` | Pabrik BSD Tangsel, aset riil siap |
| **#32** | **Nurazlinda** | Fashion & Aksesoris Muslimah | `nurazlinda` | Binaan Disperindag Tangsel | Rekap Pak Eeng |
| **#33** | **Fevy** | Handycraft & Pernik Dekorasi | `fevy` | Kriya Tangsel | Rekap Pak Eeng |
| **#34** | **Health Today** (Kevin) | Sirup, Powder & Beverage Solutions | `health-today` | Web: `https://healthtoday.id`, IG: `@healthtodayindonesia`, Logo SVG di `/brand/health-today/` | Suplai horeca terkemuka |
| **#36** | **Batinos Pastry** (Dewi Anwar) | Artisan Pastry, Kue Kering & Bolu | `batinos-pastry` | IG: `@batinos.pastry`, Ciputat Timur | Pastry & cake premium |
| **#37** | **Meraki** (Lala) | Handmade Crafts & Gift Goods | `meraki` | Binaan UMKM Tangsel | Kriya artistik |
| **#38** | **GiGa Tech** | Teknologi & Digital Solution | `giga-tech` | Inovasi perangkat lunak / hardware | Rekap Pak Eeng |
| **#39** | **Lalisha Food** (Haris) | Kuliner Seblak Instan & Makanan Siap Saji | `lalisha-food` | IG: `@lalishafood`, Gerai Lengkong Tangsel | Kuliner pedas instan viral |
| **#40** | **Tokibi Coffee** (Yuda) | Artisan Roastery & Kopi Spesialti Tangsel | `tokibi-coffee` | IG: `@tokibicoffee` | Kopi kurasi TEI |
| **#41** | **Mba' Wanti** (Darwanti) | Kuliner Olahan Tradisional | `mba-wanti` | Olahan bumbu & masakan Jawa | Rekap Pak Eeng |
| **#42** | **Datik Batik** (Datik Daryanti) | Batik Wastra Motif Khas Tangsel | `datik-batik` | IG: `@datikbatik`, Pamulang Tangsel | Motif Blandongan & Anggrek Tangsel |
| **#43** | **Peddler Indonesia** | Sepatu / Apparel / Lifestyle | `peddler-indonesia` | Produk lifestyle kasual | Rekap Pak Eeng |
| **#44** | **Dodol Betawi Haji Imang** (Sri Liana) | Dodol Legendaris Betawi Asli | `dodol-betawi-haji-imang` | IG: `@dodolbetawi.hajiimang`, Pondok Cabe Pamulang | Berdiri sejak 1974, ikon kuliner |
| **#45** | **Larrisa Food** (Ifa) | Kuliner Frozen & Camilan | `larrisa-food` | Frozen food & bakery | Rekap Pak Eeng |
| **#46** | **CV Makmur Jaya Sentosa** (Sri Sabbahatun) | Perdagangan & Suplai Umum | `cv-makmur-jaya-sentosa` | Binaan Disperindag Tangsel | Rekap Pak Eeng |

---

## 🚀 3. TUGAS DETAIL UNTUK CHATGPT (ACTION PLAN E2E)

### TUGAS 1: HASILKAN BATCH SHOWCASE LENGKAP UNTUK 39 TENANT SISA
1. **Buat file data JSON** di `src/data/showcases/<slug>.json` untuk masing-masing tenant (mengikuti format standar seperti `md-organic.json`, `aranomiya.json`, atau `zahhab.json`).
   - Sertakan metadata palet warna (`bg`, `ink`, `accent`, `surface`).
   - Sertakan `story`, `stats`, `highlights`, `commercialBlocks`, `gallery`, dan tautan `actions` (WhatsApp, Instagram, Web/Marketplace).
   - Manfaatkan aset riil yang sudah terunduh di `/brand/snapclean/`, `/brand/health-today/`, dan `/brand/md-organic/`. Untuk tenant lainnya gunakan aset visual ilustratif SVG atau hero foto tematik berkualitas tinggi (bebas distorsi).
2. **Buat file halaman Astro** di `src/pages/tenant/<slug>.astro`:
   ```astro
   ---
   import BaseLayout from '../../layouts/BaseLayout.astro';
   import SmartNfcShowcase from '../../components/SmartNfcShowcase.astro';
   import config from '../../data/showcases/<slug>.json';

   const baseUrl = import.meta.env.BASE_URL;
   const tenant = {
     name: '<Nama Brand>', slug: '<slug>', hall: '8', booth: '8-7C',
     category: '<Kategori>',
     description: '<Deskripsi Singkat>',
     theme: '<theme>',
     website: '<URL Web/IG>',
     instagram: '<URL IG>',
     whatsapp: '<URL WA>',
     researchStatus: 'primary-source-checked', verifiedAt: '2026-10-13'
   };
   const structuredData = {
     '@context': 'https://schema.org', '@type': 'Organization', name: tenant.name,
     url: tenant.website, telephone: '+62 ...', sameAs: [tenant.instagram]
   };
   ---
   <BaseLayout title={`${tenant.name} — Tangsel TradeLink`} description={tenant.description} theme={tenant.theme}
     canonical={`${baseUrl}tenant/${tenant.slug}`} image={config.heroImage} structuredData={structuredData}>
     <SmartNfcShowcase tenant={tenant} config={config} baseUrl={baseUrl} />
   </BaseLayout>
   ```
3. **Daftarkan seluruh 39 slug baru** ke dalam file master `src/data/tenants-extra.json` agar muncul di direktori utama, pencarian direktori, dan peta booth.

---

### TUGAS 2: TINDAK LANJUT CHAT KLIEN & PENAGIHAN (WHATSAPP GATEWAY)
Bantu Bos membalas chat WA klien menggunakan gaya komunikasi sopan, profesional, dan to the point:

1. **Tagihan & Approval 4 Klien Data Lengkap (Transfer Rp150.000 BCA 5475815766 a.n. Najmi Syaula):**
   - **ARANOMIYA (0815-8654-2838):**
     * Link: `https://mycustomid.github.io/tangsel-tradelink/tenant/aranomiya`
     * Pesan: *"Selamat sore Bu/Kak Shasty (ARANOMIYA). Salam, saya Fadjar dari tim teknis My AI Custom & Pak Eeng. Profil digital untuk kartu Smart NFC TEI 2026 ARANOMIYA sudah aktif dan siap dicek di tautan berikut: https://mycustomid.github.io/tangsel-tradelink/tenant/aranomiya. Silakan dicek kelengkapannya. Untuk proses cetak fisik kartu NFC, pembayaran sebesar Rp150.000 dapat ditransfer ke BCA 5475815766 a.n. Najmi Syaula. Mohon kirimkan bukti transfer jika sudah ya Bu. Terima kasih!"*
   - **DBumbu Aurelshop (0812-8060-3913):**
     * Link: `https://mycustomid.github.io/tangsel-tradelink/tenant/dbumbu-aurelshop`
     * Pesan: *"Selamat sore Ibu Henny (DBumbu Aurelshop). Salam, saya Fadjar dari tim teknis My AI Custom & Pak Eeng. Profil digital Smart NFC Ibu sudah selesai dibuat dan dapat dicek di: https://mycustomid.github.io/tangsel-tradelink/tenant/dbumbu-aurelshop. Untuk pencetakan kartu fisik seharga Rp150.000 all-in bisa ditransfer ke BCA 5475815766 a.n. Najmi Syaula. Terima kasih Bu!"*
   - **Zahhab Healthy Drink (Kak Ety):**
     * Link: `https://mycustomid.github.io/tangsel-tradelink/tenant/zahhab`
     * Pesan: *"Selamat sore Kak Ety (Zahhab Healthy Drink). Salam, saya Fadjar tim teknis My AI Custom rekanan Pak Eeng. Tautan showcase digital Zahhab sudah live dan aktif di: https://mycustomid.github.io/tangsel-tradelink/tenant/zahhab. Untuk finalisasi kartu Smart NFC fisik Rp150.000, pembayaran dapat ditransfer ke BCA 5475815766 a.n. Najmi Syaula. Terima kasih Kak!"*
   - **Teh Telang Our Herb (0878-3820-9055):**
     * Link: `https://mycustomid.github.io/tangsel-tradelink/tenant/our-herb`
     * Pesan: *"Selamat sore Ibu Kumala (Our Herb). Salam, saya Fadjar tim teknis My AI Custom rekanan Pak Eeng. Profil kartu Smart NFC Our Herb sudah aktif di: https://mycustomid.github.io/tangsel-tradelink/tenant/our-herb. Mohon dicek kelengkapannya. Untuk cetak kartu fisik Rp150.000, silakan transfer ke BCA 5475815766 a.n. Najmi Syaula. Terima kasih Bu!"*

2. **Follow-up 2 Prospek Data Gantung:**
   - **Ladifa Collection (Bu Lia):**
     * Pesan: *"Selamat sore Bu Lia (Ladifa Collection). Salam, saya Fadjar tim IT Pak Eeng. Terima kasih sudah mendaftar kartu Smart NFC TEI 2026. Agar kartu dan profil web Bu Lia segera kami buatkan, boleh dibantu kirimkan: link Instagram, toko Shopee/Tokopedia, katalog produk, dan nomor WhatsApp utama yang ingin dipasang? Terima kasih Bu!"*
   - **Ibu Eni Chandra S:**
     * Pesan: *"Selamat sore Bu Eni Chandra. Salam, saya Fadjar dari tim IT Pak Eeng. Menyambung chat kemarin, apakah kelengkapan data usahanya sudah siap direkap Bu? Biar bisa langsung kami buatkan profil Smart NFC-nya bersama tenant lainnya. Terima kasih Bu!"*

3. **Klien Baru Minta Kartu Google Review:**
   - **ELLETA (Joanita Kusumawati - #28):**
     * Pesan: *"Selamat sore Ibu Joanita (ELLETA). Salam, saya Fadjar dari tim teknis My AI Custom & Pak Eeng. Terkait pesanan kartu Google Review dan profil TEI 2026 untuk ELLETA, datanya sedang kami siapkan. Kartu kami langsung terintegrasi dengan Google Review bisnis Ibu dan katalog web resmi. Biaya kartu Smart NFC adalah Rp150.000 all-in (BCA 5475815766 a.n. Najmi Syaula). Mohon kirimkan link Google Maps tempat usaha Ibu agar langsung kami settingkan ya Bu. Terima kasih!"*

---

## 📦 4. KELENGKAPAN OUTPUT YANG DIHARAPKAN DARI CHATGPT
Ketika ChatGPT menyelesaikan tugas ini, deliverable yang harus diserahkan kepada Bos adalah:
1. **Patch ZIP File Final:** Berisi seluruh folder `src/data/showcases/`, `src/pages/tenant/`, `public/brand/`, dan file `src/data/tenants-extra.json` yang sudah lengkap 100% untuk 46 tenant.
2. **Laporan Verifikasi Build:** Bukti bahwa `npm run build` berhasil dijalankan dan semua halaman ter-generate.
3. **Template Teks Chat WhatsApp:** Teks balasan rapi siap kirim untuk tiap tenant.

---

*Handover directive ini diperbarui pada 13 Oktober 2026 dengan hasil audit terverifikasi dan scraping multi-channel BlackArch Linux.*

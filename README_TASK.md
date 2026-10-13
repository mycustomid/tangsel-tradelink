# 📋 HANDOVER BRIEF & TASK DIRECTIVE: WA GATEWAY, REVISI TENANT & SMART NFC TEI 2026

Dokumen ini adalah instruksi operasional resmi untuk **ChatGPT** (atau agent pelaksana berikutnya) guna melanjutkan dan menuntaskan tugas dari **Bos (Donscarlos / Seto)**. Seluruh konteks, data kontak, pesan chat, rincian media/dokumen, serta file konfigurasi lokal telah disiapkan dan diverifikasi.

---

## 📌 1. RINGKASAN KONTEKS & SUMBER DATA
- **Event / Proyek:** Pendampingan digital peserta Trade Expo Indonesia (TEI) 2026 binaan Dinas Perindustrian dan Perdagangan (Disperindag) Kota Tangerang Selatan, serta layanan pemesanan **Kartu Smart NFC (Rp150.000 all-in)** via **My AI Custom**.
- **WA Gateway VPS Coolify:**
  - Host: `163.61.44.41` (Container PostgreSQL `rpncu70fwjngagj6hsgxuh1j`, DB `customerservice`).
  - **Nomor 1 (Pribadi Bos 8231):** `6285771518231` (Tenant `seto`, Tenant ID: `27e2d6fc-1364-4782-9360-548b07391854`).
  - **Nomor 2 (Official My AI Custom):** `6282121292938` (Tenant `ai custom`, Tenant ID: `be29e379-c096-4c74-ba6b-a232069d2b8a`).
- **Workspace Utama Proyek Lokal:**
  - Path: `D:\code\tangsel-tradelink\` (Astro 5 + Tailwind).
  - Status Build: `npm run build` berhasil 100% (103 halaman statis ter-generate tanpa error).

---

## 🎯 2. BREAKDOWN TUGAS & RINCIAN KLIEN

### TUGAS 1: REVISI TENANT "SAMARA FROM HOME" (FAYE YOLODY)
- **Kontak:** Bu Faye Yolody (`+62 856-1096-967` / `628561096967@s.whatsapp.net`).
- **File Terkait:**
  - Showcase JSON: `D:\code\tangsel-tradelink\src\data\showcases\samara-from-home.json`
  - Halaman Astro: `D:\code\tangsel-tradelink\src\pages\tenant\samara-from-home.astro`
- **Pesan & Rincian Revisi:**
  Bu Faye meminta landing page dibuat ringkas dan padat agar pengunjung tidak perlu scroll panjang:
  1. **Tagline:** *"Healthy, delicious cooking made easy for everyone"*
  2. **Brand Story:** Artisan cooking sauce & sambal rumahan berkualitas tanpa pengawet buatan untuk keluarga dan food service.
  3. **Pricelist (Dual Block):**
     - **Blok 1 (TEI 2026 Display - 3 Produk):** Rawon Sauce Paste (Rp120.000), Sambal Kecombrang (Rp75.000), Sambal Chili Padi (Rp75.000).
     - **Blok 2 (Package of 3 or More):** Paket reguler hemat untuk pembelian minimum 3 jar atau lebih.
  4. **Direct Channel Actions:**
     - WhatsApp: `https://wa.me/628561096967`
     - Instagram: `https://www.instagram.com/samara.fromhome/`
     - Google Review / Maps: `https://www.google.com/maps/search/?api=1&query=-6.305892,106.734535`
     - Shopee: `https://shopee.co.id/shop/284144746`
     - Tokopedia: `https://www.tokopedia.com/samarafromhome`
- **Aset Gambar Lokal:** Sudah tersedia di `D:\code\tangsel-tradelink\public\brand\` (`samara-real-1.webp`, `samara-feed-1.jpg`, `samara-feed-2.jpg`, `samara-feed-4.jpg`).

---

### TUGAS 2: PEMESANAN SMART NFC "PT HARMONI HARAPAN BERSAMA (HHB)"
- **Kontak:** Bu Fifi (`+62 818-0626-5777` / `6281806265777@s.whatsapp.net`).
- **Status Pembayaran:** Memesan 1 Kartu Smart NFC (Rp150.000), transfer ke rekening BCA 5475815766 a.n. Najmi Syaula.
- **File Terkait:**
  - Showcase JSON: `D:\code\tangsel-tradelink\src\data\showcases\hhb.json`
  - Halaman Astro: `D:\code\tangsel-tradelink\src\pages\tenant\hhb.astro`
- **Data Perusahaan & Profil NFC:**
  - **Nama Badan Usaha:** PT Harmoni Harapan Bersama (HHB)
  - **Bidang:** Freight Forwarding, EMKL, Pengurusan Kepabeanan (PPJK) & Logistik Ekspor TEI ICE BSD.
  - **Website Resmi:** `https://www.hhb.co.id` (atau `www.hhb.co.id`)
  - **Email Sales:** `Sales@hhb.co.id`
  - **Email Support:** `cs.hhb.2@gmail.com`
  - **Tautan Referensi Regulasi/Tarif Pemerintah (INSW):** `https://insw.go.id/intr`
  - **Data Estimasi Tarif Kontainer Priok (Referensi Kargo TEI):**
    - Local charges FOB Priok THC: 20ft USD 95/cont, 40ft USD 145/cont.
    - Doc fee pelayaran: USD 10–20, seal: USD 15–20.
    - Lift on / Lift off depo: USD 55 (20ft) / USD 70 (40ft).
    - Storage depo: USD 50 (20ft) / USD 70 (40ft).

---

### TUGAS 3: KLIEN DATA LENGKAP MY AI CUSTOM — ARANOMIYA
- **Kontak:** Perwakilan ARANOMIYA (`081586542838` via WA Gateway My AI Custom).
- **File Terkait:**
  - Showcase JSON: `D:\code\tangsel-tradelink\src\data\showcases\aranomiya.json`
  - Halaman Astro: `D:\code\tangsel-tradelink\src\pages\tenant\aranomiya.astro`
- **Data & Tautan Media Lengkap:**
  - **Nama Brand:** ARANOMIYA
  - **Kategori:** Lifestyle, Handicraft & Creative Living.
  - **Website:** `https://www.aranomiya.com`
  - **WhatsApp:** `https://wa.me/6281586542838` (`081586542838`)
  - **Instagram:** `https://www.instagram.com/aranomiya` (`@aranomiya`)
  - **Google Maps:** `https://maps.app.goo.gl/EoKbubpxvzuT18FL9`
  - **Dokumen Company Profile (PDF):** [OneDrive Download Link](https://1drv.ms/b/c/c00c80680b54ea76/IQDwQ8dO3VGgS64AyAREHuyOASF1UylBH2vxh5DLseoGxP0?e=Mt7LUx)
  - **Digital Contact Card (Image):** [OneDrive Image Link](https://1drv.ms/i/c/c00c80680b54ea76/IQCALOw2y4CyS4gtuA9qropqAU4bsX-Pdzptzb88zOf68Rw?e=ZwQJbp)

---

### TUGAS 4: KLIEN DATA LENGKAP MY AI CUSTOM — DBUMBU AURELSHOP
- **Kontak:** Ibu Henny Kartika (`081280603913` via WA Gateway My AI Custom).
- **File Terkait:**
  - Showcase JSON: `D:\code\tangsel-tradelink\src\data\showcases\dbumbu-aurelshop.json`
  - Halaman Astro: `D:\code\tangsel-tradelink\src\pages\tenant\dbumbu-aurelshop.astro`
- **Data & Tautan Media Lengkap:**
  - **Nama Usaha:** DBumbu Aurelshop
  - **Kategori:** Artisan Seasoning & Bumbu Masak Nusantara.
  - **WhatsApp Utama:** `https://wa.me/6281280603913` (`081280603913`)
  - **Instagram:** `https://www.instagram.com/aurelshop2018` (`@aurelshop2018`)
  - **Toko Shopee Official:** `https://www.shopee.co.id/aurelshop2018`
  - **Google Maps Lokasi:** `https://maps.app.goo.gl/kSZjhvxdMvS4dJyM9`

---

### TUGAS 5: KLIEN DATA LENGKAP MY AI CUSTOM — ZAHHAB HEALTHY DRINK
- **Kontak:** Kak Ety (`Ety~Zahhab💖` via WA Gateway My AI Custom).
- **File Terkait:**
  - Showcase JSON: `D:\code\tangsel-tradelink\src\data\showcases\zahhab.json`
  - Halaman Astro: `D:\code\tangsel-tradelink\src\pages\tenant\zahhab.astro`
- **Data & Tautan Media Lengkap:**
  - **Nama Brand:** Zahhab Healthy Drink
  - **Kategori:** Healthy Herbal Beverages & Wellness.
  - **Instagram:** `https://www.instagram.com/zahhab_head` (`@zahhab_head`)
  - **TikTok:** `https://www.tiktok.com/@Zahhab20` (`@Zahhab20`)
  - **YouTube:** `https://www.youtube.com/@zahhab2020` (`@zahhab2020`)
  - **Facebook:** `Zahhab Head`
  - **Snack Video:** `Zahhab Head`
  - **Shopee Official:** `Zahhab Official`
  - **Google Maps:** Sudah tercatat share link lokasi resmi.

---

### TUGAS 6: KLIEN DATA LENGKAP MY AI CUSTOM — TEH TELANG OUR HERB (OH)
- **Kontak:** Ibu Kumala A. Haryono (Peserta TEI binaan Dinas Indag).
- **File Terkait:**
  - Showcase JSON: `D:\code\tangsel-tradelink\src\data\showcases\our-herb.json`
  - Halaman Astro: `D:\code\tangsel-tradelink\src\pages\tenant\our-herb.astro`
- **Data & Tautan Media Lengkap:**
  - **Nama Brand:** Teh Telang Our Herb (OH)
  - **Kategori:** Artisan Herbal Tea & Butterfly Pea Flower.
  - **WhatsApp Bisnis:** `https://wa.me/6287838209055` (`087838209055`)
  - **WhatsApp Personal:** `https://wa.me/6281936814817` (`081936814817`)
  - **Instagram:** `https://www.instagram.com/ourherb.id` (`@ourherb.id`)
  - **Facebook:** `Kumala Our Herb`

---

### TUGAS 7: PROSPEK DALAM TAHAP FOLLOW-UP DATA
1. **Ladifa Collection (Bu Lia):**
   - Status: Sudah menyatakan daftar dan mengirim foto sampel kartu Smart NFC. Menunggu kelengkapan link resmi (katalog, sosmed).
2. **Ibu Eni Chandra S:**
   - Status: Sudah konfirmasi minat kartu ("Bentar ya msh ada wkt khan"), sedang menyiapkan data.

---

## 🛠️ 3. INSTRUKSI TEKNIS UNTUK CHATGPT

1. **Jaga Lokasi File di Drive D: (`D:\code\tangsel-tradelink\`):**
   - Dilarang membuat proyek di Drive C: sesuai *Disk C Preservation Protocol*.
2. **Validasi & Verifikasi Build:**
   - Setiap kali melakukan penyesuaian desain atau data pada Astro:
     ```powershell
     cd D:\code\tangsel-tradelink
     npm run build
     ```
   - Pastikan seluruh rute `/tenant/<slug>/index.html` berhasil dibuat.
3. **Penyelarasan Desain:**
   - Pertahankan estetika warm editorial light-mode sesuai standar Awwwards / Indonesian Public Service Design System (`#faf7f2`, serif/sans hierarki rapi, touch target 48px).
4. **Git Operasi (Jika Diminta Push oleh Bos):**
   - Username: `Ddos-spec`
   - Email: `setgraph69@gmail.com`
   - Master Personal Access Token atau Fine-grained PAT yang sah.

---

*Dokumen ini dibuat otomatis pada 13 Oktober 2026. Semua link, data kontak, dan konfigurasi telah diverifikasi valid dan aktif.*

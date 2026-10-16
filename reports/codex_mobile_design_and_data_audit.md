# Audit mobile, arsitektur, dan data Tangsel TradeLink

Tanggal: 16 Oktober 2026 (Asia/Jakarta). Mandat: `scripts/codex_audit_prompt.txt`.
Snapshot Git: `d3d052b80c6ee1bfdd23c41bc02995b5f95a9361`.

## 1. Putusan audit dan batas pekerjaan

**Belum memenuhi spesifikasi mobile NFC yang diminta.** Fondasi static rendering, prioritas hero, lazy gallery, rasio gambar yang dapat dikonfigurasi, fokus keyboard, dan ukuran tombol Smart NFC sudah berguna. Namun, galeri Smart NFC belum horizontal, detail komersial belum dapat dilipat, dock tidak konsisten antarkomponen, dan masih ada kesalahan aset serta tautan. Lulus unit test tidak membuktikan kelengkapan UX atau keaslian data.

Deliverable ini adalah audit dan spesifikasi implementasi. **Audit ini tidak mengubah** kode aplikasi, konfigurasi tenant, dependency, atau test; tidak ada commit/push/deploy. Rekomendasi dan contoh berikut belum diterapkan oleh pekerjaan audit. File `reports/codex_prompt.txt` sudah untracked sebelum pekerjaan dan dipertahankan. Selama audit, proses lain mengubah `src/pages/tenant/shayfara.astro` dan `src/components/SmartNfcShowcase.astro`, serta menambah aset untracked Amood, Tempe Azaki, dan Toyota. Semua perubahan tersebut dipertahankan tanpa ditimpa. Bagian temuan mencatat snapshot sweep awal, dengan status pemeriksaan akhir untuk perubahan yang relevan.

**Penyegaran akhir:** route Shayfara kini mengimpor `shayfara.json`, sehingga jumlah config terpakai berubah 72→73. Dock Samara kini memakai resolver base path dan label WhatsApp/Katalog; PDF yang sebelumnya 404 telah diuji ulang **200** pada build terakhir. Perubahan ini berasal dari proses lain. Overflow Daniscakelicio/Fennycroche tetap terulang pada pemeriksaan itu. Test/build diulang setelah kedua file source berubah: 139/139 test dan 156 halaman berhasil. Bukti tambahan `final-focused.json` mencakup empat route, sehingga total pemeriksaan browser 98 skenario (94 sweep awal + 4 akhir). **Setelah snapshot build/browser tersebut, proses lain juga mengubah `src/styles/mobile-nfc.css`; perubahan CSS susulan itu tidak tercakup dalam bukti build/browser laporan ini.** Test unit terakhir disimpan terpisah di `npm-test-close.log`. Temuan mobile berikut merujuk snapshot terukur, bukan klaim bahwa perubahan paralel terbaru belum memperbaikinya.

Semua keluaran audit, cache npm yang dikendalikan audit, temp proses pengujian, screenshot, dan log ditujukan ke workspace D:. Tidak ada perintah penulisan ke C: yang disengaja. Pembacaan tool/skill dari instalasi C: diperlukan; efek internal CLI plugin di direktori profil tidak dapat dijamin oleh audit ini. Tidak ada instalasi plugin. `codex plugin list` diperiksa melalui CLI asli karena wrapper lokal menambahkan opsi profile yang tidak didukung subcommand tersebut.

## 2. Metode dan cakupan bukti

- Membaca Graphify lebih dahulu: `graphify-out/graph.json`, 349 node; menelusuri keluarga Smart NFC, Rich/EnhancedRich, route dinamis, favicon, dan test. Graph hanya petunjuk navigasi; seluruh temuan di bawah diverifikasi dari source/runtime sekarang.
- Menginventarisasi **74/74 JSON** showcase; memetakan import ke route, actions, metadata verification, legalitas berupa teks, hero/gallery/logo/favicon, SHA-256 aset lokal, URL identik, dan dimensi/ukuran raster.
- Menjalankan **94 skenario browser**: 74 route pada 390×844, 18 pemeriksaan tambahan pada 320/620/621/820/821/1440 px untuk Aranomiya, Samara, dan MY-AICUSTOM, serta dua skenario JavaScript nonaktif. Ini pengujian Chromium desktop dengan emulasi viewport/touch, bukan bukti perangkat Android/iPhone fisik atau Safari.
- Memaksa pemuatan lazy images untuk menguji ketersediaan; mengukur computed CSS, overflow dokumen, dock, heading, galeri, favicon lokal, dan console/page errors. Screenshot terpilih dan sepuluh contact sheet raster lokal ditinjau visual. SVG dan gambar remote yang tidak masuk contact sheet tetap diperiksa availability-nya melalui browser; keaslian semua foto remote tidak dinyatakan terverifikasi.
- Inspeksi standar: `node D:\code\.system_tools\browser_runner\inspect.js http://127.0.0.1:4367/tangsel-tradelink/tenant/aranomiya D:\code\tangsel-tradelink\output\playwright\codex-audit\inspect-aranomiya.png`.
- Menguji built output memakai `astro preview`, sehingga base path GitHub Pages ikut diuji. Tidak memakai localhost dev sebagai satu-satunya bukti.

Folder bukti lokal: [`../output/playwright/codex-audit/`](../output/playwright/codex-audit/). Folder ini di-ignore Git. File utama: `inventory.json`, `browser-results.json`, `browser-summary.log`, `supplemental.json`, `npm-test.log`, `build.log`, `semgrep.json`, serta screenshot `*-390.png` dan `contact-sheet-01.jpg` sampai `contact-sheet-10.jpg`. Laporan ini tetap memuat angka dan temuan penting agar dapat dibaca tanpa folder bukti.

**Batas keaslian:** URL yang diterbitkan di JSON, status `verified-authoritative`, dan `checkedAt` adalah data proyek, bukan verifikasi ulang kepemilikan kontak atau sertifikat. Audit tidak mengirim WhatsApp, email, atau formulir; tidak memeriksa seluruh kontak ke pemilik usaha atau seluruh registrasi ke otoritas. Jangan menafsirkan kolom kosong sebagai usaha tidak memiliki izin.

## 3. Temuan prioritas

| ID | Prioritas | Temuan, bukti, dan dampak | Spesifikasi tindak lanjut |
|---|---|---|---|
| M01 | P1 → teratasi pada cek akhir | Pada snapshot awal `SmartNfcShowcase.astro:324` menggunakan `href={action.url}` untuk dock, sementara hero dan contact grid memakai `resolveLink`. Tombol **Open** Samara mendapat **404** di `/docs/...`. Proses lain kemudian memasang `resolveLink`; build akhir menghasilkan tombol **Katalog** dengan `/tangsel-tradelink/docs/...`, diuji **200**. | Pertahankan resolver yang sama dan tambah regression test untuk built base path. Label **Menu PDF** lebih spesifik daripada Katalog. |
| M02 | P1 | Viewport 390: dokumen Daniscakelicio melebar menjadi **498 px**, Fennycroche **449 px**. Elemen `.hero-copy`, h1, dan `.hero-visual` melampaui layar. `grid-template-columns:1fr` masih mempertahankan kontribusi minimum konten; judul panjang tidak memiliki wrap yang memadai. | Terapkan `minmax(0,1fr)`, `min-inline-size:0`, dan `overflow-wrap:anywhere` secara terarah. Jangan menutup cacat dengan `overflow-x:hidden` global. |
| M03 | P1 | Galeri Smart NFC adalah grid satu kolom pada ≤620; computed `scroll-snap-type:none`, `overflow-x:visible`, `mask-image:none` (Aranomiya dan Samara). Tidak ada counter. `mobile-nfc.css:138-154` hanya menargetkan `.premium-onepage`/`.rk-onepage`. | Satu primitive gallery untuk Smart dan premium; scroll snap, counter aktual, fade tepi kondisional, dan navigasi keyboard. |
| M04 | P1 | Eni Chandra `gallery[0]` menampilkan botol/minuman merah, tetapi label **Karya Kriya Ecoprint & Fashion** dan caption membahas kain (`eni-chandra.json:83-85`). | Koreksi image/label berdasarkan bukti pemilik. Jangan menulis ulang caption untuk membenarkan foto yang belum dipastikan miliknya. |
| M05 | P1 | Fennycroche `logo` dan `favicon` menunjuk `fennycroche-gallery-5.jpg`, yang secara visual berupa botol parfum, bukan identitas crochet (`fennycroche.json:6-7`, contact sheet 04). | Ganti dengan logo tenant yang disetujui; sampai ada bukti, monogram berlabel lebih jujur daripada foto produk lain. |
| M06 | P1 | Ladifa `logo`/`favicon` adalah raster berisi bidang warna/cyan-magenta, bukan wordmark terbaca (`ladifa-collection.json:6-7`, sheet 05). | Konfirmasi aset logo asli; cek render 16/32/48 px, bukan sekadar file exists. |
| M07 | P1 | Galeri Health Today G2–G4 berisi logo Fore, Maxx Coffee, Union. Caption memang menyebut mitra, tetapi diletakkan dalam galeri produk (`health-today.json:83-97`, sheet 04). | Pisahkan `partners[]` dari `gallery[]`; klaim hubungan pelanggan perlu sumber yang cocok. Logo mitra bukan foto produk. |
| M08 | P1 | Foto kartu nama/kontak dipakai sebagai hero dan logo: Amood, Arjuna 68, Bopet Pagaruyung, Kusuma Kencana Mulya, The Munching Queen. Snack Santuy memakai foto brosur reseller yang dipegang tangan. Sheet 01/05/09. Tidak ada gallery pada keenam profil ini. | Bedakan peran `contact-document`, `brand-logo`, dan `product`. Minta foto produk serta logo; jangan crop kartu nama menjadi logo. |
| M09 | P1 | Snapshot browser memuat **9 instance gambar gagal** pada **6 route**: Morris (2), Clean Matic (1), Dragon (1), HIMKI (1), Sinar Mas Land (2), Tatalogam (2). Inline `onerror` dapat menyembunyikan elemen sehingga kegagalan tidak selalu terlihat sebagai console error. | Simpan salinan berizin di lokal, rekam provenance/checksum, fallback terlihat, serta audit status dan decoding gambar. Jangan menganggap hotlink stabil. |
| M10 | P2 | Dock Smart memiliki target 52 px; awalnya label Contact/Open. Perubahan proses lain memperjelas sebagian label, tetapi IG/marketplace masih Hubungi/Buka pada cek akhir. Urutan hanya `actions.slice(0,2)`. Single action tetap dua kolom. Dock hilang pada 621–820 px; Aranomiya pada 820 px memulai h1 di **y≈930 px**. | Prioritas action eksplisit: kontak/WA lalu katalog atau aksi kontekstual; satu tombol memenuhi lebar; pertimbangkan dock sampai 820 px dan batasi tinggi hero tablet. |
| M11 | P2 | Dock MY-AICUSTOM pada 390 px tingginya **130 px** dengan dua tombol ditumpuk, bukan dua kolom. `RichTenantShowcase.astro:338` menetapkan `.hero-actions{grid-template-columns:1fr}` dan menang dalam cascade. Maps/website menjadi dua aksi teratas; WhatsApp ada di contact list, bukan dock. | Satukan ownership dock CSS dan prioritas action; ukur computed style setiap keluarga template. |
| M12 | P2 | Detail komersial Smart adalah section/article terbuka (`SmartNfcShowcase.astro:163-203`), bukan details/summary. Samara menampilkan gambar pricelist tinggi dengan `loading="eager"`. Aranomiya ≈5352 px dan Samara ≈4413 px pada 390×844 dalam kondisi ukur audit. | Accordion native untuk commercial/pricelist, tetap dapat dibaca tanpa JS; pricelist lazy dan link file asli jelas. Angka tinggi ini pengukuran snapshot, bukan skor performa. |
| M13 | P2 | Smart tidak memiliki feedback `:active`, `@starting-style`, atau easing spring. Reduced-motion hanya menonaktifkan smooth scroll; transisi gambar 0.4s tetap aktif. Rich memiliki :active dan reveal observer, tetapi baseline `.reveal{opacity:0}` menyembunyikan **29 elemen MY-AICUSTOM ketika JS mati**. | Motion sebagai progressive enhancement; baseline visible, reduced-motion mematikan transisi/animasi dekoratif. Starting-style bukan scroll observer. |
| D01 | P2 | **13 JSON** mengulang hero sebagai G1 melalui URL sama atau hash byte sama; Cuan Dong juga memiliki komposisi hero/G1 sama dengan dHash 0 meskipun encoding berbeda. | Dedup berdasarkan peran/isi, bukan nama file. Jangan menghapus otomatis tanpa menilai kebutuhan konteks. |
| D02 | P2, sebagian diperbaiki proses lain | Awalnya 72 config direferensikan dan dua orphan. Inventaris akhir: **73 config terpakai**, satu orphan `buminaeenk-freeze-dried`; /shayfara sudah mengimpor `shayfara.json`, sedangkan /fevy tetap memakai `fevy.json` untuk usaha yang sama. `titik-kurniasih.json` masih dipakai titik-kurniasih/ninauka. | Tetapkan config/route kanonik dan alias eksplisit; jumlah file, route, dan usaha unik harus dibedakan. |
| D03 | P2 | `SmartNfcShowcase.astro:26` menggunakan label Primary/client data checked sebagai fallback untuk status lain, termasuk metadata verification yang tidak dicatat. Sebanyak 14 JSON tidak memiliki field verification. | Status unknown/pending harus mendapat label netral; jangan menampilkan checked tanpa bukti per klaim. |
| A01 | P2 | Mandat menyebut Astro 5 + Tailwind v4, tetapi `package.json:13-15` dan instalasi aktual memakai **Astro 7.3.0**, tanpa dependency/integrasi Tailwind. CSS utama native. | Catat deviasi stack; keputusan migrasi/version pin adalah pekerjaan terpisah. Jangan downgrade/install framework dalam audit. |

P1 = menghambat aksi, identitas, integritas konten, atau pembacaan mobile. P2 = kekurangan spesifikasi/ergonomi/maintainability. Tidak ada klaim bahwa SAST tanpa temuan berarti semua risiko keamanan hilang.

## 4. Arsitektur dan ergonomi mobile

Alur aktif: `BaseLayout.astro:2` mengimpor mobile CSS global; halaman tenant memasukkan Smart NFC atau EnhancedRich → Rich, sedangkan `[slug].astro:40-56` memilih konfigurasi premium untuk sebagian tenant. Global CSS mengasumsikan hanya keluarga premium lama, sehingga kontrak mobile berbeda tanpa disengaja. Favicon diselesaikan oleh `tenant-utils.mjs:91-116`, lalu prefix/MIME/fallback ditangani BaseLayout.

### Matriks batas viewport yang diukur

| Rentang | Smart NFC saat ini | Dampak ergonomi | Target spesifikasi |
|---|---|---|---|
| ≤620 px | Hero visual di atas heading, kontak hero disembunyikan, dock fixed dua kolom 52 px; semua galeri/highlight/facts/commercial satu kolom. | Tombol mudah dijangkau, tetapi scroll panjang, nama usaha dapat terlambat muncul, judul panjang bisa overflow. | Dock 1–2 aksi 48–56 px, teks kanal jelas; galeri swipe; commercial terlipat. |
| 621–820 px | Hero tetap di atas heading, dock display none, action kembali inline sesudah heading. | Pada HP landscape/tablet kecil, aksi tidak persisten dan dapat berada di bawah fold. Aranomiya 820: h1 y≈930. | Pilih batas dock 820 secara eksplisit, hero maksimum sekitar 50–56svh sebagai arah desain; uji 621 dan 820. |
| ≥821 px | Hero dua kolom; galeri dua kolom; tanpa dock mobile. | Layout desktop lebih ringkas, tetapi perubahan tepat 820→821 sangat besar. | Pertahankan desktop, uji 821 dan judul/rasio portrait; jangan paksa crop. |

Ukuran 52 px Smart memenuhi minimum mandat 48 px pada viewport yang diukur. Pada 320 px dua tombol masing-masing 135×52; pada 390 px 170×52. Belum ada bukti physical thumb reach pengguna tangan kiri/kanan. Jarak tepi dan safe-area sudah diperhitungkan (`bottom:max(12px,env(...))`); perlu uji notch/home indicator nyata, keyboard virtual, landscape, text scaling 200%, dan link panjang. `body` padding dari CSS global ditambah padding Smart 96 px menciptakan kompensasi ganda pada ponsel. Scope clearance ke halaman yang benar-benar memiliki dock, bukan seluruh situs.

Craft (penilaian desain, bukan sertifikasi Awwwards): serif headline/palette tenant memberi arah editorial yang masuk akal. Namun label generik Contact/Open, heading berulang “Brand & product context”, tumpukan card bersudut bulat/shadow, gambar kontak sebagai hero, dan minim petunjuk swipe mengurangi karakter/kepercayaan. Prioritaskan foto produk otentik, hierarki nama–produk–aksi, detail tipografi terbaca (topbar saat ini .58rem ≈9.3 px), dan hubungan caption dengan gambar. Hindari menambah efek blur/shadow ke semua kartu; backdrop blur fixed harus diukur pada HP lemah sebelum menjadi default.

## 5. Ringkasan data 74 JSON

| Pemeriksaan | Hasil snapshot | Interpretasi |
|---|---:|---|
| File showcase valid JSON | 74/74 | Berbeda dari jumlah usaha unik/route. |
| Config dirujuk route | 73/74 pada inventaris akhir | Awalnya 72/74; 74 route hasil pemetaan. Usaha unik tetap perlu normalisasi alias. |
| Hero terisi | 74/74 | Bukan bukti berupa foto produk asli. |
| Hero SVG | 28/74 | Sebagian adalah aset ilustratif/placeholder; tidak otomatis salah atau foto otentik. |
| Gallery kosong | 30/74 | 44 punya gallery; kebutuhan gallery bergantung jenis usaha. |
| WhatsApp pada actions | 41/74 | Berdasarkan host WA, bukan nomor ditebak dari teks/kartu. |
| Instagram pada actions | 41/74 | Berdasarkan host Instagram. |
| Key `website` pada actions | 53/74 | Mencakup microsite, direktori, dan artikel; **bukan 53 website resmi terverifikasi**. |
| Marketplace pada actions | 14/74 | Host marketplace; WhatsApp catalog dipisahkan. |
| Tidak ada actions | 6/74 | Ery Mamaw, Euis Siti Khodijah, Kartika Bela, Meraki, Nurazlinda, Peddler Indonesia. |
| Metadata verification + tanggal + sources | 60/74 | Tanggal dan sumber tersedia, kepemilikan/kesesuaian harus dinilai per klaim. |
| `logo` eksplisit | 30/74 | Setidaknya beberapa salah peran/identitas; bukan 30 logo sah. |
| `favicon` eksplisit | 31/74 | Semua file lokal eksplisit ditemukan; provenance tidak otomatis resmi. |
| Hero = G1 (URL/hash) | 13/74 | Daftar lengkap di lampiran. |
| Local hero/gallery/logo/favicon hilang | 0 | Remote diuji terpisah; ini tidak mencakup setiap attachment/testimonial. |

**Kontak dan label:** situs/brand profile WordPress/Canva/shortlink dapat sah, tetapi perlu status “microsite/redirect” dan sumber. `website` Aranomiya/Lalisha/Tokibi adalah InaExport, Den Bagus artikel Tangsel Pos, Dodol Haji Imang Linktree, Fevy/Shayfara s.id. Jangan tampilkan semuanya sebagai corporate website. Fevy dan Shayfara memakai `wa.me/c/...`: itu **catalog WA**, bukan deep link chat langsung. Jangan mengubahnya menjadi endpoint chat tanpa memastikan nomor/intent. Tidak ada pesan uji dikirim.

**Legalitas:** pencarian teks menemukan P-IRT/SPP-IRT pada **10** file, Halal pada **21**, NIB pada **2**, BPOM pada **9**. Angka ini hanya mention: termasuk jasa pengurusan legalitas PT Cosmar, “bersih & halal”, dan referensi positioning. Tidak ada struktur `certifications[]` yang menyimpan jenis, nomor, entitas, produk, penerbit, masa berlaku, serta sumber. Hanya Eni Chandra memuat string nomor P-IRT yang eksplisit di caption (`206351701072128-26`); belum divalidasi ke registri. Halal ID, NIB, dan nomor BPOM tidak tersedia sebagai field identifier yang dapat diaudit. Logo Halal dalam foto Samara merupakan bukti visual label, bukan hasil pemeriksaan sertifikat. Untuk industri nonpangan jangan memaksa P-IRT/BPOM sebagai kelengkapan wajib.

**Favicon:** pada 74 route terukur: 39 menggunakan URL lokal, 10 layanan favicon Google, 25 data-URI monogram. Seluruh favicon lokal utama yang diminta audit merespons 200. Resolver dapat menggunakan logo, favicon tenant, ikon Google, hero foto produk, atau monogram: **ikon ada ≠ favicon resmi ada**. Audit ini tidak membuktikan kepemilikan 74 favicon. Untuk SVG, BaseLayout juga mengarang alternate `.png`; pastikan file benar-benar disediakan ketika merapikan pipeline. Google favicon menambah dependensi pihak ketiga. Favicon JPG/WebP foto kartu/parfum tidak layak lolos QC hanya karena browser bisa membukanya.

## 6. Spesifikasi teknis CSS/HTML yang disarankan

Contoh di bagian ini adalah kontrak implementasi, bukan patch aplikasi. Nama data-attribute/class baru perlu dipasang pada template dan diuji terhadap seluruh varian.

### 6.1 Dock dan overflow

Simpan dock sebagai anak langsung main/layout di luar ancestor yang ditransform/filter untuk reveal. Gunakan satu resolver URL untuk hero, dock, gallery-link, PDF, dan contact grid; resolver wajib menghormati `BASE_URL`, URL absolut, `mailto:`, serta `tel:` dan menolak scheme eksekutabel. Pilih `primaryActions` berdasarkan key/prioritas bisnis, bukan posisi mentah. Jangan mengubah nomor publik berdasarkan perkiraan.

```astro
<nav class="mobile-quick" aria-label={`${label}: akses cepat`}>
  {primaryActions.map((action) => (
    <a href={resolveLink(action.url)} target="_blank" rel="noopener noreferrer">
      <BrandIcon name={iconKey(action.key)} />
      <span>{action.label}</span>
    </a>
  ))}
</nav>
```

```css
.smart-nfc .nfc-hero { grid-template-columns: minmax(0, 1fr) minmax(0, .82fr); }
.smart-nfc .nfc-hero > * { min-inline-size: 0; }
.smart-nfc h1 { overflow-wrap: anywhere; }
.mobile-quick { display: none; }
@media (max-width: 820px) {
  .smart-nfc .nfc-hero { grid-template-columns: minmax(0, 1fr); }
  .smart-nfc[data-has-dock] {
    padding-block-end: calc(104px + env(safe-area-inset-bottom, 0px));
  }
  .smart-nfc .mobile-quick {
    position: fixed; z-index: 80; inset-inline: 12px;
    bottom: max(12px, env(safe-area-inset-bottom, 0px));
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px; padding: 8px; border-radius: 18px;
    background: var(--nfc-bg);
    border: 1px solid color-mix(in srgb, var(--nfc-ink) 16%, transparent);
  }
  .smart-nfc .mobile-quick a {
    min-block-size: 52px; min-inline-size: 48px; padding: 10px 12px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    touch-action: manipulation; text-align: center; overflow-wrap: anywhere;
    transition: transform 160ms cubic-bezier(.2,.8,.2,1), background-color 160ms;
  }
  .smart-nfc .mobile-quick a:only-child { grid-column: 1 / -1; }
  .smart-nfc .mobile-quick a:active { transform: scale(.97); }
  .smart-nfc .mobile-quick a:focus-visible {
    outline: 3px solid var(--nfc-accent); outline-offset: 3px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .smart-nfc .mobile-quick a { transition: none; }
}
```

Pasang `data-has-dock` hanya ketika aksi tersedia. Jika aturan lama `.hero-actions{display:none}` tetap aktif, pastikan CTA hero/dock tidak hilang keduanya pada breakpoint baru. Bila label membungkus dua baris, ukur dock aktual dan naikkan clearance; angka 104 px bukan jaminan pada text scaling 200%. Terapkan primitive yang sama secara eksplisit ke Rich/Roemah dengan token warnanya, lalu hapus aturan yang saling mengalahkan. Hindari duplikasi body padding global.

### 6.2 Gallery native dengan kontrol dan counter nyata

Struktur wrapper terpisah menjaga caption dan tombol tidak ikut di-mask. Buat ID unik per instance; caption di dalam figure, tautan galeri membungkus figure jika diperlukan. `aria-labelledby` harus mengacu pada heading nyata.

```html
<section class="nfc-section" aria-labelledby="visual-title">
  <h2 id="visual-title">Produk dan detailnya</h2>
  <div class="gallery-window" data-gallery>
    <div class="gallery" id="tenant-gallery" tabindex="0"
         role="region" aria-label="Galeri produk, geser untuk melihat foto berikutnya">
      <!-- Figure/link dihasilkan dari semua item terkurasi, dengan caption dan alt spesifik. -->
    </div>
    <div class="gallery-controls" hidden>
      <button type="button" data-prev aria-controls="tenant-gallery" aria-label="Foto sebelumnya">←</button>
      <output role="status" aria-live="polite" aria-atomic="true">1/4</output>
      <button type="button" data-next aria-controls="tenant-gallery" aria-label="Foto berikutnya">→</button>
    </div>
  </div>
</section>
```

Nilai output awal wajib berasal dari `gallery.length` setelah kurasi; contoh 1/4 bukan angka hardcoded untuk semua tenant. Jangan memasang `hidden` pada gallery, hanya controls yang memerlukan JS. Bila gallery satu item, tidak perlu counter/tombol/fade.

```css
@media (max-width: 820px) {
  .smart-nfc .gallery {
    position: relative; display: flex; gap: 12px; overflow-x: auto;
    scroll-snap-type: x proximity; scroll-padding-inline: 16px;
    overscroll-behavior-x: contain; padding: 4px 16px 12px;
  }
  .smart-nfc .gallery > * {
    flex: 0 0 min(86vw, 420px); min-inline-size: 0;
    scroll-snap-align: center;
  }
  .smart-nfc .gallery[data-overflow="true"] {
    mask-image: linear-gradient(to right, transparent, #000 16px,
      #000 calc(100% - 16px), transparent);
  }
  .smart-nfc .gallery[data-overflow="true"][data-at-start="true"] {
    mask-image: linear-gradient(to right, #000, #000 calc(100% - 16px), transparent);
  }
  .smart-nfc .gallery[data-overflow="true"][data-at-end="true"] {
    mask-image: linear-gradient(to right, transparent, #000 16px, #000 100%);
  }
  .smart-nfc .gallery[data-at-start="true"][data-at-end="true"] { mask-image: none; }
  .gallery-controls:not([hidden]) { display: flex; align-items: center; justify-content: space-between; }
  .gallery-controls button { min-inline-size: 48px; min-block-size: 48px; }
}
@media (prefers-reduced-motion: no-preference) {
  .smart-nfc .gallery { scroll-behavior: smooth; }
}
@media (prefers-reduced-motion: reduce) {
  .smart-nfc .gallery { scroll-behavior: auto; }
  .smart-nfc .gallery img, .smart-nfc .gallery-card { transition: none; }
}
```

Pilihan `proximity` mempertahankan kontrol swipe dan tidak mengunci card tinggi; ini sudah dipakai keluarga premium. Terapkan media query yang setara pada galeri premium setelah memeriksa selector scoped Astro. Focus ring harus berada di padding yang tidak terpotong mask. Jangan menghilangkan scrollbar tanpa kontrol/hint alternatif.

Counter memerlukan JS kecil untuk posisi scroll aktual; CSS counter saja tidak melacak swipe. Kontrak implementasi:

1. Untuk tiap `[data-gallery]`, pilih hanya child card langsung dari `.gallery`; total mengikuti card yang dirender, bukan panjang array sebelum `.slice(0,6)`.
2. Saat init/resize/scroll, ukur overflow. Tentukan indeks terdekat dari pusat card ke pusat viewport galeri; pada batas awal/akhir pakai toleransi 2 px untuk fractional pixels. Set `data-overflow`, `data-at-start`, `data-at-end`.
3. Batasi pekerjaan scroll dengan satu `requestAnimationFrame`; pakai listener passive. Update output/announcement setelah scroll settle sekitar 150 ms, bukan setiap pixel. Jangan mengandalkan `scrollend` saja pada browser lama.
4. Prev/next menggulir container ke card indeks ±1; `behavior` mengikuti reduced-motion. Disable di tepi. Keyboard native pada region tetap berfungsi; jangan mengambil alih swipe vertikal halaman.
5. Dengan JS mati, semua foto/caption tetap tersedia melalui horizontal scroll. Fallback tanpa dukungan mask/starting-style tetap terbaca. Tidak memuat GSAP/React/carousel library untuk fungsi ini.

Rasio `--gallery-aspect`, per-item `aspectRatio`, serta `fit:'contain'` harus dipertahankan. Untuk packaging, pricelist, dan portrait, jangan memaksakan `cover` yang memotong informasi. Simpan dimensi intrinsik asli atau wrapper aspect-ratio yang konsisten untuk menghindari layout shift.

### 6.3 Accordion commercial/pricelist

```html
<details class="commercial-drawer">
  <summary>Spesifikasi dan daftar harga <span aria-hidden="true">+</span></summary>
  <div class="commercial-content">
    <!-- commercialBlocks/dl serta gambar pricelist yang dihasilkan dari config -->
    <a href="CATALOG_URL_YANG_SUDAH_DINORMALISASI" target="_blank" rel="noopener noreferrer">
      Buka katalog ukuran penuh
    </a>
  </div>
</details>
```

```css
.commercial-drawer { border-block: 1px solid currentColor; }
.commercial-drawer summary {
  min-block-size: 56px; padding: 16px 8px; cursor: pointer;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
}
.commercial-drawer summary:focus-visible { outline: 3px solid var(--nfc-accent); }
.commercial-drawer[open] summary span { transform: rotate(45deg); }
.commercial-content { padding: 4px 0 24px; }
.commercial-content img { display: block; max-inline-size: 100%; block-size: auto; }
```

Gunakan `details` native tanpa menambahkan `role=button` atau `aria-expanded` manual pada summary. Default closed di mobile; dapat tetap closed di desktop untuk konsistensi. Bila desktop wajib terbuka dan mobile tertutup, gunakan pengelola `open` yang menghormati pilihan pengguna; CSS saja tidak mengubah atribut open secara semantik. Samara tetap memakai menu resmi klien dan `hideCommercialBlocks/hideStats/hideHighlights` yang sudah ada. Accordion bukan alasan menghidupkan kembali harga atau blok yang sengaja disembunyikan.

Gambar pricelist di bawah fold memakai `loading="lazy"`, `decoding="async"`, width/height sebenarnya dan link asli. Harga, MOQ, mata uang, scope retail/B2B dan tanggal berlaku harus berupa data, bukan ditebak dari foto. Tidak perlu animasi tinggi `max-height:9999px` atau dependensi JS.

### 6.4 Entrance dan feedback native

```css
.smart-nfc .hero-copy { opacity: 1; transform: none; }
@media (prefers-reduced-motion: no-preference) {
  .smart-nfc .hero-copy {
    transition: opacity 260ms ease-out,
      transform 360ms cubic-bezier(.16, 1, .3, 1);
  }
  @starting-style {
    .smart-nfc .hero-copy { opacity: 0; transform: translateY(10px); }
  }
}
@media (prefers-reduced-motion: reduce) {
  .smart-nfc *, .smart-nfc *::before, .smart-nfc *::after {
    animation: none !important; transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

Gunakan entrance hanya untuk copy kecil; jangan menggeser/menghilangkan hero LCP besar. `@starting-style` mendefinisikan keadaan awal transition ketika elemen pertama ditampilkan, **bukan** scroll-trigger otomatis. Efek scroll yang opsional boleh menggunakan IntersectionObserver kecil dengan baseline visible. Rich perlu `.js-reveal-enabled .reveal` atau pendekatan setara, sehingga kegagalan JS tidak menyembunyikan konten. Untuk spring feel gunakan kurva cepat-melandai di atas atau overshoot kecil pada icon, bukan animasi layout/filter blur besar. Browser lama menampilkan keadaan akhir normal.

Dokumentasi primer yang diperiksa untuk spesifikasi: [MDN starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style), [MDN scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-snap-type), [MDN details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details). Browser compatibility tetap perlu diuji terhadap target perangkat, khususnya starting-style.

## 7. Kontrak data dan urutan remediasi

Tambahkan schema terpusat dan validator build, bukan angka/label yang tersebar di template. Field usulan:

| Entitas | Field minimum | Aturan QC |
|---|---|---|
| `contacts[]` | kind, label, url, sourceUrl, verifiedAt, verificationStatus, actionPriority | Bedakan WA chat/catalog, corporate site/microsite/direktori/artikel. Scheme allowlist; sumber harus mendukung entitas yang sama. |
| `certifications[]` | type, number, holder, productScope, issuer, issuedAt, expiresAt, evidenceUrl, verificationStatus | `claimed` berbeda dari `registry-verified`; null bila tidak diketahui. Jangan mengklaim semua produk tercakup oleh satu izin. |
| `media[]` | role, src, alt, caption, width, height, fit, sourceUrl, permissionStatus, checksum | Role product/brand-logo/contact-document/partner/testimonial/pricelist terpisah. Aset lokal diutamakan bila hak penggunaan jelas. |
| `favicon` | src, provenance, verifiedAt, approved | PNG/ICO/SVG yang cocok dengan brand; tes favicon utama + alternate + apple-touch. Monogram fallback diberi status fallback. |
| `commercial` | type, currency, price, unit, MOQ, validity, source | Pisahkan retail/B2B/event, hormati revisi klien dan flags hide yang ada. |
| `identity` | canonicalConfig, aliases, canonicalRoute | Satu sumber konfigurasi; alias tidak menggandakan sertifikasi/produk. |

Urutan implementasi: (1) link dock/base path dan overflow; (2) salah identitas/label/aset; (3) ketersediaan gambar remote dan fallback; (4) primitive gallery/dock/accordion lintas keluarga template; (5) provenance kontak/legal/favicons; (6) micro-motion dan optimasi aset. Asset Snapclean `Sanitizer.png` sendiri ≈2.82 MB, Fenny G2 ≈1.92 MB, dan beberapa JPEG Our Herb/DBumbu >1 MB: kandidat responsive WebP/AVIF setelah hak/aset asli dipastikan. Memakai static site dan lazy loading saja tidak menjamin hemat data.

Acceptance implementasi selanjutnya: seluruh 139 test lama lulus tanpa dihapus/diubah untuk menghindari kegagalan; build sukses; HTTP/console/image-decode checks; tidak ada overflow pada 320/390/620/621/820/821/1440; aksi dock benar pada base production; seluruh target ≥48 px; galeri counter sesuai setelah swipe/resize/keyboard; caption dan produk tidak terpotong; details berfungsi tanpa JS; reduced-motion betul-betul menghapus gerak dekoratif; tidak ada konten penting bergantung reveal JS. Tambahkan test perilaku untuk bug konkret ini, karena test regex/source saat ini tidak mencakup hasil computed CSS/route/link.

## 8. Hasil verifikasi

- `npm test`: **139 pass, 0 fail, 0 skipped**.
- `npm run build`: **156 halaman**, berhasil. Build menjalankan `validate:data` sebelum Astro.
- Browser: 74 route HTTP 200; **0 pageerror/crash JavaScript** pada matriks utama. Dua route mencatat console resource 404 pada sweep awal (Sanfood dan Toyota); pemeriksaan ulang kedua route tidak mereproduksi respons ≥400. Karena itu dicatat sebagai gangguan resource/transien, bukan diklaim sudah diperbaiki. Gambar gagal pada enam route lain tetap dilaporkan terpisah.
- `inspect.js` Aranomiya: halaman termuat, screenshot tersimpan, **0 JS console error** pada inspeksi tersebut. Ini tidak menghapus temuan route lain.
- SAST `semgrep scan --config=auto`: **455 rules, 164 target source, 0 finding, 0 parse error** pada hasil scan pertama. Dukungan rule/parser tiap bahasa berbeda; Astro/CSS dan konten editorial tidak dicakup seperti JavaScript penuh. Scan tambahan tiga helper dengan `--no-git-ignore`: **442 rules, 3 target, 0 finding** (`semgrep-helpers.json`). Tree-sitter Python/JavaScript: ketiga helper tanpa syntax error; `node --check` juga berhasil. Tidak ada source aplikasi yang diubah oleh audit ini; scan awal bukan pengesahan perubahan aplikasi dari proses lain yang masuk sesudahnya.
- Pemeriksaan akhir: `npm-test-final.log`, `build-final.log`, `final-focused.json` mengonfirmasi 139 test, 156 halaman, dan empat route fokus tanpa crash. Dua internal action dari sweep awal diuji via HTTP (`local-action-status.json`); status PDF dock Samara pada file itu adalah bukti sebelum dibandingkan dengan URL baru di cek akhir.

Tidak ada pengujian fisik HP, pemeriksaan kepemilikan seluruh kontak, atau verifikasi registri izin yang dilakukan. Tidak ada deployment yang diminta/dilakukan. Perbaikan di section 6–7 masih merupakan spesifikasi pekerjaan berikutnya.

## 9. Lampiran per tenant

Lampiran di bawah dihasilkan dari inventaris 74 JSON yang sama dengan ringkasan. Tanda “—” berarti tidak dicatat pada actions/field tersebut, bukan bukti kanal/izin tidak ada. Nama dan URL adalah **yang dipublikasikan proyek**, belum disahkan ulang. `website` mengikuti key di data agar microsite/direktori/artikel tetap terlihat dan dapat dikoreksi.

### 9.1 Kontak terpublikasi (74 file)

| JSON | Route yang memakai config | WhatsApp | Instagram | Website / microsite / referensi ber-key website | Marketplace |
|---|---|---|---|---|---|
| [ageman-ecoprint](../src/data/showcases/ageman-ecoprint.json) | ageman-ecoprint | [WhatsApp · Ageman](https://wa.me/6281234538838) | [Instagram · @agemanecoprint](https://www.instagram.com/agemanecoprint/) | [Official Website](https://agemanecoprint.netlify.app/) | [TikTok Shop](https://vt.tokopedia.com/t/ZS926vL7Vkdup-OZqd7/) |
| [amood-healthy-foods](../src/data/showcases/amood-healthy-foods.json) | amood-healthy-foods | [WhatsApp CEO · Muhammad Alamudi](https://wa.me/6281381828281) | [Instagram · @amoodhealthyfoods](https://www.instagram.com/amoodhealthyfoods/) | [Official Website · amood.id](https://www.amood.id) | — |
| [aranomiya](../src/data/showcases/aranomiya.json) | aranomiya | [WhatsApp Shasty · 0815-8654-2838](https://wa.me/6281586542838) | [Instagram · @aranomiya](https://www.instagram.com/aranomiya) | [InaExport · ARANOMIYA](https://inaexport.id/perusahaan/95439-aranomiya-abimantrana-jaya) | — |
| [arjuna-68](../src/data/showcases/arjuna-68.json) | arjuna-68 | [WhatsApp Order · 0812 9376 2929](https://wa.me/6281293762929) | [Instagram · @arjuna68cake](https://www.instagram.com/arjuna68cake/) | — | — |
| [aroma-prima-livindo-pt-morris-perfume](../src/data/showcases/aroma-prima-livindo-pt-morris-perfume.json) | aroma-prima-livindo-pt-morris-perfume | — | — | [Morris Eau de Parfum](https://livindo.co.id/eau-de-parfum/)<br>[Fantasy Edition Detail](https://livindo.co.id/product/morris-eau-de-parfum-fantasy-edition-110ml-beauty-inside/)<br>[Aroma Prima Livindo](https://livindo.co.id/) | — |
| [batinos-pastry](../src/data/showcases/batinos-pastry.json) | batinos-pastry | — | [Instagram · @batinos.pastry](https://www.instagram.com/batinos.pastry) | [Pertamina SMEXPO catalogue](https://fliphtml5.com/teskatalog/fhzc/E-Katalog_BM_PERTAMINA_SMEXPO_2024_compressed/) | — |
| [bopet-pagaruyung](../src/data/showcases/bopet-pagaruyung.json) | bopet-pagaruyung | [WhatsApp Order · Niken Gubie](https://wa.me/62895321424198) | — | — | — |
| [bumina-eenk](../src/data/showcases/bumina-eenk.json) | bumina-eenk | [Reservasi via WhatsApp · +62 852-1946-0779](https://wa.me/6285219460779?text=Halo%2C%20saya%20ingin%20tanya%20ketersediaan%20Homestay%20Bumina%20EENK%20Pangalengan) | [Instagram · @homestay_buminaeenk](https://www.instagram.com/homestay_buminaeenk/) | [Website · buminaeenk.com](https://buminaeenk.com/) | — |
| [buminaeenk-freeze-dried](../src/data/showcases/buminaeenk-freeze-dried.json) | **Tidak dipakai** | [Diskusikan Sample & Maklon via WhatsApp](https://wa.me/6282124985339) | — | [Raja Freeze Dried · Website](https://rajafreezedriedfood.com/) | — |
| [clean-matic](../src/data/showcases/clean-matic.json) | clean-matic | — | — | [Clean Matic Store](https://cleanmatic.id/) | [Shopee Store](https://shopee.co.id/cleanmaticstore) |
| [cuan-dong](../src/data/showcases/cuan-dong.json) | cuan-dong | [WhatsApp Desk · 0813-1723-0957](https://wa.me/6281317230957) | [Instagram · @cuandong_holdings](https://www.instagram.com/cuandong_holdings) | [Website Resmi · cuan-dong.com](https://cuan-dong.com/) | — |
| [cv-makmur-jaya-sentosa](../src/data/showcases/cv-makmur-jaya-sentosa.json) | cv-makmur-jaya-sentosa | — | — | [Official Website · Makmur Jaya Sentosa](https://makmurjayasentosa.com/) | — |
| [daniscakelicio](../src/data/showcases/daniscakelicio.json) | daniscakelicio | — | [Instagram · @daniscakelicio](https://www.instagram.com/daniscakelicio) | [Tangsel Market · DANISCAKELICIO](https://tamara.tangerangselatankota.go.id/?page=4) | [Shopee · DANISCAKELICIO](https://shopee.co.id/shop/953337492) |
| [dapur-nanay](../src/data/showcases/dapur-nanay.json) | dapur-nanay | [WhatsApp Order · 0818-0969-3375](https://wa.me/6281809693375) | [Instagram · @dapur_nanay](https://www.instagram.com/dapur_nanay) | [Katalog Online · dapurnanay.my.canva.site](https://dapurnanay.my.canva.site/dapurnanay-com) | [Shopee · dapurnanay1](https://shopee.co.id/dapurnanay1) |
| [datik-batik](../src/data/showcases/datik-batik.json) | datik-batik | — | [Instagram · @datikbatik](https://www.instagram.com/datikbatik) | [BRI profile · Datik Batik](https://www.bri.co.id/web/guest/id/promo-news-detail/1272) | — |
| [dbumbu-aurelshop](../src/data/showcases/dbumbu-aurelshop.json) | dbumbu-aurelshop | [WhatsApp Order · 0822-5977-1919](https://wa.me/6282259771919)<br>[WhatsApp CS · 0812-8060-3913](https://wa.me/6281280603913) | [Instagram · @dbumbu](https://www.instagram.com/aurelshop2018) | — | [Shopee Official · aurelshop2018](https://shopee.co.id/aurelshop2018) |
| [den-bagus](../src/data/showcases/den-bagus.json) | den-bagus | [WhatsApp Order · 0877-7174-8642](https://wa.me/6287771748642) | [Instagram · @peyek_denbagus](https://www.instagram.com/peyek_denbagus/) | [Tangsel Pos · Liputan Ritel & Bandara](https://tangselpos.id/detail/52672/peyek-den-bagus-dari-setu-rambah-bandara) | [Shopee Official · mimincasmiaty](https://shopee.co.id/mimincasmiaty) |
| [dodol-betawi-haji-imang](../src/data/showcases/dodol-betawi-haji-imang.json) | dodol-betawi-haji-imang | — | [Instagram · @dodolbetawi.hajiimang](https://www.instagram.com/dodolbetawi.hajiimang) | [Linktree · Dodol Haji Imang](https://linktr.ee/dodolbetawi.hajiimang)<br>[Plaza Banten · Dodol Haji Imang](https://plazabanten.com/shopView/216) | — |
| [dragon-prima-farma](../src/data/showcases/dragon-prima-farma.json) | dragon-prima-farma | [Official WhatsApp](https://wa.me/6282111009910) | — | [Official Website](https://dragonprimafarma.com/)<br>[Balm Collection](https://dragonprimafarma.com/produk/read/balsem) | — |
| [elleta](../src/data/showcases/elleta.json) | elleta | [WhatsApp Owner · 0813-8900-8035](https://wa.me/6281389008035) | [Instagram Utama · @elleta.official](https://www.instagram.com/elleta.official)<br>[Instagram Butik · @elleta.butik](https://www.instagram.com/elleta.butik) | [Official Website · elleta.id](https://elleta.id/) | — |
| [eni-chandra](../src/data/showcases/eni-chandra.json) | eni-chandra | [WhatsApp Order · 0812-9023-863](https://wa.me/628129023863) | [Instagram · @aliyacookies.bk](https://www.instagram.com/aliyacookies.bk) | — | — |
| [ery-mamaw](../src/data/showcases/ery-mamaw.json) | ery-mamaw | — | — | — | — |
| [euis-siti-khodijah](../src/data/showcases/euis-siti-khodijah.json) | euis-siti-khodijah | — | — | — | — |
| [fenda-iriani](../src/data/showcases/fenda-iriani.json) | fenda-iriani | — | — | [Rumah Kurasi · KEMANIA](https://kurasi.tangerangselatankota.go.id/produk/536)<br>[Rumah Kurasi · KEMANIA FISH](https://kurasi.tangerangselatankota.go.id/produk/537) | — |
| [fennycroche](../src/data/showcases/fennycroche.json) | fennycroche | [WhatsApp Order · 0819-9894-8609](https://wa.me/6281998948609) | [Instagram · @fennycroche](https://www.instagram.com/fennycroche) | [Rumah Kurasi · Fennycroche](https://kurasi.tangerangselatankota.go.id/produk/549) | — |
| [fevy](../src/data/showcases/fevy.json) | fevy | [WhatsApp Order & Kemitraan · 0857-7888-0047](https://wa.me/c/6285778880047) | [Instagram · @shayfara_rempahsumberrezeki](https://www.instagram.com/shayfara_rempahsumberrezeki) | [Official Microsite · s.id/ShayFara](https://s.id/ShayFara-RempahModernPilihanNusantara) | — |
| [giga-tech](../src/data/showcases/giga-tech.json) | giga-tech | [WhatsApp Engineering · 0897-361-6000](https://wa.me/628973616000) | [Instagram · @gigatech.id](https://www.instagram.com/gigatech.id/) | [Website Resmi · gigatech.co.id](https://gigatech.co.id) | — |
| [haira](../src/data/showcases/haira.json) | haira | — | [Instagram reference · @hafra__id](https://www.instagram.com/hafra__id) | — | — |
| [health-today](../src/data/showcases/health-today.json) | health-today | [WhatsApp Sales · 0811-1001-2338](https://wa.me/6281110012338) | [Instagram · @healthtodayindonesia](https://www.instagram.com/healthtodayindonesia) | [Website Resmi · healthtoday.id](https://healthtoday.id) | — |
| [hhb](../src/data/showcases/hhb.json) | hhb | [WhatsApp · Bu Fifi / TEI inquiry](https://wa.me/6281806265777) | [Instagram · @hhbindonesia](https://instagram.com/hhbindonesia?psln=MTAzZWdkcTcxM2Zqdg%3D%3D) | [Official Website · hhb.co.id](https://www.hhb.co.id/id) | — |
| [himki](../src/data/showcases/himki.json) | himki | — | — | [Official Website](https://www.himki.id/)<br>[About HIMKI](https://www.himki.id/tentang-himki)<br>[Trade & Industry Updates](https://www.himki.id/) | — |
| [jahe-hayatiqu](../src/data/showcases/jahe-hayatiqu.json) | jahe-hayatiqu | — | [Instagram · @jahemerah_hayatiqu](https://www.instagram.com/jahemerah_hayatiqu) | [Public community-service coverage](https://www.bantennews.co.id/bantenesia/akuntansi-d3-universitas-pamulang-mengedukasi-menabur-manfaat-untuk-negeri-dalam-program-pengabdian-kepada-masyarakat/) | — |
| [kartika-bela](../src/data/showcases/kartika-bela.json) | kartika-bela | — | — | — | — |
| [kenyess-food](../src/data/showcases/kenyess-food.json) | kenyess-food | [WhatsApp Order · 0857-8236-2149](https://wa.me/6285782362149) | [Instagram · @kenyessfood](https://www.instagram.com/kenyessfood) | — | [Shopee Official · kenyessfood](https://shopee.co.id/kenyessfood)<br>[Tokopedia · kenyessfood](https://www.tokopedia.com/kenyessfood) |
| [kule-perfume](../src/data/showcases/kule-perfume.json) | kule-perfume | [WhatsApp Desk · 0819-1110-4646](https://wa.me/6281911104646) | [Instagram · @kuleperfume](https://www.instagram.com/kuleperfume) | — | [Shopee Official · kule_parfum](https://shopee.co.id/kule_parfum) |
| [kusuma-kencana-mulya](../src/data/showcases/kusuma-kencana-mulya.json) | kusuma-kencana-mulya | [WhatsApp Business · Adie Sugiarto](https://wa.me/6281275657020) | — | [Situs Resmi · kusumakencanamulya.com](http://www.kusumakencanamulya.com) | — |
| [ladifa-collection](../src/data/showcases/ladifa-collection.json) | ladifa-collection | [WhatsApp Owner · 0877-8464-4546](https://wa.me/6287784644546) | [Instagram · @ladifacollection](https://www.instagram.com/ladifacollection) | [Website Resmi · www.ladifa.id](https://www.ladifa.id) | — |
| [lalisha-food](../src/data/showcases/lalisha-food.json) | lalisha-food | [WhatsApp · Lalisha Food](https://wa.me/6285779060370) | [Instagram · @lalishafood](https://www.instagram.com/lalishafood) | [InaExport · Lalisha Food](https://inaexport.id/produk/snack-food/40774/seblak-instan-original-dan-keju)<br>[Rumah Kurasi · Lalisha Food](https://kurasi.tangerangselatankota.go.id/produk/398) | — |
| [larrisa-food](../src/data/showcases/larrisa-food.json) | larrisa-food | — | — | [BRIN-linked UMKM project list](https://fliphtml5.com/adqut/vvmp/2_NDH_07_Naskah_Narasi_Proyek_Perubahan_Syaiful_Bakhri/) | — |
| [li-uli](../src/data/showcases/li-uli.json) | li-uli | [WhatsApp · LI-ULI](https://wa.me/6281280902454) | [Instagram · Fashion](https://www.instagram.com/liuli_fashion/)<br>[Instagram · Craft](https://www.instagram.com/liulicraft/) | [Li-Uli Brand Story](https://liulicraft.wordpress.com/) | [Shopee · Li-Uli](https://shopee.co.id/tokoliuli) |
| [lika-snack](../src/data/showcases/lika-snack.json) | lika-snack | — | — | [Public UMKM record · Lika Snack](https://ppid.kemendagri.go.id/storage/dokumen/fzuXhk1M8131JuJHgtdTD3sB9Rm6yM5ZcJ3tO3SI.pdf) | — |
| [mba-wanti](../src/data/showcases/mba-wanti.json) | mba-wanti | — | — | [BRIN-linked UMKM project list](https://fliphtml5.com/adqut/vvmp/2_NDH_07_Naskah_Narasi_Proyek_Perubahan_Syaiful_Bakhri/) | — |
| [md-organic](../src/data/showcases/md-organic.json) | md-organic | [WhatsApp Order · 0858-8999-5454](https://wa.me/6285889995454) | [Instagram · @organic_md](https://www.instagram.com/organic_md) | [Website Resmi · www.organic-md.com](https://www.organic-md.com) | [Tokopedia Official](https://tk.tokopedia.com/ZSbKnanCT/) |
| [meraki](../src/data/showcases/meraki.json) | meraki | — | — | — | — |
| [my-aicustom](../src/data/showcases/my-aicustom.json) | my-aicustom | [WhatsApp · Konsultasi AI](https://wa.me/6282121292938) | [Instagram · @myaicustom](https://www.instagram.com/myaicustom/) | [Official Website · my-aicustom.com](https://my-aicustom.com/) | — |
| [nurazlinda](../src/data/showcases/nurazlinda.json) | nurazlinda | — | — | — | — |
| [ochokat](../src/data/showcases/ochokat.json) | ochokat | — | — | [Government-hosted UMKM record](https://ppid.kemendagri.go.id/storage/dokumen/fzuXhk1M8131JuJHgtdTD3sB9Rm6yM5ZcJ3tO3SI.pdf) | — |
| [our-herb](../src/data/showcases/our-herb.json) | our-herb | [WhatsApp Order · 0878-3820-9055](https://wa.me/6287838209055)<br>[Inquiry Export Catalog & Company Profile](https://wa.me/6287838209055?text=Hello%20Our%20Herb,%20please%20send%20the%20export%20catalog%20and%20company%20profile) | [Instagram · @ourherb.id](https://www.instagram.com/ourherb.id) | [Rumah Kurasi Tangsel · Our Herb](https://kurasi.tangerangselatankota.go.id/produk/134) | — |
| [owi-rajut](../src/data/showcases/owi-rajut.json) | owi-rajut | — | [Instagram · @owi.rajut](https://www.instagram.com/owi.rajut/) | — | — |
| [peddler-indonesia](../src/data/showcases/peddler-indonesia.json) | peddler-indonesia | — | — | — | — |
| [pempek-wak-ebot](../src/data/showcases/pempek-wak-ebot.json) | pempek-wak-ebot | — | — | [BRIN-linked UMKM project reference](https://fliphtml5.com/adqut/vvmp/2_NDH_07_Naskah_Narasi_Proyek_Perubahan_Syaiful_Bakhri/) | — |
| [pt-cosmar](../src/data/showcases/pt-cosmar.json) | pt-cosmar | — | — | [Official Website · PT Cosmar](https://ptcosmar.com/)<br>[Products · PT Cosmar](https://ptcosmar.com/produk/) | — |
| [pt-niaga-citra-mandiri](../src/data/showcases/pt-niaga-citra-mandiri.json) | pt-niaga-citra-mandiri | — | — | [Tangsel City · Export release](https://berita.tangerangselatankota.go.id/berita/pilar-lepas-ekspor-perdana-bumbu-masak-pt-niaga-citra-mandiri-ke-arab-saudi) | — |
| [raja-freeze-dried](../src/data/showcases/raja-freeze-dried.json) | raja-freeze-dried | [Diskusikan Sample & Maklon via WhatsApp](https://wa.me/6282124985339) | — | [Raja Freeze Dried · Website](https://rajafreezedriedfood.com/) | — |
| [rhr-snack](../src/data/showcases/rhr-snack.json) | rhr-snack | — | — | [Rumah Kurasi · RHR Snack](https://kurasi.tangerangselatankota.go.id/produk/177) | [Shopee · Kerupuk Ikan Tenggiri RHR](https://shopee.co.id/Kerupuk-Ikan-Tenggiri-RHR-Snack-i.487081002.23876299609) |
| [rosniati](../src/data/showcases/rosniati.json) | rosniati | — | — | [UMKM assistance publication](https://ejournal.urindo.ac.id/index.php/PAMAS/article/download/3652/1915) | — |
| [rumah-batik-setu](../src/data/showcases/rumah-batik-setu.json) | rumah-batik-setu | — | [Instagram · @rumahbatiksetu](https://www.instagram.com/rumahbatiksetu/) | — | — |
| [samara-from-home](../src/data/showcases/samara-from-home.json) | samara-from-home | [WhatsApp · Order & Buyer Inquiry](https://wa.me/628561096967) | [Instagram · @samara.fromhome](https://www.instagram.com/samara.fromhome/) | — | [Tokopedia · samarafromhome](https://www.tokopedia.com/samarafromhome) |
| [sanfood-internasional](../src/data/showcases/sanfood-internasional.json) | sanfood-internasional | [WhatsApp](https://wa.me/628152556555) | — | [Official Website](https://www.sanfood.id/) | [Tokopedia](https://www.tokopedia.com/sanfoodindonesia)<br>[Shopee](https://shopee.co.id/sanfoodbrilian) |
| [sapa-legend-coffee](../src/data/showcases/sapa-legend-coffee.json) | sapa-legend-coffee | [WhatsApp Inquiries · +84 868 273 883](https://wa.me/qr/SKWPLFU7THBTC1) | — | [Official Website · sapalegendcoffee.vn](https://www.sapalegendcoffee.vn) | — |
| [sepatu-wanita-naa](../src/data/showcases/sepatu-wanita-naa.json) | sepatu-wanita-naa | [WhatsApp · NAA Shoes](https://wa.me/message/63AO3V4U5XLVB1) | [Instagram · @sepatu_wanita_naa](https://www.instagram.com/sepatu_wanita_naa/) | — | — |
| [shayfara](../src/data/showcases/shayfara.json) | shayfara | [WhatsApp Order & Kemitraan · 0857-7888-0047](https://wa.me/c/6285778880047) | [Instagram · @shayfara_rempahsumberrezeki](https://www.instagram.com/shayfara_rempahsumberrezeki) | [Official Microsite · s.id/ShayFara](https://s.id/ShayFara-RempahModernPilihanNusantara) | — |
| [shirudo-lab](../src/data/showcases/shirudo-lab.json) | shirudo-lab | — | [Instagram · @shirudolabindonesia](https://www.instagram.com/shirudolabindonesia) | [Apotek Mandjur · IKUZEN NoSpin](https://www.mandjur.co.id/products/ikuzen-nospin-inhaler) | [Shopee · Shirudo Lab Indonesia](https://shopee.co.id/shirudo.lab) |
| [sinar-mas-land](../src/data/showcases/sinar-mas-land.json) | sinar-mas-land | — | — | [Official Website](https://www.sinarmasland.com/id)<br>[Industrial Portfolio](https://www.sinarmasland.com/id/development/industrial)<br>[Contact Sinar Mas Land](https://www.sinarmasland.com/id/contact-us) | — |
| [snack-santuy](../src/data/showcases/snack-santuy.json) | snack-santuy | [WhatsApp Order · 0881 0252 52498](https://wa.me/62881025252498) | [Instagram · @snacksantuy_official](https://www.instagram.com/snacksantuy_official/) | — | — |
| [snapclean](../src/data/showcases/snapclean.json) | snapclean | — | — | [Website Resmi · snapclean.co.id](https://www.snapclean.co.id)<br>[Profil PT Satu Nusa Biru](https://satunusabiru.com/) | — |
| [tatalogam-lestari-pt](../src/data/showcases/tatalogam-lestari-pt.json) | tatalogam-lestari-pt | [WhatsApp](https://wa.me/628111920770) | — | [Official Website](https://tatalogam.com/)<br>[Authorized Resellers](https://tatalogam.com/authorized-reseller/) | — |
| [tempe-azaki](../src/data/showcases/tempe-azaki.json) | tempe-azaki | [WhatsApp](https://wa.me/6281315441691) | — | [Official Website](https://tempeazaki.com/)<br>[About Azaki](https://tempeazaki.com/about/) | — |
| [the-munching-queen](../src/data/showcases/the-munching-queen.json) | the-munching-queen | [WhatsApp Export · Dian Ika Safitri](https://wa.me/6281289638889) | — | [Official Website · Cahaya Kencana](https://www.cahaya-kencana.com) | — |
| [titik-kurniasih](../src/data/showcases/titik-kurniasih.json) | ninauka, titik-kurniasih | [WhatsApp Inquiry · +62 813-1400-7827](https://wa.me/6281314007827)<br>[Inquire Official Catalog & Compro (PDF)](https://wa.me/6281314007827?text=Halo%20Ninauka,%20saya%20tertarik%20dengan%20katalog%20tas%20dan%20clutch%20ekspor%20TEI%202026.) | [Instagram · @ninauka_n2k](https://www.instagram.com/ninauka_n2k/) | — | — |
| [tokibi-coffee](../src/data/showcases/tokibi-coffee.json) | tokibi-coffee | — | [Instagram · @tokibicoffee](https://www.instagram.com/tokibicoffee) | [InaExport · Tokibi / PT Agrova Harmoni Lestari](https://www.inaexport.id/front_end/listeksportir/cetakpdfnew/237476) | — |
| [toyota-motor-manufacturing-indonesia-pt-tmmin](../src/data/showcases/toyota-motor-manufacturing-indonesia-pt-tmmin.json) | toyota-motor-manufacturing-indonesia-pt-tmmin | — | — | [Corporate Profile](https://www.toyota.co.id/corporate)<br>[Manufacturing](https://www.toyota.co.id/manufacturing)<br>[How We Manufacture](https://www.toyota.co.id/en/manufacturing/how-we-manufacture)<br>[Factory Network](https://www.toyota.co.id/en/manufacturing/factory) | — |
| [zahhab](../src/data/showcases/zahhab.json) | zahhab | [WhatsApp Order · 0812-9856-7832](https://wa.me/6281298567832) | [Instagram · @zahhab_head](https://www.instagram.com/zahhab_head) | — | — |
| [zyvas](../src/data/showcases/zyvas.json) | zyvas | [WhatsApp Order · 0818-0783-3077](https://wa.me/6281807833077) | [Instagram Utama · @zyvas__](https://www.instagram.com/zyvas__)<br>[Instagram Dailywear · @zyvas.dailywear](https://www.instagram.com/zyvas.dailywear) | — | — |

### 9.2 Kelengkapan media, legalitas, dan favicon (74 file)

Legal = mention teks saja: P=P-IRT/SPP-IRT, H=Halal, N=NIB, B=BPOM. `F eksplisit` berarti field favicon ditemukan dan file lokal tersedia, bukan pengesahan identitas. Fallback adalah URL favicon aktual dari route perwakilan pada sweep 390 px. Angka G mulai dari 1; G1 = `gallery[0]`.

| JSON | Hero | Jumlah gallery | Hero berulang | Logo eksplisit | Favicon / fallback route | Legal mention | Verification status di JSON |
|---|---|---:|---|---|---|---|---|
| [ageman-ecoprint](../src/data/showcases/ageman-ecoprint.json) | remote | 3 | G1 | — | tanpa F eksplisit; lokal | — | tidak dicatat |
| [amood-healthy-foods](../src/data/showcases/amood-healthy-foods.json) | raster lokal | 0 | — | ada | F eksplisit; lokal | H, B | verified-authoritative |
| [aranomiya](../src/data/showcases/aranomiya.json) | raster lokal | 3 | — | ada | F eksplisit; lokal | — | verified-authoritative |
| [arjuna-68](../src/data/showcases/arjuna-68.json) | raster lokal | 0 | — | ada | F eksplisit; lokal | — | verified-authoritative |
| [aroma-prima-livindo-pt-morris-perfume](../src/data/showcases/aroma-prima-livindo-pt-morris-perfume.json) | remote | 3 | G1 | — | tanpa F eksplisit; Google favicon | — | tidak dicatat |
| [batinos-pastry](../src/data/showcases/batinos-pastry.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | public-source-checked |
| [bopet-pagaruyung](../src/data/showcases/bopet-pagaruyung.json) | raster lokal | 0 | — | ada | F eksplisit; lokal | H | verified-authoritative |
| [bumina-eenk](../src/data/showcases/bumina-eenk.json) | raster lokal | 3 | — | — | tanpa F eksplisit; lokal | — | primary-plus-ota |
| [buminaeenk-freeze-dried](../src/data/showcases/buminaeenk-freeze-dried.json) | raster lokal | 3 | G1 | — | tanpa F eksplisit; tidak ada route | — | primary-source-checked |
| [clean-matic](../src/data/showcases/clean-matic.json) | remote | 3 | G1 | — | tanpa F eksplisit; Google favicon | — | tidak dicatat |
| [cuan-dong](../src/data/showcases/cuan-dong.json) | raster lokal | 4 | — | ada | F eksplisit; lokal | — | verified-authoritative |
| [cv-makmur-jaya-sentosa](../src/data/showcases/cv-makmur-jaya-sentosa.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | public-source-checked |
| [daniscakelicio](../src/data/showcases/daniscakelicio.json) | raster lokal | 3 | — | ada | F eksplisit; lokal | — | public-source-checked |
| [dapur-nanay](../src/data/showcases/dapur-nanay.json) | raster lokal | 4 | — | ada | F eksplisit; lokal | P, H, B | verified-authoritative |
| [datik-batik](../src/data/showcases/datik-batik.json) | SVG | 1 | — | — | tanpa F eksplisit; monogram | — | public-source-checked |
| [dbumbu-aurelshop](../src/data/showcases/dbumbu-aurelshop.json) | raster lokal | 3 | — | ada | F eksplisit; lokal | — | handover-verified |
| [den-bagus](../src/data/showcases/den-bagus.json) | raster lokal | 4 | — | ada | F eksplisit; lokal | P, H | verified-authoritative |
| [dodol-betawi-haji-imang](../src/data/showcases/dodol-betawi-haji-imang.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | public-source-checked |
| [dragon-prima-farma](../src/data/showcases/dragon-prima-farma.json) | remote | 3 | G1 | — | tanpa F eksplisit; Google favicon | H, B | tidak dicatat |
| [elleta](../src/data/showcases/elleta.json) | raster lokal | 3 | — | ada | F eksplisit; lokal | — | verified-authoritative |
| [eni-chandra](../src/data/showcases/eni-chandra.json) | raster lokal | 4 | — | ada | F eksplisit; lokal | P, H | verified-authoritative |
| [ery-mamaw](../src/data/showcases/ery-mamaw.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | handover-verified |
| [euis-siti-khodijah](../src/data/showcases/euis-siti-khodijah.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | handover-verified |
| [fenda-iriani](../src/data/showcases/fenda-iriani.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | P, H | public-source-checked |
| [fennycroche](../src/data/showcases/fennycroche.json) | raster lokal | 4 | — | ada | F eksplisit; lokal | — | verified-authoritative |
| [fevy](../src/data/showcases/fevy.json) | raster lokal | 5 | — | ada | F eksplisit; lokal | P, H, N | verified-authoritative |
| [giga-tech](../src/data/showcases/giga-tech.json) | raster lokal | 3 | — | — | tanpa F eksplisit; lokal | — | verified-authoritative |
| [haira](../src/data/showcases/haira.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | handover-verified |
| [health-today](../src/data/showcases/health-today.json) | raster lokal | 4 | — | — | F eksplisit; lokal | H, B | verified-authoritative |
| [hhb](../src/data/showcases/hhb.json) | raster lokal | 1 | — | ada | F eksplisit; lokal | — | verified-authoritative |
| [himki](../src/data/showcases/himki.json) | remote | 3 | G1 | — | tanpa F eksplisit; Google favicon | — | tidak dicatat |
| [jahe-hayatiqu](../src/data/showcases/jahe-hayatiqu.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | public-source-checked |
| [kartika-bela](../src/data/showcases/kartika-bela.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | handover-verified |
| [kenyess-food](../src/data/showcases/kenyess-food.json) | raster lokal | 5 | — | ada | F eksplisit; lokal | P, H | verified-authoritative |
| [kule-perfume](../src/data/showcases/kule-perfume.json) | raster lokal | 2 | — | ada | F eksplisit; lokal | — | verified-authoritative |
| [kusuma-kencana-mulya](../src/data/showcases/kusuma-kencana-mulya.json) | raster lokal | 0 | — | ada | F eksplisit; lokal | — | verified-authoritative |
| [ladifa-collection](../src/data/showcases/ladifa-collection.json) | raster lokal | 2 | — | ada | F eksplisit; lokal | — | verified-authoritative |
| [lalisha-food](../src/data/showcases/lalisha-food.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | P, H | public-source-checked |
| [larrisa-food](../src/data/showcases/larrisa-food.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | public-source-checked |
| [li-uli](../src/data/showcases/li-uli.json) | remote | 3 | G1 | — | tanpa F eksplisit; Google favicon | — | tidak dicatat |
| [lika-snack](../src/data/showcases/lika-snack.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | H | public-source-checked |
| [mba-wanti](../src/data/showcases/mba-wanti.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | H | public-source-checked |
| [md-organic](../src/data/showcases/md-organic.json) | raster lokal | 3 | — | ada | F eksplisit; lokal | — | primary-source-checked |
| [meraki](../src/data/showcases/meraki.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | handover-verified |
| [my-aicustom](../src/data/showcases/my-aicustom.json) | SVG | 3 | — | ada | F eksplisit; lokal | — | primary-source-checked |
| [nurazlinda](../src/data/showcases/nurazlinda.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | handover-verified |
| [ochokat](../src/data/showcases/ochokat.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | public-source-checked |
| [our-herb](../src/data/showcases/our-herb.json) | raster lokal | 2 | — | ada | F eksplisit; lokal | H | public-source-checked |
| [owi-rajut](../src/data/showcases/owi-rajut.json) | remote | 3 | — | — | tanpa F eksplisit; lokal | — | tidak dicatat |
| [peddler-indonesia](../src/data/showcases/peddler-indonesia.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | handover-verified |
| [pempek-wak-ebot](../src/data/showcases/pempek-wak-ebot.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | public-source-checked |
| [pt-cosmar](../src/data/showcases/pt-cosmar.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | H, B | public-source-checked |
| [pt-niaga-citra-mandiri](../src/data/showcases/pt-niaga-citra-mandiri.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | H | public-source-checked |
| [raja-freeze-dried](../src/data/showcases/raja-freeze-dried.json) | raster lokal | 3 | G1 | — | tanpa F eksplisit; lokal | — | primary-source-checked |
| [rhr-snack](../src/data/showcases/rhr-snack.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | P, H, B | public-source-checked |
| [rosniati](../src/data/showcases/rosniati.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | public-source-checked |
| [rumah-batik-setu](../src/data/showcases/rumah-batik-setu.json) | SVG | 3 | — | — | tanpa F eksplisit; lokal | — | tidak dicatat |
| [samara-from-home](../src/data/showcases/samara-from-home.json) | raster lokal | 4 | — | ada | F eksplisit; lokal | — | primary-source-checked |
| [sanfood-internasional](../src/data/showcases/sanfood-internasional.json) | remote | 3 | G1 | — | tanpa F eksplisit; Google favicon | H, B | tidak dicatat |
| [sapa-legend-coffee](../src/data/showcases/sapa-legend-coffee.json) | raster lokal | 5 | — | ada | F eksplisit; lokal | — | verified-authoritative |
| [sepatu-wanita-naa](../src/data/showcases/sepatu-wanita-naa.json) | raster lokal | 7 | — | — | tanpa F eksplisit; lokal | — | tidak dicatat |
| [shayfara](../src/data/showcases/shayfara.json) | raster lokal | 5 | — | ada | F eksplisit; lokal | P, H, N | verified-authoritative |
| [shirudo-lab](../src/data/showcases/shirudo-lab.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | B | public-source-checked |
| [sinar-mas-land](../src/data/showcases/sinar-mas-land.json) | remote | 3 | G1 | — | tanpa F eksplisit; Google favicon | — | tidak dicatat |
| [snack-santuy](../src/data/showcases/snack-santuy.json) | raster lokal | 0 | — | ada | F eksplisit; lokal | P, H | verified-authoritative |
| [snapclean](../src/data/showcases/snapclean.json) | raster lokal | 4 | — | ada | F eksplisit; lokal | — | verified-authoritative |
| [tatalogam-lestari-pt](../src/data/showcases/tatalogam-lestari-pt.json) | remote | 3 | G1 | — | tanpa F eksplisit; Google favicon | — | tidak dicatat |
| [tempe-azaki](../src/data/showcases/tempe-azaki.json) | remote | 3 | G1 | — | tanpa F eksplisit; Google favicon | H, B | tidak dicatat |
| [the-munching-queen](../src/data/showcases/the-munching-queen.json) | raster lokal | 0 | — | ada | F eksplisit; lokal | — | verified-authoritative |
| [titik-kurniasih](../src/data/showcases/titik-kurniasih.json) | raster lokal | 4 | — | ada | F eksplisit; lokal | — | handover-verified |
| [tokibi-coffee](../src/data/showcases/tokibi-coffee.json) | SVG | 0 | — | — | tanpa F eksplisit; monogram | — | public-source-checked |
| [toyota-motor-manufacturing-indonesia-pt-tmmin](../src/data/showcases/toyota-motor-manufacturing-indonesia-pt-tmmin.json) | remote | 3 | G1 | — | tanpa F eksplisit; Google favicon | — | tidak dicatat |
| [zahhab](../src/data/showcases/zahhab.json) | raster lokal | 4 | — | ada | F eksplisit; lokal | — | verified-authoritative |
| [zyvas](../src/data/showcases/zyvas.json) | raster lokal | 4 | — | ada | F eksplisit; lokal | — | verified-authoritative |

### 9.3 Antrean koreksi visual/data yang spesifik

| JSON | Bukti / tindakan |
|---|---|
| [ageman-ecoprint](../src/data/showcases/ageman-ecoprint.json) | G3 URL company-logo Glints; bukan produk. G1 mengulang hero. |
| [amood-healthy-foods](../src/data/showcases/amood-healthy-foods.json) | Hero/logo foto kartu kontak; gallery kosong. |
| [arjuna-68](../src/data/showcases/arjuna-68.json) | Hero/logo foto kartu kontak; gallery kosong. |
| [bopet-pagaruyung](../src/data/showcases/bopet-pagaruyung.json) | Hero/logo foto kartu kontak; gallery kosong. |
| [buminaeenk-freeze-dried](../src/data/showcases/buminaeenk-freeze-dried.json) | Config orphan, bukan route aktif tersendiri. |
| [cuan-dong](../src/data/showcases/cuan-dong.json) | Hero/G1 sangat mirip: dHash distance 0; hash byte berbeda, kandidat dedup visual. |
| [daniscakelicio](../src/data/showcases/daniscakelicio.json) | Overflow dokumen 498px pada viewport 390px. |
| [eni-chandra](../src/data/showcases/eni-chandra.json) | G1 minuman berlabel ecoprint; tidak cocok dengan foto maupun kategori cookies. |
| [fennycroche](../src/data/showcases/fennycroche.json) | Logo/favicon botol parfum; G1/G4 komposisi bouquet berulang; overflow 449px. |
| [fevy](../src/data/showcases/fevy.json) | Config aktif /fevy; pada sweep awal juga dipakai /shayfara. WA catalog, bukan chat. |
| [health-today](../src/data/showcases/health-today.json) | G2/G3/G4 logo mitra, perlu dipisahkan dari produk. |
| [kusuma-kencana-mulya](../src/data/showcases/kusuma-kencana-mulya.json) | Hero/logo foto kartu kontak; gallery kosong. |
| [ladifa-collection](../src/data/showcases/ladifa-collection.json) | Logo/favicon berupa bidang warna; label G1/G2 perlu diselaraskan dengan foto beads dan screenshot website. |
| [md-organic](../src/data/showcases/md-organic.json) | Hero/G3 memakai produk/komposisi beras putih yang mirip; belum dinyatakan file identik. |
| [samara-from-home](../src/data/showcases/samara-from-home.json) | Dock Open kehilangan base path; link PDF contact grid benar. Menu resmi dan flags hide wajib dipertahankan. |
| [shayfara](../src/data/showcases/shayfara.json) | Awalnya orphan; proses lain mengubah import /shayfara ke config ini saat audit. WA catalog, bukan chat. |
| [snack-santuy](../src/data/showcases/snack-santuy.json) | Hero/logo foto brosur reseller yang dipegang tangan; gallery kosong. |
| [the-munching-queen](../src/data/showcases/the-munching-queen.json) | Hero/logo foto kartu kontak; gallery kosong. |
| [titik-kurniasih](../src/data/showcases/titik-kurniasih.json) | Config aktif dipakai dua route: titik-kurniasih dan ninauka. |

### 9.4 Lokasi mention legalitas

Daftar ini menunjukkan field yang harus diminta buktinya; teks umum tentang halal/legal support tidak diperlakukan sebagai sertifikat. Fevy/Shayfara mengulang usaha yang sama.

| JSON | Jenis dan field sumber |
|---|---|
| [amood-healthy-foods](../src/data/showcases/amood-healthy-foods.json) | Halal: `story.body`, `stats[0].value`; BPOM: `story.body`, `stats[0].value` |
| [bopet-pagaruyung](../src/data/showcases/bopet-pagaruyung.json) | Halal: `stats[1].label` |
| [dapur-nanay](../src/data/showcases/dapur-nanay.json) | P-IRT: `story.body`, `stats[1].label`, `commercialBlocks[0].badge`; Halal: `story.body`, `stats[1].label`, `commercialBlocks[0].badge`, `gallery[2].caption`; BPOM: `story.body`, `stats[1].label` |
| [den-bagus](../src/data/showcases/den-bagus.json) | P-IRT: `gallery[1].caption`; Halal: `gallery[1].caption` |
| [dragon-prima-farma](../src/data/showcases/dragon-prima-farma.json) | Halal: `stats[3].value`, `gallery[1].caption`; BPOM: `stats[2].value`, `gallery[1].caption` |
| [eni-chandra](../src/data/showcases/eni-chandra.json) | P-IRT: `story.body`, `stats[1].value`, `commercialBlocks[0].badge`, `commercialBlocks[0].items[1].value`, `gallery[1].caption`, `verification.note`; Halal: `tagline`, `story.title`, `story.body`, `stats[1].value`, `commercialBlocks[0].badge`, `gallery[1].caption` |
| [fenda-iriani](../src/data/showcases/fenda-iriani.json) | P-IRT: `story.body`, `stats[2].value`; Halal: `story.body`, `stats[3].value` |
| [fevy](../src/data/showcases/fevy.json) | P-IRT: `stats[2].label`, `commercialBlocks[0].badge`; Halal: `stats[2].label`, `commercialBlocks[0].badge`; NIB: `stats[2].label` |
| [health-today](../src/data/showcases/health-today.json) | Halal: `story.body`, `highlights[3].body`, `commercialBlocks[0].badge`; BPOM: `story.body`, `highlights[3].body` |
| [kenyess-food](../src/data/showcases/kenyess-food.json) | P-IRT: `stats[3].label`; Halal: `stats[3].label` |
| [lalisha-food](../src/data/showcases/lalisha-food.json) | P-IRT: `story.body`, `stats[3].value`; Halal: `story.body`, `stats[3].value` |
| [lika-snack](../src/data/showcases/lika-snack.json) | Halal: `story.body` |
| [mba-wanti](../src/data/showcases/mba-wanti.json) | Halal: `story.body`, `highlights[1].body` |
| [our-herb](../src/data/showcases/our-herb.json) | Halal: `commercialBlocks[0].badge` |
| [pt-cosmar](../src/data/showcases/pt-cosmar.json) | Halal: `story.body`, `highlights[1].body`; BPOM: `story.body`, `highlights[1].body` |
| [pt-niaga-citra-mandiri](../src/data/showcases/pt-niaga-citra-mandiri.json) | Halal: `story.body` |
| [rhr-snack](../src/data/showcases/rhr-snack.json) | P-IRT: `story.body`; Halal: `story.body`; BPOM: `story.body` |
| [sanfood-internasional](../src/data/showcases/sanfood-internasional.json) | Halal: `story.body`, `highlights[1].body`; BPOM: `story.body`, `highlights[1].body` |
| [shayfara](../src/data/showcases/shayfara.json) | P-IRT: `stats[2].label`, `commercialBlocks[0].badge`; Halal: `stats[2].label`, `commercialBlocks[0].badge`; NIB: `stats[2].label` |
| [shirudo-lab](../src/data/showcases/shirudo-lab.json) | BPOM: `tagline`, `story.title`, `story.body`, `stats[0].value`, `highlights[2].body` |
| [snack-santuy](../src/data/showcases/snack-santuy.json) | P-IRT: `tagline`, `story.body`, `stats[0].value`; Halal: `tagline`, `story.body`, `stats[0].value` |
| [tempe-azaki](../src/data/showcases/tempe-azaki.json) | Halal: `highlights[1].body`; BPOM: `highlights[1].body` |

### 9.5 Bukti kegagalan gambar pada sweep utama

| Route | URL |
|---|---|
| aroma-prima-livindo-pt-morris-perfume | https://down-id.img.susercontent.com/file/id-11134207-7r98r-llhjs0vw48sk06 |
| aroma-prima-livindo-pt-morris-perfume | https://down-id.img.susercontent.com/file/id-11134207-7r98v-llhjs0vw5mv06e |
| clean-matic | https://down-id.img.susercontent.com/file/id-11134207-7r98o-lm6t0w1bqwfcf7 |
| dragon-prima-farma | https://down-id.img.susercontent.com/file/id-11134207-822wl-mnf5z352ng3cf7 |
| himki | https://cdn.harianbasis.co/media/images/2026/03/OSOf0VlMBz.jpeg?height=674&location=1&quality=80&watermark=1&width=1200 |
| sinar-mas-land | https://asset.kompas.com/crops/86IL5U2qyyJahSPwg9d4TD5BzMw%3D/81x0%3A939x573/1200x900/data/photo/2021/10/12/6165bb5a124a1.jpeg |
| sinar-mas-land | https://www.sinarmasland.com/assets/images/bsd-city-hub.jpg |
| tatalogam-lestari-pt | https://tatalogam.com/wp-content/uploads/2021/04/multi-roof.jpg |
| tatalogam-lestari-pt | https://tatalogam.com/wp-content/uploads/2021/04/sakura-roof.jpg |

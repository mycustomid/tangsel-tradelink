# Tangsel TradeLink — Comprehensive Showcase Visual & Data QC Audit Report
**Date:** 2026-10-16  
**Auditor:** Senior QC Auditor (Zero-Tolerance Showcase Quality Control)  
**Target Repository:** `D:/code/tangsel-tradelink`  
**Showcase Data Directory:** `src/data/showcases/` (74 JSON files)  
**Static Asset Directory:** `public/brand/`  

---

## 1. Executive Summary & Quality Scorecard

An automated and deep inspection was performed across all 74 showcase tenants, analyzing local asset integrity, image hash uniqueness (SHA-256), gallery semantic correctness, favicon availability, and external asset reliability.

| Metric | Inspected | Passed | Failed / Flagged | Compliance Rate |
| :--- | :---: | :---: | :---: | :---: |
| **Total Showcases Checked** | 74 | 20 | 54 | 27.0% |
| **Local File Existence on Disk** | 270 | 270 | 0 | **100.0%** |
| **External Hotlinked Images** | 46 | 35 | **11 (404/520/timeout)** | 76.1% |
| **Hero vs Gallery Duplicate Images** | 74 | 37 | **37 (Duplicate hero)** | 50.0% |
| **On-Disk Duplicate File Hashes** | 74 brands | 56 | **18 brands (28 duplicate pairs)** | 75.7% |
| **Rogue Logos / Badges in Gallery** | 74 | 64 | **10 tenants (16 gallery cards)** | 86.5% |
| **Showcase Favicon Availability** | 74 | 28 | **46 missing/empty** | 37.8% |
| **Minimum Gallery Depth (≥ 3 items)** | 74 | 43 | **31 (< 3 items or 0 items)** | 58.1% |

---

## 2. Defect Category 1: Duplicate Images

### A. Hero Image Replicated in Gallery (`hero_in_gallery`)
Exactly **37 out of 74 showcases (50%)** duplicate the `heroImage` inside `gallery[0]`. This wastes a gallery card, causes visual monotony, and degrades the customer buying experience.

#### Local Asset Replications (26 Tenants)
| # | Tenant Slug | Hero & Gallery[0] Asset Path | Recommended On-Disk Replacement for Gallery[0] |
| :-: | :--- | :--- | :--- |
| 1 | `amood-healthy-foods` | `/brand/amood-healthy-foods/amood-healthy-foods-hero.webp` | Requires product photography sourcing (roasted almond pack) |
| 2 | `aranomiya` | `/brand/aranomiya/soap-kunyit-1.webp` | `/brand/aranomiya/aranomiya-real-1.jpg` or `soap-cair-charcoal.webp` |
| 3 | `arjuna-68` | `/brand/arjuna-68/arjuna-68-hero.webp` | Requires pastry/cookies product photography sourcing |
| 4 | `bopet-pagaruyung` | `/brand/bopet-pagaruyung/bopet-pagaruyung-hero.webp` | Requires culinary/menu product photography sourcing |
| 5 | `bumina-eenk` | `/brand/bumina-eenk-hero.webp` | Replace with dedicated packaging shot |
| 6 | `buminaeenk-freeze-dried` | `/brand/raja-freeze-dried-hero.webp` | Replace with distinct freeze-dried fruit pack |
| 7 | `daniscakelicio` | `/brand/daniscakelicio/danis-cheesestick.jpg` | `/brand/daniscakelicio/danis-kentangkering.jpg` or `danis-keripikbawang.jpg` |
| 8 | `dapur-nanay` | `/brand/dapur-nanay/dapur-nanay-ig-22.jpg` | `/brand/dapur-nanay/dapur-nanay-ig-5.jpg` or `dapur-nanay-ig-12.jpg` |
| 9 | `dbumbu-aurelshop` | `/brand/dbumbu-aurelshop/dbumbu-fresh-vegetables.jpg` | `/brand/dbumbu-aurelshop/dbumbu-black-garlic.jpg` or `dbumbu-powder-spices.jpg` |
| 10 | `elleta` | `/brand/elleta/elleta-hero.png` | `/brand/elleta/elleta-asset-2.jpg` or `elleta-asset-3.jpg` |
| 11 | `eni-chandra` | `/brand/eni-chandra/eni-chandra-asset-2.jpg` | `/brand/eni-chandra/eni-chandra-asset-3.jpg` or `eni-chandra-real-2.jpg` |
| 12 | `fennycroche` | `/brand/fennycroche/fennycroche-hero.jpg` | `/brand/fennycroche/fennycroche-gallery-4.jpg` |
| 13 | `hhb` | `/brand/hhb/hhb-hero.jpg` | Source freight forwarding/cargo warehouse operations photo |
| 14 | `kule-perfume` | `/brand/kule-perfume/kule-oud-royal.jpg` | `/brand/kule-perfume/kule-cheerfull.jpg` or `kule-sweet-escape.jpg` |
| 15 | `kusuma-kencana-mulya` | `/brand/kusuma-kencana-mulya/kusuma-kencana-mulya-hero.webp` | Requires textile fabric roll / batik printing photo |
| 16 | `ladifa-collection` | `/brand/ladifa-collection/ladifa-asset-3.jpg` | `/brand/ladifa-collection/ladifa-asset-4.jpg` or `ladifa-asset-5.jpg` |
| 17 | `md-organic` | `/brand/md-organic/md-organic-pandan-wangi-hires.webp` | `/brand/md-organic/md-organic-beras-coklat-hires.webp` |
| 18 | `our-herb` | `/brand/our-herb/our-herb-box-front.jpg` | `/brand/our-herb/our-herb-infusion.jpg` or `our-herb-box-back.jpg` |
| 19 | `raja-freeze-dried` | `/brand/raja-freeze-dried-hero.webp` | Replace with distinct freeze-dried fruit packaging shot |
| 20 | `sapa-legend-coffee` | `/brand/sapa-legend-coffee/sapa-legend-hero.webp` | `/brand/sapa-legend-coffee/sapa-farm-harvest.webp` or `sapa-factory-roastery.webp` |
| 21 | `sepatu-wanita-naa` | `/brand/naa-shoes/naa-shoes-classic-mules.jpeg` | `/brand/naa-shoes/naa-shoes-flat-nude-ribbon.jpeg` or `naa-shoes-classic-flats-black.jpeg` |
| 22 | `snack-santuy` | `/brand/snack-santuy/snack-santuy-hero.webp` | Requires snack product packaging photo (makaroni/stik) |
| 23 | `the-munching-queen` | `/brand/the-munching-queen/the-munching-queen-hero.webp` | Requires healthy kid snack product photography |
| 24 | `titik-kurniasih` | `/brand/ninauka/ninauka-hero.jpg` | `/brand/ninauka/ninauka-baduy-bag.jpg` or `ninauka-kelly-bag.jpg` |
| 25 | `zahhab` | `/brand/zahhab/zahhab-p-11.jpg` | `/brand/zahhab/zahhab-p-1.jpg` or `zahhab-p-6.jpg` |
| 26 | `zyvas` | `/brand/zyvas/zyvas-p-16.jpg` | `/brand/zyvas/zyvas-p-8.jpg` or `zyvas-p-12.jpg` |

#### External Asset Replications (11 Tenants)
| # | Tenant Slug | External URL (Duplicate across Hero & Gallery[0]) | Recommended Action |
| :-: | :--- | :--- | :--- |
| 27 | `ageman-ecoprint` | `https://image.idntimes.com/post/20240428/3-grid-2-2812181fca11c0a1ab8693a3ea622c9e.jpg` | Download & localize distinct product photos |
| 28 | `aroma-prima-livindo-pt-morris-perfume` | `https://down-id.img.susercontent.com/file/id-11134207-7r98p-llhjs0vw2u84b5` | Download & localize Morris perfume catalogue shots |
| 29 | `clean-matic` | `https://down-id.img.susercontent.com/file/71f769c3f91718471b8d6ee0cc65bca7` | Download & localize cleaning tools line |
| 30 | `dragon-prima-farma` | `https://cf.shopee.co.id/file/bfe101be82a3acbbf35af3a8d4e252d1` | Download & localize essential oil products |
| 31 | `himki` | `https://static.wixstatic.com/media/7a4d27_362f7df7c055471686bbe485895f0f69~mv2.jpg...` | Download & localize furniture exhibition pieces |
| 32 | `li-uli` | `https://liulicraft.wordpress.com/wp-content/uploads/2022/05/jpeg-image-1c20eb145b56-1.jpeg?w=847` | Download & localize artisan woven bags |
| 33 | `sanfood-internasional` | `https://cf.shopee.co.id/file/sg-11134201-22100-htvumq857sivb2` | Download & localize organic seasoning oils |
| 34 | `sinar-mas-land` | `https://deltamas.id/wp-content/uploads/2024/11/new-GIIC-4.jpg` | Download & localize industrial estate park assets |
| 35 | `tatalogam-lestari-pt` | `https://images.bisnis.com/posts/2020/12/18/1332996/taso.jpg` | Download & localize metal roofing products |
| 36 | `tempe-azaki` | `https://tempeazaki.com/wp-content/uploads/2025/02/Frame-427323138.jpg` | Download & localize export-grade tempeh products |
| 37 | `toyota-motor-manufacturing-indonesia-pt-tmmin` | `https://i.ytimg.com/vi/Xkr_Ozl4pBA/maxresdefault.jpg` | Download & localize hybrid vehicle assembly photos |

---

### B. Duplicate Image File Hashes (Identical Content Under Different Names)
Byte-level SHA-256 analysis of files in `public/brand/` revealed 28 file pairs across 18 brands that are exact bit-for-bit duplicates:

1. **`snapclean`**: `logo.png` is identical to `snapclean-asset-1.png` (SHA256: `6834d7e2...`). `snapclean-asset-1.png` is placed in `gallery[0]`, thus injecting the logo into the product gallery. Furthermore, `fc.png` == `snapclean-asset-4.png` and `karbol.png` == `snapclean-asset-5.png`.
2. **`our-herb`**: `our-herb-logo.png` == `our-herb-real-1.jpg` (SHA256: `817df35c...`). `our-herb-asset-1.jpg` == `our-herb-asset-2.jpg`.
3. **`zyvas`**: `zyvas-logo.png` == `zyvas-real-1.jpg` (SHA256: `23c46b2c...`).
4. **`daniscakelicio`**: `daniscakelicio-logo-hires.png` == `daniscakelicio-logo.png`. `danis-padi-1.jpg` == `danis-padi-3.jpg`.
5. **`fennycroche`**: `fennycroche-gallery-1-clean.jpg` == `fennycroche-gallery-1.jpg`. `fennycroche-gallery-3.jpg` == `fennycroche-gallery-4-clean.jpg`.
6. **`aranomiya`**: `aranomiya-asset-2.jpg` == `aranomiya-asset-3.jpg`.
7. **`giga-tech`**: `giga-tech-asset-1.webp` == `giga-tech-asset-2.webp`.
8. **`ladifa-collection`**: `ladifa-asset-6.jpg` == `ladifa-asset-7.jpg` == `ladifa-asset-8.jpg` (triple duplicate).
9. **`dapur-nanay`**: 4 duplicate pairs (`ig-1.jpg` == `ig-24.jpg` == `real-1.jpg`; `ig-2.jpg` == `real-2.jpg`; `ig-3.jpg` == `real-3.jpg`; `ig-4.jpg` == `real-4.jpg`).
10. **`naa-shoes`**: 9 uncleaned raw `WhatsApp Image 2026-09-22...` files duplicated alongside renamed production files.

**Remediation:** Remove redundant duplicate clones from disk, standardize canonical filenames, and ensure no duplicate hash is referenced in showcase JSONs.

---

## 3. Defect Category 2: Rogue Logos, Badges, and Business Cards in Product Galleries

A product gallery is intended for tangible product models, variants, packaging, and usage context. Placing company logos, brand badges, and CEO business cards into gallery slots with `fit: "contain"` degrades catalog credibility and violates TradeLink QC standards.

### Defect Table: Rogue Gallery Items (10 Tenants, 16 Cards)
| Tenant Slug | Gallery Index | Image Path | Label / Caption | Detection Reason | Recommended Remediation |
| :--- | :-: | :--- | :--- | :--- | :--- |
| **`amood-healthy-foods`** | 0 | `/brand/amood-healthy-foods/amood-healthy-foods-hero.webp` | Kartu Nama CEO Muhammad Alamudi | CEO business card, `fit: contain` | Source roasted almond product photo |
| **`amood-healthy-foods`** | 1 | `/brand/amood-healthy-foods/amood-healthy-foods-logo.webp` | Logo Resmi Amood Healthy Foods | Brand logo, `fit: contain` | Source cashew nut product photo |
| **`arjuna-68`** | 0 | `/brand/arjuna-68/arjuna-68-hero.webp` | Kartu Nama Resmi Arjuna 68 | Business card, `fit: contain` | Source pastry & cookie product photo |
| **`arjuna-68`** | 1 | `/brand/arjuna-68/arjuna-68-logo.webp` | Logo & Maskot Arjuna 68 | Brand logo & mascot, `fit: contain` | Source artisan cake product photo |
| **`bopet-pagaruyung`** | 0 | `/brand/bopet-pagaruyung/bopet-pagaruyung-hero.webp` | Kartu Kontak Resmi Niken Gubie | Contact card, `fit: contain` | Source Minang culinary dish photo |
| **`bopet-pagaruyung`** | 1 | `/brand/bopet-pagaruyung/bopet-pagaruyung-logo.webp` | Identitas Visual Bopet Pagaruyung | Brand logo, `fit: contain` | Source traditional beverage/snack photo |
| **`kusuma-kencana-mulya`**| 0 | `/brand/kusuma-kencana-mulya/kusuma-kencana-mulya-hero.webp` | Kartu Kontak Bisnis Adie Sugiarto | Business card, `fit: contain` | Source textile roll / garment photo |
| **`kusuma-kencana-mulya`**| 1 | `/brand/kusuma-kencana-mulya/kusuma-kencana-mulya-logo.webp` | Emblem Resmi PT Kusuma Kencana Mulya | Brand emblem, `fit: contain` | Source woven fabric pattern photo |
| **`snack-santuy`** | 0 | `/brand/snack-santuy/snack-santuy-hero.webp` | Flyer Resmi Open Reseller TEI 2026 | Reseller promotional flyer, `fit: contain` | Source macaroni snack pack photo |
| **`snack-santuy`** | 1 | `/brand/snack-santuy/snack-santuy-logo.webp` | Logo Resmi Snack Santuy | Brand logo, `fit: contain` | Source savory sticks snack photo |
| **`the-munching-queen`** | 0 | `/brand/the-munching-queen/the-munching-queen-hero.webp` | Kartu Kontak Resmi & Perwakilan Ekspor | Contact card, `fit: contain` | Source freeze-dried fruit snack photo |
| **`the-munching-queen`** | 1 | `/brand/the-munching-queen/the-munching-queen-logo.webp` | Brand Identity The Munching Queen | Brand logo, `fit: contain` | Source healthy cookies product photo |
| **`snapclean`** | 0 | `/brand/snapclean/snapclean-asset-1.png` | Logo Resmi Snap Clean | Exact bit clone of `logo.png` in gallery | Replace with `/brand/snapclean/Sanitizer.png` |
| **`fennycroche`** | 4 | `/brand/fennycroche/fennycroche-gallery-5.jpg` | Karakter Rajut Spesial Pameran | Points to file also defined as `logo` and `favicon` | Redefine clean vector logo, keep gallery-5 as product |
| **`hhb`** | 2 | `/brand/hhb/hhb-logo.png` | Identitas Resmi PT HHB | Official company logo file | Source cargo plane or freight container operation photo |
| **`ageman-ecoprint`** | 2 | `https://images.glints.com/.../company-logo/...` | Company Logo (Glints CDN) | Company logo hotlinked into gallery[2] | Replace with ecoprint scarf / apparel photo |

---

## 4. Defect Category 3: Showcase Favicons

**46 out of 74 showcases (62.2%)** completely lack a `favicon` field in their showcase JSON.
In contrast, all 28 showcases that have a `favicon` property defined point to valid, existing files on disk.

### Showcases Missing Favicons (46 Tenants)
1. `ageman-ecoprint`
2. `aroma-prima-livindo-pt-morris-perfume`
3. `batinos-pastry`
4. `bumina-eenk`
5. `buminaeenk-freeze-dried`
6. `clean-matic`
7. `cv-makmur-jaya-sentosa`
8. `datik-batik`
9. `dodol-betawi-haji-imang`
10. `dragon-prima-farma`
11. `ery-mamaw`
12. `euis-siti-khodijah`
13. `fenda-iriani`
14. `giga-tech`
15. `haira`
16. `health-today`
17. `himki`
18. `jahe-hayatiqu`
19. `kartika-bela`
20. `lalisha-food`
21. `larrisa-food`
22. `li-uli`
23. `lika-snack`
24. `mba-wanti`
25. `meraki`
26. `nurazlinda`
27. `ochokat`
28. `owi-rajut`
29. `peddler-indonesia`
30. `pempek-wak-ebot`
31. `pt-cosmar`
32. `pt-niaga-citra-mandiri`
33. `raja-freeze-dried`
34. `rhr-snack`
35. `rosniati`
36. `rumah-batik-setu`
37. `sanfood-internasional`
38. `sapa-legend-coffee` *(Has `sapa-legend-logo.webp` on disk!)*
39. `sepatu-wanita-naa` *(Has `ninauka-favicon.png` / `naa-shoes` on disk)*
40. `shirudo-lab`
41. `sinar-mas-land`
42. `snapclean` *(Has `logo.png` on disk!)*
43. `tatalogam-lestari-pt`
44. `tempe-azaki`
45. `tokibi-coffee`
46. `toyota-motor-manufacturing-indonesia-pt-tmmin`

### Immediate Remediation:
- For tenants with existing logos on disk (e.g. `sapa-legend-coffee`, `snapclean`, `dbumbu-aurelshop`), link `favicon` directly to the cropped 1:1 brand emblem.
- For tenants using SVG badges (e.g. `/brand/tei-batch/*.svg`), generate 64x64 WebP/PNG favicons and populate the `favicon` JSON field.
- Add fallback default favicon in the showcase layout template if a tenant has no specific favicon specified.

---

## 5. Defect Category 4: Broken & 404 Asset References

### Local File System
**Passed with 100% integrity:** All 270 local paths referenced in `src/data/showcases/*.json` exist in `public/`.

### External Hotlinks (High Severity Vulnerability)
Live HTTP HEAD requests identified **11 external images (across 8 tenants)** that are completely broken, dead, or failing:

| Tenant Slug | Field | Broken External URL | HTTP Status / Error | Impact |
| :--- | :--- | :--- | :---: | :--- |
| `aroma-prima-livindo-pt-morris-perfume` | `gallery[1]` | `https://down-id.img.susercontent.com/file/id-11134207-7r98r-llhjs0vw48sk06` | **404 Not Found** | Blank image card |
| `aroma-prima-livindo-pt-morris-perfume` | `gallery[2]` | `https://down-id.img.susercontent.com/file/id-11134207-7r98v-llhjs0vw5mv06e` | **404 Not Found** | Blank image card |
| `clean-matic` | `gallery[2]` | `https://down-id.img.susercontent.com/file/id-11134207-7r98o-lm6t0w1bqwfcf7` | **404 Not Found** | Blank image card |
| `dragon-prima-farma` | `gallery[2]` | `https://down-id.img.susercontent.com/file/id-11134207-822wl-mnf5z352ng3cf7` | **404 Not Found** | Blank image card |
| `himki` | `gallery[2]` | `https://cdn.harianbasis.co/media/images/2026/03/OSOf0VlMBz.jpeg...` | **520 Origin Error** | Cloudflare failure |
| `sanfood-internasional` | `gallery[2]` | `https://images.tokopedia.net/img/cache/700/VqbcmM/2021/11/17/c3629a8a...` | **404 Not Found** | Broken Tokopedia CDN |
| `sinar-mas-land` | `gallery[1]` | `https://asset.kompas.com/...` | **Network Timeout** | CDN rate-limit / block |
| `sinar-mas-land` | `gallery[2]` | `https://www.sinarmasland.com/assets/images/bsd-city-hub.jpg` | **404 Not Found** | Missing corporate asset |
| `tatalogam-lestari-pt` | `gallery[1]` | `https://tatalogam.com/wp-content/uploads/2021/04/multi-roof.jpg` | **404 Not Found** | Broken vendor link |
| `tatalogam-lestari-pt` | `gallery[2]` | `https://tatalogam.com/wp-content/uploads/2021/04/sakura-roof.jpg` | **404 Not Found** | Broken vendor link |
| `toyota-motor-manufacturing-indonesia-pt-tmmin` | `gallery[2]` | `https://i.ytimg.com/vi/a5Q-RaqCADY/maxresdefault.jpg` | **404 Not Found** | Deleted YouTube thumb |

**Remediation:** Cease all external hotlinking across TradeLink showcases. Download working images to `public/brand/<slug>/` and replace broken URLs with verified local assets.

---

## 6. Actionable QC Fix Execution Plan

### Step 1: Quick Wins — Automated Local Replacements
The following 18 local showcases can be fixed immediately without external sourcing because verified, distinct product images already exist in their respective `public/brand/` directories:
1. `sapa-legend-coffee`: Replace `gallery[0]` with `/brand/sapa-legend-coffee/sapa-factory-roastery.webp`. Set `favicon: "/brand/sapa-legend-coffee/sapa-legend-logo.webp"`.
2. `snapclean`: Set `logo: "/brand/snapclean/logo.png"`, `favicon: "/brand/snapclean/logo.png"`. Replace `gallery[0]` with `/brand/snapclean/Sanitizer.png`.
3. `daniscakelicio`: Replace `gallery[0]` with `/brand/daniscakelicio/danis-kentangkering.jpg`.
4. `dapur-nanay`: Replace `gallery[0]` with `/brand/dapur-nanay/dapur-nanay-ig-5.jpg`.
5. `dbumbu-aurelshop`: Replace `gallery[0]` with `/brand/dbumbu-aurelshop/dbumbu-black-garlic.jpg`. Set `favicon: "/brand/dbumbu-aurelshop/dbumbu-favicon.png"`.
6. `elleta`: Replace `gallery[0]` with `/brand/elleta/elleta-asset-2.jpg`.
7. `eni-chandra`: Replace `gallery[0]` with `/brand/eni-chandra/eni-chandra-asset-3.jpg`.
8. `fennycroche`: Replace `gallery[0]` with `/brand/fennycroche/fennycroche-gallery-4.jpg`. Keep gallery 1–5 distinct.
9. `kule-perfume`: Replace `gallery[0]` with `/brand/kule-perfume/kule-sweet-escape.jpg`.
10. `ladifa-collection`: Replace `gallery[0]` with `/brand/ladifa-collection/ladifa-asset-4.jpg`.
11. `md-organic`: Replace `gallery[0]` with `/brand/md-organic/md-organic-beras-coklat-hires.webp`.
12. `our-herb`: Replace `gallery[0]` with `/brand/our-herb/our-herb-infusion.jpg`.
13. `sepatu-wanita-naa`: Replace `gallery[0]` with `/brand/naa-shoes/naa-shoes-flat-nude-ribbon.jpeg`.
14. `titik-kurniasih`: Replace `gallery[0]` with `/brand/ninauka/ninauka-baduy-bag.jpg`. Set `favicon: "/brand/ninauka/ninauka-favicon.png"`.
15. `zahhab`: Replace `gallery[0]` with `/brand/zahhab/zahhab-p-1.jpg`.
16. `zyvas`: Replace `gallery[0]` with `/brand/zyvas/zyvas-p-8.jpg`.
17. `aranomiya`: Replace `gallery[0]` with `/brand/aranomiya/aranomiya-real-1.jpg`.
18. `hhb`: Set `favicon: "/brand/hhb/hhb-favicon.png"`.

### Step 2: TEI 2026 Batch 6 Commercial Overhaul
For `amood-healthy-foods`, `arjuna-68`, `bopet-pagaruyung`, `kusuma-kencana-mulya`, `snack-santuy`, and `the-munching-queen`:
- Extract business cards out of the hero position and into a dedicated `commercialBlocks` contact section or modal.
- Promote authentic product photographs to `heroImage` (e.g. roasted almonds, artisan pastries, traditional Minang rendang, batik fabric rolls, savory snack pouches).
- Populate galleries with 3 to 5 real product photographs instead of cards and logos.

### Step 3: Asset Localization & Hotlink Elimination
- Download verified images for all 8 tenants currently relying on external hotlinks.
- Replace the 11 dead/404 URLs with local, high-resolution assets stored in `public/brand/<slug>/`.

### Step 4: Favicon Pipeline
- Run a batch script to generate standard 64x64 WebP favicons from brand logos for all 46 missing tenants.
- Update each showcase JSON with its corresponding `favicon` path.

---
*Report generated and validated by Senior QC Auditor for Tangsel TradeLink.*

// Published-tenant art-direction registry. Every locked slug receives an explicit multi-axis fingerprint.
const GROUPS = {
  "provisions": new Set(["adlaera-botanica-indonesia-pt", "agrofarm-nusa-raya-pt", "aneka-kakao-pt", "arenga-alam-sejahtera", "arga-bumi-indonesia-pt", "candra", "cipta-abadi", "coco-reina-global-charcoal-pt", "corina-sutera-intan-pt", "ferrotek-trading-indonesia-pt", "golden-coffee-bean-pt", "klumbayan-gold-farm-pt", "makmur-emas-aren-pt", "merporizad-berkah-abadi-cv", "nusantara-primer-niaga", "pratama-spices-indonesia-pt", "prendjak", "samudra-international-commerce-pt", "star-laboratories-ud", "superdryers", "tenggara-jaya-kibar-pt"]),
  "atelier": new Set(["ageman-ecoprint", "asephi", "dispar-prov-banten", "dkait-craft", "ilalang-craft", "li-uli", "owi-rajut"]),
  "infrastructure": new Set(["anindya-wiraputra-konsult-pt", "campus-preneur", "cma-cgm", "easylink", "fabulous-agro-mandiri-pt", "gs1-indonesia", "kawasan-berikat-nusantara", "kawasan-industri-gresik-pt", "mandiri", "patimban-industrial-estate", "pelindo", "pt-pertamina-persero", "watershore-growth-advisory-pt"]),
  "interior": new Set(["banana-paper", "blotani", "chakra-naga-furniture-pt", "deka-sari-perkasa-pt", "dpd-himki-jabodetabek", "green-riverina", "home-fashions-indonesia-cv-sae-home", "homeliving-by-exoticawood-furniture", "indo-living-utama-cv", "javanesia-teakindo-cv", "kalika-indonesia", "mahata-gangga-sukta", "nuansa-kayu-bekas-cv", "sinar-continental-pt"]),
  "civic": new Set(["bp-batam", "bp-tanjung-pinang", "dinas-ppkukm-prov-dki-jakarta", "disdagin-kota-bandung", "disperindag-provinsi-jateng", "disperindag-provinsi-jatim", "dkpbpb-bintan-karimun", "kemen-ekraf", "kemen-investasi-dan-hilirisasi-bkpm", "pemkab-gianyar", "pemkab-lombok-barat", "pemkab-serang", "pemkab-tuban", "pemkot-tangerang", "pemkot-tangsel"]),
  "editorial": new Set(["cipta-orion-metal-pt", "cmn-internasional-indonesia-pt", "coco-riki-international-pt", "hipbaki", "primaniyarta", "umbra"]),
  "wellness": new Set(["evange-line", "merpati-mahardika-pt", "oto-adult-diapers", "tamanu-indonesia-gemilang-pt"]),
};

const SPECIAL = {
  "my-aicustom": { "archetype": "control", "layout": "split-right", "hero": "console", "type": "condensed", "surface": "night", "motion": "scan", "media": "mark-led" },
  "raja-freeze-dried": { "archetype": "lab", "layout": "split-right", "hero": "specimen", "type": "serif-display", "surface": "botanical", "motion": "drift", "media": "product-stage" },
  "buminaeenk-freeze-dried": { "archetype": "lab", "layout": "editorial-offset", "hero": "specimen", "type": "serif-display", "surface": "botanical", "motion": "drift", "media": "product-stage" },
  "bumina-eenk": { "archetype": "destination", "layout": "gallery-first", "hero": "panorama", "type": "italic-editorial", "surface": "linen", "motion": "drift", "media": "panorama" },
  "samara-from-home": { "archetype": "culinary", "layout": "editorial-offset", "hero": "aperture", "type": "italic-editorial", "surface": "paper", "motion": "rise", "media": "product-stage" },
  "sepatu-wanita-naa": { "archetype": "fashion", "layout": "gallery-first", "hero": "cutout", "type": "serif-display", "surface": "linen", "motion": "drift", "media": "photo-cover" },
  "rumah-batik-setu": { "archetype": "textile", "layout": "editorial-offset", "hero": "collage", "type": "italic-editorial", "surface": "fabric", "motion": "wipe", "media": "textile" },
  "roemah-koffie": { "archetype": "coffeehouse", "layout": "editorial-offset", "hero": "aperture", "type": "serif-display", "surface": "paper", "motion": "drift", "media": "photo-cover" },
  "aroma-prima-livindo-pt-morris-perfume": { "archetype": "luxury", "layout": "gallery-first", "hero": "cutout", "type": "serif-display", "surface": "glass", "motion": "drift", "media": "product-stage" },
  "toyota-motor-manufacturing-indonesia-pt-tmmin": { "archetype": "industrial", "layout": "split-right", "hero": "billboard", "type": "condensed", "surface": "grid", "motion": "scan", "media": "photo-cover" },
  "tatalogam-lestari-pt": { "archetype": "architectural", "layout": "ledger", "hero": "framed", "type": "grotesk", "surface": "chrome", "motion": "snap", "media": "photo-cover" },
  "sinar-mas-land": { "archetype": "placemaking", "layout": "gallery-first", "hero": "panorama", "type": "grotesk", "surface": "stone", "motion": "drift", "media": "panorama" },
  "himki": { "archetype": "network", "layout": "index", "hero": "manifesto", "type": "slab", "surface": "wood", "motion": "rise", "media": "collage" },
  "clean-matic": { "archetype": "utility", "layout": "poster-stack", "hero": "framed", "type": "grotesk", "surface": "grid", "motion": "snap", "media": "product-stage" },
  "dragon-prima-farma": { "archetype": "heritage", "layout": "editorial-offset", "hero": "specimen", "type": "serif-display", "surface": "apothecary", "motion": "wipe", "media": "product-stage" },
  "tempe-azaki": { "archetype": "natural-export", "layout": "split-right", "hero": "aperture", "type": "serif-display", "surface": "botanical", "motion": "rise", "media": "product-stage" },
  "sanfood-internasional": { "archetype": "family-food", "layout": "poster-stack", "hero": "billboard", "type": "humanist", "surface": "paper", "motion": "snap", "media": "product-stage" }
};


const EXTRA_SPECIAL = {
  "lika-snack": { "archetype": "corn-pantry", "layout": "poster-stack", "hero": "billboard", "type": "slab", "surface": "paper", "motion": "snap", "media": "product-stage" },
};

const FAMILY = {
  provisions: { layouts:['editorial-offset','poster-stack','split-right','product-stage'], heroes:['aperture','billboard','specimen','framed'], types:['serif-display','slab','humanist','italic-editorial'], surfaces:['paper','botanical','cocoa','clay'], motions:['rise','drift','wipe','snap'], media:['product-stage','photo-cover','object','collage'] },
  atelier: { layouts:['editorial-offset','gallery-first','manifesto','split-left'], heroes:['cutout','aperture','offset','framed'], types:['italic-editorial','serif-display','archival'], surfaces:['fabric','linen','paper','clay'], motions:['drift','wipe','rise'], media:['textile','photo-cover','collage'] },
  infrastructure: { layouts:['split-right','ledger','map-grid','index'], heroes:['framed','billboard','column','mono'], types:['condensed','grotesk','mono-accent'], surfaces:['grid','chrome','night'], motions:['scan','snap','reveal'], media:['map','mark-led','photo-cover'] },
  interior: { layouts:['gallery-first','editorial-offset','split-left','manifesto'], heroes:['panorama','framed','offset','aperture'], types:['serif-display','grotesk','archival'], surfaces:['wood','linen','stone','paper'], motions:['drift','rise','parallax-lite'], media:['photo-cover','collage','object'] },
  civic: { layouts:['ledger','map-grid','index','manifesto'], heroes:['billboard','column','typographic','framed'], types:['civic-sans'], surfaces:['paper','grid','stone'], motions:['reveal','scan','rise'], media:['map','mark-led','collage'] },
  wellness: { layouts:['split-right','editorial-offset','product-stage','ledger'], heroes:['specimen','cutout','framed','column'], types:['geometric','grotesk','serif-display'], surfaces:['glass','apothecary','paper','botanical'], motions:['reveal','drift','scan'], media:['product-stage','photo-contain','object'] },
  editorial: { layouts:['split-left','split-right','editorial-offset','poster-stack','ledger','gallery-first','manifesto','index','map-grid','product-stage'], heroes:['aperture','billboard','framed','cutout','offset','typographic','mono','panorama','specimen','column'], types:['serif-display','grotesk','condensed','humanist','mono-accent','italic-editorial','slab','civic-sans','geometric','archival'], surfaces:['paper','ink','chrome','botanical','clay','glass','grid','fabric','night','linen','wood','stone'], motions:['rise','drift','reveal','scan','snap','parallax-lite','wipe','stagger'], media:['photo-cover','photo-contain','mark-led','type-led','collage','panorama','object','map','textile','product-stage'] },
};

function hash(text) {
  let value = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    value ^= text.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}
function pick(slug, values, salt) { return values[hash(`${slug}:${salt}`) % values.length]; }
function accentFor(slug) {
  const h = hash(`${slug}:accent`) % 360;
  const s = 52 + (hash(`${slug}:sat`) % 19);
  const l = 42 + (hash(`${slug}:light`) % 17);
  return `hsl(${h} ${s}% ${l}%)`;
}
function familyFor(slug) {
  for (const [family, set] of Object.entries(GROUPS)) if (set.has(slug)) return family;
  return 'editorial';
}
function build(slug) {
  const special = SPECIAL[slug] || EXTRA_SPECIAL[slug];
  const archetype = special?.archetype || familyFor(slug);
  const family = FAMILY[familyFor(slug)] || FAMILY.editorial;
  return Object.freeze({
    archetype,
    layout: special?.layout || pick(slug, family.layouts, 'layout'),
    hero: special?.hero || pick(slug, family.heroes, 'hero'),
    type: special?.type || pick(slug, family.types, 'type'),
    surface: special?.surface || pick(slug, family.surfaces, 'surface'),
    motion: special?.motion || pick(slug, family.motions, 'motion'),
    accent: accentFor(slug),
    media: special?.media || pick(slug, family.media, 'media'),
  });
}

const SLUGS = ["adlaera-botanica-indonesia-pt", "ageman-ecoprint", "agrofarm-nusa-raya-pt", "amood-healthy-foods", "aneka-kakao-pt", "anindya-wiraputra-konsult-pt", "aranomiya", "arenga-alam-sejahtera", "arga-bumi-indonesia-pt", "arjuna-68", "aroma-prima-livindo-pt-morris-perfume", "asephi", "banana-paper", "batinos-pastry", "blotani", "bopet-pagaruyung", "bp-batam", "bp-tanjung-pinang", "bumina-eenk", "buminaeenk-freeze-dried", "campus-preneur", "candra", "chakra-naga-furniture-pt", "cipta-abadi", "cipta-orion-metal-pt", "clean-matic", "cma-cgm", "cmn-internasional-indonesia-pt", "coco-reina-global-charcoal-pt", "coco-riki-international-pt", "corina-sutera-intan-pt", "cuan-dong", "cv-makmur-jaya-sentosa", "daniscakelicio", "dapur-nanay", "datik-batik", "dbumbu-aurelshop", "deka-sari-perkasa-pt", "den-bagus", "dinas-ppkukm-prov-dki-jakarta", "disdagin-kota-bandung", "dispar-prov-banten", "disperindag-provinsi-jateng", "disperindag-provinsi-jatim", "dkait-craft", "dkpbpb-bintan-karimun", "dodol-betawi-haji-imang", "dpd-himki-jabodetabek", "dragon-prima-farma", "easylink", "elleta", "eni-chandra", "ery-mamaw", "euis-siti-khodijah", "evange-line", "fabulous-agro-mandiri-pt", "fenda-iriani", "fennycroche", "ferrotek-trading-indonesia-pt", "fevy", "giga-tech", "golden-coffee-bean-pt", "green-riverina", "gs1-indonesia", "haira", "health-today", "hhb", "himki", "hipbaki", "home-fashions-indonesia-cv-sae-home", "homeliving-by-exoticawood-furniture", "ilalang-craft", "indo-living-utama-cv", "jahe-hayatiqu", "javanesia-teakindo-cv", "kalika-indonesia", "kartika-bela", "kawasan-berikat-nusantara", "kawasan-industri-gresik-pt", "kemen-ekraf", "kemen-investasi-dan-hilirisasi-bkpm", "kenyess-food", "klumbayan-gold-farm-pt", "kule-perfume", "kusuma-kencana-mulya", "ladifa-collection", "lalisha-food", "larrisa-food", "li-uli", "lika-snack", "mahata-gangga-sukta", "makmur-emas-aren-pt", "mandiri", "mba-wanti", "md-organic", "meraki", "merpati-mahardika-pt", "merporizad-berkah-abadi-cv", "my-aicustom", "ninauka", "nuansa-kayu-bekas-cv", "nurazlinda", "nusantara-primer-niaga", "ochokat", "oto-adult-diapers", "our-herb", "owi-rajut", "patimban-industrial-estate", "peddler-indonesia", "pelindo", "pemkab-gianyar", "pemkab-lombok-barat", "pemkab-serang", "pemkab-tuban", "pemkot-tangerang", "pemkot-tangsel", "pempek-wak-ebot", "pratama-spices-indonesia-pt", "prendjak", "primaniyarta", "pt-cosmar", "pt-niaga-citra-mandiri", "pt-pertamina-persero", "raja-freeze-dried", "rhr-snack", "roemah-koffie", "rosniati", "rumah-batik-setu", "samara-from-home", "samudra-international-commerce-pt", "sanfood-internasional", "sapa-legend-coffee", "sepatu-wanita-naa", "shayfara", "shirudo-lab", "sinar-continental-pt", "sinar-mas-land", "snack-santuy", "snapclean", "star-laboratories-ud", "superdryers", "tamanu-indonesia-gemilang-pt", "tatalogam-lestari-pt", "tempe-azaki", "tenggara-jaya-kibar-pt", "the-munching-queen", "titik-kurniasih", "tokibi-coffee", "toyota-motor-manufacturing-indonesia-pt-tmmin", "umbra", "vietrade", "watershore-growth-advisory-pt", "zahhab", "zyvas"];
export const TENANT_ART_DIRECTIONS = Object.fromEntries(SLUGS.map((slug) => [slug, build(slug)]));
export function getTenantArtDirection(slug) { return TENANT_ART_DIRECTIONS[slug] || null; }
export function getTenantArtDirectionForAnySlug(slug) {
  const known = TENANT_ART_DIRECTIONS[slug];
  if (known) return known;
  const extra = EXTRA_SPECIAL[slug];
  if (extra) return Object.freeze({ ...extra, accent: accentFor(slug) });
  return build(String(slug || 'tenant'));
}

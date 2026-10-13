import fs from 'fs';
import path from 'path';

const projectDir = 'D:/code/tangsel-tradelink';
const showcasesDir = path.join(projectDir, 'src/data/showcases');
const showcaseFiles = fs.readdirSync(showcasesDir);
const tenantPagesDir = path.join(projectDir, 'src/pages/tenant');
const pageFiles = fs.readdirSync(tenantPagesDir);

// Mapping nama orang / list Pak Eeng ke Brand / Slug
const brandMap = {
  1: { brand: "PT Harmoni Harapan Bersama (HHB)", slug: "hhb", owner: "Bu Fifi" },
  2: { brand: "Titik Kurniasih", slug: "titik-kurniasih", owner: "Titik Kurniasih" },
  3: { brand: "Ladifa Collection", slug: "ladifa-collection", owner: "Dewi Krisliawati / Bu Lia" },
  4: { brand: "Euis Siti Khodijah", slug: "euis-siti-khodijah", owner: "Euis Siti Khodijah" },
  5: { brand: "Fenda Iriani", slug: "fenda-iriani", owner: "Fenda Iriani" },
  6: { brand: "Den Bagus", slug: "den-bagus", owner: "Mimin" },
  7: { brand: "Shirudo Lab", slug: "shirudo-lab", owner: "Lingsia" },
  8: { brand: "Ladifa Collection", slug: "ladifa-collection", owner: "Ladifa Collection" },
  9: { brand: "Haira", slug: "haira", owner: "Rizka Fauziah" },
  10: { brand: "Lika Snack", slug: "lika-snack", owner: "Poniyem" },
  11: { brand: "DANISCAKELICIO", slug: "daniscakelicio", owner: "Nani" },
  12: { brand: "Samara from Home", slug: "samara-from-home", owner: "Faye Yolody" },
  13: { brand: "PT Cosmar", slug: "pt-cosmar", owner: "PT Cosmar" },
  14: { brand: "Dapur Nanay", slug: "dapur-nanay", owner: "Amalia" },
  15: { brand: "Pempek Wak Ebot", slug: "pempek-wak-ebot", owner: "Vera" },
  16: { brand: "ZYVAS", slug: "zyvas", owner: "Nia Alina" },
  17: { brand: "PT Niaga Citra Mandiri", slug: "pt-niaga-citra-mandiri", owner: "PT Niaga Citra Mandiri" },
  18: { brand: "RHR Snack", slug: "rhr-snack", owner: "Kerupuk RHR" },
  19: { brand: "Ery Mamaw", slug: "ery-mamaw", owner: "Ery Mamaw" },
  20: { brand: "Zahhab Healthy Drink", slug: "zahhab", owner: "Kak Ety" },
  21: { brand: "Teh Telang Our Herb (OH)", slug: "our-herb", owner: "Kumala A. Haryono" },
  22: { brand: "Rosniati", slug: "rosniati", owner: "Rosniati" },
  23: { brand: "Eni Chandra Shanti", slug: "eni-chandra", owner: "Eni Chandra Shanti" },
  24: { brand: "Jahe Hayatiqu", slug: "jahe-hayatiqu", owner: "Nanik" },
  25: { brand: "OChokat", slug: "ochokat", owner: "Bela" },
  26: { brand: "FENNYCROCHE", slug: "fennycroche", owner: "Fenny Luckyharti" },
  27: { brand: "DBumbu Aurelshop", slug: "dbumbu-aurelshop", owner: "Henny Kartika Wati" },
  28: { brand: "ELLETA (Batik & Tenun Modern)", slug: "elleta", owner: "Joanita Kusumawati" },
  29: { brand: "Kartika Bela", slug: "kartika-bela", owner: "Kartika Bela" },
  30: { brand: "Snapclean", slug: "snapclean", owner: "Estie K.W" },
  31: { brand: "ARANOMIYA", slug: "aranomiya", owner: "Shasty Pramahesty" },
  32: { brand: "Nurazlinda", slug: "nurazlinda", owner: "Nurazlinda" },
  33: { brand: "Fevy", slug: "fevy", owner: "Fevy" },
  34: { brand: "Health Today", slug: "health-today", owner: "Kevin" },
  35: { brand: "MD Organic (Beras Organik)", slug: "md-organic", owner: "Sinta" },
  36: { brand: "Batinos Pastry", slug: "batinos-pastry", owner: "Dewi Anwar" },
  37: { brand: "Meraki", slug: "meraki", owner: "Lala" },
  38: { brand: "GiGa Tech", slug: "giga-tech", owner: "GiGa Tech" },
  39: { brand: "Lalisha Food", slug: "lalisha-food", owner: "Haris" },
  40: { brand: "Tokibi Coffee", slug: "tokibi-coffee", owner: "Yuda" },
  41: { brand: "Mba' Wanti", slug: "mba-wanti", owner: "Darwanti" },
  42: { brand: "Datik Batik", slug: "datik-batik", owner: "Datik D" },
  43: { brand: "Peddler Indonesia", slug: "peddler-indonesia", owner: "Peddler Indonesia" },
  44: { brand: "Dodol Betawi Haji Imang", slug: "dodol-betawi-haji-imang", owner: "Sri Liana" },
  45: { brand: "Larrisa Food", slug: "larrisa-food", owner: "Ifa" },
  46: { brand: "CV Makmur Jaya Sentosa", slug: "cv-makmur-jaya-sentosa", owner: "Sri Sabbahatun" }
};

const report = [];

for (let i = 1; i <= 46; i++) {
  const meta = brandMap[i];
  const hasShowcase = showcaseFiles.includes(`${meta.slug}.json`);
  const hasPage = pageFiles.includes(`${meta.slug}.astro`);
  
  report.push({
    no: i,
    brand: meta.brand,
    owner: meta.owner,
    slug: meta.slug,
    hasShowcase,
    hasPage,
    status: (hasShowcase && hasPage) ? "SUDAH JADI (LIVE LOKAL & REPO)" : "BELUM DIBUAT"
  });
}

console.log("=== HASIL AUDIT PEMETAAN REAL 46 LIST PAK EENG ===\n");
const sudah = report.filter(r => r.status.includes("SUDAH JADI"));
const belum = report.filter(r => r.status.includes("BELUM DIBUAT"));

console.log(`TOTAL SUDAH JADI & TERUJI: ${sudah.length} DARI 46`);
sudah.forEach(s => {
  console.log(`[V] #${s.no} ${s.brand} (Owner: ${s.owner}) -> /tenant/${s.slug}`);
});

console.log(`\nTOTAL BELUM DIBUAT: ${belum.length} DARI 46`);
belum.forEach(b => {
  console.log(`[ ] #${b.no} ${b.brand} (Owner: ${b.owner}) -> Target slug: ${b.slug}`);
});

fs.writeFileSync(path.join(projectDir, 'audit_46_status.json'), JSON.stringify(report, null, 2));

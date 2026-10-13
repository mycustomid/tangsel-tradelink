import fs from 'fs';
import path from 'path';

const projectDir = 'D:/code/tangsel-tradelink';
const tenantsJson = JSON.parse(fs.readFileSync(path.join(projectDir, 'src/data/tenants.json'), 'utf8'));
const tenantsExtra = JSON.parse(fs.readFileSync(path.join(projectDir, 'src/data/tenants-extra.json'), 'utf8'));
const showcasesDir = path.join(projectDir, 'src/data/showcases');
const showcaseFiles = fs.readdirSync(showcasesDir);
const tenantPagesDir = path.join(projectDir, 'src/pages/tenant');
const pageFiles = fs.readdirSync(tenantPagesDir);

// 46 Master List dari Pak Eeng
const rawList = [
  "1. PT. Harmoni Harapan Bersama (2 id card)",
  "2. Titik Kurniasih(2 id card)",
  "3. Dewi Krisliawati (1 id card) / Ladifa Collection",
  "4. Euis Siti Khodijah (2 id card)",
  "5. Fenda Iriani (1 ID Card)",
  "6. Mimin - den bagus (1 ID Card)",
  "7. Lingsia - Shirudo Lab (2 ID Cards)",
  "8. Ladifa Collection (1 ID Card)",
  "9. Rizka Fauziah - Haira (1 ID Card)",
  "10. Poniyem-lika Snack (1 ID Card )",
  "11. Nani - DANISCAKELICIO (1 ID Card)",
  "12. Samara from Home (1 ID card)",
  "13. PT Cosmar (2 ID Card)",
  "14. Amalia _ Dapur Nanay (1 ID Card)",
  "15. Vera Pempek Wak Ebot (1 ID Card)",
  "16. Nia Alina/ZYVAS (2 ID)",
  "17. PT. Niaga Citra Mandiri (2 ID Card)",
  "18. Kerupuk RHR Snack (1 Id card)",
  "19. Ery Mamaw (1 ID Card)",
  "20. Ety Zahhab (1 ID Card)",
  "21. Kumala Our Herb(1 ID Card)",
  "22. Rosniati( 1 ID Card)",
  "23. Eni Chandra Shanti ( 1 ID Card )",
  "24. Nanik / jahe hayatiqu. ( 2 ID card )",
  "25. Bela / OChokat ( 1 ID card)",
  "26. FENNY LUCKYHARTI / FENNYCROCHE (1 ID Card)",
  "27. Henny Kartika Wati / DBumbu (2 ID Card)",
  "28. Joanita kusumawati / ELLETA (2 id card)",
  "29. Kartika bela",
  "30. Estie K.W / Snapclean (2 ID)",
  "31. Shasty Pramahesty Aranomiya (1 ID)",
  "32. Nurazlinda (1 ID)",
  "33. Fevy ( 1 ID)",
  "34. Kevin / Health Today (1 ID)",
  "35. Sinta/beras organik ( 2 ID )",
  "36. Dewi Anwar/Batinos Pastry (1 ID)",
  "37. Lala / Meraki (3 Id)",
  "38. GiGa Tech (2 ID)",
  "39. Haris / Lalisha Food",
  "40. Yuda/Tokibi Coffee (1 ID Card)",
  "41. Darwanti/ mba'Wanti ( 1id card)",
  "42. Datik D / Datik Batik (2 ID Card)",
  "43. Peddler Indonesia (1 ID card)",
  "44. Sri Liana/Dodol Betawi Haji Imang (1 id card)",
  "45. Ifa /Larrisa Food (1 ID Card)",
  "46. Sri Sabbahatun/ CV Makmur Jaya Sentosa (2 ID)"
];

console.log("=== CROSS-CHECK 46 LIST PAK EENG VS TANGSEL-TRADELINK ===");
console.log(`Total Showcase Files: ${showcaseFiles.length}`);
console.log(`Total Pages Files: ${pageFiles.length}`);
console.log(`Total Tenants in tenants.json: ${tenantsJson.length}`);
console.log(`Total Tenants in tenants-extra.json: ${tenantsExtra.length}\n`);

const results = [];

for (const item of rawList) {
  // Ekstrak nama
  const cleaned = item.replace(/^\d+\.\s*/, '').replace(/\(.*?\)/g, '').trim();
  const lower = cleaned.toLowerCase();
  
  // Cari di tenants.json
  const matchTenants = tenantsJson.find(t => 
    t.name.toLowerCase().includes(lower) || lower.includes(t.name.toLowerCase())
  );
  
  // Cari di tenants-extra.json
  const matchExtra = tenantsExtra.find(t => 
    t.name.toLowerCase().includes(lower) || lower.includes(t.name.toLowerCase())
  );
  
  // Cari di showcase files
  const matchShowcase = showcaseFiles.find(f => {
    const base = f.replace('.json', '');
    return lower.includes(base) || base.includes(lower) || 
           (matchExtra && base === matchExtra.slug) ||
           (matchTenants && base === matchTenants.slug);
  });

  // Cari di page files
  const matchPage = pageFiles.find(p => {
    const base = p.replace('.astro', '');
    return lower.includes(base) || base.includes(lower) || 
           (matchExtra && base === matchExtra.slug) ||
           (matchTenants && base === matchTenants.slug);
  });

  results.push({
    raw: item,
    cleaned,
    inExtra: matchExtra ? matchExtra.slug : null,
    inTenants: matchTenants ? matchTenants.slug : null,
    showcase: matchShowcase || null,
    page: matchPage || null,
    isDone: Boolean(matchShowcase || matchPage || matchExtra)
  });
}

const done = results.filter(r => r.isDone);
const pending = results.filter(r => !r.isDone);

console.log(`STATUS: ${done.length} SUDAH ADA / DIPETAKAN, ${pending.length} BELUM ADA`);
console.log("\n--- SUDAH ADA / DIPETAKAN DI TANGSEL-TRADELINK ---");
done.forEach(r => {
  console.log(`[V] ${r.raw} -> Extra: ${r.inExtra || '-'} | Showcase: ${r.showcase || '-'} | Page: ${r.page || '-'}`);
});

console.log("\n--- BELUM ADA DI TANGSEL-TRADELINK ---");
pending.forEach(r => {
  console.log(`[X] ${r.raw}`);
});

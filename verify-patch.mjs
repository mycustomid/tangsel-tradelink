import fs from 'node:fs';
import crypto from 'node:crypto';
const expected = [
  'src/components/RichTenantShowcase.astro',
  'src/layouts/BaseLayout.astro',
  'src/pages/index.astro',
  'src/pages/tenant/my-aicustom.astro',
  'src/pages/tenant/raja-freeze-dried.astro',
  'src/pages/tenant/bumina-eenk.astro',
  'src/pages/tenant/buminaeenk-freeze-dried.astro',
  'src/pages/tenant/samara-from-home.astro',
  'src/data/tenants-extra.json',
  'src/data/showcases/my-aicustom.json',
  'src/data/showcases/raja-freeze-dried.json',
  'src/data/showcases/bumina-eenk.json',
  'src/data/showcases/samara-from-home.json',
  'tests/tenant-showcases-final-hardening.test.mjs',
  'tests/tenant-showcases-sss.test.mjs'
];
for (const file of expected) {
  if (!fs.existsSync(file)) throw new Error(`Missing: ${file}`);
}
const hashes = expected.map((file) => {
  const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  return `${hash}  ${file}`;
});
console.log(`Patch files present: ${expected.length}`);
console.log(hashes.join('\n'));

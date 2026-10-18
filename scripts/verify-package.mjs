import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(process.argv[2] || '.');
const manifest = fs.readFileSync(path.join(root,'PATCH-SHA256SUMS.txt'),'utf8');
let count = 0;
const expectedFiles = ['PATCH-SHA256SUMS.txt'];
for (const line of manifest.trim().split(/\r?\n/)) {
  const match = /^([a-f0-9]{64})  (.+)$/.exec(line);
  if (!match) throw new Error('Invalid checksum record');
  const [, expected, relative] = match;
  expectedFiles.push(relative);
  const file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep)) throw new Error('Unsafe checksum path');
  const actual = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  if (actual !== expected) throw new Error(`Checksum mismatch: ${relative}`);
  count++;
}
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.relative(root,path.join(dir,e.name)).replaceAll('\\','/')]);
if(JSON.stringify(walk(root).sort()) !== JSON.stringify(expectedFiles.sort())) throw new Error('Package has missing or unmanifested files');
console.log(`Patch integrity OK: ${count} files.`);

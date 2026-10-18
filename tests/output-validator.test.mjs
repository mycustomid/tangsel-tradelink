import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

function runCase(edit = () => {}) {
  const root=fs.mkdtempSync(path.join(process.cwd(),'.qa-output-'));
  try {
    fs.mkdirSync(path.join(root,'scripts'),{recursive:true});
    fs.mkdirSync(path.join(root,'src/data'),{recursive:true});
    fs.mkdirSync(path.join(root,'dist/tenant/sample'),{recursive:true});
    fs.copyFileSync('scripts/validate-output.mjs',path.join(root,'scripts/validate-output.mjs'));
    fs.writeFileSync(path.join(root,'src/data/routes-baseline.lock.json'),JSON.stringify({base:'/tangsel-tradelink/',legacyCanonicalTargets:{},protectedAssets:{},routes:[{path:'/tenant/sample/',externalLinks:['https://example.com/contact']}]}));
    fs.writeFileSync(path.join(root,'src/data/tenant-permalinks.lock.json'),JSON.stringify({urls:['https://mycustomid.github.io/tangsel-tradelink/tenant/sample/']}));
    const html='<link rel="canonical" href="https://mycustomid.github.io/tangsel-tradelink/tenant/sample/"><a href="https://example.com/contact">Contact</a>';
    const file=path.join(root,'dist/tenant/sample/index.html');
    fs.writeFileSync(file,html);
    edit(root,file,html);
    return spawnSync(process.execPath,[path.join(root,'scripts/validate-output.mjs')],{encoding:'utf8'});
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
}
test('output guard accepts intact NFC output',()=>assert.equal(runCase().status,0));
test('output guard rejects removed generated page',()=>assert.notEqual(runCase((r,f)=>fs.unlinkSync(f)).status,0));
test('output guard rejects canonical drift',()=>assert.notEqual(runCase((r,f,h)=>fs.writeFileSync(f,h.replace('/sample/','/changed/'))).status,0));
test('output guard rejects silently changed contact destination',()=>assert.notEqual(runCase((r,f,h)=>fs.writeFileSync(f,h.replace('example.com/contact','example.com/other'))).status,0));
test('output guard rejects escaped base path assets',()=>assert.notEqual(runCase((r,f,h)=>fs.writeFileSync(f,h+'<img src="/brand/missing.webp">')).status,0));
test('output guard rejects missing internal assets',()=>assert.notEqual(runCase((r,f,h)=>fs.writeFileSync(f,h+'<img src="/tangsel-tradelink/brand/missing.webp">')).status,0));

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import http from 'node:http';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const {createStaticServer}=require('../scripts/static-server.cjs');

test('QA server enforces project prefix boundary and rejects traversal',async()=>{
  const root=fs.mkdtempSync(path.join(process.cwd(),'.qa-server-'));
  fs.writeFileSync(path.join(root,'index.html'),'Safe fixture');
  const server=createStaticServer(root);
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const request=p=>new Promise((resolve,reject)=>http.get({hostname:'127.0.0.1',port:server.address().port,path:p},r=>{let body='';r.on('data',d=>body+=d);r.on('end',()=>resolve({status:r.statusCode,body}));}).on('error',reject));
  try {
    assert.equal((await request('/tangsel-tradelink/')).body,'Safe fixture');
    assert.equal((await request('/tangsel-tradelinkevil/')).status,404);
    assert.equal((await request('/..%2fpackage.json')).status,400);
    assert.equal((await request('/%E0%A4%A')).status,400);
  } finally {await new Promise(resolve=>server.close(resolve));fs.rmSync(root,{recursive:true,force:true});}
});
function verify(change=()=>{}) {
  const root=fs.mkdtempSync(path.join(process.cwd(),'.qa-package-'));
  try {
    const text='Release fixture';
    fs.writeFileSync(path.join(root,'payload.txt'),text);
    fs.writeFileSync(path.join(root,'PATCH-SHA256SUMS.txt'),crypto.createHash('sha256').update(text).digest('hex')+'  payload.txt\n');
    change(root);
    return spawnSync(process.execPath,['scripts/verify-package.mjs',root],{encoding:'utf8'}).status;
  }finally{fs.rmSync(root,{recursive:true,force:true});}
}
test('package verifier accepts complete original payload',()=>assert.equal(verify(),0));
test('package verifier rejects tampering',()=>assert.notEqual(verify(root=>fs.appendFileSync(path.join(root,'payload.txt'),'modified')),0));
test('package verifier rejects unmanifested source',()=>assert.notEqual(verify(root=>fs.writeFileSync(path.join(root,'extra.js'),'unexpected')),0));

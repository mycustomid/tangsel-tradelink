import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root=process.cwd();
const destination=path.resolve(root,'../tangsel-tradelink-awwwards-final-rc.zip');
const stage=path.resolve(root,'../tangsel-tradelink-rc-package');
if(fs.existsSync(stage) && !process.argv.includes('--refresh')) throw new Error(`Use --refresh to rebuild the known staging directory: ${stage}`);
fs.mkdirSync(stage,{recursive:true});
const items=['src','public','tests','.github','.gitignore','.nvmrc','package.json','package-lock.json','astro.config.mjs','serve_local.cjs','apply-patch.sh','apply-patch.ps1','ASSET-SOURCES.md','PATCH-MANIFEST.md','VERIFICATION-REPORT.md','PATCH-INFO.txt','audit_46_status.json','docs/OSINT-SOURCE-LEDGER.md'];
for(const item of items){fs.mkdirSync(path.dirname(path.join(stage,item)),{recursive:true});fs.cpSync(path.join(root,item),path.join(stage,item),{recursive:true});}
const scripts=['validate-permalinks.mjs','validate-tenants.mjs','validate-output.mjs','verify-package.mjs','browser-qa.mjs','accessibility-qa.mjs','package-release.mjs','static-server.cjs','download-md-assets.mjs','visual_audit_mobile.cjs','scrape_kenyess_media.cjs','scrape_zyvas_media.cjs'];
fs.mkdirSync(path.join(stage,'scripts'),{recursive:true});
for(const file of scripts)fs.copyFileSync(path.join(root,'scripts',file),path.join(stage,'scripts',file));
fs.mkdirSync(path.join(stage,'reports/browser'),{recursive:true});
for(const file of ['TENANT-ART-DIRECTION-AUDIT.md','SECURITY-REVIEW.md','CHANGE-PROOF.diff','semgrep.json','npm-audit.json'])fs.copyFileSync(path.join(root,'reports',file),path.join(stage,'reports',file));
for(const file of ['results.json','accessibility.json','performance-lab.json','lighthouse-home.json'])fs.copyFileSync(path.join(root,'reports/browser',file),path.join(stage,'reports/browser',file));
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const files=walk(stage).filter(p=>path.basename(p)!=='PATCH-SHA256SUMS.txt').sort();
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
fs.writeFileSync(path.join(stage,'PATCH-SHA256SUMS.txt'),files.map(p=>`${hash(p)}  ${path.relative(stage,p).replaceAll('\\','/')}`).join('\n')+'\n');
const verify=spawnSync(process.execPath,[path.join(stage,'scripts/verify-package.mjs'),stage],{stdio:'inherit'});
if(verify.status!==0)throw new Error('Package verification failed');
if(process.argv.includes('--stage-only')) { console.log(`Verified staging: ${stage}`); process.exit(0); }
const py='import pathlib,zipfile,sys\nroot=pathlib.Path(sys.argv[1])\nwith zipfile.ZipFile(sys.argv[2],"w",zipfile.ZIP_DEFLATED,compresslevel=6) as z:\n for p in sorted(root.rglob("*")):\n  if p.is_file(): z.write(p,p.relative_to(root).as_posix())\nwith zipfile.ZipFile(sys.argv[2]) as z:\n assert z.testzip() is None\n print("ZIP integrity OK:",len(z.namelist()),"entries")';
const zipped=spawnSync(process.env.PYTHON || 'python',['-c',py,stage,destination],{stdio:'inherit'});
if(zipped.status!==0)throw new Error('ZIP creation failed');
const sha=hash(destination);
fs.writeFileSync(destination+'.sha256',`${sha}  ${path.basename(destination)}\n`);
console.log(destination+'\nSHA256 '+sha);

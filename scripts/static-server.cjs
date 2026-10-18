const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.pdf':'application/pdf','.woff2':'font/woff2'};
exports.createStaticServer = (directory) => {
  const root=path.resolve(directory);
  // nosemgrep: problem-based-packs.insecure-transport.js-node.using-http-server.using-http-server
  // Local loopback QA server only. Production HTTPS is supplied by GitHub Pages.
  return http.createServer((req,res) => {
    let pathname;
    try { pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname); }
    catch { res.writeHead(400);res.end();return; }
    if(pathname.includes('\0')||pathname.split(/[\\/]/).includes('..')){res.writeHead(400);res.end();return;}
    if(pathname==='/tangsel-tradelink')pathname='/';
    else if(pathname.startsWith('/tangsel-tradelink/'))pathname=pathname.slice('/tangsel-tradelink'.length);
    const relative=pathname.replace(/^[/\\]+/,'');
    const target=path.resolve(root,relative); // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
    // Enforce the root boundary before any file-system reads, including symlinks.
    if(!target.startsWith(root+path.sep)&&target!==root){res.writeHead(403);res.end();return;}
    const candidates=[target,target+'.html',path.join(target,'index.html')];
    const file=candidates.find(p=>fs.existsSync(p)&&fs.statSync(p).isFile());
    if(!file){res.writeHead(404);res.end('Not found');return;}
    const real=fs.realpathSync(file);
    if(!real.startsWith(fs.realpathSync(root)+path.sep)){res.writeHead(403);res.end();return;}
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});
    fs.createReadStream(real).pipe(res);
  });
};

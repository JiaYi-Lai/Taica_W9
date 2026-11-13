// Local static preview; uses only Node.js built-in modules.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const base = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};
http.createServer((request,response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400).end(); return; }
  const file = path.resolve(base, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
  if (!file.startsWith(base + path.sep) || path.relative(base,file).split(path.sep).some(part=>part.startsWith('.'))) { response.writeHead(403).end(); return; }
  fs.readFile(file,(error,data) => {
    if(error){response.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('找不到頁面');return;}
    response.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'}).end(data);
  });
}).listen(8000,'127.0.0.1',()=>console.log('GDM. preview: http://127.0.0.1:8000'));

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const args=process.argv, port=Number(process.env.PORT||args[args.indexOf('--port')+1])||4173;
const root=path.resolve('dist');
http.createServer((req,res)=>{let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);res.end();return}let file=path.join(root,pathname==='/'?'index.html':pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(data)})}).listen(port,'0.0.0.0');

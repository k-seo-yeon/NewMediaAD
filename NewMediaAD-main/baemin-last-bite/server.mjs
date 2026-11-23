import http from 'node:http';
import {readFile} from 'node:fs/promises';
const assets = new Map([['/app.js','text/javascript'],['/scene.js','text/javascript'],['/style.css','text/css']]);
const server = http.createServer(async (req,res)=>{
  if(req.url==='/'){
    res.setHeader('Content-Type','text/html; charset=utf-8');
    return res.end('<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>배민 | 마지막 한 입</title><link rel="stylesheet" href="/style.css"><main id="app"></main><script type="module" src="/app.js"></script></html>');
  }
  if(!assets.has(req.url)){res.writeHead(404);return res.end();}
  try{
    const data=await readFile(new URL('./src'+req.url,import.meta.url));
    res.setHeader('Content-Type',assets.get(req.url)+'; charset=utf-8');res.end(data);
  }catch{res.writeHead(500);res.end();}
});
server.listen(Number(process.env.PORT || 0),'127.0.0.1',()=>console.log('Ready http://127.0.0.1:'+server.address().port));

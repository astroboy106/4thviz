/* 4thviz offline cache. Bump VERSION on every release. */
const VERSION='4thviz-v12';
const SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
const CDN='https://cdn.jsdelivr.net/npm/three@0.160.0/';
self.addEventListener('install',e=>{ e.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url);
  if(u.hostname==='api.anthropic.com') return;
  const same=u.origin===self.location.origin;
  if(same&&(r.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/'))){
    // network first for the app page so updates arrive, cache fallback offline
    e.respondWith(fetch(r).then(res=>{ const cp=res.clone(); caches.open(VERSION).then(c=>c.put(r,cp)); return res; }).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
    return;
  }
  if(same||r.url.startsWith(CDN)||u.hostname.endsWith('fonts.googleapis.com')||u.hostname.endsWith('fonts.gstatic.com')){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{ if(res&&(res.ok||res.type==='opaque')){ const cp=res.clone(); caches.open(VERSION).then(c=>c.put(r,cp)); } return res; })));
  }
});

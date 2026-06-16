const CACHE_NAME = 'jbretas-v5'; // ← muda a versão aqui sempre que alterar arquivos

const ASSETS = [
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/db.js',
  './js/app.js',
  './js/coleta.js',
  './js/copasa.js',
];

// Arquivos que SEMPRE devem vir da rede (nunca do cache)
const NETWORK_FIRST = [
  './js/db.js',
  './js/app.js',
  './js/coleta.js',
  './js/copasa.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const isNetworkFirst = NETWORK_FIRST.some(f => url.pathname.endsWith(f.replace('./', '/')));

  if (isNetworkFirst) {
    // JS críticos: tenta rede primeiro, fallback para cache
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Atualiza o cache com a versão nova
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request)) // offline: usa cache
    );
  } else {
    // Resto: cache first (imagens, CSS, HTML)
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).catch(() => caches.match('./index.html'));
      })
    );
  }
});

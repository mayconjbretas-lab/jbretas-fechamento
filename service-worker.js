const CACHE_NAME = 'jbretas-v6'; // ← incrementado
const ASSETS = [
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/db.js',
  './js/app.js',
  './js/coleta.js',
  './js/copasa.js',
];
const NETWORK_FIRST = [
  './js/db.js',
  './js/app.js',
  './js/coleta.js',
  './js/copasa.js',
];

// Requisições para esses domínios NUNCA passam pelo cache
const BYPASS_DOMAINS = [
  'jbretas-api-service-production.up.railway.app',
  'script.google.com',
  'api.emailjs.com',
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

  // API Railway e Apps Script: sempre vai para rede, nunca cacheia
  if (BYPASS_DOMAINS.some(d => url.hostname.includes(d))) {
    event.respondWith(fetch(event.request));
    return;
  }

  const isNetworkFirst = NETWORK_FIRST.some(f => url.pathname.endsWith(f.replace('./', '/')));
  if (isNetworkFirst) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).catch(() => caches.match('./index.html'));
      })
    );
  }
});

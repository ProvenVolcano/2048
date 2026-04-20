const CACHE_NAME = 'pwa-cache-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/src',
    '/public/favicon.svg'
];
// instalace -- spouští se hned po stažení sw.js
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});
//aktivace -- např. k vyčištění cache
self.addEventListener('activate', (event) => {});

// jednoduchá cache-first strategie
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
// vrať z cache, nebo zkus síť
            return response || fetch(event.request);
        })
    );
});

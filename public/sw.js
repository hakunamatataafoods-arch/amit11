const CACHE_NAME = 'poshansetu-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/public/icon.svg',
  '/public/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Pass Firebase / external RTDB requests straight to network or handle gracefully
  if (event.request.url.includes('firebaseio.com') || event.request.url.includes('gstatic.com')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          return caches.match('/index.html');
        })
      );
    })
  );
});

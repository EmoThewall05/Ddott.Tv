const CACHE = 'ddott-tv-v42';
const FILES = [
  '/',
  '/index.html',
  '/home/index.html',
  '/player/player-v2.html',
  '/player/player-v3.html',
  '/player/shorts.html',
  '/creator/channel.html',
  '/messaging/index.html',
  '/coins/index.html',
  '/ai/index.html',
  '/creator/studio.html',
  '/home/landing.html',
  '/config/auth.js',
  '/config/cloudinary-config.js',
  '/community/studio/index.html',
  '/community/translate/index.html',
  '/auth/login.html',
  '/community/news/index.html',
  '/advertiser/index.html',
  '/community/index.html',
  '/home-script.js',
  '/studio-script.js',
  '/supabase-config.js'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

// Clean up old caches on activation, and take control of open pages
// immediately so a new deploy doesn't require closing all tabs first.
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first: always try to get the latest version from the server.
// Only fall back to cache if the network request fails (offline support).
// This fixes the old "cache-first forever" bug where deploys never showed
// up until the service worker itself was unregistered.
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const resClone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, resClone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

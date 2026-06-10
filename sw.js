const CACHE = 'ddott-tv-v7';
const FILES = [
  '/',
  '/index.html',
  '/ddott-home-v2.html',
  '/ddott-player-v2.html',
  '/ddott-player-v3.html',
  '/ddott-shorts.html',
  '/ddott-creator-channel.html',
  '/ddott-messaging.html',
  '/ddott-emo-coins.html',
  '/ddott-ai-butterfly.html',
  '/ddott-creator-studio.html',
  '/ddott-landing-v2.html',
  '/supabase-config.js',
  '/auth.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

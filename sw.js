const CACHE = 'ddott-tv-v1';
const FILES = [
  '/ddott-tv-app.html',
  '/ddott-home-v2.html',
  '/ddott-player-v2.html',
  '/ddott-creator-channel.html',
  '/ddott-messaging.html',
  '/ddott-emo-coins.html',
  '/ddott-ai-butterfly.html',
  '/ddott-creator-studio.html',
  '/ddott-landing-v2.html'
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

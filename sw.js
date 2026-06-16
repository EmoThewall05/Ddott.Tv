const CACHE = 'ddott-tv-v22';
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
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

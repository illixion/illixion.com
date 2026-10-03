// Network first, cache as the fallback, so a deploy is visible on the next load and the
// installed app still opens offline. Bump VERSION when the shell list changes.
const VERSION = 'v1';
const CACHE = `ixion-${VERSION}`;
const SHELL = [
  '/',
  '/index.html',
  '/css/index.css',
  '/js/early.js',
  '/js/index.js',
  '/images/illixion.jpg',
  '/images/apps/convolution.png',
  '/images/apps/longwave.png',
  '/images/apps/worldcast.png',
  '/pgp.txt',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Full-size artwork is several megabytes each; leave it to the HTTP cache.
const skip = (url) => url.pathname.startsWith('/images/arts/') && !url.pathname.startsWith('/images/arts/t/');

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin || skip(url)) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true })
        .then((hit) => hit || (e.request.mode === 'navigate' ? caches.match('/') : Response.error()))),
  );
});

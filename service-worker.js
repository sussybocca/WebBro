self.addEventListener('install', event => {
  console.log('Service worker installing...');
  self.skipWaiting(); // Activate worker immediately
});

self.addEventListener('activate', event => {
  console.log('Service worker activated');
});

self.addEventListener('fetch', event => {
  // Minimal caching (optional)
  event.respondWith(fetch(event.request));
});

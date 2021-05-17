// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests
const CACHE_NAME = "my-site-cache-v1";
const CACHE_URL = ["https://cse110lab6.herokuapp.com/entries"];

// Install event listener
self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(CACHE_URL);
    })
  );
});

// Activation event listener
self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// Fetch event listener
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// when page loads
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("demoApp-v3").then((cache) => {
      cache.addAll([
        "./index.html",
        "./style.css",
        "./script.js",
        "./ship.jpeg",
      ]);
    })
  );
});

self.addEventListener("activate", (e) => {
  // clean up old cache
  e.waitUntil(
    caches.keys().then((cacheKeyList) => {
      return Promise.all(
        cacheKeyList.map((cacheKey) => {
          if (cacheKey !== "demoApp-v3") {
            return caches.delete(cacheKey);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  // offline exp
  // whever a file is requested
  // 1. check the cache and return from cache 2. if not available fetch from the network (this is bad)
  // 1. first fetch, update my cahce 2. cache as fallback (this is good)

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // update cache
        const clonedData = res.clone();
        caches.open("demoApp-v3").then((cache) => {
          cache.put(e.request, clonedData);
        });
        return res;
      })
      .catch(async () => {
        return caches.open("demoApp-v1").then((cache) => {
          const retVal = cache.match(e.request);
          return retVal;
        });
      })
  );
});

"use strict";
var precacheConfig = [
    ["/index.html", "303727478417600c98790c191d56a910"],
    ["/static/css/main.aa9c0ffb.css", "dbf817c1fc5641dede97523c8879b8ac"],
    ["/static/js/main.903254f3.js", "127bc383f4993ebc389c5b65dd41db3a"],
    [
      "/static/media/glyphicons-halflings-regular.448c34a5.woff2",
      "448c34a56d699c29117adc64c43affeb"
    ],
    [
      "/static/media/glyphicons-halflings-regular.89889688.svg",
      "89889688147bd7575d6327160d64e760"
    ],
    [
      "/static/media/glyphicons-halflings-regular.e18bbf61.ttf",
      "e18bbf611f2a2e43afc071aa2f4e1512"
    ],
    [
      "/static/media/glyphicons-halflings-regular.f4769f9b.eot",
      "f4769f9bdb7466be65088239c12046d1"
    ],
    [
      "/static/media/glyphicons-halflings-regular.fa277232.woff",
      "fa2772327f55d8198301fdb8bcfc8158"
    ],
    [
      "/static/media/icon_ready.8ef7c025.png",
      "8ef7c02566f1e33cf53aefcc8419d19b"
    ],
    [
      "/static/media/icon_spinner.796ce26b.png",
      "796ce26bccf4f992178dfb542a41e687"
    ],
    [
      "/static/media/icon_tangle_left.4c0c5476.png",
      "4c0c5476600935d5fc3d107405c80e7c"
    ],
    [
      "/static/media/icon_tangle_right.d3f05b72.png",
      "d3f05b72f9043641378e9e2bdb534f10"
    ],
    [
      "/static/media/icon_tangle_up.8b9cdce9.png",
      "8b9cdce941e2ee2fd5219075ab724b00"
    ],
    ["/static/media/logo.4de852b7.svg", "4de852b749102190b8fe6c236a92906a"]
  ],
  cacheName =
    "sw-precache-v3-sw-precache-webpack-plugin-" +
    (self.registration ? self.registration.scope : ""),
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function(e, t) {
    var n = new URL(e);
    return "/" === n.pathname.slice(-1) && (n.pathname += t), n.toString();
  },
  cleanResponse = function(e) {
    return e.redirected
      ? ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function(t) {
          return new Response(t, {
            headers: e.headers,
            status: e.status,
            statusText: e.statusText
          });
        })
      : Promise.resolve(e);
  },
  createCacheKey = function(e, t, n, a) {
    var r = new URL(e);
    return (
      (a && r.pathname.match(a)) ||
        (r.search +=
          (r.search ? "&" : "") +
          encodeURIComponent(t) +
          "=" +
          encodeURIComponent(n)),
      r.toString()
    );
  },
  isPathWhitelisted = function(e, t) {
    if (0 === e.length) return !0;
    var n = new URL(t).pathname;
    return e.some(function(e) {
      return n.match(e);
    });
  },
  stripIgnoredUrlParameters = function(e, t) {
    var n = new URL(e);
    return (
      (n.hash = ""),
      (n.search = n.search
        .slice(1)
        .split("&")
        .map(function(e) {
          return e.split("=");
        })
        .filter(function(e) {
          return t.every(function(t) {
            return !t.test(e[0]);
          });
        })
        .map(function(e) {
          return e.join("=");
        })
        .join("&")),
      n.toString()
    );
  },
  hashParamName = "_sw-precache",
  urlsToCacheKeys = new Map(
    precacheConfig.map(function(e) {
      var t = e[0],
        n = e[1],
        a = new URL(t, self.location),
        r = createCacheKey(a, hashParamName, n, /\.\w{8}\./);
      return [a.toString(), r];
    })
  );
function setOfCachedUrls(e) {
  return e
    .keys()
    .then(function(e) {
      return e.map(function(e) {
        return e.url;
      });
    })
    .then(function(e) {
      return new Set(e);
    });
}
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(function(e) {
        return setOfCachedUrls(e).then(function(t) {
          return Promise.all(
            Array.from(urlsToCacheKeys.values()).map(function(n) {
              if (!t.has(n)) {
                var a = new Request(n, { credentials: "same-origin" });
                return fetch(a).then(function(t) {
                  if (!t.ok)
                    throw new Error(
                      "Request for " +
                        n +
                        " returned a response with status " +
                        t.status
                    );
                  return cleanResponse(t).then(function(t) {
                    return e.put(n, t);
                  });
                });
              }
            })
          );
        });
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
}),
  self.addEventListener("activate", function(e) {
    var t = new Set(urlsToCacheKeys.values());
    e.waitUntil(
      caches
        .open(cacheName)
        .then(function(e) {
          return e.keys().then(function(n) {
            return Promise.all(
              n.map(function(n) {
                if (!t.has(n.url)) return e.delete(n);
              })
            );
          });
        })
        .then(function() {
          return self.clients.claim();
        })
    );
  }),
  self.addEventListener("fetch", function(e) {
    if ("GET" === e.request.method) {
      var t,
        n = stripIgnoredUrlParameters(
          e.request.url,
          ignoreUrlParametersMatching
        ),
        a = "index.html";
      (t = urlsToCacheKeys.has(n)) ||
        ((n = addDirectoryIndex(n, a)), (t = urlsToCacheKeys.has(n)));
      var r = "/index.html";
      !t &&
        "navigate" === e.request.mode &&
        isPathWhitelisted(["^(?!\\/__).*"], e.request.url) &&
        ((n = new URL(r, self.location).toString()),
        (t = urlsToCacheKeys.has(n))),
        t &&
          e.respondWith(
            caches
              .open(cacheName)
              .then(function(e) {
                return e.match(urlsToCacheKeys.get(n)).then(function(e) {
                  if (e) return e;
                  throw Error(
                    "The cached response that was expected is missing."
                  );
                });
              })
              .catch(function(t) {
                return (
                  console.warn(
                    'Couldn\'t serve response for "%s" from cache: %O',
                    e.request.url,
                    t
                  ),
                  fetch(e.request)
                );
              })
          );
    }
  });

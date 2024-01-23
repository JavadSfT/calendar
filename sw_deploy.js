const STATIC_CACHE_NAME = "wpa_calendar_cache";

const CACHE_ASSETS = [
    "/",
    "/index.html",
    "/static/script/CalendarInit.js",
    "/static/script/script.js",
    "/static/script/StorageUnit.js",
    "/static/script/CalendarInit.js",
    "/static/lib/fullcalendar/dist/index.global.min.js",
    "/static/lib/fullcalendar/packages/core/locales/fa.global.min.js",
    "/static/fonts/Vazir-Regular.ttf",
    "static/pages/fallback.html"
];

self.addEventListener("install", evt => {
    evt.waitUntil(
        caches
            .open(STATIC_CACHE_NAME)
            .then(cache => {
                cache.addAll(CACHE_ASSETS);
            })
            .catch(err => {
                console.log("we heve problem : ", err);
            })
    );
});

self.addEventListener("fetch", evt => {
    evt.respondWith(
        caches
            .match(evt.request)
            .then(res => {
                return res || fetch(evt.request);
            })
            .catch(err => {
                if (evt.request.url.indexOf(".html") > -1) {
                    return caches.match("./static/pages/fallback.html");
                }
            })
    );
});
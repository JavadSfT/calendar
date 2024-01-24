self.addEventListener("install", evt => {
    evt.waitUntil(
        caches
            .open("wpa_calendar_cache")
            .then(cache => {
                cache.addAll(CACHE_ASSETS = [
                    "/",
                    "/index.html",
                    "/static/pages/fallback.html",
                    "/static/style/style.css",
                    "/static/script/script.js",
                    "/static/script/CalanderTools.js",
                    "/static/script/CalendarEvents.js",
                    "/static/script/CalendarInit.js",
                    "/static/script/StorageUnit.js",
                    "/static/script/Tools.js",

                    "/static/lib/fullcalendar/dist/index.global.min.js",
                    "/static/lib/fullcalendar/packages/core/locales/fa.global.min.js",
                    "/static/fonts/Vazir-Regular-UI.woff2"
                ]);
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
                    return caches.match("/static/pages/index.html");
                }
            })
    );
});
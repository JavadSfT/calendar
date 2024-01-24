self.addEventListener("install", evt => {
    evt.waitUntil(
        caches
            .open("wpa_calendar_cache")
            .then(cache => {
                cache.addAll(CACHE_ASSETS = [
                    "/calendar/",
                    "/calendar/index.html",
                    "/calendar/static/pages/fallback.html",
                    "/calendar/static/style/style.css",
                    "/calendar/static/script/script.js",
                    "/calendar/static/script/CalanderTools.js",
                    "/calendar/static/script/CalendarEvents.js",
                    "/calendar/static/script/CalendarInit.js",
                    "/calendar/static/script/StorageUnit.js",
                    "/calendar/static/script/Tools.js",

                    "/calendar/static/lib/fullcalendar/dist/index.global.min.js",
                    "/calendar/static/lib/fullcalendar/packages/core/locales/fa.global.min.js",
                    "/calendar/static/fonts/Vazir-Regular-UI.woff2"
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
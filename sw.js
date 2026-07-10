/*======================================
 ADIXION RADIO
 Service Worker
======================================*/

const CACHE_NAME = "adixion-radio-v1.0";

const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./config.js",
    "./nowplaying.js",
    "./manifest.json",

    "./assets/logo.png",
    "./assets/default-cover.png",

    "./assets/icons/icon-72.png",
    "./assets/icons/icon-96.png",
    "./assets/icons/icon-128.png",
    "./assets/icons/icon-144.png",
    "./assets/icons/icon-152.png",
    "./assets/icons/icon-192.png",
    "./assets/icons/icon-384.png",
    "./assets/icons/icon-512.png"

];


/*=========================
 INSTALACIÓN
=========================*/

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

    self.skipWaiting();

});


/*=========================
 ACTIVAR
=========================*/

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});


/*=========================
 FETCH
=========================*/

self.addEventListener("fetch", event => {

    if(event.request.method !== "GET") return;

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            if(response){

                return response;

            }

            return fetch(event.request)

            .then(networkResponse => {

                const clone = networkResponse.clone();

                caches.open(CACHE_NAME)

                .then(cache => {

                    cache.put(event.request, clone);

                });

                return networkResponse;

            });

        })

        .catch(() => {

            if(event.request.destination === "document"){

                return caches.match("./index.html");

            }

        })

    );

});


/*=========================
 MENSAJES
=========================*/

self.addEventListener("message", event => {

    if(event.data === "skipWaiting"){

        self.skipWaiting();

    }

});
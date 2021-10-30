/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");




workbox.core.setCacheNameDetails({prefix: "doorbell_app"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

importScripts("https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.8.2/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyDsYrW7QwfgBFrEB62GCEXFg2MzPvEkjQQ",
    authDomain: "web-doorbell-app.firebaseapp.com",
    databaseURL: "https://web-doorbell-app-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "web-doorbell-app",
    storageBucket: "web-doorbell-app.appspot.com",
    messagingSenderId: "926368001658",
    appId: "1:926368001658:web:ff22bc1ba58e3ea81d15c3",
    measurementId: "G-H9S9W0V41B"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.getToken({ vapidKey: "BN1RSz82xSNAWWfVJpFJ0lVoKL8CJvYp350iuDaghbNZjvJObEjEIeAX3yjTODMh5a4MJJE_CakZtbGkjzQCk4A" }).then((currentToken) => {
    if (currentToken) {
        console.log('client token', currentToken)
    } else {
        console.log('No registration token available. Request permission to generate one.');
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
})

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(' Received background message ', payload);
    let title = 'Recipe PWA',
        options = {
            body: "New Recipe Alert",
            icon: "https://raw.githubusercontent.com/idoqo/laravel-vue-recipe-pwa/master/public/recipe-book.png"
        };
    return self.registration.showNotification(
        title,
        options
    );
});

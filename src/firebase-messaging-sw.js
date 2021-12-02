// These JavaScript module imports need to be bundled:
import {precacheAndRoute} from 'workbox-precaching';

self.__precacheManifest = [].concat(self.__precacheManifest || []);
precacheAndRoute(self.__WB_MANIFEST);

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";


self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});


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

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = 'Someone is ringing at the door';
    const notificationOptions = {
        body: 'You can see who it is and open the door..',
        icon: '/img/logo.png',
        vibrate: [100, 50, 100, 50, 100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {action: 'open', title: 'Open door',
                icon: '/img/unlock.png'},
            {action: 'deny', title: 'Deny access',
                icon: '/img/lock.png'},
        ]
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var action = e.action;
    // @todo actions
    if (action === 'open') {
        notification.close();
    } else if (action == 'deny'){

        notification.close();
    }
    else {

        notification.close();
    }
});
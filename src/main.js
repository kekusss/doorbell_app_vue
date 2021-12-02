import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuex from "vuex";
import VeeValidate, { Validator } from "vee-validate";
import pl from "vee-validate/dist/locale/pl";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getToken, onMessage, getMessaging } from "firebase/messaging";
import wb from "./registerServiceWorker";
import {
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
  faKey,
  faAt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faKey, faAt, faUserCircle);

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Validator.localize({ pl: pl });
Vue.use(VeeValidate, {
  locale: "pl",
  inject: true,
  fieldsBagName: "veeFields"
});
Vue.use(VeeValidate);
Vue.prototype.$workbox = wb;


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
const analytics = getAnalytics(firebaseApp);
const auth = getAuth();
const database = getDatabase(firebaseApp);
const messaging = getMessaging();

Vue.use(firebaseApp);
Vue.use(analytics);
Vue.use(auth);
Vue.use(database);
Vue.use(messaging);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

getToken(messaging).then((currentToken) => {
  if (!currentToken) {
    console.log('No Instance ID token available. Request permission to generate one.');

    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);
    });
  }

  /** When app is active */
  onMessage(messaging, (payload) => {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      console.log('[firebase-messaging-sw.js] Received normal message ', payload);

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
          {
            action: 'open', title: 'Open door',
            icon: 'img/unlock.png'
          },
          {
            action: 'deny', title: 'Deny access',
            icon: 'img/lock.png'
          },
        ]
      };

      reg.showNotification(notificationTitle, notificationOptions);
    });

  })
})

if (Notification.permission === "blocked") {
  alert('You have blocked notifications, you will not be able to receive a signal when someone rings the doorbell.')
}

navigator.serviceWorker.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var action = e.action;
  console.log(action + 'tututuutututu')

  if (action === 'open') {
    console.log('aaa');
    alert('dupa');
    notification.close();
  } else if (action == 'deny'){
    console.log('bb');
    notification.close();
  }
  else {

    notification.close();
  }
});
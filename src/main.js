import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuex from "vuex";
import VeeValidate, { Validator } from "vee-validate";
import pl from "vee-validate/dist/locale/pl";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(VeeValidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Validator.localize({ pl: pl });
Vue.use(VeeValidate, {
  locale: "pl",
  inject: true,
  fieldsBagName: "veeFields"
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
const analytics = getAnalytics(firebaseApp);
const auth = getAuth();
const database = getDatabase(firebaseApp);

Vue.use(firebaseApp);
Vue.use(analytics);
Vue.use(auth);
Vue.use(database);


import { getMessaging, onMessage } from "firebase/messaging";
const messaging = getMessaging();

console.log(messaging);
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

self.addEventListener('notificationclose', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;

    console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;
    const action = event.action;
  console.log(primaryKey, action);
    if (action === 'close') {
        notification.close();
    } else {
        this.$router.push('/siema');
    }

    // TODO 5.3 - close all notifications when one is clicked

});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

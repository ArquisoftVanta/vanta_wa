import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import axios from "axios";
import VueAxios from "vue-axios";
import firebase from "firebase";
import {
    BootstrapVue,
    IconsPlugin,
    BVToastPlugin,
    ToastPlugin,
} from "bootstrap-vue";
import moment from "moment";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

if (process.env.NODE_ENV != "production") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

var firebaseConfig = {
    apiKey: "AIzaSyAPoQCAkJr6IqI9As8n9rq8lLtWObSl3yw",
    authDomain: "vanta-132d2.firebaseapp.com",
    projectId: "vanta-132d2",
    databaseURL: "https://vanta-132d2-default-rtdb.firebaseio.com/",
    storageBucket: "vanta-132d2.appspot.com",
    messagingSenderId: "557344769302",
    appId: "1:557344769302:web:7c3ff58d300d60fbb5fc37",
    measurementId: "G-07FD4P162Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const messaging = firebase.messaging();
window.onload = function() {
    giveToken();
    let enableForegroundNotification = true;
    messaging.onMessage(function(payload) {
        if (enableForegroundNotification) {
            const { title, ...options } = JSON.parse(payload.data.notification);
            navigator.serviceWorker.getRegistrations().then(registration => {
                registration[0].showNotification(title, options);
            });
        }
    });
}

function giveToken() {
    messaging.requestPermission()
        .then(function() {
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker
                    .register("./firebase-messaging-sw.js")
                    .then(function(registration) {
                        messaging.getToken({
                                vapidKey: 'BFpT_o73pzbP3KXOsqBp9kUB6ZKPbEmQPpiNRFqVzmVXWTL_TAqxBa4gHM63E7XMKWU7_-Vz16SIRxWXPayA4wg',
                                serviceWorkerRegistration: registration
                            })
                            .then((currentToken) => {
                                if (currentToken) {
                                    localStorage.setItem("token_navigator", currentToken);
                                } else {
                                    alert('No registration token available. Request permission to generate one.');
                                }
                            }).catch((err) => {
                                // catch error while creating client token
                            });
                    })
                    .catch(function(err) {});
            }
        }).catch(function(err) {
            alert('No se ha recibido el permiso');
        });

}

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BVToastPlugin);
Vue.use(ToastPlugin);
new Vue({
    router,
    VueAxios,
    axios,
    store,
    moment,
    render: (h) => h(App),
}).$mount("#app");
export default {
    giveToken
}
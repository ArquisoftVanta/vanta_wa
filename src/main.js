import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import axios from "axios";
import VueAxios from "vue-axios";
import firebase from "firebase";
import { BootstrapVue, IconsPlugin, BVToastPlugin, ToastPlugin } from "bootstrap-vue";
import moment from 'moment'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

if (process.env.NODE_ENV != "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
var firebaseConfig = {
  apiKey: "AIzaSyBYLj8XtE_HgnebkWa0Go4W_4bnsttl6nA",
  authDomain: "wheelsus.firebaseapp.com",
  databaseURL: "https://wheelsus.firebaseio.com",
  projectId: "wheelsus",
  storageBucket: "wheelsus.appspot.com",
  messagingSenderId: "292187867274",
  appId: "1:292187867274:web:59126bc71ef45f61a94573",
  measurementId: "G-7B2LEW813H",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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

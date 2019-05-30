import Vue from 'vue';
import axios from 'axios';
import { axiosApi } from 'scripts/axios';
import Extension from 'components/Extension/Index.vue';
import store from 'store';

Vue.config.productionTip = false; // supprime le message d'avertissement de la console : "You are running Vue in development mode..."

// axios
Vue.prototype.$axios = axios;
Vue.prototype.$axiosApi = axiosApi;

function onReady() {
  new Vue({
    store,

    render: h => h(Extension)
  }).$mount('#extension'); // l'id "#extension" est défini dans "./public/index.html"
}

// eslint-disable-next-line
chrome.tabs.executeScript(
  { file: './webPage.js' }, // déclenche le script communiquant avec l'onglet actif
  onReady // let's play
);

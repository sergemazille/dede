import Vue from 'vue';
import WebPage from 'components/WebPage/Index.vue';
import store from 'store';

Vue.config.productionTip = false; // supprime le message d'avertissement de la console : "You are running Vue in development mode..."

// créé l'élément du DOM auquel attacher l'instance de Vue
const vueEl = document.createElement('div');
vueEl.id = 'dede-extension';
document.body.appendChild(vueEl);

new Vue({
  store,

  render: h => h(WebPage)
}).$mount('#dede-extension');

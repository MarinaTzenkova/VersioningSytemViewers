import Vue from "vue";
import App from "./App.vue";
import PortalVue from "portal-vue";
import VueCompositionApi from "@vue/composition-api";

import "@/shared/css/main.sass";
const endpoints = require("./globals/endpoints");

import router from "./router";

Vue.use(VueCompositionApi);
Vue.use(PortalVue);
Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, "$endpoint", {
  value: endpoints.default
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

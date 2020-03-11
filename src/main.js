import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";

import "@/shared/css/main.sass";

import router from "./router";

Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

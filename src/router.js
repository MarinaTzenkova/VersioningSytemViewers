import Vue from "vue";
import Router from "vue-router";
import Search from "./pages/search/App.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/",
      name: "search",
      component: Search,
      meta: {
        title: "Find an experiment"
      }
    },
    {
      path: "/:experimentId/output",
      name: "output-data",
      component: () =>
        import(
          /* webpackChunkName: "output-data" */ "./pages/outputData/App.vue"
        ),
      props: true
    },
    {
      path: "/:experimentId/lux2",
      name: "lux2",
      component: () =>
        import(
          /* webpackChunkName: "lux2-results-page" */ "./pages/lux/v1.Scratch/App.vue"
        ),
      props: true
    },
    {
      path: "/:experimentId/lux3",
      name: "lux3",
      component: () =>
        import(
          /* webpackChunkName: "lux3-results-page" */ "./pages/lux/v2.Fluo/App.vue"
        ),
      props: true
    }
  ]
});

export default router;

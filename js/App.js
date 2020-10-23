/**
 * Initializes VueJS and sets up the routes.
 */
import RouteHome from "./components/RouteHome.js";
import RouteImpressum from "./components/RouteImpressum.js";
import Route404 from "./components/Route404.js";

const routes = [
  { path: "", component: RouteHome },
  { path: "/impressum", component: RouteImpressum },
  { path: "*", component: Route404 },
];
const router = new VueRouter({
  // set history mode
  // https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
  //mode: 'history',
  // serve routes
  routes: routes,
});

var vm = new Vue({
  router,
}).$mount(`#app`);
console.log("Initialized Vue app.");

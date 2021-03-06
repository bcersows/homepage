/**
 * Initializes VueJS and sets up the routes.
 */
import RouteHome from "./components/RouteHome.js";
import RouteStories from "./components/RouteStories.js";
import RouteImpressum from "./components/RouteImpressum.js";
import Route404 from "./components/Route404.js";

const routes = [
  { path: "", component: RouteHome },
  { path: "/reel", component: RouteStories },
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

Vue.use(VueMarkdown);
var vm = new Vue({
  router,
}).$mount(`#app`);
console.log("Initialized Vue app.");

// after DOM loaded, try to get the Git info and insert it
document.addEventListener("DOMContentLoaded", function () {
  fetch("/assets/gitinfo")
    .then(function (response) {
      if (response.ok) {
        response.text().then(function (text) {
          document.getElementById("version-info").textContent = text;
        });
      } else {
        console.warn(
          `Could not load the Git info: ${response.status}: ${response.statusText}`
        );
      }
    })
    .catch(function (err) {
      console.error("Error when loading the Git info: " + err.message);
    });
});

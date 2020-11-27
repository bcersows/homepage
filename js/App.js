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

  /**
   * Parse the given RSS XML and returns if found any new blog entries.
   * @param {String} xml the RSS feed XML
   * @returns if found any
   */
  function extractRssFeedItem(xml) {
    // create parser and parse input
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xml, "text/xml");

    // threshold is one week
    const threshold = new Date().getTime() - 604800000;

    // select all blog items
    const items = xmlDoc.querySelectorAll("item");

    console.debug(`Found ${items.length} blogs.`);

    // iterating over all items, find one whose pub data is within the threshold
    for (const el of items) {
      const pubTime = new Date(el.querySelector("pubDate").innerHTML).getTime();

      // if found one, return true
      if (threshold < pubTime) {
        console.debug("New blog!");
        return true;
      }
    }

    return false;
  }

  fetch("https://blog.bcersows.de/index.php?/feeds/index.rss2")
    .then(function (response) {
      if (response.ok) {
        var feedXml = response.text();
        var hasNewBlog = extractRssFeedItem(feedXml);

        console.log("Has new blog entries: " + hasNewBlog);
      } else {
        console.warn(
          `Could not load the RSS feed: ${response.status}: ${response.statusText}`
        );
      }
    })
    .catch(function (err) {
      console.error("Error when loading the RSS feed: " + err.message);
    });
});

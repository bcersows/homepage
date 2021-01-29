/**
 * The reel route with stories loaded from the DB.
 */
import { Snippet } from "../model/Snippet.js";

export default {
  name: "RouteReel",
  data() {
    return {
      loading: false,
      stories: null,
      error: null,
    };
  },
  created() {
    // fetch the data when the view is created and the data is already being observed
    this.fetchStories();
  },
  watch: {
    // call the method again if the route changes
    $route: "fetchStories",
  },
  mounted: function () {
    this.$nextTick(function () {
      // set up parallax images
      var elems = document.querySelectorAll(".parallax");
      var options = {};
      var instances = M.Parallax.init(elems, options);
      console.log("Initialized " + instances.length + " parallax instances.");
    });
  },
  methods: {
    fetchStories() {
      this.error = this.snippets = null;
      this.loading = true;

      // load the stories from the backend
      fetch("/api/endpoint/endpoint.php")
        // check the response status
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`${response.status}`);
          }
        })
        // with the actual JSON
        .then((json) => {
          this.stories = json;
        })
        // catch any errors
        .catch((err) => {
          console.error("Error when loading the reel data: " + err.message);
          this.error = `Could not load the data: ${err.message}`;
        })
        // remove loading
        .finally(() => {
          this.loading = false;
        });
    },
  },
  template: `
  <div id="reel">
    <h2>Reel</h2>
    <div v-if="loading" v-for="index in 2" class="loading">
        <div class="loading-skeleton story">
            <p class="story-title"></p>
            <p class="story-content"></p>
        </div>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="stories" class="content">
        <div v-for="story in stories" :key="story.id" class="story">
            <div class="story-img" v-if="story.img"><img :src="'/assets/reel/' + story.img"/></div>
            <div class="story-title"><h3 class="title">{{ story.title }}</h3> <span>{{ story.time }}</span></div>
            <vue-markdown class="story-content left-align">{{ story.content }}</vue-markdown>
        </div>
    </div>
  </div>
        `,
};

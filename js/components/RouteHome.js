/**
 * The home route, featuring a nice parallax view of some images and base information.
 */
import { Logo } from "../model/Logo.js";

export default {
  name: "RouteHome",
  data() {
    return {
      message: "Hello from Vue!",
      links: [
        new Logo(
          "GitHub",
          "https://github.com/bcersows",
          "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
          "GitHub logo"
        ),
        new Logo(
          "LinkedIn",
          "https://www.linkedin.com/in/bj%C3%B6rn-cersowsky",
          "https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg",
          "LinkedIn logo"
        ),
        new Logo(
          "XING",
          "https://www.xing.com/profile/Bjoern_Cersowsky/cv",
          "https://dev.xing.com/assets/xws/dev/logo_rules/XNG_Sharebutton_v01-7d06f36109c803c7a79f5a5c597f1fb8c8ff4d310d74ee8f6b31a56b6d6c3eea.png",
          "XING logo"
        ),
      ],
    };
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
  template: `
<div id="home">
<div class="parallax-container">
  <div class="parallax"><img src="./assets/background_p.jpg" /></div>
</div>
<div class="section white text-large">
  <i class="material-icons large">format_quote</i> and our minds were
  meant to sail
</div>
<div class="parallax-container">
  <div class="parallax"><img src="./assets/background_s.jpg" /></div>
</div>
<div class="section white relative">
  <div id="about-me-image"></div>
  <h3>About Me</h3>
  <div class="container">
    <div class="row">
      <div class="col l6 s12">
        <div class="zoom">
          <div><i class="material-icons">work</i></div>
          <div>Software Engineer</div>
        </div>
      </div>
      <div class="col l6 s12">
        <div class="zoom">
          <div><i class="material-icons">place</i></div>
          <div>Frankfurt/Germany</div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="parallax-container">
  <div class="parallax"><img src="./assets/background_z.jpg" /></div>
</div>
<div class="section white">
  <h3>Connect</h3>
  <div class="container">
    <div class="row">
      <div class="col s6 valign-items" v-for="link in links">
        <img
          class="logo"
          v-bind:src="link.logoUrl"
          v-bind:alt="link.altText"
        />
        <a v-bind:href="link.link" target="_blank">{{link.name}}</a>
      </div>
    </div>
  </div>
</div>
<div class="parallax-container small">
  <div class="parallax"><img src="./assets/background_b.jpg" /></div>
</div>
</div>
      `,
};

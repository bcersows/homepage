//import { Logo } from './model/logo.js';

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".parallax");
  var options = {};
  var instances = M.Parallax.init(elems, options);

  var app = new Vue({
    el: "#app",
    data: {
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
    },
  });
});

class Logo {
  constructor(name, link, logoUrl, altText) {
    this.name = name;
    this.link = link;
    this.logoUrl = logoUrl;
    this.altText = altText;
  }
}

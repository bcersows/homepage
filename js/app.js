var app = new Vue({
  el: "#app",
  data: {
    message: "Hello from Vue!",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".parallax");
  var options = {};
  var instances = M.Parallax.init(elems, options);
});

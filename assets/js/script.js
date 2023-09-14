(function () {
  "use strict";
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  let skill = select('#skill');
  if (skill) {
    new Waypoint({
      element: skill,
      offset: '80%',
      handler: function (direction) {
        let progressBars = select('.progress .progress-bar', true);
        progressBars.forEach((progressBar) => {
          let fill = progressBar.getAttribute('aria-valuenow');
          animateProgressBar(progressBar, fill);
        });
      },
    });
  }

  function animateProgressBar(progressBar, targetWidth) {
    let currentWidth = parseInt(progressBar.style.width) || 0;
    let step = (targetWidth - currentWidth) / 100;
    let width = currentWidth;
    function frame() {
      if (width >= targetWidth) {
        clearInterval(animation);
      } else {
        width += step;
        progressBar.style.width = width + "%";
      }
    }
    let animation = setInterval(frame, 10);
  }
})();

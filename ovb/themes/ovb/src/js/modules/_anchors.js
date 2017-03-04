var smoothScroll = require('../utilities/_smooth-scroll');


function anchorClick() {
  var anchorLinks = document.querySelectorAll('.js--anchor');
  for (var i = 0; i < anchorLinks.length; i++) {
    anchorLinks[i].addEventListener('click', function(e) {
      e.preventDefault();
      smoothScroll.scroll(this.getAttribute('href'), 500, 60);
    });
  }
}


module.exports = {
  listen: anchorClick
};

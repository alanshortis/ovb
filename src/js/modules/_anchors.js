const smoothScroll = require('../utilities/_smooth-scroll');

function anchorClick() {
  const anchorLinks = document.querySelectorAll('.js--anchor');
  anchorLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      global.isScrolling = true;
      smoothScroll.scroll(link.getAttribute('href'), 500, 60);
    });
  });
}

module.exports = {
  listen: anchorClick
};

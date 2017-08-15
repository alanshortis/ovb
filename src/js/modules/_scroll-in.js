const count = require('./_count');
const instagram = require('./_instagram');


function handleScroll() {
  const scrollElements = document.querySelectorAll('.js-scroll-in');
  window.addEventListener('scroll', function handler() {
    scrollElements.forEach(element => {
      let topFromTop = element.getBoundingClientRect().top;
      const bottomFromTop = topFromTop + element.offsetHeight;
      if (topFromTop <= 50 && bottomFromTop >= -50) {
        eval(element.dataset.action).go();
        element.removeEventListener('scroll', handler);
      }
    });
  });
}

module.exports = {
  listen: handleScroll
};

const instagram = require('./_instagram');


function handleScroll() {
  const scrollElements = document.querySelectorAll('.js-scroll-in');
  window.addEventListener('scroll', () => {
    scrollElements.forEach(element => {
      let topFromTop = element.getBoundingClientRect().top;
      const bottomFromTop = topFromTop + element.offsetHeight;
      if (topFromTop <= 100 && bottomFromTop >= -50 && !global.isScrolling) {
        eval(element.dataset.action).go();
      }
    });
  });
}

module.exports = {
  listen: handleScroll
};

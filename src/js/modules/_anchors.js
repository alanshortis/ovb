import {smoothScroll} from '../utilities/_smooth-scroll';

export function anchorClick() {
  const anchorLinks = document.querySelectorAll('.js--anchor');
  anchorLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      smoothScroll(link.getAttribute('href'), 500, 60);
    });
  });
}

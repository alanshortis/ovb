function scroll(element, duration, topOffSet = 0) {
	const startingY = window.pageYOffset;
  const elementY = (window.pageYOffset + document.querySelector(element).getBoundingClientRect().top) - topOffSet;
	const diff = elementY - startingY;
  const easing = (t) => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
  let start;

  if (diff <= 0.5 && diff >= -0.5) return;

	window.requestAnimationFrame(function step(timestamp) {
    if (!start)
      start = timestamp;
    const time = timestamp - start;
    const percent = easing(Math.min(time / duration, 1));

    window.scrollTo(0, startingY + diff * percent)
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  });
}


module.exports = {
  scroll: scroll
};

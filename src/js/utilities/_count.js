function countUp(numberElement) {
  let current = 0;
  const total = parseInt(numberElement.textContent);
  const increment = Math.ceil(total / 100);

  function step() {
    current += increment;
    if (current > total) current = total;
    numberElement.textContent = current.toLocaleString();
    (current !== total) && requestAnimationFrame(step);
  }
  step();
}

module.exports = {
  countUp: countUp
};

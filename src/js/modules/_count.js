function count() {
  const elements = document.querySelectorAll('.js--stat');
  elements.forEach(element => {
    let current = 0;
    const total = parseInt(element.textContent);
    const increment = Math.ceil(total / 100);

    function step() {
      current += increment;
      if (current > total) current = total;
      element.textContent = current.toLocaleString();
      (current !== total) && requestAnimationFrame(step);
    }
    step();
  });
}

module.exports = {
  go: count
};

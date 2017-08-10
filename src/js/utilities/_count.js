function countUp(numberElement) {
  let current = 0;
  const total = parseInt(numberElement.textContent);
  const countSpeed = Math.abs(Math.floor(100 / total));
  const timer = setInterval(function countIt() {
    current += 1;
    numberElement.innerHTML = current.toLocaleString();
    (current == total) && clearInterval(timer);
  }, countSpeed);
}

module.exports = {
  countUp: countUp
};

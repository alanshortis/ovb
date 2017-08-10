const count = require('../utilities/_count');

function startCount() {
  const elements = document.querySelectorAll('.js--stat');
  elements.forEach(element => count.countUp(element));
}

module.exports = {
  listen: startCount
};

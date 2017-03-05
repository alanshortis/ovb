function _countUp(numberElement) {
  var current = 0;
  var total = parseInt(numberElement.innerHTML);
  var countSpeed = Math.abs(Math.floor(2000 / total));
  var timer = setInterval(function countIt() {
    current += 1;
    numberElement.innerHTML = current.toLocaleString();
    (current == total) && clearInterval(timer);
  }, countSpeed);
}


function count() {
  var elements = document.querySelectorAll('.number');
  for (var i = 0; i < elements.length; i++) {
    _countUp(elements[i]);
  }
}


module.exports = {
  count: count
};

var count = require('../utilities/_count');


function startCount() {
  count.count();
}


module.exports = {
  listen: startCount
};

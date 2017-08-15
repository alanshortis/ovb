global.iScrolling = false;

const anchors = require('./modules/_anchors');
const scrollIn = require('./modules/_scroll-in');

anchors.listen();
scrollIn.listen();

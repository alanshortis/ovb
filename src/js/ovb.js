const anchors = require('./modules/_anchors');
const startCount = require('./modules/_start-count');
const instagram = require('./modules/_instagram');

anchors.listen();
startCount.listen();
instagram.feed();

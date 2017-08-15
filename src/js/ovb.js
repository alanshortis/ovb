const anchors = require('./modules/_anchors');
const count = require('./modules/_count');
const instagram = require('./modules/_instagram');

anchors.listen();
count.go();
instagram.feed();

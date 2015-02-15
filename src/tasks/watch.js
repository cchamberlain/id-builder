'use strict';

const watch = require('../lib/watch');

const run = function(options, cb) {
  watch.start(options);
  cb();
};

module.exports = {
  dependencies: [ 'runTests' ],
  run: run
};

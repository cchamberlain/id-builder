'use strict';

const watch = require('../lib/watch');

const run = function(options, cb) {
  watch.start(options);
  cb();
};

export default {
  dependencies: [ 'runTests' ],
  run: run
};

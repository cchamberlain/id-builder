'use strict';

const less = require('../lib/less');

export default {
  dependencies: [ 'clean' ],
  run: less.compileAllFiles
};

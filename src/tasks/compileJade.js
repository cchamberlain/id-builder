'use strict';

const jade = require('../lib/jade');

export default {
  dependencies: [ 'clean' ],
  run: jade.compileAllFiles
};

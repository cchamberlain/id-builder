'use strict';

const jade = require('../lib/jade');

module.exports = {
  dependencies: [ 'clean' ],
  run: jade.compileAllFiles
};

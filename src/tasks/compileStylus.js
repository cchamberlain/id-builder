'use strict';

const stylus = require('../lib/stylus');

export default {
  dependencies: [ 'clean' ],
  run: stylus.compileAllFiles
};

'use strict';

const livescript = require('../lib/livescript');

export default {
  dependencies: [ 'clean' ],
  run: livescript.compileAllFiles
};

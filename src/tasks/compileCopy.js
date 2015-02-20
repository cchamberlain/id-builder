'use strict';

const copy = require('../lib/copy');

export default {
  dependencies: [ 'clean' ],
  run: copy.copyAllFiles
};

'use strict';

const babel = require('../lib/babel')

export default {
  dependencies: [ 'clean' ],
  run: babel.compileAllFiles
};

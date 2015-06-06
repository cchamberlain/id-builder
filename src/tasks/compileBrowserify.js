'use strict';

import logging from '../lib/logging';
import browserify from '../lib/browserify';

const dependencies = [
  'compileBabel',
  'compileCoffeescript',
  'compileCopy',
  'compileLess',
  'compileLivescript',
  'compileStylus'
];

const run = browserify.compileAllFiles;

export default {
  dependencies,
  run
};

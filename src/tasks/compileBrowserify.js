'use strict';

import logging from '../lib/logging';
import { compileAllFiles } from '../lib/browserify';

const dependencies = [
  'compileBabel',
  'compileCoffeescript',
  'compileCopy',
  'compileLess',
  'compileLivescript',
  'compileStylus'
];

const run = compileAllFiles;

export default {
  dependencies,
  run
};

'use strict';

import log from 'loglevel';
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

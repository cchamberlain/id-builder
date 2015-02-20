'use strict';

import { compileAllFiles } from '../lib/browserify';

export const dependencies = [
  'clean',
  'compileBabel',
  'compileCoffeescript',
  'compileCopy',
  'compileJade',
  'compileLess',
  'compileLivescript',
  'compileStylus'
];

export const run = compileAllFiles;

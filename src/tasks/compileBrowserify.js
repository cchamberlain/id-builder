'use strict';

import { compileAllFiles } from '../lib/browserify';

export const dependencies = [
  'clean',
  'compileCoffeescript',
  'compileJade',
  'compileLivescript',
  'compileBabel'
];

export const run = compileAllFiles;

'use strict';

import log from 'loglevel';
import { compileAllFiles } from '../lib/browserify';

export const dependencies = [
  'compileBabel',
  'compileCoffeescript',
  'compileCopy',
  //'compileJade',
  'compileLess',
  'compileLivescript',
  'compileStylus'
];

export const run = compileAllFiles;

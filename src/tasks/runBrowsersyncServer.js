'use strict';

import log from 'loglevel';
import { runServer } from '../lib/browsersync';

export const dependencies = [
  'compileBabel',
  'compileBrowserify',
  'compileCoffeescript',
  'compileCopy',
  'compileJade',
  'compileLess',
  'compileLivescript',
  'compileStylus',
];

export const run = runServer;

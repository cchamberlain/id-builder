'use strict';

import log from 'loglevel';
import { runServer } from '../lib/browsersync';

const dependencies = [
  'compileBabel',
  'compileBrowserify',
  'compileCoffeescript',
  'compileCopy',
  'compileLess',
  'compileLivescript',
  'compileStylus',
];

const run = runServer;

export default {
  dependencies,
  run
};

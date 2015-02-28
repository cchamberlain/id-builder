'use strict';

// TODO: before program exit clean up children.
import { runServers } from '../lib/servers';

export const dependencies = [
  'compileBabel',
  //'compileBrowserify',
  'compileCoffeescript',
  'compileCopy',
  'compileJade',
  'compileLess',
  'compileLivescript',
  'compileStylus'
];

export const run = runServers;

'use strict';

// TODO: before program exit clean up children.
import { runServers } from '../lib/servers';

export const dependencies = [
  'compileBrowserify',
  'compileCoffeescript',
  'compileCopy',
  'compileJade',
  'compileLess',
  'compileLivescript',
  'compileBabel',
  'compileStylus'
];

export const run = runServers;

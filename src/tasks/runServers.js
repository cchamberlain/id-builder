'use strict';

// TODO: before program exit clean up children.
import { runServers } from '../lib/servers';
import log from 'loglevel';

const dependencies = [
  'compileBabel',
  'compileBrowserify',
  'compileCoffeescript',
  'compileCopy',
  //'compileJade',
  'compileLess',
  'compileLivescript',
  'compileStylus'
];

const run = runServers;

export default {
  dependencies,
  run
};

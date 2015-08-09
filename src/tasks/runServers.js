g// TODO: before program exit clean up children.
import servers from '../lib/servers';
import logging from '../lib/logging';

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

const run = servers.runServers;

export default {
  dependencies,
  run
};

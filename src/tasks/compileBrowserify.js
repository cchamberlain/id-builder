'use strict';

const fileSystem = require('../lib/fileSystem');
const browserify  = require('../lib/browserify');

const dependencies = [
  'clean',
  'compileCoffeescript',
  'compileJade',
  'compileLivescript',
  'compileBabel'
];

const run = browserify.compileAllFiles;

export default {
  dependencies: dependencies,
  run: run
};

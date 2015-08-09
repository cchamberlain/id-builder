import webpack from '../lib/webpack';

const dependencies = [
  'compileBabel',
  'compileCoffeescript',
  'compileCopy',
  'compileLess',
  'compileLivescript',
  'compileStylus'
];

const run = webpack.compileAllFiles;

export default {
  dependencies,
  run
};

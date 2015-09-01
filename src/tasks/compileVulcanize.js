import polybuild from 'polybuild';
import { spawn } from 'child_process';

const dependencies = [
  'clean'
];

function run(options, cb) {
  const sourceDirectoryPath = options.sourceDirectoryPath;

  const process = spawn(`./node_modules/.bin/polybuild`);

  process.on('close', () => {
    cb();
  });
}

export default {
  dependencies,
  run
};

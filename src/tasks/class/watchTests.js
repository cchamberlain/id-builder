import logging from '../lib/logging';
import tests from '../lib/tests';
import watch from '../lib/watch';

const dependencies = [
  'runTests',
  'watch'
];

function handlePath(options, path) {
  if (!tests.buildFilePathMatches(options, path)) {
    return;
  }

  tests.runTests(options, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleAdd(options, path) {
  handlePath(options, path);
}

// function handleAddDir(options, path) {
//   handlePath(options, path);
// }

function handleChange(options, path) {
  handlePath(options, path);
}

function run(options) {
  const watcher = watch.getWatcher();

  watcher.on('ready', () => {
    watcher.on('add', (path) => { handleAdd(options, path); });
    // watcher.on('addDir', (path) => { handleAddDir(options, path); });
    watcher.on('change', (path) => { handleChange(options, path); });
  });
}

export default {
  dependencies,
  run
};

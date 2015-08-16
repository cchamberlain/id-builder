import logging from '../lib/logging';
import less from '../lib/less';
import watch from '../lib/watch';

const dependencies = [
  'watch'
];

function handlePath(options, path) {
  if (!less.sourceFilePathMatches(options, path)) {
    return;
  }

  less.compileFile(options, options.sourceFilePath, options.targetFilePath, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleAdd(options, path) {
  handlePath(options, path);
}

// function handleAddDir(options, path) {
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

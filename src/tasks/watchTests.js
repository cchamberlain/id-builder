import logging from '../lib/logging';
import tests from '../lib/tests';
import watch from '../lib/watch';

const dependencies = [
  'runTests',
  'watch'
];

function handlePath(options, path, stat)  {
  if (!tests.buildFilePathMatches(options, path)) {
    return;
  }

  tests.runTests(options, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleAdd(options, path, stat)  {
  handlePath(options, path, stat);
}

function handleAddDir(options, path, stat)  {
  handlePath(options, path, stat);
}

function handleChange(options, path, stat)  {
  handlePath(options, path, stat);
}

function handleUnlink(options, path, stat)  {
  handlePath(options, path, stat);
}

function handleUnlinkDir(options, path, stat)  {
  handlePath(options, path, stat);
}

function handleError(options, e)  {
  logging.taskError(e);
}

function run(options, cb)  {
  const watcher = watch.getWatcher();

  watcher.on('ready', () => {
    watcher.on('add', (path, stat) => { handleAdd(options, path, stat) });
    watcher.on('addDir', (path, stat) => { handleAddDir(options, path, stat) });
    watcher.on('change', (path, stat) => { handleChange(options, path, stat) });
    watcher.on('unlink', (path, stat) => { handleUnlink(options, path, stat) });
    watcher.on('unlinkDir', (path, stat) => { handleUnlinkDir(options, path, stat) });
    watcher.on('error', (path, stat) => { handleError(options, path, stat) });
  });
}

export default {
  dependencies,
  run
};

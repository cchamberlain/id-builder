import logging from '../lib/logging';
import copy from '../lib/copy';
import watch from '../lib/watch';

const dependencies = [
  'watch'
];

function handlePath(options, path, stat)  {
  if (!copy.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourceDirectoryPath, options.targetDirectoryPath);

  copy.copyFile(options, path, targetPath, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleAdd(options, path, stat)  {
  handlePath(options, path, stat);
}

function handleAddDir(options, path, stat)  {
}

function handleChange(options, path, stat)  {
  handlePath(options, path, stat);
}

function handleUnlink(options, path, stat)  {
}

function handleUnlinkDir(options, path, stat)  {
}

function handleError(options, e)  {
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

import coffeescript from '../lib/coffeescript';
import fileSystem from '../lib/fileSystem'
import logging from '../lib/logging';
import watch from '../lib/watch';

const dependencies = [
  'watch'
];

function handleAdd(options, path, stat)  {
  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourceDirectoryPath, options.targetDirectoryPath)
    .replace(`.${coffeescript.sourceExtension}`, `.${coffeescript.targetExtension}`);

  coffeescript.compileFile(options, path, targetPath, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleAddDir(options, path, stat)  {
  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  coffeescript.compileAllFiles({ sourceDirectoryPath: path }, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleChange(options, path, stat)  {
  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourceDirectoryPath, options.targetDirectoryPath)
    .replace(`.${coffeescript.sourceExtension}`, `.${coffeescript.targetExtension}`);

  coffeescript.compileFile(options, path, targetPath, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleUnlink(options, path, stat)  {
  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  fileSystem.removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleUnlinkDir(options, path, stat)  {
  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  fileSystem.removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleError(options, e)  {
  logging.taskError(e);
}

function run(options, cb)  {
  const watcher = watch.getWatcher();

  watcher.on('ready', () =>  {
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

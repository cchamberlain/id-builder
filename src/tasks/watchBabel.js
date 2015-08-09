import logging from '../lib/logging';
import babel from '../lib/babel';
import watch from '../lib/watch';
import fileSystem from '../lib/fileSystem'

const dependencies = [
  'watch'
];

function handleAdd(options, path, stat)  {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourceDirectoryPath, options.targetDirectoryPath)
    .replace(new RegExp(`^\.${babel.sourceExtension}$`), `.${babel.targetExtension}`);

  babel.compileFile(options, path, targetPath, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleAddDir(options, path, stat)  {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  babel.compileAllFiles({ sourceDirectoryPath: path }, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleChange(options, path, stat)  {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourceDirectoryPath, options.targetDirectoryPath)
    .replace(new RegExp(`^\.${babel.sourceExtension}$`), `.${babel.targetExtension}`);

  babel.compileFile(options, path, targetPath, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleUnlink(options, path, stat)  {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  fileSystem.removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleUnlinkDir(options, path, stat)  {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  fileSystem.removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleError(options, e)  {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  logging.taskError(e);
}

function run(options, cb)  {
  const watcher = watch.getWatcher();

  watcher.on('ready', () => {
    watcher.on('add', (path, stat) => { handleAdd(options, path, stat); });
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

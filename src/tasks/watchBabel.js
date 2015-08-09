import logging from '../lib/logging';
import babel from '../lib/babel';
import watch from '../lib/watch';
import fileSystem from '../lib/fileSystem';

const dependencies = [
  'watch'
];

function handleAdd(options, path) {
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

function handleAddDir(options, path) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  babel.compileAllFiles({ sourceDirectoryPath: path }, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleChange(options, path) {
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

function handleUnlink(options, path) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  fileSystem.removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleUnlinkDir(options, path) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  fileSystem.removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleError(options, e) {
  logging.taskError(e);
}

function run(options) {
  const watcher = watch.getWatcher();

  watcher.on('ready', () => {
    watcher.on('add', (path) => { handleAdd(options, path); });
    watcher.on('addDir', (path) => { handleAddDir(options, path); });
    watcher.on('change', (path) => { handleChange(options, path); });
    watcher.on('unlink', (path) => { handleUnlink(options, path); });
    watcher.on('unlinkDir', (path) => { handleUnlinkDir(options, path); });
    watcher.on('error', (path) => { handleError(options, path); });
  });
}

export default {
  dependencies,
  run
};

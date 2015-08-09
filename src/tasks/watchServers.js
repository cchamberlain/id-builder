import log from 'loglevel';

import logging from '../lib/logging';
import servers from '../lib/servers';
import watch from '../lib/watch';

const dependencies = [
  'watch'
];

function handlePath(options, path) {
  log.debug('watchServers.handlePath', options, path);

  if (!servers.sourceFilePathMatches(options, path)) {
    return;
  }

  log.debug('watchServers.handlePath restarting servers');

  servers.restartServers(options, e => {
    log.debug('watchServers.handlePath servers restarted!');

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

// function handleUnlink(options, path) {
// }

// function handleUnlinkDir(options, path) {
// }

// function handleError(options, e) {
// }

function run(options) {
  const watcher = watch.getWatcher();

  watcher.on('ready', () => {
    watcher.on('add', (path) => { handleAdd(options, path); });
    // watcher.on('addDir', (path) => { handleAddDir(options, path); });
    watcher.on('change', (path) => { handleChange(options, path); });
    // watcher.on('unlink', (path) => { handleUnlink(options, path); });
    // watcher.on('unlinkDir', (path) => { handleUnlinkDir(options, path); });
    // watcher.on('error', (path) => { handleError(options, path); });
  });
}

export default {
  dependencies,
  run
};

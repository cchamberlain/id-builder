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

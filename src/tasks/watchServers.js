import log from 'loglevel';

import logging from '../lib/logging';
import servers  from '../lib/servers';
import watch from '../lib/watch';

const dependencies = [
  'watch'
];

const handlePath = function(options, path, stat) {
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
};

const handleAdd = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleAddDir = function(options, path, stat) {
};

const handleChange = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleUnlink = function(options, path, stat) {
};

const handleUnlinkDir = function(options, path, stat) {
};

const handleError = function(options, e) {
};

const run = function(options, cb) {
  const watcher = watch.getWatcher();

  watcher.on('ready', () => {
    watcher.on('add', (path, stat)  => { handleAdd(options, path, stat) });
    watcher.on('addDir', (path, stat) => { handleAddDir(options, path, stat) });
    watcher.on('change', (path, stat) => { handleChange(options, path, stat) });
    watcher.on('unlink', (path, stat) => { handleUnlink(options, path, stat) });
    watcher.on('unlinkDir', (path, stat) => { handleUnlinkDir(options, path, stat) });
    watcher.on('error', (path, stat) => { handleError(options, path, stat) });
  });
};

export default {
  dependencies,
  run
};

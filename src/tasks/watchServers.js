'use strict';

import log from 'loglevel';
import servers  from '../lib/servers';
import { getWatcher } from '../lib/watch';

const dependencies = [
  'watch'
];

const handlePath = (options, path, stat) => {
  if (!servers.sourceFilePathMatches(options, path)) {
    return;
  }

  servers.restartServers(options, (e) => {
    if (e) {
      console.error(e);
    }
  });
};

const handleAdd = (options, path, stat) => {
  handlePath(options, path, stat);
};

const handleAddDir = (options, path, stat) => {
};

const handleChange = (options, path, stat) => {
  handlePath(options, path, stat);
};

const handleUnlink = (options, path, stat) => {
};

const handleUnlinkDir = (options, path, stat) => {
};

const handleError = (options, e) => {
};

const run = (options, cb) => {
  const watcher = getWatcher();

  watcher.on('ready', function() {
    watcher.on('add', (path, stat) => { handleAdd(options, path, stat) });
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

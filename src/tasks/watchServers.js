import log from 'loglevel';

import logging from '../lib/logging';
import servers  from '../lib/servers';
import watch from '../lib/watch';

const dependencies = [
  'watch'
];

function handlePath(options, path, stat)  {
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
    watcher.on('add', (path, stat)  => { handleAdd(options, path, stat) });
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

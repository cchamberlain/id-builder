var chokidar = require('chokidar');

var watcher = null;

var getWatcher = function(){
  return watcher;
};

var start = function(options){
  if (!options.paths.length) {
    return;
  }

  if (watcher) {
    return watcher;
  }

  watcher = chokidar.watch(options.paths[0], {
    ignored: /[\/\/]\./,
    persistent: true,
    ignoreInitial: true
  });

  for (var i = 1, l = options.paths.length; i < l; i++) {
    watcher.add(options.paths[i]);
  }

  return watcher;
};

module.exports = {
  getWatcher: getWatcher,
  start: start
};
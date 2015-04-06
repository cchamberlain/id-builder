'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _coffeescript = require('../lib/coffeescript');

var _coffeescript2 = _interopRequireWildcard(_coffeescript);

var _getWatcher = require('../lib/watch');

'use strict';

var dependencies = ['watch'];

var handlePath = function handlePath(options, path, stat) {
  //log.debug('watchCoffeescript.handlePath', path);

  if (!_coffeescript2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  var targetPath = path.replace(options.sourcePath, options.targetPath).replace('.' + _coffeescript2['default'].sourceExtension, '.' + _coffeescript2['default'].targetExtension);

  //log.debug('watchCoffeescript.handlePath targetPath', targetPath);

  _coffeescript2['default'].compileFile(options, path, targetPath, function (e) {
    if (e) {
      console.error(e);
    }
  });
};

var handleAdd = function handleAdd(options, path, stat) {
  //log.debug('watchCoffeescript.handleAdd', path);

  handlePath(options, path, stat);
};

var handleAddDir = function handleAddDir(options, path, stat) {};

var handleChange = function handleChange(options, path, stat) {
  //log.debug('watchCoffeescript.handleChange', path);

  handlePath(options, path, stat);
};

var handleUnlink = function handleUnlink(options, path, stat) {};

var handleUnlinkDir = function handleUnlinkDir(options, path, stat) {};

var handleError = function handleError(options, e) {};

var run = function run(options, cb) {
  //log.debug('watchCoffeescript.run', options);

  var watcher = _getWatcher.getWatcher();

  watcher.on('ready', function () {
    watcher.on('add', function (path, stat) {
      handleAdd(options, path, stat);
    });
    watcher.on('addDir', function (path, stat) {
      handleAddDir(options, path, stat);
    });
    watcher.on('change', function (path, stat) {
      handleChange(options, path, stat);
    });
    watcher.on('unlink', function (path, stat) {
      handleUnlink(options, path, stat);
    });
    watcher.on('unlinkDir', function (path, stat) {
      handleUnlinkDir(options, path, stat);
    });
    watcher.on('error', function (path, stat) {
      handleError(options, path, stat);
    });
  });
};

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];

//log.debug('watchCoffeescript.handleAddDir', path);

//log.debug('watchCoffeescript.handleUnlink', path);

//log.debug('watchCoffeescript.handleUnlinkDir', path);

//log.debug('watchCoffeescript.handleError', options, e);
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var log = _interopRequire(_log);

var _import = require('../lib/coffeescript');

var coffeescript = _interopRequireWildcard(_import);

var _getWatcher = require('../lib/watch');

'use strict';

var dependencies = ['watch'];

exports.dependencies = dependencies;
var handlePath = function handlePath(options, path, stat) {
  //log.debug('watchCoffeescript.handlePath', path);

  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  var targetPath = path.replace(options.sourcePath, options.targetPath).replace('.' + coffeescript.sourceExtension, '.' + coffeescript.targetExtension);

  //log.debug('watchCoffeescript.handlePath targetPath', targetPath);

  coffeescript.compileFile(options, path, targetPath, function (e) {
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
exports.run = run;

//log.debug('watchCoffeescript.handleAddDir', path);

//log.debug('watchCoffeescript.handleUnlink', path);

//log.debug('watchCoffeescript.handleUnlinkDir', path);

//log.debug('watchCoffeescript.handleError', options, e);
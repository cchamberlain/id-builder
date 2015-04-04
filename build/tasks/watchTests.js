'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _buildFilePathMatches$runTests = require('../lib/tests');

var _getWatcher = require('../lib/watch');

'use strict';

var dependencies = ['runTests', 'watch'];

exports.dependencies = dependencies;
var handlePath = function handlePath(options, path, stat) {
  if (!_buildFilePathMatches$runTests.buildFilePathMatches(options, path)) {
    return;
  }

  _buildFilePathMatches$runTests.runTests(options, function (e) {
    if (e) {
      console.error(e);
    }
  });
};

var handleAdd = function handleAdd(options, path, stat) {
  handlePath(options, path, stat);
};

var handleAddDir = function handleAddDir(options, path, stat) {
  handlePath(options, path, stat);
};

var handleChange = function handleChange(options, path, stat) {
  handlePath(options, path, stat);
};

var handleUnlink = function handleUnlink(options, path, stat) {
  handlePath(options, path, stat);
};

var handleUnlinkDir = function handleUnlinkDir(options, path, stat) {
  handlePath(options, path, stat);
};

var handleError = function handleError(options, e) {
  console.error(e);
};

var run = function run(options, cb) {
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
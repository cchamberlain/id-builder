'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _tests = require('../lib/tests');

var _tests2 = _interopRequireWildcard(_tests);

var _watch = require('../lib/watch');

var _watch2 = _interopRequireWildcard(_watch);

'use strict';

var dependencies = ['runTests', 'watch'];

var handlePath = function handlePath(options, path, stat) {
  if (!_tests2['default'].buildFilePathMatches(options, path)) {
    return;
  }

  _tests2['default'].runTests(options, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
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
  _logging2['default'].taskError(e);
};

var run = function run(options, cb) {
  var watcher = _watch2['default'].getWatcher();

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
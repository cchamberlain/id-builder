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

var dependencies = ['runTests', 'watch'];

function handlePath(options, path) {
  if (!_tests2['default'].buildFilePathMatches(options, path)) {
    return;
  }

  _tests2['default'].runTests(options, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
    }
  });
}

function handleAdd(options, path) {
  handlePath(options, path);
}

// function handleAddDir(options, path) {
//   handlePath(options, path);
// }

function handleChange(options, path) {
  handlePath(options, path);
}

function run(options) {
  var watcher = _watch2['default'].getWatcher();

  watcher.on('ready', function () {
    watcher.on('add', function (path) {
      handleAdd(options, path);
    });
    // watcher.on('addDir', (path) => { handleAddDir(options, path); });
    watcher.on('change', function (path) {
      handleChange(options, path);
    });
  });
}

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];
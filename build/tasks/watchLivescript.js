'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _livescript = require('../lib/livescript');

var _livescript2 = _interopRequireWildcard(_livescript);

var _watch = require('../lib/watch');

var _watch2 = _interopRequireWildcard(_watch);

var dependencies = ['watch'];

function handlePath(options, path) {
  if (!_livescript2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  var targetPath = path.replace(options.sourceDirectoryPath, options.targetDirectoryPath).replace(new RegExp('^.' + _livescript2['default'].sourceExtension + '$'), '.' + _livescript2['default'].targetExtension);

  _livescript2['default'].compileFile(options, path, targetPath, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
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

// function handleUnlink(options, path) {
// }

// function handleUnlinkDir(options, path) {
// }

// function handleError(options, e) {
// }

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
    // watcher.on('unlink', (path) => { handleUnlink(options, path); });
    // watcher.on('unlinkDir', (path) => { handleUnlinkDir(options, path); });
    // watcher.on('error', (path) => { handleError(options, path); });
  });
}

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];
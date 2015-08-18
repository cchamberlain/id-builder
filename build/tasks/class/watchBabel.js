'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _babel = require('../lib/babel');

var _babel2 = _interopRequireWildcard(_babel);

var _watch = require('../lib/watch');

var _watch2 = _interopRequireWildcard(_watch);

var dependencies = ['watch'];

function handleAdd(options, path) {
  if (!_babel2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  var targetPath = path.replace(options.sourceDirectoryPath, options.targetDirectoryPath).replace(new RegExp('^.' + _babel2['default'].sourceExtension + '$'), '.' + _babel2['default'].targetExtension);

  _babel2['default'].compileFile(options, path, targetPath, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
    }
  });
}

function handleAddDir(options, path) {
  if (!_babel2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  _babel2['default'].compileAllFiles({ sourceDirectoryPath: path }, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
    }
  });
}

function handleChange(options, path) {
  if (!_babel2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  var targetPath = path.replace(options.sourceDirectoryPath, options.targetDirectoryPath).replace(new RegExp('^.' + _babel2['default'].sourceExtension + '$'), '.' + _babel2['default'].targetExtension);

  _babel2['default'].compileFile(options, path, targetPath, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
    }
  });
}

function run(options) {
  var watcher = _watch2['default'].getWatcher();

  watcher.on('ready', function () {
    watcher.on('add', function (path) {
      handleAdd(options, path);
    });
    watcher.on('addDir', function (path) {
      handleAddDir(options, path);
    });
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
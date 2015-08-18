'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _coffeescript = require('../lib/coffeescript');

var _coffeescript2 = _interopRequireWildcard(_coffeescript);

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _watch = require('../lib/watch');

var _watch2 = _interopRequireWildcard(_watch);

var dependencies = ['watch'];

function handleAdd(options, path) {
  if (!_coffeescript2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  var targetPath = path.replace(options.sourceDirectoryPath, options.targetDirectoryPath).replace('.' + _coffeescript2['default'].sourceExtension, '.' + _coffeescript2['default'].targetExtension);

  _coffeescript2['default'].compileFile(options, path, targetPath, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
    }
  });
}

function handleAddDir(options, path) {
  if (!_coffeescript2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  _coffeescript2['default'].compileAllFiles({ sourceDirectoryPath: path }, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
    }
  });
}

function handleChange(options, path) {
  if (!_coffeescript2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  var targetPath = path.replace(options.sourceDirectoryPath, options.targetDirectoryPath).replace('.' + _coffeescript2['default'].sourceExtension, '.' + _coffeescript2['default'].targetExtension);

  _coffeescript2['default'].compileFile(options, path, targetPath, function (e) {
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
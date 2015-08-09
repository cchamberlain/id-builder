'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _coffeescript = require('../lib/coffeescript');

var _coffeescript2 = _interopRequireWildcard(_coffeescript);

var _fileSystem = require('../lib/fileSystem');

var _fileSystem2 = _interopRequireWildcard(_fileSystem);

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _watch = require('../lib/watch');

var _watch2 = _interopRequireWildcard(_watch);

var dependencies = ['watch'];

var handleAdd = function handleAdd(options, path, stat) {
  if (!_coffeescript2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  var targetPath = path.replace(options.sourceDirectoryPath, options.targetDirectoryPath).replace('.' + _coffeescript2['default'].sourceExtension, '.' + _coffeescript2['default'].targetExtension);

  _coffeescript2['default'].compileFile(options, path, targetPath, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
    }
  });
};

var handleAddDir = function handleAddDir(options, path, stat) {
  if (!_coffeescript2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  _coffeescript2['default'].compileAllFiles({ sourceDirectoryPath: path }, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
    }
  });
};

var handleChange = function handleChange(options, path, stat) {
  if (!_coffeescript2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  var targetPath = path.replace(options.sourceDirectoryPath, options.targetDirectoryPath).replace('.' + _coffeescript2['default'].sourceExtension, '.' + _coffeescript2['default'].targetExtension);

  _coffeescript2['default'].compileFile(options, path, targetPath, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
    }
  });
};

var handleUnlink = function handleUnlink(options, path, stat) {
  if (!_coffeescript2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  _fileSystem2['default'].removePath(path, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
    }
  });
};

var handleUnlinkDir = function handleUnlinkDir(options, path, stat) {
  if (!_coffeescript2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  _fileSystem2['default'].removePath(path, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
    }
  });
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
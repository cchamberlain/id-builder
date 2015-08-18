'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _browserify = require('../lib/browserify');

var _browserify2 = _interopRequireWildcard(_browserify);

var _browsersync = require('../lib/browsersync');

var _browsersync2 = _interopRequireWildcard(_browsersync);

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _watch = require('../lib/watch');

var _watch2 = _interopRequireWildcard(_watch);

var _webpack = require('../lib/webpack');

var _webpack2 = _interopRequireWildcard(_webpack);

var dependencies = ['watch'];

function shouldContinue(options, path) {
  var result = false;

  if (path.match(/\.js$/) && _browserify2['default'].matchesTargetPath(options, path) || _webpack2['default'].matchesTargetPath(options, path)) {
    result = true;
  } else if (_browsersync2['default'].sourceFilePathMatches(options, path)) {
    result = true;
  }

  return result;
}

function handleAdd(options, path) {
  if (!shouldContinue(options, path)) {
    return;
  }

  _browsersync2['default'].reload(options, path, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
    }
  });
}

function handleAddDir(options, path) {
  if (!shouldContinue(options, path)) {
    return;
  }

  // TODO: Something?
}

function handleChange(options, path) {
  if (!shouldContinue(options, path)) {
    return;
  }

  _browsersync2['default'].reload(options, path, function (e) {
    if (e) {
      _logging2['default'].taskError(e);
    }
  });
}

function run(options) {
  var _arguments = arguments;

  var watcher = _watch2['default'].getWatcher();

  watcher.on('all', function () {
    _log2['default'].debug('watchBrowsersync watcher all', _arguments);
  });

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
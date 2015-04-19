'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _sourceFilePathMatches$reload = require('../lib/browsersync');

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _getWatcher = require('../lib/watch');

var _removePath = require('../lib/fileSystem');

'use strict';

var dependencies = ['watch'];

var handleAdd = function handleAdd(options, path, stat) {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!_sourceFilePathMatches$reload.sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  _sourceFilePathMatches$reload.reload(options, path, function (e) {
    if (e) {
      _log2['default'].error(e);
    }
  });
};

var handleAddDir = function handleAddDir(options, path, stat) {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!_sourceFilePathMatches$reload.sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  // TODO: Something?
};

var handleChange = function handleChange(options, path, stat) {
  _log2['default'].debug('watchBrowserSync.handleChange', path, options, stat);

  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!_sourceFilePathMatches$reload.sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  _log2['default'].debug('watchBrowserSync.handleChange MATCH!!!', path, options, stat);

  _sourceFilePathMatches$reload.reload(options, path, function (e) {
    _log2['default'].debug('watchBrowserSync.handleChange RELOADED', path, options, stat);

    if (e) {
      _log2['default'].error(e);
    }
  });
};

var handleUnlink = function handleUnlink(options, path, stat) {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!_sourceFilePathMatches$reload.sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  _removePath.removePath(path, function (e) {
    if (e) {
      _log2['default'].error(e);
    }
  });
};

var handleUnlinkDir = function handleUnlinkDir(options, path, stat) {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!_sourceFilePathMatches$reload.sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  _removePath.removePath(path, function (e) {
    if (e) {
      _log2['default'].error(e);
    }
  });
};

var handleError = function handleError(options, e) {
  _log2['default'].error(e);
};

var run = function run(options, cb) {
  _log2['default'].debug('watchBrowsersync.run', options);

  var watcher = _getWatcher.getWatcher();

  watcher.on('all', function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _log2['default'].debug.apply(_log2['default'], ['watchBrowsersync all: '].concat(args));
  });

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
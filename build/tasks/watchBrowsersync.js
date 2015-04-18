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

var matches = function matches(path) {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!_sourceFilePathMatches$reload.sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }
};

var handleAdd = function handleAdd(options, path, stat) {
  if (!matches(path)) {
    return;
  }

  _sourceFilePathMatches$reload.reload(options, path, function (e) {
    if (e) {
      _log2['default'].error(e);
    }
  });
};

var handleAddDir = function handleAddDir(options, path, stat) {
  if (!matches(path)) {
    return;
  }
};

var handleChange = function handleChange(options, path, stat) {
  if (!matches(path)) {
    return;
  }

  _sourceFilePathMatches$reload.reload(options, path, function (e) {
    if (e) {
      _log2['default'].error(e);
    }
  });
};

var handleUnlink = function handleUnlink(options, path, stat) {
  if (!matches(path)) {
    return;
  }

  _removePath.removePath(path, function (e) {
    if (e) {
      _log2['default'].error(e);
    }
  });
};

var handleUnlinkDir = function handleUnlinkDir(options, path, stat) {
  if (!matches(path)) {
    return;
  }

  _removePath.removePath(path, function (e) {
    if (e) {
      _log2['default'].error(e);
    }
  });
};

var handleError = function handleError(options, e) {
  if (!matches(path)) {
    return;
  }

  _log2['default'].error(e);
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

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireWildcard(_browserSync);

var _copy = require('./copy');

var _copy2 = _interopRequireWildcard(_copy);

var _log = require('./log');

var _log2 = _interopRequireWildcard(_log);

'use strict';

var sourceFilePathMatches = _copy2['default'].sourceFilePathMatches;

var reload = function reload(options, path, cb) {
  _browserSync2['default'].reload(path);

  _log2['default'].taskInfo(options.taskName, 'Reloaded `' + path + '`');

  cb();
};

var runServer = function runServer(_options, cb) {
  var options = {
    ui: {
      port: 9001
    },

    port: 9000,
    logLevel: 'silent',
    logFileChanges: false };

  _browserSync2['default'](options, function (e, bs) {
    if (e) {
      return cb(e);
    }

    cb();
  });
};

exports['default'] = {
  sourceFilePathMatches: sourceFilePathMatches,
  reload: reload,
  runServer: runServer
};
module.exports = exports['default'];
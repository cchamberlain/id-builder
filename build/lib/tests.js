'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _exists = require('fs');

var _resolve = require('path');

var _spawn = require('child_process');

var _logging = require('./logging');

var _logging2 = _interopRequireWildcard(_logging);

var pathToMocha = _resolve.resolve(__dirname + '/../../node_modules/mocha/bin/_mocha');

var randomString = function randomString() {
  return Math.random().toString(36).slice(7);
};

var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var matchesJavascript = sourceFilePath && !!sourceFilePath.match(/\.js$/);
  var matchesWatchPath = sourceFilePath.indexOf(options.watchDirectoryPath) === 0;

  return matchesJavascript && matchesWatchPath;
};

var buildFilePathMatches = function buildFilePathMatches(options, buildFilePath) {
  var matchesJavascript = buildFilePath && !!buildFilePath.match(/\.js$/);
  var matchesWatchPath = buildFilePath.indexOf(options.watchDirectoryPath) === 0;

  return matchesJavascript && matchesWatchPath;
};

var runTests = function runTests(options, cb) {
  _log2['default'].debug('lib/tests.runTests');

  _exists.exists(options.sourceDirectoryPath, function (exists) {
    if (!exists) {
      _logging2['default'].taskInfo(options.taskName, 'Skipping: Directory `' + options.sourceDirectoryPath + '` not found.');
      return cb();
    }

    var childProcess = _spawn.spawn('node', [pathToMocha, '--recursive', '--colors', '--reporter', options.reporter, options.sourceDirectoryPath]);

    childProcess.stdout.on('data', function (chunk) {
      return process.stdout.write(chunk);
    });

    childProcess.stderr.on('data', function (chunk) {
      return process.stderr.write(chunk);
    });

    childProcess.once('close', function () {
      cb();
    });
  });
};

exports['default'] = {
  randomString: randomString,
  sourceFilePathMatches: sourceFilePathMatches,
  buildFilePathMatches: buildFilePathMatches,
  runTests: runTests
};
module.exports = exports['default'];
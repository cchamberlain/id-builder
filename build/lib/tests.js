'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _fs = require('fs');

var _path = require('path');

var _child_process = require('child_process');

var _logging = require('./logging');

var _logging2 = _interopRequireDefault(_logging);

var pathToMocha = (0, _path.resolve)(__dirname + '/../../node_modules/mocha/bin/_mocha');

function randomString() {
  return Math.random().toString(36).slice(7);
}

function sourceFilePathMatches(options, sourceFilePath) {
  var matchesJavascript = sourceFilePath && !!sourceFilePath.match(/\.js$/);
  var matchesWatchPath = sourceFilePath.indexOf(options.watchDirectoryPath) === 0;

  return matchesJavascript && matchesWatchPath;
}

function buildFilePathMatches(options, buildFilePath) {
  var matchesJavascript = buildFilePath && !!buildFilePath.match(/\.js$/);
  var matchesWatchPath = buildFilePath.indexOf(options.watchDirectoryPath) === 0;

  return matchesJavascript && matchesWatchPath;
}

function runTests(options, cb) {
  _loglevel2['default'].debug('lib/tests.runTests');

  (0, _fs.exists)(options.sourceDirectoryPath, function (exists) {
    if (!exists) {
      _logging2['default'].taskInfo(options.taskName, 'Skipping: Directory `' + options.sourceDirectoryPath + '` not found.');
      return cb();
    }

    var childProcess = (0, _child_process.spawn)('node', [pathToMocha, '--recursive', '--colors', '--reporter', options.reporter, options.sourceDirectoryPath]);

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
}

exports['default'] = {
  randomString: randomString,
  sourceFilePathMatches: sourceFilePathMatches,
  buildFilePathMatches: buildFilePathMatches,
  runTests: runTests
};
module.exports = exports['default'];
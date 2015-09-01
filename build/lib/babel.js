'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _transform = require('babel');

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireWildcard(_minimatch);

// import logging from './logging';

var _fileSystem = require('./fileSystem');

var _fileSystem2 = _interopRequireWildcard(_fileSystem);

var sourceExtension = 'js';
var targetExtension = 'js';

function sourceFilePathMatches(options, sourceFilePath) {
  var isIgnored = _import2['default'].find(options.ignore, function (v) {
    var expression = new RegExp(v);

    return !!expression.exec(sourceFilePath);
  });

  if (isIgnored) {
    return false;
  }

  var expression = new RegExp('^' + options.sourceDirectoryPath + '.+\\.' + sourceExtension + '$');

  return !!sourceFilePath.match(expression);
}

function compileChunk(options, chunk, cb) {
  _log2['default'].debug('lib/babel.compileChunk');

  try {
    var output = _transform.transform(chunk, options.options);

    cb(null, output.code);
  } catch (e) {
    return cb(e);
  }
}

function compileFile(options, sourceFilePath, targetFilePath, cb) {
  _log2['default'].debug('lib/babel.compileFile', sourceFilePath);

  _fileSystem2['default'].compileFile(compileChunk, options, sourceFilePath, targetFilePath, cb);
}

function compileAllFiles(options, cb) {
  _log2['default'].debug('lib/babel.compileAllFiles');

  _fileSystem2['default'].compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension, options, cb);
}

function compileAllPolymerComponentFiles(options, cb) {}

exports['default'] = {
  sourceExtension: sourceExtension,
  targetExtension: targetExtension,
  sourceFilePathMatches: sourceFilePathMatches,
  compileChunk: compileChunk,
  compileFile: compileFile,
  compileAllFiles: compileAllFiles,
  compileAllPolymerComponentFiles: compileAllPolymerComponentFiles
};
module.exports = exports['default'];
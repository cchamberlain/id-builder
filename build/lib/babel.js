'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _babel = require('babel');

// import logging from './logging';

var _fileSystem = require('./fileSystem');

var _fileSystem2 = _interopRequireDefault(_fileSystem);

var sourceExtension = 'js';
var targetExtension = 'js';

function sourceFilePathMatches(options, sourceFilePath) {
  var isIgnored = _lodash2['default'].find(options.ignore, function (v) {
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
  _loglevel2['default'].debug('lib/babel.compileChunk');

  try {
    var output = (0, _babel.transform)(chunk, options.options);

    cb(null, output.code);
  } catch (e) {
    return cb(e);
  }
}

function compileFile(options, sourceFilePath, targetFilePath, cb) {
  _loglevel2['default'].debug('lib/babel.compileFile', sourceFilePath);

  _fileSystem2['default'].compileFile(compileChunk, options, sourceFilePath, targetFilePath, cb);
}

function compileAllFiles(options, cb) {
  _loglevel2['default'].debug('lib/babel.compileAllFiles');

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
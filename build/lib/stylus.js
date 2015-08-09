'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _render = require('stylus');

var _logging = require('./logging');

var _logging2 = _interopRequireWildcard(_logging);

var _fileSystem = require('./fileSystem');

var _fileSystem2 = _interopRequireWildcard(_fileSystem);

var sourceExtension = 'styl';
var targetExtension = 'css';

function sourceFilePathMatches(options, sourceFilePath) {
  var result = !!sourceFilePath.match(new RegExp('^' + options.sourceDirectoryPath + '.+\\.' + sourceExtension + '$'));

  return result;
}

function compileChunk(options, chunk, cb) {
  _log2['default'].debug('lib/stylus.compileChunk');

  _render.render(chunk, cb);
}

function compileFile(options, sourceFilePath, targetFilePath, cb) {
  _log2['default'].debug('lib/stylus.compileFile', sourceFilePath);

  _fileSystem2['default'].compileFile(compileChunk, options, sourceFilePath, targetFilePath, cb);
}

function compileAllFiles(options, cb) {
  _log2['default'].debug('lib/stylus.compileAllFiles');

  _fileSystem2['default'].compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension, options, cb);
}

exports['default'] = {
  sourceExtension: sourceExtension,
  targetExtension: targetExtension,
  sourceFilePathMatches: sourceFilePathMatches,
  compileChunk: compileChunk,
  compileFile: compileFile,
  compileAllFiles: compileAllFiles
};
module.exports = exports['default'];
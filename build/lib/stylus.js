'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _render = require('stylus');

var _log = require('./log');

var _log2 = _interopRequireWildcard(_log);

var _fileSystem = require('./fileSystem');

var _fileSystem2 = _interopRequireWildcard(_fileSystem);

'use strict';

var sourceExtension = 'styl';
var targetExtension = 'css';

var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var result = !!sourceFilePath.match(RegExp('^' + options.sourcePath + '.+.' + sourceExtension + '$'));

  return result;
};

var compileChunk = function compileChunk(options, chunk, cb) {
  _log2['default'].debug('stylus.compileChunk', options.sourcePath);

  _render.render(chunk, cb);
};

var compileFile = _fileSystem2['default'].compileFile(compileChunk);

var compileAllFiles = _fileSystem2['default'].compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);

exports['default'] = {
  sourceExtension: sourceExtension,
  targetExtension: targetExtension,
  sourceFilePathMatches: sourceFilePathMatches,
  compileChunk: compileChunk,
  compileFile: compileFile,
  compileAllFiles: compileAllFiles
};
module.exports = exports['default'];
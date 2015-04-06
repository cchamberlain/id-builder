'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _compile = require('LiveScript');

var _log = require('./log');

var _log2 = _interopRequireWildcard(_log);

var _fileSystem = require('./fileSystem');

var _fileSystem2 = _interopRequireWildcard(_fileSystem);

'use strict';

var sourceExtension = 'ls';
var targetExtension = 'js';

var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var result = !!sourceFilePath.match(new RegExp('^' + options.sourcePath + '.+.' + sourceExtension + '$'));

  return result;
};

var compileChunk = function compileChunk(options, chunk, cb) {
  _log2['default'].debug('livescript.compileChunk', options.sourcePath);

  try {
    cb(null, _compile.compile(chunk, {
      bare: true
    }));
  } catch (e) {
    return cb(e);
  }
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
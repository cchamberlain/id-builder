'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _compile = require('coffee-script');

var _log = require('./log');

var _log2 = _interopRequireWildcard(_log);

var _fileSystem = require('./fileSystem');

var _fileSystem2 = _interopRequireWildcard(_fileSystem);

'use strict';

var sourceExtension = 'coffee';
var targetExtension = 'js';

var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  return !!sourceFilePath.match(new RegExp('^' + options.sourceDirectoryPath + '.+.' + sourceExtension + '$'));
};

var compileChunk = function compileChunk(options, chunk, cb) {
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
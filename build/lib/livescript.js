'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _compile = require('LiveScript');

var _import = require('./log');

var log = _interopRequireWildcard(_import);

var _import2 = require('./fileSystem');

var fileSystem = _interopRequireWildcard(_import2);

'use strict';

var sourceExtension = 'ls';
exports.sourceExtension = sourceExtension;
var targetExtension = 'js';

exports.targetExtension = targetExtension;
var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var result = !!sourceFilePath.match(new RegExp('^' + options.sourcePath + '.+.' + sourceExtension + '$'));

  log.debug('livescript.sourceFilePathMatches =>', result, sourceFilePath);

  return result;
};

exports.sourceFilePathMatches = sourceFilePathMatches;
var compileChunk = function compileChunk(options, chunk, cb) {
  log.debug('livescript.compileChunk', options.sourcePath);

  try {
    cb(null, _compile.compile(chunk, {
      bare: true
    }));
  } catch (e) {
    return cb(e);
  }
};

exports.compileChunk = compileChunk;
var compileFile = fileSystem.compileFile(compileChunk);

exports.compileFile = compileFile;
var compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
exports.compileAllFiles = compileAllFiles;
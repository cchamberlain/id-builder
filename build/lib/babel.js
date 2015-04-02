'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _transform = require('babel');

var _import = require('./log');

var log = _interopRequireWildcard(_import);

var _import2 = require('./fileSystem');

var fileSystem = _interopRequireWildcard(_import2);

'use strict';

var sourceExtension = 'js';
exports.sourceExtension = sourceExtension;
var targetExtension = 'js';

exports.targetExtension = targetExtension;
var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var result = !!sourceFilePath.match(new RegExp('^' + options.sourcePath + '.+.' + sourceExtension + '$'));

  log.debug('babel.sourceFilePathMatches =>', result, sourceFilePath);

  return result;
};

exports.sourceFilePathMatches = sourceFilePathMatches;
var compileChunk = function compileChunk(options, chunk, cb) {
  log.debug('babel.compileChunk');

  try {
    var output = _transform.transform(chunk);

    cb(null, output.code);
  } catch (e) {
    return cb(e);
  }
};

exports.compileChunk = compileChunk;
var compileFile = fileSystem.compileFile(compileChunk);

exports.compileFile = compileFile;
var compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
exports.compileAllFiles = compileAllFiles;
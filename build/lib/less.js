'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _less = require('less');

var _less2 = _interopRequireWildcard(_less);

var _import = require('./log');

var log = _interopRequireWildcard(_import);

var _import2 = require('./fileSystem');

var fileSystem = _interopRequireWildcard(_import2);

'use strict';

var sourceExtension = 'less';
exports.sourceExtension = sourceExtension;
var targetExtension = 'css';

exports.targetExtension = targetExtension;
var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var result = !!sourceFilePath.match(new RegExp('^' + options.sourceDirectory + '.+.' + sourceExtension + '$'));

  log.debug('less.sourceFilePathMatches =>', result, sourceFilePath);

  return result;
};

exports.sourceFilePathMatches = sourceFilePathMatches;
var compileChunk = function compileChunk(options, chunk, cb) {
  log.debug('less.compileChunk', options.sourcePath);

  var renderOptions = {
    filename: options.sourcePath
  };

  _less2['default'].render(chunk, renderOptions, function (e, result) {
    if (e) {
      return cb(e);
    }

    return cb(null, result.css);
  });
};

exports.compileChunk = compileChunk;
var compileFile = fileSystem.compileFile(compileChunk);

exports.compileFile = compileFile;
var compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
exports.compileAllFiles = compileAllFiles;
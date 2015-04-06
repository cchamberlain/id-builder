'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _less = require('less');

var _less2 = _interopRequireWildcard(_less);

var _log = require('./log');

var _log2 = _interopRequireWildcard(_log);

var _fileSystem = require('./fileSystem');

var _fileSystem2 = _interopRequireWildcard(_fileSystem);

'use strict';

var sourceExtension = 'less';
var targetExtension = 'css';

var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var result = !!sourceFilePath.match(new RegExp('^' + options.sourceDirectory + '.+.' + sourceExtension + '$'));

  return result;
};

var compileChunk = function compileChunk(options, chunk, cb) {
  _log2['default'].debug('less.compileChunk', options.sourcePath);

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
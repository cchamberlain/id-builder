"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var less = _interopRequire(require("less"));

var log = _interopRequireWildcard(require("./log"));

var fileSystem = _interopRequireWildcard(require("./fileSystem"));

var sourceExtension = "less";
exports.sourceExtension = sourceExtension;
var targetExtension = "css";

exports.targetExtension = targetExtension;
var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var result = !!sourceFilePath.match(new RegExp("^" + options.sourceDirectory + ".+." + sourceExtension + "$"));

  log.debug("less.sourceFilePathMatches =>", result, sourceFilePath);

  return result;
};

exports.sourceFilePathMatches = sourceFilePathMatches;
var compileChunk = function compileChunk(options, chunk, cb) {
  log.debug("less.compileChunk", options.sourcePath);

  var renderOptions = {
    filename: options.sourcePath
  };

  less.render(chunk, renderOptions, function (e, result) {
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
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var less = _interopRequire(require("less"));

var log = _interopRequireWildcard(require("./log"));

var fileSystem = _interopRequireWildcard(require("./fileSystem"));

var sourceExtension = exports.sourceExtension = "less";
var targetExtension = exports.targetExtension = "css";

var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  var result = !!sourceFilePath.match(new RegExp("^" + options.sourceDirectory + ".+." + sourceExtension + "$"));

  log.debug("less.sourceFilePathMatches =>", result, sourceFilePath);

  return result;
};

var compileChunk = exports.compileChunk = function (options, chunk, cb) {
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

var compileFile = exports.compileFile = fileSystem.compileFile(compileChunk);

var compileAllFiles = exports.compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
Object.defineProperty(exports, "__esModule", {
  value: true
});
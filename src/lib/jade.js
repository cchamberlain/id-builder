var jade = require("jade");
var async = require("async");

var fileSystem = require("./file-system");
var logging = require("./logging");

export var sourceExtension = "jade";
export var targetExtension = "js";

export var sourceFilePathMatches = function(options, sourceFilePath) {
  var regex = new RegExp(`^${options.sourcePath}.+\.${options.sourceExtension}$`);

  return sourceFilePath.match(regex);
};

export var compileChunk = function(options, chunk, cb) {
  try {
    cb(null, jade.compileClient(chunk, {
      compileDebug: false,
      filename: options.sourceFilePath
    }))
  } catch (e) {
    return cb(e);
  }
};

export var compileFile = fileSystem.compileFile(compileChunk);

export var compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
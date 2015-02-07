"use strict";

var less = require("less");
var async = require("async");

var fileSystem = require("./fileSystem");
var logging = require("./logging");

var sourceExtension = "less";
var targetExtension = "css";

var sourceFilePathMatches = function(options, sourceFilePath) {
  var regex = new RegExp(`^${options.sourcePath}.+\.${options.sourceExtension}$`);

  return sourceFilePath.match(regex);
};

var compileChunk = function(options, chunk, cb) {
  less.render(chunk, function(e, result) {
    if (e) {
      return cb(e);
    }

    var css = result.css;

    return cb(null, css);
  });
};

var compileFile = fileSystem.compileFile(compileChunk);

var compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);

module.exports = {
  sourceExtension: sourceExtension,
  targetExtension: targetExtension,
  sourceFilePathMatches: sourceFilePathMatches,
  compileChunk: compileChunk,
  compileFile: compileFile,
  compileAllFiles: compileAllFiles
};
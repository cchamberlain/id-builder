"use strict";

let less = require("less");
let async = require("async");

let fileSystem = require("./fileSystem");
let logging = require("./logging");

let sourceExtension = "less";
let targetExtension = "css";

let sourceFilePathMatches = function(options, sourceFilePath) {
  let regex = new RegExp(`^${options.sourcePath}.+\.${options.sourceExtension}$`);

  return sourceFilePath.match(regex);
};

let compileChunk = function(options, chunk, cb) {
  less.render(chunk, function(e, result) {
    if (e) {
      return cb(e);
    }

    let css = result.css;

    return cb(null, css);
  });
};

let compileFile = fileSystem.compileFile(compileChunk);

let compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);

module.exports = {
  sourceExtension: sourceExtension,
  targetExtension: targetExtension,
  sourceFilePathMatches: sourceFilePathMatches,
  compileChunk: compileChunk,
  compileFile: compileFile,
  compileAllFiles: compileAllFiles
};
"use strict";

var less = require("less");
var async = require("async");

var fileSystem = require("./fileSystem");
var logging = require("./logging");

var sourceExtension = exports.sourceExtension = "less";
var targetExtension = exports.targetExtension = "css";

var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  var regex = new RegExp("^" + options.sourcePath + ".+." + sourceExtension + "$");

  return sourceFilePath.match(regex);
};

var compileChunk = exports.compileChunk = function (options, chunk, cb) {
  less.render(chunk, function (e, result) {
    if (e) {
      return cb(e);
    }

    var css = result.css;

    return cb(null, css);
  });
};

var compileFile = exports.compileFile = fileSystem.compileFile(compileChunk);

var compileAllFiles = exports.compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var browserSync = require("browser-sync");

var p = require("path");

var logging = require("./logging");

var sourceFilePathMatches = function (options, sourceFilePath) {
  var resolvedSourceFilePath = p.resolve(sourceFilePath);
  var resolvedSourcePath = p.resolve(options.sourcePath);

  return resolvedSourceFilePath.indexOf(resolvedSourcePath) === 0;
};

var reload = function (options, updatedPath, cb) {
  browserSync.reload(updatedPath);

  logging.taskInfo(options.taskName, "Reloaded `#{path}`");

  cb();
};

var runServer = function (_options, cb) {
  var options = {
    //files: [],
    //minify: false,
    //open: true,
    //host: 'localhost',
    port: 9001,
    logLevel: "silent",
    logFileChanges: false };

  browserSync(options, function (e, bs) {
    if (e) {
      return cb(e);
    }

    cb();
  });
};

module.exports = {
  sourceFilePathMatches: sourceFilePathMatches,
  reload: reload,
  runServer: runServer
};
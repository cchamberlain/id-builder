"use strict";

let browserSync = require("browser-sync");

let p = require("path");

let logging = require("./logging");

let sync = null;

let sourceFilePathMatches = function(options, sourceFilePath) {
  let resolvedSourceFilePath = p.resolve(sourceFilePath);
  let resolvedSourcePath      = p.resolve(options.sourcePath);

  return (resolvedSourceFilePath.indexOf(resolvedSourcePath)) === 0;
};

let reload = function(options, updatedPath, cb) {
  browserSync.reload(updatedPath);

  logging.taskInfo(options.taskName, "Reloaded `#{path}`");

  cb();
};

let runServer = function(_options, cb) {
  let options = {
    //files: [],
    //minify: false,
    //open: true,
    //host: "localhost",
    port: 9001,
    logLevel: "silent",
    logFileChanges: false,
  };

  browserSync(options, function(e, bs) {
    if (e) {
      return cb(e);
    }

    sync = bs;

    cb();
  });
};

module.exports = {
  sourceFilePathMatches: sourceFilePathMatches,
  reload: reload,
  runServer: runServer
};
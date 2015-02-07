"use strict";

const browserSync = require("browser-sync");

const p = require("path");

const logging = require("./logging");

const sync = null;

const sourceFilePathMatches = function(options, sourceFilePath) {
  const resolvedSourceFilePath = p.resolve(sourceFilePath);
  const resolvedSourcePath      = p.resolve(options.sourcePath);

  return (resolvedSourceFilePath.indexOf(resolvedSourcePath)) === 0;
};

const reload = function(options, updatedPath, cb) {
  browserSync.reload(updatedPath);

  logging.taskInfo(options.taskName, "Reloaded `#{path}`");

  cb();
};

const runServer = function(_options, cb) {
  const options = {
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
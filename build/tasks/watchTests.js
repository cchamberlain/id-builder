"use strict";

let tests = require("../lib/tests");
let watch = require("../lib/watch");

let dependencies = [
  "runTests",
  "watch"
]

let handlePath = function(options, path, stat) {
  if (!tests.sourceFilePathMatches(options, path)) {
    return;
  }

  tests.runTests(options, function(e) {
    if (e) {
      console.error(e);
    }
  });
};

let handleAdd = function(options, path, stat) {
  handlePath(options, path, stat);
};

let handleAddDir = function(options, path, stat) {
};

let handleChange = function(options, path, stat) {
  handlePath(options, path, stat);
};

let handleUnlink = function(options, path, stat) {
};

let handleUnlinkDir = function(options, path, stat) {
};

let handleError = function(options, e) {
};

let run = function(options, cb) {
  let watcher = watch.getWatcher();

  watcher.on("ready", function() {
    watcher.on("add", handleAdd, options);
    watcher.on("addDir", handleAddDir, options);
    watcher.on("change", handleChange, options);
    watcher.on("unlink", handleUnlink, options);
    watcher.on("unlinkDir", handleUnlinkDir, options);
    watcher.on("error", handleError, options);
  });
};

module.exports = {
  dependencies: dependencies,
  run: run
};
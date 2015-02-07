"use strict";

var stylus = require("../lib/stylus");
var watch = require("../lib/watch");

var dependencies = [
  "runTests",
  "watch"
]

var handlePath = function(options, path, stat) {
  if (!stylus.sourceFilePathMatches(options, path)) {
    return;
  }

  var targetPath = path
    .replace(options.sourcePath, options.targetPath)
    .replace(new RegExp(`^\.${stylus.sourceExtension}$`), `.${stylus.targetExtension}`);

  stylus.compileFile(options, path, targetPath, function(e) {
    if (e) {
      console.error(e);
    }
  });
};

var handleAdd = function(options, path, stat) {
  handlePath(options, path, stat);
};

var handleAddDir = function(options, path, stat) {
};

var handleChange = function(options, path, stat) {
  handlePath(options, path, stat);
};

var handleUnlink = function(options, path, stat) {
};

var handleUnlinkDir = function(options, path, stat) {
};

var handleError = function(options, e) {
};

var run = function(options, cb) {
  var watcher = watch.getWatcher();

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
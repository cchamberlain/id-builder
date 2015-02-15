"use strict";

const sixToFive = require("../lib/sixToFive");
const watch = require("../lib/watch");

const dependencies = [
  "runTests",
  "watch"
]

const handlePath = function(options, path, stat) {
  if (!sixToFive.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourcePath, options.targetPath)
    .replace(new RegExp(`^\.${sixToFive.sourceExtension}$`), `.${sixToFive.targetExtension}`);

  sixToFive.compileFile(options, path, targetPath, function(e) {
    if (e) {
      console.error(e);
    }
  });
};

const handleAdd = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleAddDir = function(options, path, stat) {
};

const handleChange = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleUnlink = function(options, path, stat) {
};

const handleUnlinkDir = function(options, path, stat) {
};

const handleError = function(options, e) {
};

const run = function(options, cb) {
  const watcher = watch.getWatcher();

  watcher.on("ready", function() {
    watcher.on("add", function(path, stat) { handleAdd(options, path, stat) });
    watcher.on("addDir", function(path, stat) { handleAddDir(options, path, stat) });
    watcher.on("change", function(path, stat) { handleChange(options, path, stat) });
    watcher.on("unlink", function(path, stat) { handleUnlink(options, path, stat) });
    watcher.on("unlinkDir", function(path, stat) { handleUnlinkDir(options, path, stat) });
    watcher.on("error", function(path, stat) { handleError(options, path, stat) });
  });
};

module.exports = {
  dependencies: dependencies,
  run: run
};
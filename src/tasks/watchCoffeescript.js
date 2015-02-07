"use strict";

const coffeescript = require("../lib/coffeescript");
const watch = require("../lib/watch");

const dependencies = [
  "runBrowsersyncServer",
  "runTests",
  "watch"
]

const handlePath = function(options, path, stat) {
  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourcePath, options.targetPath)
    .replace(new RegExp(`^\.${coffeescript.sourceExtension}$`), `.${coffeescript.targetExtension}`);

  coffeescript.compileFile(options, path, targetPath, function(e) {
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
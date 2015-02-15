"use strict";

var browserSync = require("browser-sync");

var browserify = require("../lib/browserify");
var browsersync = require("../lib/browsersync");
var watch = require("../lib/watch");

var dependencies = ["runBrowsersyncServer", "runTests", "watch"];

var handlePath = function (options, path, stat) {
  if (path.match(/\.js$/) && !browserify.pathReloads(options, path)) {
    return;
  }

  if (!browsersync.sourceFilePathMatches(options, path)) {
    return;
  }

  browsersync.reload(options, path, function (e) {
    if (e) {
      console.error(e);
    }
  });
};

var handleAdd = function (options, path, stat) {
  handlePath(options, path, stat);
};

var handleAddDir = function (options, path, stat) {};

var handleChange = function (options, path, stat) {
  handlePath(options, path, stat);
};

var handleUnlink = function (options, path, stat) {};

var handleUnlinkDir = function (options, path, stat) {};

var handleError = function (options, e) {};

var run = function (options, cb) {
  var watcher = watch.getWatcher();

  watcher.on("ready", function () {
    watcher.on("add", function (path, stat) {
      handleAdd(options, path, stat);
    });
    watcher.on("addDir", function (path, stat) {
      handleAddDir(options, path, stat);
    });
    watcher.on("change", function (path, stat) {
      handleChange(options, path, stat);
    });
    watcher.on("unlink", function (path, stat) {
      handleUnlink(options, path, stat);
    });
    watcher.on("unlinkDir", function (path, stat) {
      handleUnlinkDir(options, path, stat);
    });
    watcher.on("error", function (path, stat) {
      handleError(options, path, stat);
    });
  });
};

module.exports = {
  dependencies: dependencies,
  run: run
};
"use strict";

var _libBrowsersync = require("../lib/browsersync");

var sourceFilePathMatches = _libBrowsersync.sourceFilePathMatches;
var reload = _libBrowsersync.reload;
var getWatcher = require("../lib/watch").getWatcher;
var dependencies = exports.dependencies = ["runBrowsersyncServer", "watch"];

var handlePath = function (options, path, stat) {
  // Only reload if it's the bundle when the file is a JavaScript file.
  if (path.match(/\.js$/)) {
    if (global.options.tasks.watchBrowserify.targetPath !== path) {
      return;
    }
  }

  if (!sourceFilePathMatches(options, path)) {
    return;
  }

  reload(options, path, function (e) {
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

var run = exports.run = function (options, cb) {
  var watcher = getWatcher();

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
Object.defineProperty(exports, "__esModule", {
  value: true
});
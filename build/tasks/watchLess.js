"use strict";

var _libLess = require("../lib/less");

var compileFile = _libLess.compileFile;
var sourceExtension = _libLess.sourceExtension;
var sourceFilePathMatches = _libLess.sourceFilePathMatches;
var targetExtension = _libLess.targetExtension;
var getWatcher = require("../lib/watch").getWatcher;
var dependencies = exports.dependencies = ["watch"];

var handlePath = function (options, path, stat) {
  if (!sourceFilePathMatches(options, path)) {
    return;
  }

  compileFile(options, options.sourcePath, options.targetPath, function (e) {
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
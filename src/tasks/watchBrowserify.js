"use strict";

var browserify = require("../lib/browserify");
var watch = require("../lib/watch");

var dependencies = [
  "runTests",
  "watch"
];

var handlePath = function(options, path, stat) {
  if (!browserify.sourceFilePathMatches(options, path)) {
    return;
  }

  browserify.compileAllFiles(options, function(e) {
    if (e) {
      console.error(e);
    }
  })
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
  console.error(e);
};

var run = function(options, cb) {
  browserify.watch(options, cb);
};

module.exports = {
  dependencies: dependencies,
  run: run
};
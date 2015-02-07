"use strict";

let browserify = require("../lib/browserify");
let watch = require("../lib/watch");

let dependencies = [
  "runTests",
  "watch"
];

let handlePath = function(options, path, stat) {
  if (!browserify.sourceFilePathMatches(options, path)) {
    return;
  }

  browserify.compileAllFiles(options, function(e) {
    if (e) {
      console.error(e);
    }
  })
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
  console.error(e);
};

let run = function(options, cb) {
  browserify.watch(options, cb);
};

module.exports = {
  dependencies: dependencies,
  run: run
};
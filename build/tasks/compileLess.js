"use strict";

var exists = require("fs").exists;
var compileFile = require("../lib/less").compileFile;
var taskInfo = require("../lib/logging").taskInfo;
var dependencies = exports.dependencies = ["clean"];

var run = exports.run = function (options, cb) {
  exists(options.sourcePath, function (result) {
    if (!result) {
      taskInfo("compileLess", "skipping " + options.sourcePath + " (Does not exist).");
      return cb();
    }

    compileFile(options, options.sourcePath, options.targetPath, cb);
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
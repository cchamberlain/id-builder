"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var resolve = require("path").resolve;
var browserSync = _interopRequire(require("browser-sync"));

var taskInfo = require("./logging").taskInfo;
var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  var resolvedSourceFilePath = resolve(sourceFilePath);
  var resolvedSourcePath = resolve(options.sourcePath);

  return resolvedSourceFilePath.indexOf(resolvedSourcePath) === 0;
};

var reload = exports.reload = function (options, updatedPath, cb) {
  browserSync.reload(updatedPath);

  taskInfo(options.taskName, "Reloaded `#{path}`");

  cb();
};

var runServer = exports.runServer = function (_options, cb) {
  var options = {
    //files: [],
    //minify: false,
    //open: true,
    //host: 'localhost',
    port: 9001,
    logLevel: "silent",
    logFileChanges: false };

  browserSync(options, function (e, bs) {
    if (e) {
      return cb(e);
    }

    cb();
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
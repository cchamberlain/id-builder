"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var resolve = require("path").resolve;
var browserSync = _interopRequire(require("browser-sync"));

var copy = _interopRequireWildcard(require("./copy"));

var taskInfo = require("./logging").taskInfo;


//export const sourceFilePathMatches = function(options, sourceFilePath) {
//  const resolvedSourceFilePath = resolve(sourceFilePath);
//  const resolvedSourcePath = resolve(options.sourcePath);
//
//  return (resolvedSourceFilePath.indexOf(resolvedSourcePath)) === 0;
//};

var sourceFilePathMatches = exports.sourceFilePathMatches = copy.sourceFilePathMatches;

var reload = exports.reload = function (options, path, cb) {
  browserSync.reload(path);

  taskInfo(options.taskName, "Reloaded `" + path + "`");

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
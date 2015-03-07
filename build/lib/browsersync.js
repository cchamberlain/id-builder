"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var browserSync = _interopRequire(require("browser-sync"));

var copy = _interopRequireWildcard(require("./copy"));

var log = _interopRequireWildcard(require("./log"));

var sourceFilePathMatches = exports.sourceFilePathMatches = copy.sourceFilePathMatches;

var reload = exports.reload = function (options, path, cb) {
  log.debug("browsersync.reload", path);

  browserSync.reload(path);

  log.taskInfo(options.taskName, "Reloaded `" + path + "`");

  cb();
};

var runServer = exports.runServer = function (_options, cb) {
  log.debug("browsersync.runServer");

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
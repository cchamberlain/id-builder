"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var browserSync = _interopRequire(require("browser-sync"));

var copy = _interopRequireWildcard(require("./copy"));

var log = _interopRequireWildcard(require("./log"));

var sourceFilePathMatches = copy.sourceFilePathMatches;

exports.sourceFilePathMatches = sourceFilePathMatches;
var reload = function reload(options, path, cb) {
  log.debug("browsersync.reload", path);

  browserSync.reload(path);

  log.taskInfo(options.taskName, "Reloaded `" + path + "`");

  cb();
};

exports.reload = reload;
var runServer = function runServer(_options, cb) {
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
exports.runServer = runServer;
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var readdir = require("fs").readdir;

var _ = _interopRequire(require("lodash"));

var rimraf = _interopRequire(require("rimraf"));

var each = require("async").each;

var log = _interopRequireWildcard(require("./log"));

var directory = function directory(options, cb) {
  log.debug("clean.directory", options.path);

  readdir(options.path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    var paths = _(nodes).map(function (v) {
      var path = "" + options.path + "/" + v;

      log.taskInfo(options.taskName, path);

      return path;
    }).value();

    each(paths, rimraf, cb);
  });
};
exports.directory = directory;
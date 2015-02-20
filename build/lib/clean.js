"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var readdir = require("fs").readdir;
var _ = _interopRequire(require("lodash"));

var rimraf = _interopRequire(require("rimraf"));

var each = require("async").each;
var taskInfo = require("./logging").taskInfo;
var directory = exports.directory = function (options, cb) {
  readdir(options.path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    var paths = _(nodes).map(function (v) {
      var path = "" + options.path + "/" + v;

      taskInfo(options.taskName, path);

      return path;
    }).value();

    each(paths, rimraf, cb);
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
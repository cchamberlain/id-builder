"use strict";

var fs = require("fs");

var _ = require("lodash");
var async = require("async");
var rimraf = require("rimraf");

var logging = require("./logging");

var directory = function (options, cb) {
  fs.readdir(options.path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    var paths = _(nodes).map(function (v) {
      logging.taskInfo(options.taskName, v);
      return "" + options.path + "/" + v;
    }).value();

    async.each(paths, rimraf, cb);
  });
};

module.exports = {
  directory: directory
};
"use strict";

var fs = require("fs");

var async = require("async");
var rimraf = require("rimraf");

var logging = require("./logging");

var directory = function(options, cb) {
  fs.readdir(options.path, function(e, nodes) {
    if (e) {
      return cb(e);
    }

    var paths = [];
    var i = nodes.length;
    while (i--) {
      let v = nodes[i];
      paths[i] = `${options.path}/${v}`;
      logging.taskInfo(options.taskName, v);
    }

    async.each(paths, rimraf, cb);
  });
};

module.exports = {
  directory: directory
};
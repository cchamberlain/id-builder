"use strict";

let fs = require("fs");

let async = require("async");
let rimraf = require("rimraf");

let logging = require("./logging");

let directory = function(options, cb) {
  fs.readdir(options.path, function(e, nodes) {
    if (e) {
      return cb(e);
    }

    let paths = [];
    let i = nodes.length;
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
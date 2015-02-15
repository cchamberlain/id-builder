'use strict';

const fs = require('fs');

const _ = require('lodash');
const async = require('async');
const rimraf = require('rimraf');

const logging = require('./logging');

const directory = function(options, cb) {
  fs.readdir(options.path, function(e, nodes) {
    if (e) {
      return cb(e);
    }

    const paths = _(nodes)
      .map(function(v) {
        logging.taskInfo(options.taskName, v);
        return `${options.path}/${v}`;
      })
      .value();

    async.each(paths, rimraf, cb);
  });
};

module.exports = {
  directory: directory
};

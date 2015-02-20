'use strict';

import { readdir } from 'fs';

import _ from 'lodash';
import rimraf from 'rimraf';
import { each } from 'async';

import { taskInfo } from './logging';

export const directory = function(options, cb) {
  readdir(options.path, function(e, nodes) {
    if (e) {
      return cb(e);
    }

    const paths = _(nodes)
      .map(function(v) {
        const path = `${options.path}/${v}`;

        taskInfo(options.taskName, path);

        return path;
      })
      .value();

    each(paths, rimraf, cb);
  });
};

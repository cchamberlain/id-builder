'use strict';

import { readdir } from 'fs';

import _ from 'lodash';
import rimraf from 'rimraf';
import { each } from 'async';

import * as log from './log';

export const directory = function(options, cb) {
  log.debug('clean.directory', options.path);

  readdir(options.path, function(e, nodes) {
    if (e) {
      return cb(e);
    }

    const paths = _(nodes)
      .map(function(v) {
        const path = `${options.path}/${v}`;

        log.taskInfo(options.taskName, path);

        return path;
      })
      .value();

    each(paths, rimraf, cb);
  });
};

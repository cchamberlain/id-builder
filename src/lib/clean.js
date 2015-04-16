'use strict';

import { readdir } from 'fs';

import _ from 'lodash';
import rimraf from 'rimraf';
import { each } from 'async';

import log from './log';

const directory = (options, cb) => {
  log.debug('clean.directory', options.path);

  readdir(options.path, (e, nodes) => {
    if (e) {
      return cb(e);
    }

    const paths = _(nodes)
      .map((v) => {
        const path = `${options.path}/${v}`;

        log.taskInfo(options.taskName, path);

        return path;
      })
      .value();

    each(paths, rimraf, cb);
  });
};

export default {
  directory
};

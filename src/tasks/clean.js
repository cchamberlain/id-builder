'use strict';

import log from 'loglevel';
import { directory } from '../lib/clean';

export const dependencies = []

export const run = function (options, cb) {
  directory(options, cb);
};

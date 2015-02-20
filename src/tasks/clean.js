'use strict';

const clean = require('../lib/clean');

export const dependencies = []

export const run = function (options, cb) {
  clean.directory(options, cb);
};

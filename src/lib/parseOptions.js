'use strict';

import deepmerge from 'deepmerge';

import logging from './logging';

export default function(defaults, options) {
  return deepmerge(defaults, options);
};

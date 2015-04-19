'use strict';

import deepmerge from 'deepmerge';

import log from './log';

export default function(defaults, options) {
  return deepmerge(defaults, options);
};

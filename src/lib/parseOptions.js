'use strict';

import deepmerge from 'deepmerge';

import * as log from './log';

export default function(defaults, options) {
  return deepmerge(defaults, options);
};

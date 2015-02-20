'use strict';

import deepmerge from 'deepmerge';

export default function(defaults, options) {
  return deepmerge(defaults, options);
};

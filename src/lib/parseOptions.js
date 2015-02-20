'use strict';

const deepmerge = require('deepmerge');

export default function(defaults, options) {
  return deepmerge(defaults, options);
};

'use strict';

import _ from 'lodash';

const merge = function(x, y) {
  const z = {};

  _.each(x, function(xv, xk) {
    const yv = y[xk];

    if (_.isObject(xv) && !_.isArray(xv)) {
      z[xk] = merge(xv, yv);
    } else {
      if (!_.isUndefined(yv)) {
        z[xk] = yv;
      } else {
        z[xk] = xv;
      }
    }
  });

  return z;
};

export default function(defaults, options) {
  return merge(defaults, options);
};

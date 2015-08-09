import _ from 'lodash';

const merge = function(x, y = {}) {
  const z = {};

  _.each(x, function(xValue, xKey) {
    const yValue = y[xKey];

    if (_.isObject(xValue) && !_.isArray(xValue)) {
      z[xKey] = merge(xValue, yValue);
    } else {
      if (!_.isUndefined(yValue)) {
        z[xKey] = yValue;
      } else {
        z[xKey] = xValue;
      }
    }
  });

  return z;
};

export default merge;

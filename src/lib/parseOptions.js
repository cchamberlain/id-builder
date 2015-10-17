import _ from 'lodash';

function parseOptions(x, y = {}) {
  const z = {};

  _.each(x, function(xValue, xKey) {
    const yValue = y[xKey];

    if (_.isObject(xValue) && !_.isArray(xValue)) {
      z[xKey] = parseOptions(xValue, yValue);
    } else {
      if (!_.isUndefined(yValue)) {
        z[xKey] = yValue;
      } else {
        z[xKey] = xValue;
      }
    }
  });

  return z;
}

export default parseOptions;

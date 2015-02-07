"use strict";

const deepmerge = require("deepmerge");

module.exports = function(defaults, options) {
  return deepmerge(defaults, options);
};
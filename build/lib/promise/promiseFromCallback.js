"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = promiseFromCallback;

function promiseFromCallback(cb) {
  for (var _len = arguments.length, cbArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cbArgs[_key - 1] = arguments[_key];
  }

  return new Promise(function (resolve) {
    cb.apply(undefined, cbArgs.concat([resolve]));
  });
}

module.exports = exports["default"];
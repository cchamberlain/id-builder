"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = promiseFromNodeCallback;

function promiseFromNodeCallback(cb) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    cb.apply(undefined, args.concat([function (error) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (error) {
        return reject(error);
      }

      resolve(args);
    }]));
  });
}

module.exports = exports["default"];
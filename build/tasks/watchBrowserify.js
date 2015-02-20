"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var browserify = _interopRequire(require("../lib/browserify"));

var dependencies = exports.dependencies = [
// TODO: consider removing this dependency because browserify has it's own
// watcher.
"watch"];

var handlePath = function (options, path, stat) {
  if (!browserify.sourceFilePathMatches(options, path)) {
    return;
  }

  browserify.compileAllFiles(options, function (e) {
    if (e) {
      console.error(e);
    }
  });
};

var handleAdd = function (options, path, stat) {
  handlePath(options, path, stat);
};

var handleAddDir = function (options, path, stat) {};

var handleChange = function (options, path, stat) {
  handlePath(options, path, stat);
};

var handleUnlink = function (options, path, stat) {};

var handleUnlinkDir = function (options, path, stat) {};

var handleError = function (options, e) {
  console.error(e);
};

var run = exports.run = function (options, cb) {
  browserify.watch(options, cb);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
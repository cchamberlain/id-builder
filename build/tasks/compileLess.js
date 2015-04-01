"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var exists = require("fs").exists;

var compileFile = require("../lib/less").compileFile;

var log = _interopRequireWildcard(require("../lib/log"));

var dependencies = ["clean"];

exports.dependencies = dependencies;
var run = function run(options, cb) {
  exists(options.sourcePath, function (result) {
    if (!result) {
      log.taskInfo("compileLess", "skipping " + options.sourcePath + " (Does not exist).");
      return cb();
    }

    compileFile(options, options.sourcePath, options.targetPath, cb);
  });
};
exports.run = run;
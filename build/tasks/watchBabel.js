"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var log = _interopRequire(require("loglevel"));

var babel = _interopRequireWildcard(require("../lib/babel"));

var getWatcher = require("../lib/watch").getWatcher;

var dependencies = ["watch"];

exports.dependencies = dependencies;
var handlePath = function handlePath(options, path, stat) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  var targetPath = path.replace(options.sourcePath, options.targetPath).replace(new RegExp("^." + babel.sourceExtension + "$"), "." + babel.targetExtension);

  babel.compileFile(options, path, targetPath, function (e) {
    if (e) {
      console.error(e);
    }
  });
};

var handleAdd = function handleAdd(options, path, stat) {
  handlePath(options, path, stat);
};

var handleAddDir = function handleAddDir(options, path, stat) {};

var handleChange = function handleChange(options, path, stat) {
  handlePath(options, path, stat);
};

var handleUnlink = function handleUnlink(options, path, stat) {};

var handleUnlinkDir = function handleUnlinkDir(options, path, stat) {};

var handleError = function handleError(options, e) {};

var run = function run(options, cb) {
  var watcher = getWatcher();

  watcher.on("ready", function () {
    watcher.on("add", function (path, stat) {
      handleAdd(options, path, stat);
    });
    watcher.on("addDir", function (path, stat) {
      handleAddDir(options, path, stat);
    });
    watcher.on("change", function (path, stat) {
      handleChange(options, path, stat);
    });
    watcher.on("unlink", function (path, stat) {
      handleUnlink(options, path, stat);
    });
    watcher.on("unlinkDir", function (path, stat) {
      handleUnlinkDir(options, path, stat);
    });
    watcher.on("error", function (path, stat) {
      handleError(options, path, stat);
    });
  });
};
exports.run = run;
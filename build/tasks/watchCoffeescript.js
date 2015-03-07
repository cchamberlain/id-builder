"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var log = _interopRequire(require("loglevel"));

var coffeescript = _interopRequireWildcard(require("../lib/coffeescript"));

var getWatcher = require("../lib/watch").getWatcher;
var dependencies = exports.dependencies = ["watch"];

var handlePath = function (options, path, stat) {
  //log.debug('watchCoffeescript.handlePath', path);

  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  var targetPath = path.replace(options.sourcePath, options.targetPath).replace("." + coffeescript.sourceExtension, "." + coffeescript.targetExtension);

  //log.debug('watchCoffeescript.handlePath targetPath', targetPath);

  coffeescript.compileFile(options, path, targetPath, function (e) {
    if (e) {
      console.error(e);
    }
  });
};

var handleAdd = function (options, path, stat) {
  //log.debug('watchCoffeescript.handleAdd', path);

  handlePath(options, path, stat);
};

var handleAddDir = function (options, path, stat) {};

var handleChange = function (options, path, stat) {
  //log.debug('watchCoffeescript.handleChange', path);

  handlePath(options, path, stat);
};

var handleUnlink = function (options, path, stat) {};

var handleUnlinkDir = function (options, path, stat) {};

var handleError = function (options, e) {};

var run = exports.run = function (options, cb) {
  //log.debug('watchCoffeescript.run', options);

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
Object.defineProperty(exports, "__esModule", {
  value: true
});

//log.debug('watchCoffeescript.handleAddDir', path);
//log.debug('watchCoffeescript.handleUnlink', path);
//log.debug('watchCoffeescript.handleUnlinkDir', path);
//log.debug('watchCoffeescript.handleError', options, e);
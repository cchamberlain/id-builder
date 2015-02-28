"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var clean = _interopRequireWildcard(require("./clean"));

var compileBabel = _interopRequireWildcard(require("./compileBabel"));

var compileBrowserify = _interopRequireWildcard(require("./compileBrowserify"));

var compileCoffeescript = _interopRequireWildcard(require("./compileCoffeescript"));

var compileCopy = _interopRequireWildcard(require("./compileCopy"));

var compileJade = _interopRequireWildcard(require("./compileJade"));

var compileLess = _interopRequireWildcard(require("./compileLess"));

var compileLivescript = _interopRequireWildcard(require("./compileLivescript"));

var compileStylus = _interopRequireWildcard(require("./compileStylus"));

var runBrowsersyncServer = _interopRequireWildcard(require("./runBrowsersyncServer"));

var runServers = _interopRequireWildcard(require("./runServers"));

var runTests = _interopRequireWildcard(require("./runTests"));

var watch = _interopRequireWildcard(require("./watch"));

var watchBabel = _interopRequireWildcard(require("./watchBabel"));

var watchBrowserify = _interopRequireWildcard(require("./watchBrowserify"));

var watchBrowsersync = _interopRequireWildcard(require("./watchBrowsersync"));

var watchCoffeescript = _interopRequireWildcard(require("./watchCoffeescript"));

var watchCopy = _interopRequireWildcard(require("./watchCopy"));

var watchJade = _interopRequireWildcard(require("./watchJade"));

var watchLess = _interopRequireWildcard(require("./watchLess"));

var watchLivescript = _interopRequireWildcard(require("./watchLivescript"));

var watchServers = _interopRequireWildcard(require("./watchServers"));

var watchStylus = _interopRequireWildcard(require("./watchStylus"));

var watchTests = _interopRequireWildcard(require("./watchTests"));

module.exports = {
  clean: clean,
  compileBabel: compileBabel,
  //compileBrowserify: compileBrowserify,
  compileCoffeescript: compileCoffeescript,
  compileCopy: compileCopy,
  compileJade: compileJade,
  compileLess: compileLess,
  compileLivescript: compileLivescript,
  compileStylus: compileStylus,
  runBrowsersyncServer: runBrowsersyncServer,
  runServers: runServers,
  runTests: runTests,
  watch: watch,
  watchBabel: watchBabel,
  watchBrowserify: watchBrowserify,
  watchBrowsersync: watchBrowsersync,
  watchCoffeescript: watchCoffeescript,
  watchCopy: watchCopy,
  watchJade: watchJade,
  watchLess: watchLess,
  watchLivescript: watchLivescript,
  watchServers: watchServers,
  watchStylus: watchStylus,
  watchTests: watchTests
};
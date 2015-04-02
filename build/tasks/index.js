'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

var _log = require('loglevel');

var log = _interopRequire(_log);

var _import = require('./clean');

var clean = _interopRequireWildcard(_import);

var _import2 = require('./compileBabel');

var compileBabel = _interopRequireWildcard(_import2);

var _import3 = require('./compileBrowserify');

var compileBrowserify = _interopRequireWildcard(_import3);

var _import4 = require('./compileCoffeescript');

var compileCoffeescript = _interopRequireWildcard(_import4);

var _import5 = require('./compileCopy');

var compileCopy = _interopRequireWildcard(_import5);

var _import6 = require('./compileJade');

var compileJade = _interopRequireWildcard(_import6);

var _import7 = require('./compileLess');

var compileLess = _interopRequireWildcard(_import7);

var _import8 = require('./compileLivescript');

var compileLivescript = _interopRequireWildcard(_import8);

var _import9 = require('./compileStylus');

var compileStylus = _interopRequireWildcard(_import9);

var _import10 = require('./runBrowsersyncServer');

var runBrowsersyncServer = _interopRequireWildcard(_import10);

var _import11 = require('./runServers');

var runServers = _interopRequireWildcard(_import11);

var _import12 = require('./runTests');

var runTests = _interopRequireWildcard(_import12);

var _import13 = require('./watch');

var watch = _interopRequireWildcard(_import13);

var _import14 = require('./watchBabel');

var watchBabel = _interopRequireWildcard(_import14);

var _import15 = require('./watchBrowserify');

var watchBrowserify = _interopRequireWildcard(_import15);

var _import16 = require('./watchBrowsersync');

var watchBrowsersync = _interopRequireWildcard(_import16);

var _import17 = require('./watchCoffeescript');

var watchCoffeescript = _interopRequireWildcard(_import17);

var _import18 = require('./watchCopy');

var watchCopy = _interopRequireWildcard(_import18);

var _import19 = require('./watchJade');

var watchJade = _interopRequireWildcard(_import19);

var _import20 = require('./watchLess');

var watchLess = _interopRequireWildcard(_import20);

var _import21 = require('./watchLivescript');

var watchLivescript = _interopRequireWildcard(_import21);

var _import22 = require('./watchServers');

var watchServers = _interopRequireWildcard(_import22);

var _import23 = require('./watchStylus');

var watchStylus = _interopRequireWildcard(_import23);

var _import24 = require('./watchTests');

var watchTests = _interopRequireWildcard(_import24);

module.exports = {
  clean: clean,
  compileBabel: compileBabel,
  compileBrowserify: compileBrowserify,
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
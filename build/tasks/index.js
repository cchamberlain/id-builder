'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _clean = require('./clean');

var _clean2 = _interopRequireWildcard(_clean);

var _compileBabel = require('./compileBabel');

var _compileBabel2 = _interopRequireWildcard(_compileBabel);

var _compileBrowserify = require('./compileBrowserify');

var _compileBrowserify2 = _interopRequireWildcard(_compileBrowserify);

var _compileCoffeescript = require('./compileCoffeescript');

var _compileCoffeescript2 = _interopRequireWildcard(_compileCoffeescript);

var _compileCopy = require('./compileCopy');

var _compileCopy2 = _interopRequireWildcard(_compileCopy);

var _compileLess = require('./compileLess');

var _compileLess2 = _interopRequireWildcard(_compileLess);

var _compileLivescript = require('./compileLivescript');

var _compileLivescript2 = _interopRequireWildcard(_compileLivescript);

var _compileStylus = require('./compileStylus');

var _compileStylus2 = _interopRequireWildcard(_compileStylus);

var _compileWebpack = require('./compileWebpack');

var _compileWebpack2 = _interopRequireWildcard(_compileWebpack);

var _runBrowsersyncServer = require('./runBrowsersyncServer');

var _runBrowsersyncServer2 = _interopRequireWildcard(_runBrowsersyncServer);

var _runServers = require('./runServers');

var _runServers2 = _interopRequireWildcard(_runServers);

var _runTests = require('./runTests');

var _runTests2 = _interopRequireWildcard(_runTests);

var _watch = require('./watch');

var _watch2 = _interopRequireWildcard(_watch);

var _watchBabel = require('./watchBabel');

var _watchBabel2 = _interopRequireWildcard(_watchBabel);

var _watchBrowserify = require('./watchBrowserify');

var _watchBrowserify2 = _interopRequireWildcard(_watchBrowserify);

var _watchBrowsersync = require('./watchBrowsersync');

var _watchBrowsersync2 = _interopRequireWildcard(_watchBrowsersync);

var _watchCoffeescript = require('./watchCoffeescript');

var _watchCoffeescript2 = _interopRequireWildcard(_watchCoffeescript);

var _watchCopy = require('./watchCopy');

var _watchCopy2 = _interopRequireWildcard(_watchCopy);

var _watchLess = require('./watchLess');

var _watchLess2 = _interopRequireWildcard(_watchLess);

var _watchLivescript = require('./watchLivescript');

var _watchLivescript2 = _interopRequireWildcard(_watchLivescript);

var _watchServers = require('./watchServers');

var _watchServers2 = _interopRequireWildcard(_watchServers);

var _watchStylus = require('./watchStylus');

var _watchStylus2 = _interopRequireWildcard(_watchStylus);

var _watchTests = require('./watchTests');

var _watchTests2 = _interopRequireWildcard(_watchTests);

var _watchWebpack = require('./watchWebpack');

var _watchWebpack2 = _interopRequireWildcard(_watchWebpack);

exports['default'] = {
  clean: _clean2['default'],
  compileBabel: _compileBabel2['default'],
  compileBrowserify: _compileBrowserify2['default'],
  compileCoffeescript: _compileCoffeescript2['default'],
  compileCopy: _compileCopy2['default'],
  compileLess: _compileLess2['default'],
  compileLivescript: _compileLivescript2['default'],
  compileStylus: _compileStylus2['default'],
  compileWebpack: _compileWebpack2['default'],
  runBrowsersyncServer: _runBrowsersyncServer2['default'],
  runServers: _runServers2['default'],
  runTests: _runTests2['default'],
  watch: _watch2['default'],
  watchBabel: _watchBabel2['default'],
  watchBrowserify: _watchBrowserify2['default'],
  watchBrowsersync: _watchBrowsersync2['default'],
  watchCoffeescript: _watchCoffeescript2['default'],
  watchCopy: _watchCopy2['default'],
  watchLess: _watchLess2['default'],
  watchLivescript: _watchLivescript2['default'],
  watchServers: _watchServers2['default'],
  watchStylus: _watchStylus2['default'],
  watchTests: _watchTests2['default'],
  watchWebpack: _watchWebpack2['default']
};
module.exports = exports['default'];
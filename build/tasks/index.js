'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
// import BabelASTCompile from './BabelASTCompile';

var _AppServer = require('./AppServer');

var _AppServer2 = _interopRequireWildcard(_AppServer);

var _BabelCodeCompile = require('./BabelCodeCompile');

var _BabelCodeCompile2 = _interopRequireWildcard(_BabelCodeCompile);

var _BabelMapCompile = require('./BabelMapCompile');

var _BabelMapCompile2 = _interopRequireWildcard(_BabelMapCompile);

var _BrowserSyncServer = require('./BrowserSyncServer');

var _BrowserSyncServer2 = _interopRequireWildcard(_BrowserSyncServer);

var _BrowserifyCompile = require('./BrowserifyCompile');

var _BrowserifyCompile2 = _interopRequireWildcard(_BrowserifyCompile);

var _CoffeeScriptCompile = require('./CoffeeScriptCompile');

var _CoffeeScriptCompile2 = _interopRequireWildcard(_CoffeeScriptCompile);

var _Copy = require('./Copy');

var _Copy2 = _interopRequireWildcard(_Copy);

var _DirectoryCleaner = require('./DirectoryCleaner');

var _DirectoryCleaner2 = _interopRequireWildcard(_DirectoryCleaner);

var _EsprimaCompile = require('./EsprimaCompile');

var _EsprimaCompile2 = _interopRequireWildcard(_EsprimaCompile);

var _LessCompile = require('./LessCompile');

var _LessCompile2 = _interopRequireWildcard(_LessCompile);

var _LiveScriptCompile = require('./LiveScriptCompile');

var _LiveScriptCompile2 = _interopRequireWildcard(_LiveScriptCompile);

var _PlantUMLCompile = require('./PlantUMLCompile');

var _PlantUMLCompile2 = _interopRequireWildcard(_PlantUMLCompile);

var _StylusCompile = require('./StylusCompile');

var _StylusCompile2 = _interopRequireWildcard(_StylusCompile);

exports['default'] = {
  // BabelASTCompile,
  AppServer: _AppServer2['default'],
  BabelCodeCompile: _BabelCodeCompile2['default'],
  BabelMapCompile: _BabelMapCompile2['default'],
  BrowserSyncServer: _BrowserSyncServer2['default'],
  BrowserifyCompile: _BrowserifyCompile2['default'],
  CoffeeScriptCompile: _CoffeeScriptCompile2['default'],
  Copy: _Copy2['default'],
  DirectoryCleaner: _DirectoryCleaner2['default'],
  EsprimaCompile: _EsprimaCompile2['default'],
  LessCompile: _LessCompile2['default'],
  LiveScriptCompile: _LiveScriptCompile2['default'],
  PlantUMLCompile: _PlantUMLCompile2['default'],
  StylusCompile: _StylusCompile2['default']
};
module.exports = exports['default'];
// import BabelASTCompile from './BabelASTCompile';
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AppServer = require('./AppServer');

var _AppServer2 = _interopRequireDefault(_AppServer);

var _BabelCodeCompile = require('./BabelCodeCompile');

var _BabelCodeCompile2 = _interopRequireDefault(_BabelCodeCompile);

var _BabelMapCompile = require('./BabelMapCompile');

var _BabelMapCompile2 = _interopRequireDefault(_BabelMapCompile);

var _BrowserSyncServer = require('./BrowserSyncServer');

var _BrowserSyncServer2 = _interopRequireDefault(_BrowserSyncServer);

var _BrowserifyCompile = require('./BrowserifyCompile');

var _BrowserifyCompile2 = _interopRequireDefault(_BrowserifyCompile);

var _CoffeeScriptCompile = require('./CoffeeScriptCompile');

var _CoffeeScriptCompile2 = _interopRequireDefault(_CoffeeScriptCompile);

var _Copy = require('./Copy');

var _Copy2 = _interopRequireDefault(_Copy);

var _DirectoryCleaner = require('./DirectoryCleaner');

var _DirectoryCleaner2 = _interopRequireDefault(_DirectoryCleaner);

var _LessCompile = require('./LessCompile');

var _LessCompile2 = _interopRequireDefault(_LessCompile);

var _LiveScriptCompile = require('./LiveScriptCompile');

var _LiveScriptCompile2 = _interopRequireDefault(_LiveScriptCompile);

// import PlantUMLCompile from './PlantUMLCompile';

var _StylusCompile = require('./StylusCompile');

var _StylusCompile2 = _interopRequireDefault(_StylusCompile);

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
  LessCompile: _LessCompile2['default'],
  LiveScriptCompile: _LiveScriptCompile2['default'],
  // PlantUMLCompile,
  StylusCompile: _StylusCompile2['default']
};
module.exports = exports['default'];
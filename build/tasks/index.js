'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _BabelCompile = require('./BabelCompile');

var _BabelCompile2 = _interopRequireWildcard(_BabelCompile);

var _BrowserifyCompile = require('./BrowserifyCompile');

var _BrowserifyCompile2 = _interopRequireWildcard(_BrowserifyCompile);

var _CoffeeScriptCompile = require('./CoffeeScriptCompile');

var _CoffeeScriptCompile2 = _interopRequireWildcard(_CoffeeScriptCompile);

var _Copy = require('./Copy');

var _Copy2 = _interopRequireWildcard(_Copy);

var _DirectoryCleaner = require('./DirectoryCleaner');

var _DirectoryCleaner2 = _interopRequireWildcard(_DirectoryCleaner);

var _LessCompile = require('./LessCompile');

var _LessCompile2 = _interopRequireWildcard(_LessCompile);

var _LiveScriptCompile = require('./LiveScriptCompile');

var _LiveScriptCompile2 = _interopRequireWildcard(_LiveScriptCompile);

var _StylusCompile = require('./StylusCompile');

var _StylusCompile2 = _interopRequireWildcard(_StylusCompile);

exports['default'] = {
  BabelCompile: _BabelCompile2['default'],
  BrowserifyCompile: _BrowserifyCompile2['default'],
  CoffeeScriptCompile: _CoffeeScriptCompile2['default'],
  Copy: _Copy2['default'],
  DirectoryCleaner: _DirectoryCleaner2['default'],
  LessCompile: _LessCompile2['default'],
  LiveScriptCompile: _LiveScriptCompile2['default'],
  StylusCompile: _StylusCompile2['default']
};
module.exports = exports['default'];
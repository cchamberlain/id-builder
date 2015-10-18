// import BabelASTCompile from './BabelASTCompile';
// import PlantUMLCompileTask from './PlantUMLCompileTask';
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ServerTask = require('./ServerTask');

var _ServerTask2 = _interopRequireDefault(_ServerTask);

var _BabelCodeCompileTask = require('./BabelCodeCompileTask');

var _BabelCodeCompileTask2 = _interopRequireDefault(_BabelCodeCompileTask);

var _BrowserSyncServerTask = require('./BrowserSyncServerTask');

var _BrowserSyncServerTask2 = _interopRequireDefault(_BrowserSyncServerTask);

var _BrowserifyCompileTask = require('./BrowserifyCompileTask');

var _BrowserifyCompileTask2 = _interopRequireDefault(_BrowserifyCompileTask);

var _CoffeeScriptCompileTask = require('./CoffeeScriptCompileTask');

var _CoffeeScriptCompileTask2 = _interopRequireDefault(_CoffeeScriptCompileTask);

var _CopyCompileTask = require('./CopyCompileTask');

var _CopyCompileTask2 = _interopRequireDefault(_CopyCompileTask);

var _DirectoryCleanerTask = require('./DirectoryCleanerTask');

var _DirectoryCleanerTask2 = _interopRequireDefault(_DirectoryCleanerTask);

var _LessCompileTask = require('./LessCompileTask');

var _LessCompileTask2 = _interopRequireDefault(_LessCompileTask);

var _LiveScriptCompileTask = require('./LiveScriptCompileTask');

var _LiveScriptCompileTask2 = _interopRequireDefault(_LiveScriptCompileTask);

var _StylusCompileTask = require('./StylusCompileTask');

var _StylusCompileTask2 = _interopRequireDefault(_StylusCompileTask);

var _TestTask = require('./TestTask');

var _TestTask2 = _interopRequireDefault(_TestTask);

var _WatchTask = require('./WatchTask');

var _WatchTask2 = _interopRequireDefault(_WatchTask);

exports['default'] = {
  // BabelASTCompileTask,
  // PlantUMLCompileTask,

  BabelCodeCompileTask: _BabelCodeCompileTask2['default'],
  BrowserSyncServerTask: _BrowserSyncServerTask2['default'],
  BrowserifyCompileTask: _BrowserifyCompileTask2['default'],
  CoffeeScriptCompileTask: _CoffeeScriptCompileTask2['default'],
  CopyCompileTask: _CopyCompileTask2['default'],
  DirectoryCleanerTask: _DirectoryCleanerTask2['default'],
  LessCompileTask: _LessCompileTask2['default'],
  LiveScriptCompileTask: _LiveScriptCompileTask2['default'],
  ServerTask: _ServerTask2['default'],
  StylusCompileTask: _StylusCompileTask2['default'],
  TestTask: _TestTask2['default'],
  WatchTask: _WatchTask2['default']
};
module.exports = exports['default'];
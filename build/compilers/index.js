'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _compilersBabelCodeCompiler = require('../compilers/BabelCodeCompiler');

var _compilersBabelCodeCompiler2 = _interopRequireDefault(_compilersBabelCodeCompiler);

var _compilersBabelMapCompiler = require('../compilers/BabelMapCompiler');

var _compilersBabelMapCompiler2 = _interopRequireDefault(_compilersBabelMapCompiler);

var _compilersBrowserifyCompiler = require('../compilers/BrowserifyCompiler');

var _compilersBrowserifyCompiler2 = _interopRequireDefault(_compilersBrowserifyCompiler);

var _compilersCoffeeScriptCompiler = require('../compilers/CoffeeScriptCompiler');

var _compilersCoffeeScriptCompiler2 = _interopRequireDefault(_compilersCoffeeScriptCompiler);

var _compilersCopyCompiler = require('../compilers/CopyCompiler');

var _compilersCopyCompiler2 = _interopRequireDefault(_compilersCopyCompiler);

var _compilersLessCompiler = require('../compilers/LessCompiler');

var _compilersLessCompiler2 = _interopRequireDefault(_compilersLessCompiler);

var _compilersLiveScriptCompiler = require('../compilers/LiveScriptCompiler');

var _compilersLiveScriptCompiler2 = _interopRequireDefault(_compilersLiveScriptCompiler);

var _compilersStylusCompiler = require('../compilers/StylusCompiler');

var _compilersStylusCompiler2 = _interopRequireDefault(_compilersStylusCompiler);

exports['default'] = {
  BabelCodeCompiler: _compilersBabelCodeCompiler2['default'],
  BabelMapCompiler: _compilersBabelMapCompiler2['default'],
  BrowserifyCompiler: _compilersBrowserifyCompiler2['default'],
  CoffeeScriptCompiler: _compilersCoffeeScriptCompiler2['default'],
  CopyCompiler: _compilersCopyCompiler2['default'],
  LessCompiler: _compilersLessCompiler2['default'],
  LiveScriptCompiler: _compilersLiveScriptCompiler2['default'],
  StylusCompiler: _compilersStylusCompiler2['default']
};
module.exports = exports['default'];
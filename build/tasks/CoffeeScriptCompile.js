'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _compile = require('coffee-script');

var _CompileTask2 = require('../lib/CompileTask');

var _CompileTask3 = _interopRequireWildcard(_CompileTask2);

var CoffeeScriptCompile = (function (_CompileTask) {
  function CoffeeScriptCompile() {
    _classCallCheck(this, CoffeeScriptCompile);

    if (_CompileTask != null) {
      _CompileTask.apply(this, arguments);
    }
  }

  _inherits(CoffeeScriptCompile, _CompileTask);

  _createClass(CoffeeScriptCompile, [{
    key: 'compileChunk',
    value: function compileChunk(chunk, cb) {
      try {
        cb(null, _compile.compile(chunk, this.options.options));
      } catch (e) {
        return cb(e);
      }
    }
  }, {
    key: 'run',
    value: function run(cb) {
      this.compileAllFiles(cb);
    }
  }]);

  return CoffeeScriptCompile;
})(_CompileTask3['default']);

exports['default'] = CoffeeScriptCompile;
module.exports = exports['default'];
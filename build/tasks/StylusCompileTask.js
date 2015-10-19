'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _libPromise = require('../lib/promise');

var _libPromise2 = _interopRequireDefault(_libPromise);

var _libLogging = require('../lib/logging');

var _libLogging2 = _interopRequireDefault(_libLogging);

var _libCompileTask = require('../lib/CompileTask');

var _libCompileTask2 = _interopRequireDefault(_libCompileTask);

var _compilersStylusCompiler = require('../compilers/StylusCompiler');

var _compilersStylusCompiler2 = _interopRequireDefault(_compilersStylusCompiler);

var StylusCompileTask = (function (_CompileTask) {
  _inherits(StylusCompileTask, _CompileTask);

  function StylusCompileTask() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, StylusCompileTask);

    _get(Object.getPrototypeOf(StylusCompileTask.prototype), 'constructor', this).call(this, options);

    this.sourceFilePath = this.configuration.sourceFilePath;
    this.targetFilePath = this.configuration.targetFilePath;

    this.setCompiler(_compilersStylusCompiler2['default']);
  }

  _createClass(StylusCompileTask, [{
    key: 'compileFile',
    value: function compileFile() {
      var sourceFilePath = arguments.length <= 0 || arguments[0] === undefined ? this.sourceFilePath : arguments[0];
      var targetFilePath = arguments.length <= 1 || arguments[1] === undefined ? this.targetFilePath : arguments[1];
      var doesExist;
      return regeneratorRuntime.async(function compileFile$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(_libPromise2['default'].promiseFromCallback(_fs2['default'].exists, sourceFilePath));

          case 2:
            doesExist = context$2$0.sent;

            if (doesExist) {
              context$2$0.next = 6;
              break;
            }

            _libLogging2['default'].taskInfo(this.constructor.name, 'skipping ' + sourceFilePath + ' (Does not exist)');

            return context$2$0.abrupt('return');

          case 6:
            context$2$0.next = 8;
            return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(StylusCompileTask.prototype), 'compileFile', this).call(this, sourceFilePath, targetFilePath));

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'run',
    value: function run() {
      return regeneratorRuntime.async(function run$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(this.compileFile(this.sourceFilePath, this.targetFilePath));

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'sourceFilePathMatchExpression',
    get: function get() {
      return new RegExp('^' + this.sourceFilePath + '$');
    }
  }]);

  return StylusCompileTask;
})(_libCompileTask2['default']);

exports['default'] = StylusCompileTask;
module.exports = exports['default'];
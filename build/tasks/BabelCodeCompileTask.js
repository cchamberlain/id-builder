'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _compilersBabelCodeCompiler = require('../compilers/BabelCodeCompiler');

var _compilersBabelCodeCompiler2 = _interopRequireDefault(_compilersBabelCodeCompiler);

var _libCompileTask = require('../lib/CompileTask');

var _libCompileTask2 = _interopRequireDefault(_libCompileTask);

var BabelCodeCompileTask = (function (_CompileTask) {
  _inherits(BabelCodeCompileTask, _CompileTask);

  function BabelCodeCompileTask() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BabelCodeCompileTask);

    // log.debug(`BabelCodeCompileTask#constructor`);

    _get(Object.getPrototypeOf(BabelCodeCompileTask.prototype), 'constructor', this).call(this, options);

    this.setCompiler(_compilersBabelCodeCompiler2['default']);
  }

  return BabelCodeCompileTask;
})(_libCompileTask2['default']);

exports['default'] = BabelCodeCompileTask;
module.exports = exports['default'];
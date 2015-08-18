'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _exists = require('fs');

var _render = require('stylus');

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _CompileTask2 = require('../lib/CompileTask');

var _CompileTask3 = _interopRequireWildcard(_CompileTask2);

var StylusCompile = (function (_CompileTask) {
  function StylusCompile() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, StylusCompile);

    _get(Object.getPrototypeOf(StylusCompile.prototype), 'constructor', this).call(this, options);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;
  }

  _inherits(StylusCompile, _CompileTask);

  _createClass(StylusCompile, [{
    key: 'sourceFilePathMatchExpression',
    get: function () {
      return new RegExp('^' + this.sourceFilePath + '$');
    }
  }, {
    key: 'compileChunk',
    value: function compileChunk(chunk, cb) {
      _render.render(chunk, this.options.options, cb);
    }
  }, {
    key: 'run',
    value: function run(cb) {
      var _this = this;

      _exists.exists(this.sourceFilePath, function (doesExist) {
        if (doesExist) {
          _this.compileFile(_this.sourceFilePath, _this.targetFilePath, cb);
        } else {
          _logging2['default'].taskInfo(_this.constructor.name, 'skipping ' + _this.sourceFilePath + ' (Does not exist)');
          cb();
        }
      });
    }
  }]);

  return StylusCompile;
})(_CompileTask3['default']);

exports['default'] = StylusCompile;
module.exports = exports['default'];
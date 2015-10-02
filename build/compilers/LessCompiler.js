'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _less = require('less');

var _libCompiler = require('../lib/Compiler');

var _libCompiler2 = _interopRequireDefault(_libCompiler);

var LessCompiler = (function (_Compiler) {
  _inherits(LessCompiler, _Compiler);

  function LessCompiler() {
    _classCallCheck(this, LessCompiler);

    _get(Object.getPrototypeOf(LessCompiler.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(LessCompiler, [{
    key: 'compileChunk',
    value: function compileChunk(chunk, sourceFilePath) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        (0, _less.render)(chunk, _this.options.options, function (e, result) {
          if (e) {
            return reject(e);
          }

          return resolve(result.css);
        });
      });
    }
  }]);

  return LessCompiler;
})(_libCompiler2['default']);

exports['default'] = LessCompiler;
module.exports = exports['default'];
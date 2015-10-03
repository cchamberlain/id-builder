'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _browserify = require('browserify');

var _browserify2 = _interopRequireDefault(_browserify);

var _jadeify = require('jadeify');

var _jadeify2 = _interopRequireDefault(_jadeify);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _libCompiler = require('../lib/Compiler');

var _libCompiler2 = _interopRequireDefault(_libCompiler);

var BrowserifyCompiler = (function (_Compiler) {
  _inherits(BrowserifyCompiler, _Compiler);

  function BrowserifyCompiler() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BrowserifyCompiler);

    _get(Object.getPrototypeOf(BrowserifyCompiler.prototype), 'constructor', this).call(this, options);

    _lodash2['default'].bindAll(this, ['handleBundleDependency']);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;

    this.setBundle();
  }

  _createClass(BrowserifyCompiler, [{
    key: 'setBundle',
    value: function setBundle() {
      this.bundle = (0, _browserify2['default'])(this.options.options);
      this.bundleDependencies = [];

      this.bundle.on('dep', this.handleBundleDependency);

      this.bundle.transform(_jadeify2['default'], {
        compileDebug: true,
        pretty: true,
        runtimePath: require.resolve('jade/runtime')
      });
    }
  }, {
    key: 'hasDependency',
    value: function hasDependency(_dependencyPath) {
      var dependencyPath = _path2['default'].resolve(_dependencyPath);

      return (0, _lodash2['default'])(this.bundleDependencies).contains(dependencyPath);
    }
  }, {
    key: 'addDependency',
    value: function addDependency(path) {
      this.bundleDependencies = (0, _lodash2['default'])(this.bundleDependencies).union([path]).value();
    }
  }, {
    key: 'removeDependency',
    value: function removeDependency(path) {
      this.bundleDependencies = (0, _lodash2['default'])(this.bundleDependencies).without(path).value();
    }
  }, {
    key: 'handleBundleDependency',
    value: function handleBundleDependency(_ref) {
      var file = _ref.file;

      this.addDependency(file);
    }
  }, {
    key: 'compileChunk',
    value: function compileChunk(chunk, sourceFilePath) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var bundle = _this.bundle;

        bundle.add(_path2['default'].resolve(sourceFilePath));

        bundle.on('bundle', function (bundleStream) {
          var data = '';

          bundleStream.on('data', function (d) {
            data += d;
          });

          bundleStream.on('end', function () {
            resolve(data);
          });
        });

        bundle.bundle();
      });
    }
  }]);

  return BrowserifyCompiler;
})(_libCompiler2['default']);

exports['default'] = BrowserifyCompiler;
module.exports = exports['default'];
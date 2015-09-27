'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _path = require('path');

var _browserify = require('browserify');

var _browserify2 = _interopRequireDefault(_browserify);

var _jadeify = require('jadeify');

var _jadeify2 = _interopRequireDefault(_jadeify);

var _fs = require('fs');

var _libLogging = require('../lib/logging');

var _libLogging2 = _interopRequireDefault(_libLogging);

var _libCompileTask = require('../lib/CompileTask');

var _libCompileTask2 = _interopRequireDefault(_libCompileTask);

var BrowserifyCompile = (function (_CompileTask) {
  _inherits(BrowserifyCompile, _CompileTask);

  function BrowserifyCompile() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BrowserifyCompile);

    _get(Object.getPrototypeOf(BrowserifyCompile.prototype), 'constructor', this).call(this, options);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;
  }

  _createClass(BrowserifyCompile, [{
    key: 'getBrowserifyBundle',
    value: function getBrowserifyBundle() {
      var b = (0, _browserify2['default'])(this.options.options);

      var jadeRuntime = require.resolve('jade/runtime');

      var jadeifyOptions = {
        compileDebug: true,
        pretty: true,
        runtimePath: jadeRuntime
      };

      b.transform(_jadeify2['default'], jadeifyOptions);

      return b;
    }
  }, {
    key: 'compileChunk',
    value: function compileChunk(chunk, cb) {
      var bundle = this.getBrowserifyBundle();

      bundle.add((0, _path.resolve)(this.sourceFilePath));

      bundle.on('bundle', function (bundleStream) {
        var data = '';

        bundleStream.on('data', function (d) {
          data += d;
        });

        bundleStream.on('end', function () {
          cb(null, data);
        });
      });

      bundle.bundle();
    }
  }, {
    key: 'compileFile',
    value: function compileFile(sourceFilePath, targetFilePath, cb) {
      if (sourceFilePath === undefined) sourceFilePath = this.sourceFilePath;

      var _this = this;

      if (targetFilePath === undefined) targetFilePath = this.targetFilePath;

      (0, _fs.exists)(sourceFilePath, function (doesExist) {
        if (doesExist) {
          _get(Object.getPrototypeOf(BrowserifyCompile.prototype), 'compileFile', _this).call(_this, sourceFilePath, targetFilePath, cb);
        } else {
          _libLogging2['default'].taskInfo(_this.constructor.name, 'skipping ' + sourceFilePath + ' (Does not exist)');
          cb();
        }
      });
    }
  }, {
    key: 'run',
    value: function run(cb) {
      this.compileFile(this.sourceFilePath, this.targetFilePath, cb);
    }
  }, {
    key: 'sourceFilePathMatchExpression',
    get: function get() {
      return new RegExp('^' + this.sourceFilePath + '$');
    }
  }]);

  return BrowserifyCompile;
})(_libCompileTask2['default']);

exports['default'] = BrowserifyCompile;

/*
function watch(options, cb) {
  log.debug('lib/browserify.watch');

  exists(options.sourceFilePath, exists => {
    if (!exists) {
      logging.taskInfo(options.taskName, `skipping ${options.sourceFilePath} (Does not exist)`);
      return cb();
    }

    fileSystem.ensureFileDirectory(options.targetFilePath, e => {
      if (e) {
        return cb(e);
      }

      const b = getBrowserifyBundle(options);

      b.add(resolve(options.sourceFilePath));

      b.on('bundle', bundleStream => {
        let data = '';

        bundleStream.on('data', d => {
          data += d;
        });

        bundleStream.on('end', () => {
          writeFile(options.targetFilePath, data, e => {
            if (e) {
              return cb(e);
            }

            logging.taskInfo(options.taskName, `${options.sourceFilePath} => ${options.targetFilePath}`);
          });
        });
      });

      const w = watchify(b);

      w.on('update', () => {
        b.bundle();
      });

      b.bundle();
    });
  });
}
*/
module.exports = exports['default'];
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _resolve = require('path');

var _browserify = require('browserify');

var _browserify2 = _interopRequireWildcard(_browserify);

var _jadeify = require('jadeify');

var _jadeify2 = _interopRequireWildcard(_jadeify);

var _exists = require('fs');

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _CompileTask2 = require('../lib/CompileTask');

var _CompileTask3 = _interopRequireWildcard(_CompileTask2);

var BrowserifyCompile = (function (_CompileTask) {
  function BrowserifyCompile() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BrowserifyCompile);

    _get(Object.getPrototypeOf(BrowserifyCompile.prototype), 'constructor', this).call(this, options);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;
  }

  _inherits(BrowserifyCompile, _CompileTask);

  _createClass(BrowserifyCompile, [{
    key: 'sourceFilePathMatchExpression',
    get: function () {
      return new RegExp('^' + this.sourceFilePath + '$');
    }
  }, {
    key: 'getBrowserifyBundle',
    value: function getBrowserifyBundle() {
      var b = _browserify2['default'](this.options.options);

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

      bundle.add(_resolve.resolve(this.sourceFilePath));

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

  return BrowserifyCompile;
})(_CompileTask3['default']);

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
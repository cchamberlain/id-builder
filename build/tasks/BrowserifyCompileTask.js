'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _libCompileTask = require('../lib/CompileTask');

var _libCompileTask2 = _interopRequireDefault(_libCompileTask);

var _libLogging = require('../lib/logging');

var _libLogging2 = _interopRequireDefault(_libLogging);

var _libPromise = require('../lib/promise');

var _libPromise2 = _interopRequireDefault(_libPromise);

var _compilersBrowserifyCompiler = require('../compilers/BrowserifyCompiler');

var _compilersBrowserifyCompiler2 = _interopRequireDefault(_compilersBrowserifyCompiler);

var BrowserifyCompileTask = (function (_CompileTask) {
  _inherits(BrowserifyCompileTask, _CompileTask);

  function BrowserifyCompileTask() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BrowserifyCompileTask);

    _get(Object.getPrototypeOf(BrowserifyCompileTask.prototype), 'constructor', this).call(this, options);

    this.sourceFilePath = this.configuration.sourceFilePath;
    this.targetFilePath = this.configuration.targetFilePath;

    this.setCompiler(_compilersBrowserifyCompiler2['default']);
  }

  _createClass(BrowserifyCompileTask, [{
    key: 'sourceFilePathMatches',
    value: function sourceFilePathMatches(sourceFilePath) {
      return this.compiler.hasDependency(sourceFilePath);
    }
  }, {
    key: 'getTargetPath',
    value: function getTargetPath() {
      return this.targetFilePath;
    }
  }, {
    key: 'compileFile',
    value: function compileFile() {
      var doesExist;
      return regeneratorRuntime.async(function compileFile$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            // log.debug(`BrowserifyCompileTask#compileFile`);

            this.compiler.setBundle();

            context$2$0.next = 3;
            return regeneratorRuntime.awrap(_libPromise2['default'].promiseFromCallback(_fs2['default'].exists, this.sourceFilePath));

          case 3:
            doesExist = context$2$0.sent;

            if (doesExist) {
              context$2$0.next = 7;
              break;
            }

            _libLogging2['default'].taskInfo(this.constructor.name, 'skipping ' + this.sourceFilePath + ' (Does not exist)');

            return context$2$0.abrupt('return');

          case 7:
            context$2$0.next = 9;
            return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(BrowserifyCompileTask.prototype), 'compileFile', this).call(this, this.sourceFilePath, this.targetFilePath));

          case 9:
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
            return regeneratorRuntime.awrap(this.compileFile());

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return BrowserifyCompileTask;
})(_libCompileTask2['default']);

exports['default'] = BrowserifyCompileTask;

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
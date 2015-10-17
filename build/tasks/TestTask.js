// - TestTask sluit niet goed af.
// - TestTask moet voor ServerTask gebeuren. Eerst valideren dat het werkt,
//   dan draaien.

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _vm = require('vm');

var _vm2 = _interopRequireDefault(_vm);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _libTask = require('../lib/Task');

var _libTask2 = _interopRequireDefault(_libTask);

var _libGetFiles = require('../lib/getFiles');

var _libGetFiles2 = _interopRequireDefault(_libGetFiles);

var pathToMocha = _path2['default'].resolve(__dirname + '/../../node_modules/mocha/bin/_mocha');

var TestTask = (function (_Task) {
  _inherits(TestTask, _Task);

  function TestTask() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, TestTask);

    _get(Object.getPrototypeOf(TestTask.prototype), 'constructor', this).call(this, options);

    this.mochaOptions = options.mocha;

    this.sourceDirectoryPaths = options.sourceDirectoryPaths;
    this.watchDirectoryPaths = options.watchDirectoryPaths;
  }

  _createClass(TestTask, [{
    key: 'getTestFilesPromises',
    value: function getTestFilesPromises() {
      var _this = this;

      return (0, _lodash2['default'])(this.sourceDirectoryPaths).map(function (directoryPath) {
        return new Promise(function (resolve, reject) {
          _this.runTestDirectory(directoryPath, function (error) {
            if (error) {
              return reject(error);
            }

            resolve();
          });
        });
      }).value();
    }
  }, {
    key: 'runTestDirectory',
    value: function runTestDirectory(directoryPath, cb) {
      var _this2 = this;

      _fs2['default'].exists(directoryPath, function (exists) {
        if (!exists) {
          logging.taskInfo(_this2.constructor.name, 'Skipping: Directory "' + directoryPath + '" not found.');
          return cb();
        }

        var childProcess = _child_process2['default'].spawn('node', [pathToMocha, '--recursive', '--colors', '--reporter', _this2.mochaOptions.reporter, directoryPath]);

        childProcess.stdout.on('data', function (chunk) {
          return process.stdout.write(chunk);
        });

        childProcess.stderr.on('data', function (chunk) {
          return process.stderr.write(chunk);
        });

        childProcess.once('close', function () {
          cb();
        });
      });
    }
  }, {
    key: 'runTests',
    value: function runTests(cb) {
      Promise.all(this.getTestFilesPromises()).then(function () {
        cb();
      })['catch'](cb);
    }
  }, {
    key: 'run',
    value: function run(cb) {
      this.runTests(function (error) {
        if (error) {
          return cb(error);
        }

        cb();
      });
    }
  }]);

  return TestTask;
})(_libTask2['default']);

exports['default'] = TestTask;
module.exports = exports['default'];
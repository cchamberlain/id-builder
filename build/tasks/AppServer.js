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

var _noop = require('lodash');

var _Monitor = require('forever-monitor');

var _each = require('async');

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _Task2 = require('../lib/Task');

var _Task3 = _interopRequireWildcard(_Task2);

var AppServer = (function (_Task) {
  function AppServer() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, AppServer);

    _get(Object.getPrototypeOf(AppServer.prototype), 'constructor', this).call(this, options);

    this.sourceDirectoryPath = options.sourceDirectoryPath;

    this.monitors = {};
  }

  _inherits(AppServer, _Task);

  _createClass(AppServer, [{
    key: 'addPath',
    value: function addPath(path, cb) {
      var monitor = new _Monitor.Monitor(path, {
        command: 'node'
      });

      this.monitors[path] = monitor;

      monitor.start();

      cb();
    }
  }, {
    key: 'removePath',
    value: function removePath(path, cb) {
      var monitor = this.monitors[path];

      monitor.kill(true);

      delete this.monitors[path];

      cb();
    }
  }, {
    key: 'restartPath',
    value: function restartPath(path, cb) {
      var monitor = this.monitors[path];

      monitor.restart();

      cb();
    }
  }, {
    key: 'sourceFilePathMatches',
    value: function sourceFilePathMatches(sourceFilePath) {
      return !!sourceFilePath.match(new RegExp('^' + this.sourceDirectoryPath));
    }
  }, {
    key: 'startServer',
    value: function startServer(filePath, cb) {
      var _this = this;

      _exists.exists(filePath, function (result) {
        if (!result) {
          _logging2['default'].taskInfo(_this.constructor.name, 'skipping ' + filePath + ' (Does not exist).');
          return cb();
        }

        var monitor = _this.monitors[filePath];

        if (monitor) {
          _this.restartPath(filePath, cb);
        } else {
          _this.addPath(filePath, cb);
        }
      });
    }
  }, {
    key: 'stopServer',
    value: function stopServer(filePath, cb) {
      var _this2 = this;

      _exists.exists(filePath, function (result) {
        if (!result) {
          _logging2['default'].taskInfo(_this2.constructor.name, 'skipping ' + filePath + ' (Does not exist).');
          return cb();
        }

        var monitor = _this2.monitors[filePath];

        if (monitor) {
          _this2.removePath(filePath, cb);
        } else {
          _logging2['default'].taskInfo(_this2.constructor.name, 'skipping ' + filePath + ' (Monitor does not exist).');
          cb();
        }
      });
    }
  }, {
    key: 'restartServer',
    value: function restartServer(filePath, cb) {
      var _this3 = this;

      _exists.exists(filePath, function (result) {
        if (!result) {
          _logging2['default'].taskInfo(_this3.constructor.name, 'skipping ' + filePath + ' (Does not exist).');
          return cb();
        }

        _this3.removePath(filePath, function (e) {
          if (e) {
            return cb(e);
          }

          _this3.addPath(filePath, cb);
        });
      });
    }
  }, {
    key: 'run',
    value: function run() {
      var _this4 = this;

      console.log('WHAT');

      _each.each(this.options.paths, function (v, cb) {
        _this4.startServer('' + _this4.sourceDirectoryPath + '/' + v, cb);
      }, _noop.noop);
    }
  }]);

  return AppServer;
})(_Task3['default']);

exports['default'] = AppServer;
module.exports = exports['default'];
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

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _libLogging = require('../lib/logging');

var _libLogging2 = _interopRequireDefault(_libLogging);

var _libTask = require('../lib/Task');

var _libTask2 = _interopRequireDefault(_libTask);

var BrowserSyncServerTask = (function (_Task) {
  _inherits(BrowserSyncServerTask, _Task);

  function BrowserSyncServerTask() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BrowserSyncServerTask);

    _get(Object.getPrototypeOf(BrowserSyncServerTask.prototype), 'constructor', this).call(this, options);

    this.paths = options.paths;
  }

  _createClass(BrowserSyncServerTask, [{
    key: 'reload',
    value: function reload(path) {
      var shouldReload = !!(0, _lodash2['default'])(this.paths).filter(function (directoryPath) {
        if (_lodash2['default'].startsWith(path, directoryPath)) {
          return true;
        }
      }).value().length;

      if (shouldReload) {
        _browserSync2['default'].reload(path);

        _libLogging2['default'].taskInfo(this.constructor.name, 'Reloaded `' + path + '`');
      }
    }
  }, {
    key: 'run',
    value: function run(cb) {
      var _this = this;

      _loglevel2['default'].debug('BrowserSyncServerTask#run');

      (0, _browserSync2['default'])(this.options.options, function (e) {
        if (e) {
          return cb(e);
        }

        _libLogging2['default'].taskInfo(_this.constructor.name, 'API Server running at 127.0.0.1:' + _this.options.options.port);
        _libLogging2['default'].taskInfo(_this.constructor.name, 'HTTP Server running at 127.0.0.1:' + _this.options.options.ui.port);
      });
    }
  }]);

  return BrowserSyncServerTask;
})(_libTask2['default']);

exports['default'] = BrowserSyncServerTask;
module.exports = exports['default'];
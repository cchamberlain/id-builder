'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _libLogging = require('../lib/logging');

var _libLogging2 = _interopRequireDefault(_libLogging);

var _libTask = require('../lib/Task');

var _libTask2 = _interopRequireDefault(_libTask);

var BrowserSyncServer = (function (_Task) {
  _inherits(BrowserSyncServer, _Task);

  function BrowserSyncServer() {
    _classCallCheck(this, BrowserSyncServer);

    _get(Object.getPrototypeOf(BrowserSyncServer.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(BrowserSyncServer, [{
    key: 'reload',
    value: function reload(options, path, cb) {
      _browserSync2['default'].reload(path);

      _libLogging2['default'].taskInfo(this.constructor.name, 'Reloaded `' + path + '`');

      cb();
    }
  }, {
    key: 'run',
    value: function run(cb) {
      var _this = this;

      (0, _browserSync2['default'])(this.options.options, function (e) {
        if (e) {
          return cb(e);
        }

        _libLogging2['default'].taskInfo(_this.constructor.name, 'API Server running at 127.0.0.1:' + _this.options.options.port);
        _libLogging2['default'].taskInfo(_this.constructor.name, 'HTTP Server running at 127.0.0.1:' + _this.options.options.ui.port);

        // cb();
      });
    }
  }]);

  return BrowserSyncServer;
})(_libTask2['default']);

exports['default'] = BrowserSyncServer;
module.exports = exports['default'];
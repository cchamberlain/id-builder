'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireWildcard(_browserSync);

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _Task2 = require('../lib/Task');

var _Task3 = _interopRequireWildcard(_Task2);

var BrowserSyncServer = (function (_Task) {
  function BrowserSyncServer() {
    _classCallCheck(this, BrowserSyncServer);

    if (_Task != null) {
      _Task.apply(this, arguments);
    }
  }

  _inherits(BrowserSyncServer, _Task);

  _createClass(BrowserSyncServer, [{
    key: 'reload',
    value: function reload(options, path, cb) {
      _browserSync2['default'].reload(path);

      _logging2['default'].taskInfo(this.constructor.name, 'Reloaded `' + path + '`');

      cb();
    }
  }, {
    key: 'run',
    value: function run(cb) {
      var _this = this;

      _browserSync2['default'](this.options.options, function (e) {
        if (e) {
          return cb(e);
        }

        _logging2['default'].taskInfo(_this.constructor.name, 'API Server running at 127.0.0.1:' + _this.options.options.port);
        _logging2['default'].taskInfo(_this.constructor.name, 'HTTP Server running at 127.0.0.1:' + _this.options.options.ui.port);

        // cb();
      });
    }
  }]);

  return BrowserSyncServer;
})(_Task3['default']);

exports['default'] = BrowserSyncServer;
module.exports = exports['default'];
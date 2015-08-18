'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _each = require('async');

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireWildcard(_rimraf);

var _Task2 = require('../lib/Task');

var _Task3 = _interopRequireWildcard(_Task2);

var DirectoryCleanerTask = (function (_Task) {
  function DirectoryCleanerTask() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, DirectoryCleanerTask);

    _get(Object.getPrototypeOf(DirectoryCleanerTask.prototype), 'constructor', this).call(this, options);
  }

  _inherits(DirectoryCleanerTask, _Task);

  _createClass(DirectoryCleanerTask, [{
    key: 'run',
    value: function run(options, cb) {
      _each.each(options.paths, function (path, cb) {
        _rimraf2['default'](path, cb);
      }, cb);
    }
  }]);

  return DirectoryCleanerTask;
})(_Task3['default']);

exports['default'] = DirectoryCleanerTask;
module.exports = exports['default'];
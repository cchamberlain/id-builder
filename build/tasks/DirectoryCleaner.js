'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireWildcard(_rimraf);

var _each = require('async');

var _Task2 = require('../lib/Task');

var _Task3 = _interopRequireWildcard(_Task2);

var DirectoryCleaner = (function (_Task) {
  function DirectoryCleaner() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, DirectoryCleaner);

    _get(Object.getPrototypeOf(DirectoryCleaner.prototype), 'constructor', this).call(this, options);

    this.paths = options.paths;
  }

  _inherits(DirectoryCleaner, _Task);

  _createClass(DirectoryCleaner, [{
    key: 'removeDirectoryContents',
    value: function removeDirectoryContents(path, cb) {
      _rimraf2['default']('' + path + '/**/*', cb);
    }
  }, {
    key: 'run',
    value: function run(cb) {
      _each.each(this.paths, this.removeDirectoryContents.bind(this), cb);
    }
  }]);

  return DirectoryCleaner;
})(_Task3['default']);

exports['default'] = DirectoryCleaner;
module.exports = exports['default'];
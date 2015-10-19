// - Give tasks a name so you can create one like 'Clean#1234' so you can
//   actually launch a dependency on that one and not have dependencies only
//   work for the class name. Like this we can have many of the same kind of
//   tasks active at the same time.
// - Because tasks have a name, they can get to their own configuration within
//   that of the task queue. Putting a Configuration on each task doesn't work
//   as it breaks .get() lookups with variables.
// - save each task class as a string in the configuration of the task.
//

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _libPromise = require('../lib/promise');

var _libPromise2 = _interopRequireDefault(_libPromise);

var _libTask = require('../lib/Task');

var _libTask2 = _interopRequireDefault(_libTask);

var DirectoryCleanerTask = (function (_Task) {
  _inherits(DirectoryCleanerTask, _Task);

  function DirectoryCleanerTask(taskQueue) {
    _classCallCheck(this, DirectoryCleanerTask);

    _get(Object.getPrototypeOf(DirectoryCleanerTask.prototype), 'constructor', this).call(this, taskQueue);

    this.paths = this.configuration.paths;
  }

  /**
   * Removes the contents of a directory.
   * @param {String} directoryPath The path of the directory to empty.
   */

  _createClass(DirectoryCleanerTask, [{
    key: 'removeDirectoryContents',
    value: function removeDirectoryContents(directoryPath) {
      return regeneratorRuntime.async(function removeDirectoryContents$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(_libPromise2['default'].promiseFromNodeCallback(_rimraf2['default'], directoryPath + '/**/*'));

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }

    /**
     * Runs the task.
     */
  }, {
    key: 'run',
    value: function run() {
      return regeneratorRuntime.async(function run$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(Promise.all(_lodash2['default'].map(this.paths, function (path) {
              return _this.removeDirectoryContents(path);
            })));

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return DirectoryCleanerTask;
})(_libTask2['default']);

exports['default'] = DirectoryCleanerTask;
module.exports = exports['default'];
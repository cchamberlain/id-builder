'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _Configuration = require('./Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

/**
 * Represents one thing to be done. May be a long running task.
 * TODO: add a removeDependencies(array) method.
 * @class Task
 */

var Task = (function (_events$EventEmitter) {
  _inherits(Task, _events$EventEmitter);

  function Task() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Task);

    // log.debug('Task#constructor');

    _get(Object.getPrototypeOf(Task.prototype), 'constructor', this).call(this, options);

    this.taskQueue = options.taskQueue;

    this.configuration = this.taskQueue.configuration.get('tasks.' + this.constructor.name);

    this.dependencies = this.configuration.dependencies;
  }

  /**
   * Starts the task.
   */

  _createClass(Task, [{
    key: 'start',
    value: function start() {
      return regeneratorRuntime.async(function start$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (this.run) {
              context$2$0.next = 2;
              break;
            }

            throw new Error('No run function set.');

          case 2:
            context$2$0.next = 4;
            return regeneratorRuntime.awrap(this.__proto__.run.call(this));

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }

    /**
     * Runs the task. Abstract method, implemented as No-Op for this
     * class.
     */
  }, {
    key: 'run',
    value: function run() {
      return regeneratorRuntime.async(function run$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return Task;
})(_events2['default'].EventEmitter);

exports['default'] = Task;
module.exports = exports['default'];

// log.debug('Task#start');

// TODO: This is horrible!

// log.debug('Task#run');
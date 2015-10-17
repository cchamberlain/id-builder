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

/**
 * Contains all the options. Emits events when changes occur.
 * @class Options
 */

var Options = (function (_events$EventEmitter) {
  _inherits(Options, _events$EventEmitter);

  function Options() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Options);

    _get(Object.getPrototypeOf(Options.prototype), 'constructor', this).call(this, options);

    this._values = options;
  }

  /**
   * Emits that a change has happened.
   * @param key
   * @param value
   * @private
   */

  _createClass(Options, [{
    key: '_emitChange',
    value: function _emitChange(key, value) {
      this.emit('change:' + key, value);
      this.emit('change', value);
    }

    /**
     * Gets the (nested) key from the object.
     * @param {String} key
     * @returns {*}
     */
  }, {
    key: 'get',
    value: function get(key) {
      return _lodash2['default'].get(this._values, key);
    }

    /**
     * Sets the value of the (nested) key to `value`.
     * @param {String} key
     * @param {*} value
     * @returns {Options}
     */
  }, {
    key: 'set',
    value: function set(key, value) {
      _lodash2['default'].set(this._values, key, value);

      this._emitChange(key, value);

      return this;
    }

    /**
     * Sets the value of the (nested) key to `undefined`. Does not delete the key.
     * @param {String} key
     * @returns {Options}
     */
  }, {
    key: 'del',
    value: function del(key) {
      _lodash2['default'].set(this._values, key, undefined);

      this._emitChange(key, 'undefined');

      return this;
    }

    /**
     * Merges `object` into the current options, overriding values.
     * TODO: use _.defaultsDeep
     * @param {Object} object
     * @returns {Options}
     */
  }, {
    key: 'merge',
    value: function merge(object) {
      return this;
    }
  }]);

  return Options;
})(_events2['default'].EventEmitter);

exports['default'] = Options;
module.exports = exports['default'];
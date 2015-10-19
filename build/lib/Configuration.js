'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

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

/**
 * Contains all the options. Emits events when changes occur.
 * @class Options
 */

var Configuration = (function (_events$EventEmitter) {
  _inherits(Configuration, _events$EventEmitter);

  function Configuration() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Configuration);

    _get(Object.getPrototypeOf(Configuration.prototype), 'constructor', this).call(this, options);

    this._values = options;

    _lodash2['default'].bindAll(this, ['get', 'set', 'del']);
  }

  /**
   * Emits that a change has happened.
   * @param key
   * @param value
   * @private
   */

  _createClass(Configuration, [{
    key: '_emitSet',
    value: function _emitSet(key, value) {
      this.emit('set:' + key, value);
      this.emit('set', key, value);
    }

    /**
     * Emits that a delete has happened.
     * @param key
     * @param value
     * @private
     */
  }, {
    key: '_emitDel',
    value: function _emitDel(key) {
      this.emit('del:' + key);
      this.emit('del', key);
    }

    /**
     * Replaces variables in `value` with the value of the key the variables point
     * to.
     * TODO: Probably implement an error throw when looping
     * @param {String} value The value of a key.
     * @private
     */
  }, {
    key: '_replaceVariables',
    value: function _replaceVariables(value) {
      var variables = value.match(/{(.+?)}/g);

      if (!variables || !variables.length) {
        return value;
      }

      // Reduce the
      return _lodash2['default'].reduce(
      // zipped
      _lodash2['default'].zip(
      // variables
      variables,

      // and values
      (0, _lodash2['default'])(variables).invoke('replace', '{', '').invoke('replace', '}', '').map(this.get).value()), function (m, _ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var k = _ref2[0];
        var v = _ref2[1];

        // replacing all variables with their value.
        return m.replace(k, v);
      }, value);
    }

    /**
     * Gets the (nested) key from the object. Variables in the value of the key
     * are replaced by the value of the keys they refer to.
     * @param {String} key
     * @returns {*}
     */
  }, {
    key: 'get',
    value: function get(key) {
      var _this = this;

      var result = _lodash2['default'].get(this._values, key);

      if (result) {
        if (_lodash2['default'].isArray(result)) {
          result = _lodash2['default'].map(result, function (v, i) {
            return _this.get(key + '[' + i + ']');
          });
        } else if (_lodash2['default'].isObject(result)) {
          result = _lodash2['default'].mapValues(result, function (v, k) {
            return _this.get(key + '.' + k);
          });
        } else if (_lodash2['default'].isString(result)) {
          result = this._replaceVariables(result);
        }
      }

      return result;
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

      this._emitSet(key, value);

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

      this._emitDel(key);

      return this;
    }

    // /**
    //  * Merges `object` into the current options, overriding values.
    //  * TODO: use _.defaultsDeep
    //  * @param {Object} object
    //  * @returns {Options}
    //  */
    // merge(object) {
    //   return this;
    // }
  }]);

  return Configuration;
})(_events2['default'].EventEmitter);

exports['default'] = Configuration;
module.exports = exports['default'];
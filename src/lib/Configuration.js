import events from 'events';

import _ from 'lodash';
import log from 'loglevel';

/**
 * Contains all the options. Emits events when changes occur.
 * @class Options
 */
export default class Configuration extends events.EventEmitter {
  constructor(options = {}) {
    super(options);

    this._values = options;

    _.bindAll(this, [
      'get',
      'set',
      'del'
    ]);
  }

  /**
   * Emits that a change has happened.
   * @param key
   * @param value
   * @private
   */
  _emitSet(key, value) {
    this.emit(`set:${key}`, value);
    this.emit(`set`, key, value);
  }

  /**
   * Emits that a delete has happened.
   * @param key
   * @param value
   * @private
   */
  _emitDel(key) {
    this.emit(`del:${key}`);
    this.emit(`del`, key);
  }

  /**
   * Replaces variables in `value` with the value of the key the variables point
   * to.
   * TODO: Probably implement an error throw when looping
   * @param {String} value The value of a key.
   * @private
   */
  _replaceVariables(value) {
    let variables = value.match(/{(.+?)}/g);

    if (!variables || !variables.length) {
      return value;
    }

    // Reduce the
    return _.reduce(
      // zipped
      _.zip(
        // variables
        variables,

        // and values
        _(variables)
          .invoke('replace', '{', '')
          .invoke('replace', '}', '')
          .map(this.get)
          .value()
      ),

      (m, [ k, v ]) => {
        // replacing all variables with their value.
        return m.replace(k, v);
      },

      value
    );
  }

  /**
   * Gets the (nested) key from the object. Variables in the value of the key
   * are replaced by the value of the keys they refer to.
   * @param {String} key
   * @returns {*}
   */
  get(key) {
    let result = _.get(this._values, key);

    if (result) {
      if (_.isArray(result)) {
        result = _.map(result, (v, i) => this.get(`${key}[${i}]`));
      } else if (_.isObject(result)) {
        result = _.mapValues(result, (v, k) => this.get(`${key}.${k}`));
      } else if (_.isString(result)) {
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
  set(key, value) {
    _.set(this._values, key, value);

    this._emitSet(key, value);

    return this;
  }

  /**
   * Sets the value of the (nested) key to `undefined`. Does not delete the key.
   * @param {String} key
   * @returns {Options}
   */
  del(key) {
    _.set(this._values, key, undefined);

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
}

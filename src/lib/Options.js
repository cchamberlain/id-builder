import events from 'events';

import _ from 'lodash';

/**
 * Contains all the options. Emits events when changes occur.
 * @class Options
 */
export default class Options extends events.EventEmitter {
  constructor(options = {}) {
    super(options);

    this._values = options;
  }

  /**
   * Emits that a change has happened.
   * @param key
   * @param value
   * @private
   */
  _emitChange(key, value) {
    this.emit(`change:${key}`, value);
    this.emit(`change`, value);
  }

  /**
   * Gets the (nested) key from the object.
   * @param {String} key
   * @returns {*}
   */
  get(key) {
    return _.get(this._values, key);
  }

  /**
   * Sets the value of the (nested) key to `value`.
   * @param {String} key
   * @param {*} value
   * @returns {Options}
   */
  set(key, value) {
    _.set(this._values, key, value);

    this._emitChange(key, value);

    return this;
  }

  /**
   * Sets the value of the (nested) key to `undefined`. Does not delete the key.
   * @param {String} key
   * @returns {Options}
   */
  del(key) {
    _.set(this._values, key, undefined);

    this._emitChange(key, 'undefined');

    return this;
  }

  /**
   * Merges `object` into the current options, overriding values.
   * TODO: use _.defaultsDeep
   * @param {Object} object
   * @returns {Options}
   */
  merge(object) {
    return this;
  }
}

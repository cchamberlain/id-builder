'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _libConfiguration = require('../../lib/Configuration');

var _libConfiguration2 = _interopRequireDefault(_libConfiguration);

/**
 * @test {Configuration}
 */
describe('Configuration', function () {
  it('should test', function (cb) {
    cb();
  });

  /**
   * @test {Configuration#get}
   */
  describe('#get', function () {
    describe('when called with an nonexistent key', function () {
      it('should return undefined', function (cb) {
        var configuration = new _libConfiguration2['default']({});

        var expected = undefined;
        var actual = configuration.get('some.deep[0].key');

        _assert2['default'].equal(expected, actual);

        cb();
      });
    });

    describe('when called with an existing key', function () {
      describe('when the value of the key is not a string', function () {
        it('should return the value of the key', function (cb) {
          var configuration = new _libConfiguration2['default']({
            some: {
              deep: [{
                key: 42
              }]
            }
          });

          var expected = 42;
          var actual = configuration.get('some.deep[0].key');

          _assert2['default'].equal(expected, actual);

          cb();
        });
      });

      describe('when the value of the key is a string', function () {
        it('should return the value of the key', function (cb) {
          var configuration = new _libConfiguration2['default']({
            some: {
              deep: [{
                key: 'value'
              }]
            }
          });

          var expected = 'value';
          var actual = configuration.get('some.deep[0].key');

          _assert2['default'].equal(expected, actual);

          cb();
        });

        describe('when the key contains a variable', function () {
          it('should return the value of the key, replacing the variable with the value of the key the variable points to.', function (cb) {
            var configuration = new _libConfiguration2['default']({
              HERP: 'DERP',
              some: {
                foo: 'bar',
                answer: '42',
                deep: [{
                  key: '{HERP}/{some.foo}/{some.answer}value'
                }]
              }
            });

            var expected = 'DERP/bar/42value';
            var actual = configuration.get('some.deep[0].key');

            _assert2['default'].equal(expected, actual);

            cb();
          });
        });

        describe('when a deeper key contains a variable', function () {
          it('should return the value of the key, replacing the variable with the value of the key the variable points to.', function (cb) {
            var configuration = new _libConfiguration2['default']({
              HERP: 'DERP',
              some: {
                foo: 'bar',
                answer: '42',
                deep: [{
                  key: '{HERP}/{some.foo}/{some.answer}value'
                }]
              }
            });

            var expected = [{ key: 'DERP/bar/42value' }];
            var actual = configuration.get('some.deep');

            _assert2['default'].deepEqual(expected, actual);

            cb();
          });
        });
      });
    });
  });

  /**
   * @test {Configuration#set}
   */
  describe('#set', function () {
    describe('when called with a key and value', function () {
      it('should have added the key and value to the instance', function (cb) {
        var configuration = new _libConfiguration2['default']({});

        configuration.set('key', 'value');

        var expected = 'value';
        var actual = configuration.get('key');

        _assert2['default'].equal(expected, actual);

        cb();
      });

      it('should have emitted a global `set` event', function (cb) {
        var configuration = new _libConfiguration2['default']({});

        configuration.once('set', function (k, v) {
          var expected = 'value';
          var actual = configuration.get('key');

          _assert2['default'].equal(expected, actual);

          cb();
        });

        configuration.set('key', 'value');
      });

      it('should have emitted a specific `set` event', function (cb) {
        var configuration = new _libConfiguration2['default']({});

        configuration.once('set:some.key', function (v) {
          var expected = 'value';
          var actual = configuration.get('some.key');

          _assert2['default'].equal(expected, actual);

          cb();
        });

        configuration.set('some', {});
        configuration.set('some.key', 'value');
      });
    });
  });

  /**
   * @test {Configuration#del}
   */
  describe('#del', function () {
    describe('when called with a key', function () {
      it('should have set the value of the key to undefined', function (cb) {
        var configuration = new _libConfiguration2['default']({});

        configuration.set('key', 'value');
        configuration.del('key');

        var expected = undefined;
        var actual = configuration.get('key');

        _assert2['default'].equal(expected, actual);

        cb();
      });

      it('should have emitted a global `del` event', function (cb) {
        var configuration = new _libConfiguration2['default']({});

        configuration.once('del', function (k) {
          _assert2['default'].equal('key', k);

          cb();
        });

        configuration.set('key', 'value');
        configuration.del('key');
      });

      it('should have emitted a specific `del` event', function (cb) {
        var configuration = new _libConfiguration2['default']({});

        configuration.once('del:some.key', cb);
        configuration.set('some', {});
        configuration.set('some.key', 'value');
        configuration.del('some.key');
      });
    });
  });
});
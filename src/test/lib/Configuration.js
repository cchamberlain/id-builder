import assert from 'assert';

import Configuration from '../../lib/Configuration';

/**
 * @test {Configuration}
 */
describe('Configuration', () => {
  it('should test', (cb) => {
    cb();
  });

  /**
   * @test {Configuration#get}
   */
  describe('#get', () => {
    describe('when called with an nonexistent key', () => {
      it('should return undefined', (cb) => {
        const configuration = new Configuration({
        });

        const expected = undefined;
        const actual = configuration.get('some.deep[0].key');

        assert.equal(expected, actual);

        cb();
      });
    });

    describe('when called with an existing key', () => {
      describe('when the value of the key is not a string', () => {
        it('should return the value of the key', (cb) => {
          const configuration = new Configuration({
            some: {
              deep: [
                {
                  key: 42
                }
              ]
            }
          });

          const expected = 42;
          const actual = configuration.get('some.deep[0].key');

          assert.equal(expected, actual);

          cb();
        });
      });

      describe('when the value of the key is a string', () => {
        it('should return the value of the key', (cb) => {
          const configuration = new Configuration({
            some: {
              deep: [
                {
                  key: 'value'
                }
              ]
            }
          });

          const expected = 'value';
          const actual = configuration.get('some.deep[0].key');

          assert.equal(expected, actual);

          cb();
        });

        describe('when the key contains a variable', () => {
          it('should return the value of the key, replacing the variable with the value of the key the variable points to.', (cb) => {
            const configuration = new Configuration({
              HERP: 'DERP',
              some: {
                foo: 'bar',
                answer: '42',
                deep: [
                  {
                    key: '{HERP}/{some.foo}/{some.answer}value'
                  }
                ]
              }
            });

            const expected = 'DERP/bar/42value';
            const actual = configuration.get('some.deep[0].key');

            assert.equal(expected, actual);

            cb();
          });
        });
      });
    });
  });

  /**
   * @test {Configuration#set}
   */
  describe('#set', () => {
    describe('when called with a key and value', () => {
      it('should have added the key and value to the instance', (cb) => {
        const configuration = new Configuration({});

        configuration.set('key', 'value');

        const expected = 'value';
        const actual = configuration.get('key');

        assert.equal(expected, actual);

        cb();
      });

      it('should have emitted a global `set` event', (cb) => {
        const configuration = new Configuration({});

        configuration.once('set', (k, v) => {
          const expected = 'value';
          const actual = configuration.get('key');

          assert.equal(expected, actual);

          cb();
        });

        configuration.set('key', 'value');
      });

      it('should have emitted a specific `set` event', (cb) => {
        const configuration = new Configuration({});

        configuration.once(`set:some.key`, (v) => {
          const expected = 'value';
          const actual = configuration.get('some.key');

          assert.equal(expected, actual);

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
  describe('#del', () => {
    describe('when called with a key', () => {
      it('should have set the value of the key to undefined', (cb) => {
        const configuration = new Configuration({});

        configuration.set('key', 'value');
        configuration.del('key');

        const expected = undefined;
        const actual = configuration.get('key');

        assert.equal(expected, actual);

        cb();
      });

      it('should have emitted a global `del` event', (cb) => {
        const configuration = new Configuration({});

        configuration.once('del', (k) => {
          assert.equal('key', k);

          cb();
        });

        configuration.set('key', 'value');
        configuration.del('key');
      });

      it('should have emitted a specific `del` event', (cb) => {
        const configuration = new Configuration({});

        configuration.once(`del:some.key`, cb);
        configuration.set('some', {});
        configuration.set('some.key', 'value');
        configuration.del('some.key');
      });
    });
  });
});

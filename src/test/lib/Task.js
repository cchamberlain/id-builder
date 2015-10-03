import tape from 'tape';
import log from 'loglevel';

export default function Task() {
  log.debug('OUTSIDE OF TEST', tape);

  tape('timing tape', test => {
    log.debug('INSIDE OF TEST');

    test.plan(2);

    test.equal(typeof Date.now, 'function');

    const start = Date.now();

    setTimeout(() => {
      test.equal(Date.now() - start, 100);
    }, 100);
  });
}

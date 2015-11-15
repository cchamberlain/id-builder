import browserSync from 'browser-sync';
import runSequence from 'run-sequence';

function run(gulp, plugins, defaults) {
  return cb => {
    runSequence(
      'clean-directory',

      [
        'compile-babel',
        'compile-copy',
        'compile-images',
        'compile-less'
      ],

      'compile-browserify',
      'run-tests',

      [
        'run-server',
        'browsersync-server',
        'watch-browserify',
        'watch-tests',
        'watch-compilers'
      ]
    );
  };
}

export default (gulp, plugins, defaults) => {
  return {
    'run': {
      fn: run(gulp, plugins, defaults),
      description: 'Runs all the tasks. In parallel where applicable and in series otherwise.'
    }
  };
};

import browserSync from 'browser-sync';

function runTests(gulp, plugins, defaults) {
  return () => {
    return gulp.src(`${defaults.paths.source}/test/**/*.js`, { read: false })
      .pipe(plugins.mocha({
        recursive: true,
        reporter: 'spec'
      }));
  };
}

function watchTests(gulp, plugins, defaults) {
  return () => {
    gulp.watch(`${defaults.paths.source}/**/*.js`, [ 'run-tests' ]);
  };
}

export default (gulp, plugins, defaults) => {
  return {
    'run-tests': {
      fn: runTests(gulp, plugins, defaults),
      description: 'Runs all the tests with mocha.'
    },

    'watch-tests': {
      fn: watchTests(gulp, plugins, defaults),
      description: 'Re-runs all tests on any change.'
    }
  };
};

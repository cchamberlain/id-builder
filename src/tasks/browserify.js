import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import watchify from 'watchify';

import browserSync from 'browser-sync';

let browserifyBundle;

function getBundle(gulp, plugins, defaults) {
  return browserify({
    entries: `${defaults.paths.target}/client/js/app.js`,
    // debug: true,
    transform: []
  });
}

function runBundle(gulp, plugins, defaults) {
  return (bundle, cb) => {
    bundle
      .bundle()
      .pipe(source('app.bundle.js'))
      .pipe(gulp.dest(`${defaults.paths.target}/client/js`))
      .on('end', cb)
      .pipe(browserSync.reload({ stream: true }));
  };
}

function compileBrowserify(gulp, plugins, defaults) {
  return (cb) => {
    const bundle = getBundle(gulp, plugins, defaults);

    runBundle(gulp, plugins, defaults)(bundle, cb);
  };
}

function watchBrowserify(gulp, plugins, defaults) {
  return cb => {
    const bundle = watchify(getBundle(gulp, plugins, defaults));

    bundle.on('update', () => {
      runBundle(gulp, plugins, defaults)(bundle, () => {});
    });

    bundle.on('log', gutil.log);

    runBundle(gulp, plugins, defaults)(bundle, () => {});

    cb();
  };
}

export default (gulp, plugins, defaults) => {
  return {
    'compile-browserify': {
      fn: compileBrowserify(gulp, plugins, defaults),
      description: 'Compiles all frontend javascript resources into one file.'
    },

    'watch-browserify': {
      fn: watchBrowserify(gulp, plugins, defaults),
      description: 'Compiles all frontend javascript resources into one file when changes occur.'
    }
  };
};

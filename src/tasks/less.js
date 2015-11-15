import browserSync from 'browser-sync';

function compileLess(gulp, plugins, defaults) {
  return () => {
    return gulp.src(`${defaults.paths.source}/client/styles/app.less`)
      .pipe(plugins.changed(defaults.paths.target))
      .pipe(plugins.less())
      .pipe(plugins.minifyCss())
      .pipe(plugins.size())
      .pipe(gulp.dest(`${defaults.paths.target}/client/css`))
      .pipe(browserSync.reload({ stream: true }));
  };
}

export default (gulp, plugins, defaults) => {
  return {
    'compile-less': {
      fn: compileLess(gulp, plugins, defaults),
      description: 'Compiles all .less files from LESS to CSS.'
    }
  };
};

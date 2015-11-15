import browserSync from 'browser-sync';

function compileCopy(gulp, plugins, defaults) {
  return () => {
    return gulp.src(`${defaults.paths.source}/**/*.!(gif|jpg|png|svg|less|js)`)
      .pipe(plugins.changed(defaults.paths.target))
      .pipe(plugins.size())
      .pipe(gulp.dest(defaults.paths.target))
      .pipe(browserSync.reload({ stream: true }));
  };
}

export default (gulp, plugins, defaults) => {
  return {
    'compile-copy': {
      fn: compileCopy(gulp, plugins, defaults),
      description: 'Copies all files that do not get compiled by other tasks.'
    }
  };
};

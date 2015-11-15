import browserSync from 'browser-sync';

function watchCompilers(gulp, plugins, defaults) {
  return cb => {
    plugins.saneWatch(`${defaults.paths.source}/**/*`, { debounce: 300 }, (filename, path, stat) => {
      if (filename.match(/^.*\.js$/)) {
        gulp.start('compile-babel');
      }

      if (filename.match(/^.*\.less$/)) {
        gulp.start('compile-less');
      }

      if (filename.match(/^.*\.(gif|jpg|png|svg)$/)) {
        gulp.start('compile-images');
      }

      if (!filename.match(/^.*\.(gif|jpg|png|svg|less|js)$/)) {
        gulp.start('compile-copy');
      }
    });

    cb();
  };
}

export default (gulp, plugins, defaults) => {
  return {
    'watch-compilers': {
      fn: watchCompilers(gulp, plugins, defaults),
      description: 'Re-compiles files on changes.'
    }
  };
};


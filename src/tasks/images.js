import browserSync from 'browser-sync';
import pngquant from 'imagemin-pngquant';

function compileImages(gulp, plugins, defaults) {
  return () => {
    return gulp.src(`${defaults.paths.source}/**/*.@(gif|jpg|png|svg)`)
      .pipe(plugins.changed(defaults.paths.target))
      .pipe(plugins.imagemin({
        progressive: true,
        svgoPlugins: [ { removeViewbox: false } ],
        use: [ pngquant() ]
      }))
      .pipe(plugins.size())
      .pipe(gulp.dest(defaults.paths.target))
      .pipe(browserSync.reload({ stream: true }));
  };
}

export default (gulp, plugins, defaults) => {
  return {
    'compile-images': {
      fn: compileImages(gulp, plugins, defaults),
      description: 'Optimizes the size of all image files.'
    }
  };
};

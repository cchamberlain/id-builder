function cleanDirectory(gulp, plugins, defaults) {
  return () => {
    return gulp.src(`${defaults.paths.target}/*`, { read: false })
      .pipe(plugins.rimraf());
  };
}

export default (gulp, plugins, defaults) => {
  return {
    'clean-directory': {
      fn: cleanDirectory(gulp, plugins, defaults),
      description: 'Cleans the build directory.'
    }
  };
};

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import taskLoader from 'gulp-commonjs-tasks/task-loader';

import defaults from './defaults';

export default function start() {
  const plugins = gulpLoadPlugins();
  const taskContext = taskLoader.load(`${__dirname}/tasks`, gulp, plugins, defaults);

  taskContext.addHelpTask();
};

/*
var condition = true;
gulp.task('task', () => {
  gulp.src('./src/*.js')
    .pipe(plugins.if(condition, plugins.uglify()))
    .pipe(gulp.dest('./dist/'));
});
*/

import browserSync from 'browser-sync';

function runServer(gulp, plugins, defaults) {
  return cb => {
    plugins.developServer.listen({
      path: `${defaults.paths.target}/server/app.js`
    });

    plugins.saneWatch(`${defaults.paths.target}/server/**/*`, { debounce: 300 }, () => {
      plugins.developServer.restart(() => {
        browserSync.reload();
      });
    });

    cb();
  };
}

export default (gulp, plugins, defaults) => {
  return {
    'run-server': {
      fn: runServer(gulp, plugins, defaults),
      description: 'Runs the application server. When server files get changed, re-runs it and reloads the browser.'
    }
  };
};

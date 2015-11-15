import url from 'url';

import browserSync from 'browser-sync';
import proxy from 'proxy-middleware';

// TODO: Magic Variables -> Defaults
// TODO: Defaults -> Commandline option overrides.
function runServer(gulp, plugins, defaults) {
  return cb => {
    const proxyOptions = url.parse(`http://localhost:4000/api`);

    proxyOptions.route = '/api';

    browserSync({
      open: true,
      port: 3000,
      server: {
        baseDir: `${defaults.paths.target}/client`,
        middleware: [ proxy(proxyOptions) ]
      },
      reloadDebounce: 2000
    });

    cb();
  };
}

export default (gulp, plugins, defaults) => {
  return {
    'browsersync-server': {
      fn: runServer(gulp, plugins, defaults),
      description: 'Runs a HTTP server. Serves the front-end during development, proxies backend requests and automatically reloads all connected browsers/devices when changes occur anywhere in the pipeline that have affected the page.'
    }
  };
};

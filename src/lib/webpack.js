import path from 'path';

import log from 'loglevel';
import webpack from 'webpack';

import browsersync from './browsersync';
import logging from './logging';

const prepareOptions = function(options) {
  // Make the paths absolute, because webpack needs it to be absolute.
  options.context = path.resolve(options.context);
  options.entry = path.resolve(options.entry);
  options.output.path = path.resolve(options.output.path);

  return options;
};

const matchesTargetPath = function(options, path) {
  return path === `${options.path}/${options.filename}`;
};

const compileAllFiles = function(options, cb) {
  options.options = prepareOptions(options.options);

  const compiler = webpack(options.options);

  compiler.run((e, stats) => {
    if (e) {
      return cb(e);
    }

    const jsonStats = stats.toJson();

    if (jsonStats.errors.length) {
      return console.error(jsonStats.errors);
    }

    if (jsonStats.warnings.length) {
      return console.error(jsonStats.warnings);
    }

    logging.taskInfo(options.taskName, `${options.options.entry} => ${options.options.output.path}/${options.options.output.filename}`);

    cb();
  });
};

const watchAllFiles = function(options, cb) {
  options.options = prepareOptions(options.options);

  const compiler = webpack(options.options);

  let lastHash;

  compiler.watch(options.watchOptions, (e, stats) => {
    if (e) {
      return cb(e);
    }

    const jsonStats = stats.toJson();

    if (jsonStats.errors.length) {
      return console.error(jsonStats.errors);
    }

    if (jsonStats.warnings.length) {
      return console.error(jsonStats.warnings);
    }

    if (lastHash) {
      if (lastHash !== stats.hash) {
        lastHash = stats.hash;
        logging.taskInfo(options.taskName, `${options.options.entry} => ${options.options.output.path}/${options.options.output.filename}`);
      }
    } else {
      lastHash = stats.hash;
    }
  });
};

export default {
  compileAllFiles,
  matchesTargetPath,
  watchAllFiles
};

import path from 'path';

import webpack from 'webpack';

import logging from './logging';

function prepareOptions(options) {
  // Make the paths absolute, because webpack needs it to be absolute.
  options.context = path.resolve(options.context);
  options.entry = path.resolve(options.entry);
  options.output.path = path.resolve(options.output.path);

  return options;
}

function matchesTargetPath(options, path) {
  return path === `${options.path}/${options.filename}`;
}

function compileAllFiles(options, cb) {
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
}

function watchAllFiles(options, cb) {
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
}

export default {
  compileAllFiles,
  matchesTargetPath,
  watchAllFiles
};

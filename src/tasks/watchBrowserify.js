'use strict';

import browserify from '../lib/browserify';

export const dependencies = [
  // TODO: consider removing this dependency because browserify has it's own
  // watcher.
  'watch'
];

const handlePath = function(options, path, stat) {
  if (!browserify.sourceFilePathMatches(options, path)) {
    return;
  }

  browserify.compileAllFiles(options, function(e) {
    if (e) {
      console.error(e);
    }
  })
};

const handleAdd = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleAddDir = function(options, path, stat) {
};

const handleChange = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleUnlink = function(options, path, stat) {
};

const handleUnlinkDir = function(options, path, stat) {
};

const handleError = function(options, e) {
  console.error(e);
};

export const run = function(options, cb) {
  browserify.watch(options, cb);
};

"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

const child_process = require("child_process");
const fileSystem = require("./fileSystem");
const logging = require("./logging");

const pathToMocha = path.resolve(__dirname + "/../../node_modules/mocha/bin/_mocha");
const globalOptions = global.options;

const randomString = function() {
  return Math.random().toString(36).slice(7);
};

const sourceFilePathMatches = function(options, sourceFilePath) {
  const matchesJavascript = !!sourceFilePath.match(/\.js$/);

  const matchesTarget = sourceFilePath.indexOf(globalOptions.targetDirectory) === 0;

  return matchesJavascript && matchesTarget;
};

const runTests = function(options, cb) {
  fs.exists(options.sourcePath, function(exists) {
    if (!exists) {
      logging.taskInfo(options.taskName, "Skipping: Directory `" + options.sourcePath + "` not found.");
      return cb();
    }

    const childProcess = child_process.spawn("iojs", [
      pathToMocha,
      "--recursive",
      "--colors",
      "--reporter",
      options.reporter,
      options.sourcePath
    ]);

    childProcess.stdout.on("data", function(chunk) {
      return process.stdout.write(chunk);
    });

    childProcess.stderr.on("data", function(chunk) {
      return process.stderr.write(chunk);
    });

    childProcess.once("close", function() {
      cb();
    });
  });
};

module.exports = {
  randomString: randomString,
  sourceFilePathMatches: sourceFilePathMatches,
  runTests: runTests
};
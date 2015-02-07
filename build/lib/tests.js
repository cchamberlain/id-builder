"use strict";

let fs = require("fs");
let os = require("os");
let path = require("path");

let child_process = require("child_process");
let fileSystem = require("./fileSystem");
let logging = require("./logging");

let pathToMocha = path.resolve(__dirname + "/../../node_modules/mocha/bin/_mocha");
let globalOptions = global.options;

let randomString = function() {
  return Math.random().toString(36).slice(7);
};

let sourceFilePathMatches = function(options, sourceFilePath) {
  let matchesJavascript = !!sourceFilePath.match(/\.js$/);

  let matchesTarget = sourceFilePath.indexOf(globalOptions.targetDirectory) === 0;

  return matchesJavascript && matchesTarget;
};

let runTests = function(options, cb) {
  fs.exists(options.sourcePath, function(exists) {
    if (!exists) {
      logging.taskInfo(options.taskName, "Skipping: Directory `" + options.sourcePath + "` not found.");
      return cb();
    }

    let childProcess = child_process.spawn("iojs", [
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
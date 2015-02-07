var fs = require('fs');
var os = require('os');
var path = require('path');

var child_process = require('child_process');
var fileSystem = require("./fileSystem");
var logging = require("./logging");

var pathToMocha = path.resolve(__dirname + "/../../node_modules/mocha/bin/_mocha");
var globalOptions = global.options;

var randomString = function() {
  return Math.random().toString(36).slice(7);
};

var sourceFilePathMatches = function(options, sourceFilePath) {
  var matchesJavascript = !!sourceFilePath.match(/\.js$/);

  var matchesTarget = sourceFilePath.indexOf(globalOptions.targetDirectory) === 0;

  return matchesJavascript && matchesTarget;
};

var runTests = function(options, cb) {
  fs.exists(options.sourcePath, function(exists) {
    if (!exists) {
      logging.taskInfo(options.taskName, "Skipping: Directory `" + options.sourcePath + "` not found.");
      return cb();
    }

    var childProcess = child_process.spawn("iojs", [
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
  sourceFilePathMatches: sourceFilePathMatches,
  runTests: runTests
};
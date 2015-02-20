"use strict";

var fs = require("fs");
var os = require("os");
var path = require("path");

var child_process = require("child_process");
var fileSystem = require("./fileSystem");
var logging = require("./logging");

var pathToMocha = path.resolve(__dirname + "/../../node_modules/mocha/bin/_mocha");

var randomString = exports.randomString = function () {
  return Math.random().toString(36).slice(7);
};

var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  var matchesJavascript = sourceFilePath && !!sourceFilePath.match(/\.js$/);
  var matchesTarget = sourceFilePath.indexOf(global.options.targetDirectory) === 0;

  console.log(global.options.targetDirectory, sourceFilePath);

  console.log("sourceFilePathMatches", matchesJavascript, matchesTarget);

  return matchesJavascript && matchesTarget;
};

var buildFilePathMatches = exports.buildFilePathMatches = function (options, buildFilePath) {
  var matchesJavascript = buildFilePath && !!buildFilePath.match(/\.js$/);
  var matchesTarget = buildFilePath.indexOf(global.options.targetDirectory) === 0;

  console.log(global.options.targetDirectory, buildFilePath);

  console.log("buildFilePathMatches", matchesJavascript, matchesTarget);

  return matchesJavascript && matchesTarget;
};

var runTests = exports.runTests = function (options, cb) {
  fs.exists(options.sourcePath, function (exists) {
    if (!exists) {
      logging.taskInfo(options.taskName, "Skipping: Directory `" + options.sourcePath + "` not found.");
      return cb();
    }

    var childProcess = child_process.spawn("iojs", [pathToMocha, "--recursive", "--colors", "--reporter", options.reporter, options.sourcePath]);

    childProcess.stdout.on("data", function (chunk) {
      return process.stdout.write(chunk);
    });

    childProcess.stderr.on("data", function (chunk) {
      return process.stderr.write(chunk);
    });

    childProcess.once("close", function () {
      cb();
    });
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
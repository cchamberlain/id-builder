"use strict";

var exists = require("fs").exists;
var resolve = require("path").resolve;
var spawn = require("child_process").spawn;
var taskInfo = require("./logging").taskInfo;


var pathToMocha = resolve(__dirname + "/../../node_modules/mocha/bin/_mocha");

var randomString = exports.randomString = function () {
  return Math.random().toString(36).slice(7);
};

var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  var matchesJavascript = sourceFilePath && !!sourceFilePath.match(/\.js$/);
  var matchesTarget = sourceFilePath.indexOf(global.options.targetDirectory) === 0;

  return matchesJavascript && matchesTarget;
};

var buildFilePathMatches = exports.buildFilePathMatches = function (options, buildFilePath) {
  var matchesJavascript = buildFilePath && !!buildFilePath.match(/\.js$/);
  var matchesTarget = buildFilePath.indexOf(global.options.targetDirectory) === 0;

  return matchesJavascript && matchesTarget;
};

var runTests = exports.runTests = function (options, cb) {
  exists(options.sourcePath, function (exists) {
    if (!exists) {
      taskInfo(options.taskName, "Skipping: Directory `" + options.sourcePath + "` not found.");
      return cb();
    }

    var childProcess = spawn("iojs", [pathToMocha, "--recursive", "--colors", "--reporter", options.reporter, options.sourcePath]);

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
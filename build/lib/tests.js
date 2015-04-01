"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var exists = require("fs").exists;

var resolve = require("path").resolve;

var spawn = require("child_process").spawn;

var log = _interopRequireWildcard(require("./log"));

var pathToMocha = resolve(__dirname + "/../../node_modules/mocha/bin/_mocha");

var randomString = function randomString() {
  return Math.random().toString(36).slice(7);
};

exports.randomString = randomString;
var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var matchesJavascript = sourceFilePath && !!sourceFilePath.match(/\.js$/);
  var matchesWatchPath = sourceFilePath.indexOf(options.watchPath) === 0;
  var result = matchesJavascript && matchesWatchPath;

  log.debug("tests.sourceFilePathMatches =>", result, sourceFilePath);

  return result;
};

exports.sourceFilePathMatches = sourceFilePathMatches;
var buildFilePathMatches = function buildFilePathMatches(options, buildFilePath) {
  var matchesJavascript = buildFilePath && !!buildFilePath.match(/\.js$/);
  var matchesWatchPath = buildFilePath.indexOf(options.watchPath) === 0;
  var result = matchesJavascript && matchesWatchPath;

  log.debug("tests.buildFilePathMatches =>", result, buildFilePath);

  return result;
};

exports.buildFilePathMatches = buildFilePathMatches;
var runTests = function runTests(options, cb) {
  log.debug("tests.runTests", options.sourcePath);

  exists(options.sourcePath, function (exists) {
    if (!exists) {
      log.taskInfo(options.taskName, "Skipping: Directory `" + options.sourcePath + "` not found.");
      return cb();
    }

    var childProcess = spawn("node", [pathToMocha, "--recursive", "--colors", "--reporter", options.reporter, options.sourcePath]);

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
exports.runTests = runTests;
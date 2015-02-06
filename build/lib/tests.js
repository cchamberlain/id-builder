// Generated by LiveScript 1.3.1
var fs, os, path, preludeLs, child_process, fileSystem, logging, each, pathToMocha, globalOptions, randomString, sourceFilePathMatches, runTest, runTests, out$ = typeof exports != 'undefined' && exports || this;
fs = require('fs');
os = require('os');
path = require('path');
preludeLs = require('prelude-ls');
child_process = require('child_process');
fileSystem = require("./fileSystem");
logging = require("./logging");
each = require("prelude-ls").each;
pathToMocha = path.resolve(__dirname + "/../../node_modules/.bin/mocha");
globalOptions = global.options;
out$.randomString = randomString = function(){
  return Math.random().toString(36).slice(7);
};
out$.sourceFilePathMatches = sourceFilePathMatches = curry$(function(options, sourceFilePath){
  var matchesJavascript, matchesTarget;
  matchesJavascript = !!sourceFilePath.match(/\.js$/);
  matchesTarget = 0 === sourceFilePath.indexOf(globalOptions.targetDirectory);
  return matchesJavascript && matchesTarget;
});
out$.runTest = runTest = function(cb){};
out$.runTests = runTests = function(options, cb){
  fs.exists(options.sourcePath, function(exists){
    var childProcess;
    if (!exists) {
      logging.taskInfo(options.taskName, "Skipping: Directory `" + options.sourcePath + "` not found.");
      return cb();
    }
    childProcess = child_process.spawn(pathToMocha, ["--recursive", "--colors", "--reporter", options.reporter, options.sourcePath]);
    childProcess.stdout.on("data", function(chunk){
      return process.stdout.write(chunk);
    });
    childProcess.stderr.on("data", function(chunk){
      return process.stderr.write(chunk);
    });
    childProcess.once("close", function(){
      cb();
    });
  });
};
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}
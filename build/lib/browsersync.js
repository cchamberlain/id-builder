// Generated by LiveScript 1.3.1
var browserSync, async, idDebug, p, debug, error, info, warning, logging, sync, sourceFilePathMatches, reload, runServer, out$ = typeof exports != 'undefined' && exports || this;
browserSync = require('browser-sync');
async = require('async');
idDebug = require('id-debug');
p = require("path");
debug = idDebug.debug, error = idDebug.error, info = idDebug.info, warning = idDebug.warning;
logging = require("./logging");
out$.sync = sync = void 8;
out$.sourceFilePathMatches = sourceFilePathMatches = curry$(function(options, sourceFilePath){
  var resolvedSourceFilePath, resolvedSourcePath;
  resolvedSourceFilePath = p.resolve(sourceFilePath);
  resolvedSourcePath = p.resolve(options.sourcePath);
  return resolvedSourceFilePath.indexOf(resolvedSourcePath) === 0;
});
out$.reload = reload = function(options, path, cb){
  browserSync.reload(path);
  logging.taskInfo(options.taskName, "Reloaded `" + path + "`");
  cb();
};
out$.runServer = runServer = function(options, cb){
  options = {
    port: 9001,
    logLevel: "silent",
    logFileChanges: false
  };
  browserSync(options, function(e, bs){
    if (e) {
      return cb(e);
    }
    sync = bs;
    cb();
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
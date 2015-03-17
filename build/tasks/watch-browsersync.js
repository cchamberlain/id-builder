// Generated by LiveScript 1.3.1
var browserSync, idDebug, debug, info, warning, error, browserify, browsersync, watch, dependencies, handlePath, handleAdd, handleAddDir, handleChange, handleUnlink, handleUnlinkDir, handleError, run, out$ = typeof exports != 'undefined' && exports || this;
browserSync = require('browser-sync');
idDebug = require('id-debug');
debug = idDebug.debug, info = idDebug.info, warning = idDebug.warning, error = idDebug.error;
browserify = require("../lib/browserify");
browsersync = require("../lib/browsersync");
watch = require("../lib/watch");
out$.dependencies = dependencies = ['runBrowsersyncServer', 'runTests', 'watch'];
handlePath = curry$(function(options, path, stat){
  if (path.match(/\.js$/)) {
    if (!browserify.pathReloads(options, path)) {
      return;
    }
  }
  if (!browsersync.sourceFilePathMatches(options, path)) {
    return;
  }
  browsersync.reload(options, path, function(e){
    if (e) {
      error(e);
    }
  });
});
handleAdd = curry$(function(options, path, stat){
  handlePath(options, path, stat);
});
handleAddDir = curry$(function(options, path, stat){});
handleChange = curry$(function(options, path, stat){
  handlePath(options, path, stat);
});
handleUnlink = curry$(function(options, path, stat){});
handleUnlinkDir = curry$(function(options, path, stat){});
handleError = curry$(function(options, e){});
out$.run = run = function(options, cb){
  var watcher;
  watcher = watch.getWatcher();
  watcher.on("ready", function(){
    watcher.on("add", handleAdd(options));
    watcher.on("addDir", handleAddDir(options));
    watcher.on("change", handleChange(options));
    watcher.on("unlink", handleUnlink(options));
    watcher.on("unlinkDir", handleUnlinkDir(options));
    watcher.on("error", handleError(options));
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
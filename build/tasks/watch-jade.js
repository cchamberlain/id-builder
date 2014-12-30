// Generated by LiveScript 1.3.1
var idDebug, jade, watch, dependencies, handlePath, handleAdd, handleAddDir, handleChange, handleUnlink, handleUnlinkDir, handleError, run, out$ = typeof exports != 'undefined' && exports || this;
idDebug = require('id-debug');
jade = require("../lib/jade");
watch = require("../lib/watch");
out$.dependencies = dependencies = ['runTests', 'watch'];
handlePath = curry$(function(options, path, stat){
  var targetPath;
  if (!jade.sourceFilePathMatches(options, path)) {
    return;
  }
  targetPath = path.replace(options.sourcePath, options.targetPath).replace(RegExp('\\.' + jade.sourceExtension + '$'), "." + jade.targetExtension);
  jade.compileFile(options, path, targetPath, function(error){
    if (error) {
      idDebug.error(error);
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
handleError = curry$(function(options, error){});
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
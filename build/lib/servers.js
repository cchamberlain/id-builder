// Generated by LiveScript 1.3.1
var async, foreverMonitor, fs, idDebug, path, preludeLs, logging, p, debug, info, warning, map, monitors, addPath, removePath, restartPath, sourceFilePathMatches, startServer, stopServer, restartServer, runServers, restartServers, out$ = typeof exports != 'undefined' && exports || this;
async = require('async');
foreverMonitor = require('forever-monitor');
fs = require('fs');
idDebug = require('id-debug');
path = require('path');
preludeLs = require('prelude-ls');
logging = require("./logging");
p = path;
debug = idDebug.debug, info = idDebug.info, warning = idDebug.warning;
map = preludeLs.map;
out$.monitors = monitors = {};
out$.addPath = addPath = function(path, cb){
  var monitor;
  monitor = new foreverMonitor.Monitor(path, {
    command: "node"
  });
  monitors[path] = monitor;
  monitor.start();
  cb();
};
out$.removePath = removePath = function(path, cb){
  var monitor;
  monitor = monitors[path];
  monitor.kill(true);
  delete monitors[path];
  cb();
};
out$.restartPath = restartPath = function(path, cb){
  var monitor;
  monitor = monitors[path];
  monitor.restart();
  cb();
};
out$.sourceFilePathMatches = sourceFilePathMatches = function(options, sourceFilePath, cb){
  var result;
  result = p.resolve(sourceFilePath).match(RegExp('^' + p.resolve(options.sourcePath)));
  return result;
};
out$.startServer = startServer = curry$(function(options, filePath, cb){
  var absolutePath;
  absolutePath = path.resolve(filePath);
  fs.exists(absolutePath, function(exists){
    var monitor;
    if (!exists) {
      logging.taskInfo(options.taskName, "skipping `" + absolutePath + "` (Does not exist).");
      return cb();
    }
    monitor = monitors[absolutePath];
    if (monitor) {
      restartPath(absolutePath, cb);
    } else {
      addPath(absolutePath, cb);
    }
  });
});
out$.stopServer = stopServer = curry$(function(options, filePath, cb){
  var absolutePath;
  absolutePath = path.resolve(filePath);
  fs.exists(absolutePath, function(exists){
    var monitor;
    if (!exists) {
      logging.taskInfo(options.taskName, "skipping `" + absolutePath + "` (Does not exist).");
      return cb();
    }
    monitor = monitors[absolutePath];
    if (monitor) {
      removePath(absolutePath, cb);
    } else {
      logging.taskInfo(options.taskName, "skipping `" + absolutePath + "` (Monitor does not exist).");
      cb();
    }
  });
});
out$.restartServer = restartServer = curry$(function(options, filePath, cb){
  var absolutePath;
  absolutePath = path.resolve(filePath);
  fs.exists(absolutePath, function(exists){
    if (!exists) {
      logging.taskInfo(options.taskName, "skipping `" + absolutePath + "` (Does not exist).");
      return cb();
    }
    removePath(absolutePath, function(error){
      if (error) {
        return cb(error);
      }
      addPath(absolutePath, cb);
    });
  });
});
out$.runServers = runServers = function(options, cb){
  var absolutePaths, res$, i$, ref$, len$, path;
  res$ = [];
  for (i$ = 0, len$ = (ref$ = options.paths).length; i$ < len$; ++i$) {
    path = ref$[i$];
    res$.push(p.resolve(options.sourcePath + "/" + path));
  }
  absolutePaths = res$;
  async.each(absolutePaths, startServer(options), cb);
};
out$.restartServers = restartServers = function(options, cb){
  var absolutePaths, res$, i$, ref$, len$, path;
  res$ = [];
  for (i$ = 0, len$ = (ref$ = options.paths).length; i$ < len$; ++i$) {
    path = ref$[i$];
    res$.push(p.resolve(options.sourcePath + "/" + path));
  }
  absolutePaths = res$;
  async.each(absolutePaths, restartServer(options), cb);
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
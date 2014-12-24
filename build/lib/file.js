// Generated by LiveScript 1.3.1
var fs, path, async, lsr, mkdirp, ref$, map, filter, compileFile, compileAllFiles, out$ = typeof exports != 'undefined' && exports || this;
fs = require('fs');
path = require('path');
async = require('async');
lsr = require('lsr');
mkdirp = require('mkdirp');
ref$ = require("prelude-ls"), map = ref$.map, filter = ref$.filter;
out$.compileFile = compileFile = curry$(function(compileChunk, sourcePath, targetPath, cb){
  fs.readFile(sourcePath, function(error, chunk){
    if (error) {
      return cb(error);
    }
    compileChunk(chunk.toString(), function(error, compiledChunk){
      var targetPathDirectory;
      if (error) {
        return cb(error);
      }
      targetPathDirectory = path.dirname(targetPath);
      mkdirp(targetPathDirectory, function(error){
        if (error) {
          return cb(error);
        }
        fs.writeFile(targetPath, compiledChunk, function(error){
          if (error) {
            return cb(error);
          }
          cb(null);
        });
      });
    });
  });
});
out$.compileAllFiles = compileAllFiles = curry$(function(compileFile, sourceExtension, targetExtension, sourcePath, targetPath, cb){
  var this$ = this;
  lsr(sourcePath, function(error, nodes){
    var paths, iteratePath;
    if (error) {
      return cb(error);
    }
    paths = filter(function(it){
      return it.match(RegExp('\\.' + sourceExtension));
    })(
    map(function(it){
      return it.fullPath;
    }, nodes));
    iteratePath = function(currentSourcePath, cb){
      var currentTargetPath;
      currentTargetPath = currentSourcePath.replace(sourcePath, targetPath).replace(sourceExtension, targetExtension);
      compileFile(currentSourcePath, currentTargetPath, cb);
    };
    async.each(paths, iteratePath, function(error){
      if (error) {
        return cb(error);
      }
      cb(null);
    });
  });
});
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
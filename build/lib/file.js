// Generated by LiveScript 1.3.1
var fs, path, mkdirp, ensureFileDirectory, out$ = typeof exports != 'undefined' && exports || this;
fs = require('fs');
path = require('path');
mkdirp = require('mkdirp');
out$.ensureFileDirectory = ensureFileDirectory = curry$(function(options, task, targetFilePath, cb){
  mkdirp(path.dirname(targetFilePath), function(error){
    if (error) {
      return cb(error);
    }
    cb(null);
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
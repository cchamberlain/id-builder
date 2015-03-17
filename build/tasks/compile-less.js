// Generated by LiveScript 1.3.1
var async, idDebug, preludeLs, less, debug, error, info, warning, each, map, dependencies, run, out$ = typeof exports != 'undefined' && exports || this;
async = require('async');
idDebug = require('id-debug');
preludeLs = require('prelude-ls');
less = require("../lib/less");
debug = idDebug.debug, error = idDebug.error, info = idDebug.info, warning = idDebug.warning;
each = preludeLs.each, map = preludeLs.map;
out$.dependencies = dependencies = ["clean"];
out$.run = run = function(options, cb){
  less.compileAllFiles(options, function(error){
    if (error) {
      return cb(error);
    }
    cb();
  });
};
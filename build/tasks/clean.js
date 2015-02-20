"use strict";

var directory = require("../lib/clean").directory;
var dependencies = exports.dependencies = [];

var run = exports.run = function (options, cb) {
  directory(options, cb);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
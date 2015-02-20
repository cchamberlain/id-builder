"use strict";

var watch = require("../lib/browserify").watch;
var dependencies = exports.dependencies = ["runTests"];

var run = exports.run = watch;
Object.defineProperty(exports, "__esModule", {
  value: true
});
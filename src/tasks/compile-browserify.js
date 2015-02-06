var fileSystem = require("../lib/file-system");
var browserify  = require("../lib/browserify");

var dependencies = [
  "clean",
  "compileCoffeescript",
  "compileJade",
  "compileLivescript"
];

var run = browserify.compileAllFiles;

module.exports = {
  dependencies: dependencies,
  run: run
};
var async = require("async");

var coffeescript = require("../lib/coffeescript")

module.exports = {
  dependencies: [ "clean" ],
  run: coffeescript.compileAllFiles
}
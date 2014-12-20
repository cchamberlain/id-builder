fs = require "fs"

{ map } = require "prelude-ls"
rmrf    = require "rimraf"
async   = require "async"

module.exports = (options, cb) !->
  path = options.path

  error, nodes <-! fs.readdir path
  return cb error if error

  paths = map (-> "#{path}/#{it}"), nodes

  error <-! async.each paths, rmrf
  return cb error if error

  cb null

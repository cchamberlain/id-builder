require! <[ fs rimraf async ]>

{ map } = require "prelude-ls"

module.exports = (path, cb) !->
  error, nodes <-! fs.readdir path
  return cb error if error

  paths = map (-> "#{path}/#{it}"), nodes

  error <-! async.each paths, rimraf
  return cb error if error

  cb null

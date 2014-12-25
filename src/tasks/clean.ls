require! <[ fs rimraf async ]>

{ each, map } = require "prelude-ls"

module.exports = (options, task, cb) !->
  error, nodes <-! fs.readdir task.path
  return cb error if error

  paths = map (-> "#{task.path}/#{it}"), nodes

  each (-> console.log "| clean #{it}"), paths

  error <-! async.each paths, rimraf
  return cb error if error

  cb null

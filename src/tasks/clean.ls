require! <[ fs rimraf async ]>

log = require "id-debug"
{
  debug
  info
  warning
} = log

{ each, map } = require "prelude-ls"

module.exports = (options, task, cb) !->
  error, nodes <-! fs.readdir task.path
  return cb error if error

  paths = map (-> "#{task.path}/#{it}"), nodes

  each (-> info "| clean `#{it}`."), paths

  error <-! async.each paths, rimraf
  return cb error if error

  cb null

require! <[ fs mkdirp async lsr ]>

log = require "id-debug"
{
  debug
  info
  warning
} = log

{ map, filter } = require "prelude-ls"

browserify   = require "./browserify"
coffeescript = require "./coffeescript"
file-system  = require "./file-system"
jade         = require "./jade"
less         = require "./less"
livescript   = require "./livescript"
logging      = require "./logging"
stylus       = require "./stylus"

global-options = global.options

# TODO: return true if the path doesnt match any of the compile
# source-file-path-matches.
export source-file-path-matches = (options, source-file-path) -->
  if browserify.source-file-path-matches global-options.tasks.watch-browserify, source-file-path
    false

  else if coffeescript.source-file-path-matches global-options.tasks.watch-coffeescript, source-file-path
    false

  else if jade.source-file-path-matches global-options.tasks.watch-jade, source-file-path
    false

  else if less.source-file-path-matches global-options.tasks.watch-less, source-file-path
    false

  else if livescript.source-file-path-matches global-options.tasks.watch-livescript, source-file-path
    false

  else if stylus.source-file-path-matches global-options.tasks.watch-stylus, source-file-path
    false

  else if not not source-file-path.match //^#{options.source-path}//
    true

  else
    false

export copy-file = (options, source-file-path, target-file-path, cb) !-->
  error, read-chunk <-! fs.read-file source-file-path
  return cb error if error

  error <-! file-system.ensure-file-directory target-file-path
  return cb error if error

  error <-! fs.write-file target-file-path, read-chunk
  return cb error if error

  logging.task-info options.task-name, "`#{source-file-path}` => `#{target-file-path}`"

  cb null

export copy-all-files = (options, cb) !-->
  error, nodes <~! lsr options.source-path
  return cb error if error

  paths = filter (-> not it.is-directory!), nodes
    |> map (.full-path)
    |> filter source-file-path-matches options

  iterate-path = (current-source-directory-path, cb) !->
    current-target-directory-path = current-source-directory-path
      .replace options.source-path, options.target-path

    copy-file options, current-source-directory-path, current-target-directory-path, cb

  error <-! async.each paths, iterate-path
  return cb error if error
  cb null

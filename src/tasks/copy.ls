require! <[ fs mkdirp async lsr ]>

log = require "id-debug"
{
  debug
  info
  warning
} = log

{ map, filter } = require "prelude-ls"

compile-browserify   = require "./compile-browserify"
compile-coffeescript = require "./compile-coffeescript"
compile-jade         = require "./compile-jade"
compile-less         = require "./compile-less"
compile-livescript   = require "./compile-livescript"
compile-stylus       = require "./compile-stylus"

file = require "../lib/file"

# TODO: return true if the path doesnt match any of the compile
# source-file-path-matches.
export source-file-path-matches = (options, task, source-file-path) -->
  if compile-browserify.source-file-path-matches options, task, source-file-path
    false

  else if compile-coffeescript.source-file-path-matches options, task, source-file-path
    false

  else if compile-jade.source-file-path-matches options, task, source-file-path
    false

  else if compile-less.source-file-path-matches options, task, source-file-path
    false

  else if compile-livescript.source-file-path-matches options, task, source-file-path
    false

  else if compile-stylus.source-file-path-matches options, task, source-file-path
    false

  else if not not source-file-path.match //^#{task.source-path}//
    true

  else
    false

export copy-file = (options, task, source-file-path, target-file-path, cb) !-->
  error, read-chunk <-! fs.read-file source-file-path
  return cb error if error

  error <-! file.ensure-file-directory options, task, target-file-path
  return cb error if error

  error <-! fs.write-file target-file-path, read-chunk
  return cb error if error

  info "| copy:copy-file `#{target-file-path}`."

  cb null

export copy-all-files = (options, task, cb) !-->
  error, nodes <~! lsr task.source-path
  return cb error if error

  paths = filter (-> not it.is-directory!), nodes
    |> map (.full-path)
    |> filter source-file-path-matches options, task

  iterate-path = (current-source-directory-path, cb) !->
    current-target-directory-path = current-source-directory-path
      .replace task.source-path, task.target-path

    copy-file options, task, current-source-directory-path, current-target-directory-path, cb

  error <-! async.each paths, iterate-path
  return cb error if error
  cb null

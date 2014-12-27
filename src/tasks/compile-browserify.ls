require! <[ fs browserify lsr async ]>

log = require "id-debug"
{
  debug
  info
  warning
} = log

{ map, filter } = require "prelude-ls"

file = require "../lib/file"

export source-extension = "js"
export target-extension = "js"

export source-file-path-matches = (options, task, source-file-path) -->
  source-file-path is options.tasks.compile-browserify.source-path

export compile-file = (options, task, cb) !->
  exists <-! fs.exists task.source-path

  unless exists
    info "| compile-browserify:skipping `#{task.source-path}`."
    return cb!

  error <-! file.ensure-file-directory options, task, task.target-path
  return cb error if error

  bundle = browserify!

  bundle.add task.source-path

  bundle.transform "react-jade"

  bundle.on "bundle", (bundle-stream) ->
    write-stream = fs.create-write-stream task.target-path

    write-stream.on "error", (error) !->
      cb error

    write-stream.on "finish", !->
      info "| compile-browserify:compile-file `#{task.source-path}` > `#{task.target-path}`."
      cb!

    bundle-stream
      .pipe write-stream

  bundle.bundle!

export compile-all-files = (options, task, cb) !->
  compile-file options, task, cb

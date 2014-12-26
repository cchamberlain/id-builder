require! <[ fs browserify lsr async ]>

{ map, filter } = require "prelude-ls"

file = require "../lib/file"

export source-extension = "js"
export target-extension = "js"

export source-file-path-matches = (options, task, source-file-path) -->
  source-file-path is task.sourcePath

export compile-file = (options, task, cb) !->
  exists <-! fs.exists task.source-path

  unless exists
    console.log "| compile-browserify:skipping"
    return cb!

  error <-! file.ensure-file-directory options, task, task.target-path
  return cb error if error

  bundle = browserify!

  bundle.add task.source-path

  bundle.on "bundle", (bundle-stream) ->
    write-stream = fs.create-write-stream task.target-path

    write-stream.on "error", (error) !->
      console.log "error", error

    write-stream.on "finish", !->
      console.log "| compile-browserify:compile-file `#{task.source-path}` > `#{task.target-path}`."
      cb!

    bundle-stream
      .pipe write-stream

  bundle.bundle!

export compile-all-files = (options, task, cb) !->
  compile-file options, task, cb

require! <[
  async
  browserify
  fs
  id-debug
  path
]>

{
  debug
  error
  info
  warning
} = id-debug

file-system = require "./file-system"
logging     = require "./logging"

export source-extension = "coffee"
export target-extension = "js"

export source-file-path-matches = (options, source-file-path) -->
  options.source-path is source-file-path

export compile-all-files = (options, cb) !->
  exists <-! fs.exists options.source-path

  unless exists
    logging.task-info options.task-name, "skipping `#{options.source-path}` (Does not exist)"
    return cb!

  error <-! file-system.ensure-file-directory options.target-path
  return cb error if error

  bundle = browserify!

  bundle.add path.resolve options.source-path

  bundle.on "bundle", (bundle-stream) ->
    write-stream = fs.create-write-stream options.target-path

    write-stream.on "error", (error) !->
      cb error

    write-stream.on "finish", !->
      logging.task-info options.task-name, "`#{options.source-path}` => `#{options.target-path}`"
      cb!

    bundle-stream
      .pipe write-stream

  bundle.bundle!

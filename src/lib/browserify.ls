require! <[
  async
  browserify
  fs
  id-debug
  path
  watchify
]>

p = path

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

global-options = global.options

# Returns true if the path is the target path.
export path-reloads = (options, path) -->
  path is global-options.tasks.watch-browserify.target-path

# TODO: Find a better way to match paths then just on all writes.. e.g. to
# discern wether a file is in a bundle so a recompile is needed.
export source-file-path-matches = (options, source-file-path) -->
  return if (p.resolve source-file-path) is (p.resolve options.target-path)

  resolved-source-file-path      = p.resolve source-file-path
  resolved-source-directory-path = p.resolve options.source-directory

  (resolved-source-file-path.index-of resolved-source-directory-path) is 0

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

export watch = (options, cb) !->
  cb!

  b = browserify do
    cache:         {}
    package-cache: {}
    full-paths:    true

  w = watchify b

  b.add path.resolve options.source-path

  b.on "bundle", (bundle-stream) ->
    data = ""

    bundle-stream.on "data", (d) !->
      data := "#{data}#{d.to-string!}"

    bundle-stream.on "end", !->
      debug "bundle end", data.length
      e <-! fs.write-file options.target-path, data
      return error e if e

      logging.task-info options.task-name, "`#{options.source-path}` => `#{options.target-path}`"

  w.on "update", !->
    b.bundle!

  b.bundle!

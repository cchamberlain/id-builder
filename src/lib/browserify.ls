require! <[
  async
  browserify
  fs
  path
  watchify
]>

path = path

file-system = require "./fileSystem"
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
  resolved-source-directory-path = path.resolve options.source-directory
  resolved-source-file-path      = path.resolve source-file-path
  resolved-target-path           = path.resolve options.target-path

  if resolved-source-file-path is resolved-target-path
    false

  else if 0 is resolved-source-file-path.index-of resolved-source-directory-path
    true

  else
    false

export compile-all-files = (options, cb) !->
  exists <-! fs.exists options.source-path

  unless exists
    logging.task-info options.task-name, "skipping `#{options.source-path}` (Does not exist)"
    return cb!

  error <-! file-system.ensure-file-directory options.target-path
  return cb error if error

  b = browserify do
    cache:         {}
    debug:         true
    full-paths:    true
    package-cache: {}

  b.transform "reactify"

  b.add path.resolve options.source-path

  b.on "bundle", (bundle-stream) ->
    write-stream = fs.create-write-stream options.target-path

    write-stream.on "error", (error) !->
      cb error

    write-stream.on "finish", !->
      logging.task-info options.task-name, "`#{options.source-path}` => `#{options.target-path}`"
      cb!

    bundle-stream
      .pipe write-stream

  b.bundle!

export watch = (options, cb) !->
  cb!

  b = browserify do
    cache:         {}
    debug:         true
    full-paths:    true
    package-cache: {}

  b.transform "reactify"

  b.add path.resolve options.source-path

  b.on "bundle", (bundle-stream) ->
    data = ""

    bundle-stream.on "data", (d) !->
      data := "#{data}#{d.to-string!}"

    bundle-stream.on "end", !->
      e <-! fs.write-file options.target-path, data
      return error e if e

      logging.task-info options.task-name, "`#{options.source-path}` => `#{options.target-path}`"

  w = watchify b

  w.on "update", !->
    b.bundle!

  b.bundle!

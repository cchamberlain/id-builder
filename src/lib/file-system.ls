require! <[
  async
  fs
  id-debug
  lsr
  mkdirp
  path
  prelude-ls
]>

logging = require "./logging"

{
  map
  reject
  filter
} = prelude-ls

{
  debug
  info
  warning
  error
} = id-debug

export get-files = (path, cb) !->
  error, nodes <-! lsr path
  return cb error if error

  paths = nodes
    |> filter (.is-file!)
    |> map (.full-path)

  cb null, paths

export get-directories = (path, cb) !->
  error, nodes <-! lsr path
  return cb error if error

  cb null, nodes
    |> filter (.is-directory!)
    |> map (.full-path)

export get-target-path = (source-directory, target-directory, source-extension, target-extension, source-path) -->
  source-path
    .replace source-directory, target-directory
    .replace //\.#{source-extension}$//, ".#{target-extension}"

export read-file = (path, cb) !->
  error, chunk <-! fs.read-file path
  return cb error if error

  cb null, chunk.to-string!

export write-file = (path, string, cb) !->
  fs.write-file path, string, cb

export ensure-file-directory = (target-file-path, cb) !-->
  mkdirp (path.dirname target-file-path), cb

export compile-file = (compile-chunk, options, source-file-path, target-file-path, cb) !-->
  error, file-content <-! read-file source-file-path
  return cb error if error

  error, compiled-chunk <-! compile-chunk options, file-content
  return cb error if error

  error <-! ensure-file-directory target-file-path
  return cb error if error

  error <-! write-file target-file-path, compiled-chunk
  return cb error if error

  logging.task-info options.task-name, "`#{source-file-path}` => `#{target-file-path}`"

  cb null

export compile-all-files = (source-file-path-matches, compile-file, source-extension, target-extension, options, cb) !-->
  error, source-file-paths <~! get-files options.source-path
  return cb! if error

  paths = filter (source-file-path-matches options), source-file-paths

  iterate-path = (current-source-file-path, cb) !->
    current-target-file-path = get-target-path options.source-path, options.target-path, source-extension, target-extension, current-source-file-path

    compile-file options, current-source-file-path, current-target-file-path, cb

  async.each paths, iterate-path, cb

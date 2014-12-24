fs   = require "fs"
path = require "path"

LiveScript = require "LiveScript"
mkdirp     = require "mkdirp"
async      = require "async"
lsr        = require "lsr"

{
  map
  filter
} = require "prelude-ls"

export compile-chunk = (chunk, cb) !->
  try
    cb null, LiveScript.compile chunk,
      bare: true

  catch error
    return cb error

export compile-file = (source-path, target-path, cb) !->
  error, chunk <-! fs.read-file source-path
  return cb error if error

  error, compiled-chunk <-! compile-chunk chunk.to-string!
  return cb error if error

  target-path-directory = path.dirname target-path
  error <-! mkdirp target-path-directory
  return cb error if error

  error <-! fs.write-file target-path, compiled-chunk
  return cb error if error

  cb null

export compile-all-files = (source-path, target-path, cb) !->
  error, nodes <~! lsr source-path
  return cb error if error

  paths = map (.full-path), nodes
    |> filter (.match /\.ls$/)

  iterate-path = (current-source-path, cb) !->
    current-target-path = current-source-path
      .replace source-path, target-path
      .replace ".ls", ".js"

    compile-file current-source-path, current-target-path, cb

  error <-! async.each paths, iterate-path
  return cb error if error

  cb null

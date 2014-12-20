fs   = require "fs"
path = require "path"

coffeescript = require "coffee-script"
mkdirp       = require "mkdirp"
async        = require "async"
lsr          = require "lsr"

{
  map
  filter
} = require "prelude-ls"

compile-chunk = (chunk, cb) !->
  try
    cb null, coffeescript.compile chunk
  catch error
    return cb error

compile-file = (source-path, target-path, cb) !->
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

module.exports = (options, cb) !->
  source-path = options.source-path
  target-path = options.target-path

  error, nodes <~! lsr source-path
  return cb error if error

  paths = map (.full-path), nodes
    |> filter (.match /\.coffee/)

  iterate-path = (current-source-path, cb) !->
    current-target-path = current-source-path
      .replace source-path, target-path
      .replace ".coffee", ".js"

    compile-file current-source-path, current-target-path, cb

  error <-! async.each paths, iterate-path
  return cb error if error

  cb null

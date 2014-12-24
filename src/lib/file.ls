require! <[ fs path async lsr mkdirp ]>

{ map, filter } = require "prelude-ls"

export compile-file = (compile-chunk, source-path, target-path, cb) !-->
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

export compile-all-files = (compile-file, source-extension, target-extension, source-path, target-path, cb) !-->
  error, nodes <~! lsr source-path
  return cb error if error

  paths = map (.full-path), nodes
    |> filter (.match //\.#{source-extension}//)

  iterate-path = (current-source-path, cb) !->
    current-target-path = current-source-path
      .replace source-path, target-path
      .replace source-extension, target-extension

    compile-file current-source-path, current-target-path, cb

  error <-! async.each paths, iterate-path
  return cb error if error

  cb null

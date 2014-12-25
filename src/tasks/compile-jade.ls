require! <[ fs jade lsr async ]>

{ map, filter } = require "prelude-ls"

file = require "../lib/file"

export source-extension = "jade"
export target-extension = "js"

export source-file-path-matches = (source-file-path) ->
  source-file-path.match //\.#{source-extension}$//

export compile-chunk = (options, task, chunk, source-file-path, cb) !->
  try
    cb null, jade.compile-client chunk,
      compile-debug: false
      filename:      source-file-path

  catch error
    return cb error

export compile-file = (options, task, source-file-path, target-file-path, cb) !-->
  error, chunk <-! fs.read-file source-file-path
  return cb error if error

  error, compiled-chunk <-! compile-chunk options, task, chunk.to-string!, source-file-path
  return cb error if error

  error <-! file.ensure-file-directory options, task, target-file-path
  return cb error if error

  error <-! fs.write-file target-file-path, compiled-chunk
  return cb error if error

  console.log "| jade:compile-file `#{source-file-path}` > `#{target-file-path}`."

  cb null

export compile-all-files = (options, task, cb) !-->
  error, nodes <~! lsr task.source-path
  return cb! if error

  paths = filter (-> not it.is-directory!), nodes
    |> map (.full-path)
    |> filter source-file-path-matches

  iterate-path = (current-source-file-path, cb) !->
    current-target-file-path = current-source-file-path
      .replace task.source-path, task.target-path
      .replace //\.#{source-extension}$//, ".#{target-extension}"

    compile-file options, task, current-source-file-path, current-target-file-path, cb

  error <-! async.each paths, iterate-path
  return cb error if error
  cb null

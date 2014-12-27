require! <[ fs stylus lsr async ]>

log = require "id-debug"
{
  debug
  info
  warning
} = log

{ map, filter } = require "prelude-ls"

file = require "../lib/file"

export source-extension = "styl"
export target-extension = "css"

export source-file-path-matches = (options, task, source-file-path) -->
  source-file-path.match //^#{options.tasks.compile-stylus.source-path}.+\.#{source-extension}$//

export compile-chunk = (options, task, chunk, cb) !->
  stylus.render chunk, cb

export compile-file = (options, task, source-file-path, target-file-path, cb) !-->
  error, chunk <-! fs.read-file source-file-path
  return cb error if error

  error, compiled-chunk <-! compile-chunk options, task, chunk.to-string!
  return cb error if error

  error <-! file.ensure-file-directory options, task, target-file-path
  return cb error if error

  error <-! fs.write-file target-file-path, compiled-chunk
  return cb error if error

  info "| compile-stylus:compile-file `#{source-file-path}` > `#{target-file-path}`."

  cb null

export compile-all-files = (options, task, cb) !-->
  error, nodes <~! lsr task.source-path
  return cb! if error

  paths = filter (-> not it.is-directory!), nodes
    |> map (.full-path)
    |> filter source-file-path-matches options, task

  iterate-path = (current-source-file-path, cb) !->
    current-target-file-path = current-source-file-path
      .replace task.source-path, task.target-path
      .replace //\.#{source-extension}$//, ".#{target-extension}"

    compile-file options, task, current-source-file-path, current-target-file-path, cb

  error <-! async.each paths, iterate-path
  return cb error if error
  cb null

require! <[ fs mkdirp async lsr ]>

{ map, filter } = require "prelude-ls"

file = require "../lib/file"

# TODO: return true if the path doesnt match any of the compile
# source-file-path-matches.
export source-file-path-matches = (source-file-path) ->
  false

export copy-file = (options, task, source-file-path, target-file-path, cb) !-->
  error, read-chunk <-! fs.read-file source-file-path
  return cb error if error

  error <-! file.ensure-file-directory options, task, target-file-path
  return cb error if error

  error <-! fs.write-file target-file-path, read-chunk
  return cb error if error

  console.log "| copy:copy-file `#{target-file-path}`."

  cb null

export copy-all-files = (options, task, cb) !-->
  error, nodes <~! lsr task.source-path
  return cb error if error

  # TODO: filter not by regexp but use source-file-path-matches

  paths = filter (-> not it.is-directory!), nodes
    |> map (.full-path)
    |> filter (-> not it.match /\.(styl|less|ls|coffee|jade)$/)

  iterate-path = (current-source-directory-path, cb) !->
    current-target-directory-path = current-source-directory-path
      .replace task.source-path, task.target-path

    copy-file options, task, current-source-directory-path, current-target-directory-path, cb

  error <-! async.each paths, iterate-path
  return cb error if error
  cb null

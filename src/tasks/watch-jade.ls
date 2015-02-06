jade  = require "../lib/jade"
watch = require "../lib/watch"

export dependencies = <[
  runTests
  watch
]>

handle-path = (options, path, stat) !-->
  return unless jade.source-file-path-matches options, path

  target-path = path
    .replace options.source-path, options.target-path
    .replace //\.#{jade.source-extension}$//, ".#{jade.target-extension}"

  error <-! jade.compile-file options, path, target-path
  console.error error if error

handle-add = (options, path, stat) !-->
  handle-path options, path, stat

handle-add-dir = (options, path, stat) !-->

handle-change = (options, path, stat) !-->
  handle-path options, path, stat

handle-unlink = (options, path, stat) !-->

handle-unlink-dir = (options, path, stat) !-->

handle-error = (options, error) !-->

export run = (options, cb) !->
  watcher = watch.get-watcher!

  <-! watcher.on "ready"

  watcher.on "add",       handle-add        options
  watcher.on "addDir",    handle-add-dir    options
  watcher.on "change",    handle-change     options
  watcher.on "unlink",    handle-unlink     options
  watcher.on "unlinkDir", handle-unlink-dir options
  watcher.on "error",     handle-error      options

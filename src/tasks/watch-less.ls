require! <[
  id-debug
]>

watch = require "../lib/watch"
less  = require "../lib/less"

export dependencies = <[
  runTests
  watch
]>

handle-path = (options, path, stat) !-->
  return unless less.source-file-path-matches options, path

  target-path = path
    .replace options.source-path, options.target-path
    .replace //\.#{less.source-extension}$//, ".#{less.target-extension}"

  error <-! less.compile-file options, path, target-path
  id-debug.error error if error

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

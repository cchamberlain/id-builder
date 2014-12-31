require! <[
  browser-sync
  id-debug
]>

{
  debug
  info
  warning
  error
} = id-debug

browserify  = require "../lib/browserify"
browsersync = require "../lib/browsersync"
watch       = require "../lib/watch"

export dependencies = <[
  runBrowsersyncServer
  runTests
  watch
]>

handle-path = (options, path, stat) !-->
  if path.match /\.js$/
    return unless browserify.path-reloads options, path

  return unless browsersync.source-file-path-matches options, path

  e <-! browsersync.reload options, path
  error e if e

handle-add = (options, path, stat) !-->
  handle-path options, path, stat

handle-add-dir = (options, path, stat) !-->

handle-change = (options, path, stat) !-->
  handle-path options, path, stat

handle-unlink = (options, path, stat) !-->

handle-unlink-dir = (options, path, stat) !-->

handle-error = (options, e) !-->

export run = (options, cb) !->
  watcher = watch.get-watcher!

  <-! watcher.on "ready"

  watcher.on "add",       handle-add        options
  watcher.on "addDir",    handle-add-dir    options
  watcher.on "change",    handle-change     options
  watcher.on "unlink",    handle-unlink     options
  watcher.on "unlinkDir", handle-unlink-dir options
  watcher.on "error",     handle-error      options

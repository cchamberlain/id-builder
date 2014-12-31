require! <[
  async
  chokidar
  fs
  id-debug
  path
  prelude-ls
]>

{
  debug
  info
  warning
} = id-debug

{
  each
  filter
  map
} = prelude-ls

watcher = void

export get-watcher = ->
  watcher

export start = (options) ->
  return unless options.paths.length

  return watcher if watcher

  watcher := chokidar.watch options.paths[0],
    ignored: /[\/\/]\./
    persistent: true
    ignore-initial: true

  for i in [ 1 ... options.paths.length ]
    watcher.add options.paths[i]

  #watcher.on "change", (x) ->
  #  console.log "general change!", x

  watcher

#watcher.on "ready", ->
#  watcher.on "add",       handle-add        options
#  watcher.on "addDir",    handle-add-dir    options
#  watcher.on "change",    handle-change     options
#  watcher.on "unlink",    handle-unlink     options
#  watcher.on "unlinkDir", handle-unlink-dir options
#  watcher.on "error",     handle-error      options

#update-file = (options, task, path, stat) !-->
#  else if compile-less.source-file-path-matches options, options.tasks.compile-less, path
#    target-path = path
#      .replace options.tasks.compile-less.source-path, options.tasks.compile-less.target-path
#      .replace //\.#{compile-less.source-extension}$//, ".#{compile-less.target-extension}"
#
#    error <-! compile-less.compile-file options, task, path, target-path
#    id-debug.error error if error
#
#  else if compile-livescript.source-file-path-matches options, options.tasks.compile-livescript, path
#    target-path = path
#      .replace options.tasks.compile-livescript.source-path, options.tasks.compile-livescript.target-path
#      .replace //\.#{compile-livescript.source-extension}$//, ".#{compile-livescript.target-extension}"
#
#    error <-! compile-livescript.compile-file options, task, path, target-path
#    id-debug.error error if error
#
#  else if compile-stylus.source-file-path-matches options, options.tasks.compile-stylus, path
#    target-path = path
#      .replace options.tasks.compile-stylus.source-path, options.tasks.compile-stylus.target-path
#      .replace //\.#{compile-stylus.source-extension}$//, ".#{compile-stylus.target-extension}"
#
#    error <-! compile-stylus.compile-file options, task, path, target-path
#    id-debug.error error if error
#
#  else if copy.source-file-path-matches options, options.tasks.copy, path
#    target-path = path.replace options.tasks.copy.source-path, options.tasks.copy.target-path
#    error <-! copy.copy-file options, task, path, target-path
#    id-debug.error error if error
#
#  else if documentation.source-file-path-matches options, options.tasks.documentation, path
#    error <-! documentation.compile-file options, task
#    id-debug.error error if error
#
#  else if run-servers.source-file-path-matches options, options.tasks.run-servers, path
#    error <-! run-servers.restart-servers options, task
#    id-debug.error error if error
#
#  else if run-tests.source-file-path-matches options, options.tasks.run-tests, path
#    error <-! run-tests.compile-file options, task
#    id-debug.error error if error


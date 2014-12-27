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

p = path

compile-browserify   = require "./compile-browserify"
compile-coffeescript = require "./compile-coffeescript"
compile-jade         = require "./compile-jade"
compile-less         = require "./compile-less"
compile-livescript   = require "./compile-livescript"
compile-stylus       = require "./compile-stylus"
copy                 = require "./copy"
documentation        = require "./documentation"
run-servers          = require "./run-servers"
run-tests            = require "./run-tests"

update-file = (options, task, path, stat) !-->
  debug "update-file", path

  if compile-browserify.source-file-path-matches options, options.tasks.compile-browserify, path
    error <-! compile-browserify.compile-file options, task
    id-debug.error error if error

  else if compile-coffeescript.source-file-path-matches options, options.tasks.compile-coffeescript, path
    target-path = path
      .replace options.tasks.compile-coffeescript.source-path, options.tasks.compile-coffeescript.target-path
      .replace //\.#{compile-coffeescript.source-extension}$//, ".#{compile-coffeescript.target-extension}"

    error <-! compile-browserify.compile-file options, task, path, target-path
    id-debug.error error if error

  else if compile-jade.source-file-path-matches options, options.tasks.compile-jade, path
    target-path = path
      .replace options.tasks.compile-jade.source-path, options.tasks.compile-jade.target-path
      .replace //\.#{compile-jade.source-extension}$//, ".#{compile-jade.target-extension}"

    error <-! compile-jade.compile-file options, task, path, target-path
    id-debug.error error if error

  else if compile-less.source-file-path-matches options, options.tasks.compile-less, path
    target-path = path
      .replace options.tasks.compile-less.source-path, options.tasks.compile-less.target-path
      .replace //\.#{compile-less.source-extension}$//, ".#{compile-less.target-extension}"

    error <-! compile-less.compile-file options, task, path, target-path
    id-debug.error error if error

  else if compile-livescript.source-file-path-matches options, options.tasks.compile-livescript, path
    target-path = path
      .replace options.tasks.compile-livescript.source-path, options.tasks.compile-livescript.target-path
      .replace //\.#{compile-livescript.source-extension}$//, ".#{compile-livescript.target-extension}"

    error <-! compile-livescript.compile-file options, task, path, target-path
    id-debug.error error if error

  else if compile-stylus.source-file-path-matches options, options.tasks.compile-stylus, path
    target-path = path
      .replace options.tasks.compile-stylus.source-path, options.tasks.compile-stylus.target-path
      .replace //\.#{compile-stylus.source-extension}$//, ".#{compile-stylus.target-extension}"

    error <-! compile-stylus.compile-file options, task, path, target-path
    id-debug.error error if error

  else if copy.source-file-path-matches options, options.tasks.copy, path
    target-path = path.replace options.tasks.copy.source-path, options.tasks.copy.target-path
    error <-! copy.copy-file options, task, path, target-path
    id-debug.error error if error

  else if documentation.source-file-path-matches options, options.tasks.documentation, path
    error <-! documentation.compile-file options, task
    id-debug.error error if error

  else if run-servers.source-file-path-matches options, options.tasks.run-servers, path
    debug "called run-servers.source-file-path-matches"

    debug "calling run-servers.restart-servers"

    error <-! run-servers.restart-servers options, task
    id-debug.error error if error

  else if run-tests.source-file-path-matches options, options.tasks.run-tests, path
    error <-! run-tests.compile-file options, task
    id-debug.error error if error

handle-add = (options, task, path, stat) !-->
  update-file options, task, (p.resolve path), stat

handle-add-dir = (options, task, path, stat) !-->
  debug "handle-add-dir", arguments

handle-change = (options, task, path, stat) !-->
  debug "handle-change", path

  update-file options, task, (p.resolve path), stat

handle-unlink = (options, task, path, stat) !-->
  debug "handle-unlink", arguments

handle-unlink-dir = (options, task, path, stat) !-->
  debug "handle-unlink-dir", arguments

handle-error = (options, task, error) !-->
  console.error error

module.exports = (options, task) !->
  return unless task.paths.length

  watcher = chokidar.watch task.paths[0],
    ignored: /[\/\/]\./
    persistent: true

  watcher.on "ready", ->
    watcher.on "add",       handle-add        options, task
    watcher.on "addDir",    handle-add-dir    options, task
    watcher.on "change",    handle-change     options, task
    watcher.on "unlink",    handle-unlink     options, task
    watcher.on "unlinkDir", handle-unlink-dir options, task
    watcher.on "error",     handle-error      options, task

  for i in [ 1 ... task.paths.length ]
    watcher.add task.paths[i]

require! <[
  async
  forever-monitor
  fs
  path
  prelude-ls
]>

logging = require "./logging"

p = path

{ map } = prelude-ls

export monitors = {}

export add-path = (path, cb) !->
  monitor = new forever-monitor.Monitor path,
    command: "node"

  monitors[path] = monitor

  monitor.start!

  cb!

export remove-path = (path, cb) !->
  monitor = monitors[path]

  monitor.kill true

  delete monitors[path]

  cb!

export restart-path = (path, cb) !->
  monitor = monitors[path]

  monitor.restart!

  cb!

export source-file-path-matches = (options, source-file-path, cb) ->
  result = p.resolve source-file-path .match //^#{p.resolve options.source-path}//

  result

export start-server = (options, file-path, cb) !-->
  absolute-path = path.resolve file-path

  exists <-! fs.exists absolute-path

  unless exists
    logging.task-info options.task-name, "skipping `#{absolute-path}` (Does not exist)."
    return cb!

  monitor = monitors[absolute-path]

  if monitor
    restart-path absolute-path, cb

  else
    add-path absolute-path, cb

export stop-server = (options, file-path, cb) !-->
  absolute-path = path.resolve file-path

  exists <-! fs.exists absolute-path

  unless exists
    logging.task-info options.task-name, "skipping `#{absolute-path}` (Does not exist)."
    return cb!

  monitor = monitors[absolute-path]

  if monitor
    remove-path absolute-path, cb

  else
    logging.task-info options.task-name, "skipping `#{absolute-path}` (Monitor does not exist)."
    cb!

export restart-server = (options, file-path, cb) !-->
  absolute-path = path.resolve file-path

  exists <-! fs.exists absolute-path

  unless exists
    logging.task-info options.task-name, "skipping `#{absolute-path}` (Does not exist)."
    return cb!

  error <-! remove-path absolute-path
  return cb error if error

  add-path absolute-path, cb

export run-servers = (options, cb) !->
  absolute-paths = [ p.resolve "#{options.source-path}/#{path}" for path in options.paths ]
  async.each absolute-paths, (start-server options), cb

export restart-servers = (options, cb) !->
  absolute-paths = [ p.resolve "#{options.source-path}/#{path}" for path in options.paths ]

  async.each absolute-paths, (restart-server options), cb

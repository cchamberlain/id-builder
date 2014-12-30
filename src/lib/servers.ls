require! <[
  async
  forever-monitor
  fs
  id-debug
  path
  prelude-ls
]>

p = path

{
  debug
  info
  warning
} = id-debug

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

export source-file-path-matches = (options, task, source-file-path, cb) ->
  source-path = p.resolve options.tasks.run-servers.source-path

  source-file-path.match //^#{source-path}//

export start-server = (options, task, file-path, cb) !-->
  absolute-path = path.resolve file-path

  exists <-! fs.exists absolute-path

  unless exists
    info "| run-servers:start-server:skipping `#{absolute-path}` (Does not exist)."
    return cb!

  monitor = monitors[absolute-path]

  if monitor
    restart-path absolute-path, cb

  else
    add-path absolute-path, cb

export stop-server = (options, task, file-path, cb) !-->
  absolute-path = path.resolve file-path

  exists <-! fs.exists absolute-path

  unless exists
    info "| run-servers:stop-server:skipping `#{absolute-path}` (Does not exist)."
    return cb!

  monitor = monitors[absolute-path]

  if monitor
    remove-path absolute-path, cb

  else
    info "| run-servers:stop-server:skipping `#{absolute-path}` (Monitor does not exist)."
    cb!

export restart-server = (options, task, file-path, cb) !-->
  absolute-path = path.resolve file-path

  exists <-! fs.exists absolute-path

  unless exists
    info "| run-servers:restart-server:skipping `#{absolute-path}` (Does not exist)."
    return cb!

  error <-! remove-path absolute-path
  return cb error if error

  add-path absolute-path, cb

export run-servers = (options, task, cb) !->
  absolute-paths = [ p.resolve "#{options.tasks.run-servers.source-path}/#{path}" for path in options.tasks.run-servers.paths ]
  async.each absolute-paths, (start-server options, task), cb

export restart-servers = (options, task, cb) !->
  absolute-paths = [ p.resolve "#{options.tasks.run-servers.source-path}/#{path}" for path in options.tasks.run-servers.paths ]
  async.map absolute-paths, (restart-server options, task), cb

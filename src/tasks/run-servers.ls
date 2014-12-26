require! <[ fs path async forever-monitor ]>

module.exports = (options, task, cb) !->
  start-monitor = (file-path, cb) ->
    absolute-path = path.resolve file-path

    exists <-! fs.exists absolute-path

    unless exists
      console.log "| run-servers:skipping `#{absolute-path}`."
      return cb!

    monitor = new forever-monitor.Monitor absolute-path,
      command: "node"

    monitor.on "exit", ->
      console.log "exited"

    monitor.start!

    cb!

  async.map task.paths, start-monitor, cb

require! <[
  browser-sync
  async
]>
p = require "path"

logging = require "./logging"

export sync = void

export source-file-path-matches = (options, source-file-path) -->
  resolved-source-file-path = p.resolve source-file-path
  resolved-source-path      = p.resolve options.source-path

  (resolved-source-file-path.index-of resolved-source-path) is 0

export reload = (options, path, cb) !->
  browser-sync.reload path

  logging.task-info options.task-name, "Reloaded `#{path}`"

  cb!

export run-server = (options, cb) !->
  options =
    #files: []
    #minify: false
    #open: true
    #host: 'localhost'
    port: 9001
    log-level: "silent"
    log-file-changes: false

  e, bs <-! browser-sync options
  return cb e if e

  sync := bs

  cb!

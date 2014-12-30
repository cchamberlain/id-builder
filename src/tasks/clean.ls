clean = require "../lib/clean"

export dependencies = []

export run = (options, cb) !->
  clean.directory options, cb

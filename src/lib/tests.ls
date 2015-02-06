require! <[
  fs
  os
  path
  prelude-ls
  child_process
]>

file-system = require "./file-system"
logging     = require "./logging"

{
  each
} = require "prelude-ls"

path-to-mocha = path.resolve "#{__dirname}/../../node_modules/.bin/mocha"

global-options = global.options

export random-string = ->
  Math.random!.toString 36 .slice 7

export source-file-path-matches = (options, source-file-path) -->
  # TODO: Find a more generic place for these assertions as functions.
  matches-javascript = not not source-file-path.match /\.js$/
  matches-target     = 0 is source-file-path.index-of global-options.target-directory

  matches-javascript and matches-target

export run-test = (cb) !->

export run-tests = (options, cb) !->
  exists <-! fs.exists options.source-path
  unless exists
    logging.task-info options.task-name, "Skipping: Directory `#{options.source-path}` not found."
    return cb()

  child-process = child_process.spawn path-to-mocha, [
    "--recursive"
    "--compilers"
    "coffee:coffee-script/register"
    "--colors"
    "--reporter"
    options.reporter
    options.source-path
  ]

  child-process.stdout.on "data", (chunk) ->
    process.stdout.write chunk

  child-process.stderr.on "data", (chunk) ->
    process.stderr.write chunk

  <-! child-process.once "close"

  cb!

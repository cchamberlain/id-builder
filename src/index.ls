path = require "path"

async      = require "async"
id-type    = require "id-type"
prelude-ls = require "prelude-ls"

log = require "id-debug"
{
  debug
  info
  warning
} = log

{ each }         = prelude-ls
{ obj-to-pairs } = prelude-ls.Obj

lib   = require "./lib"
tasks = require "./tasks"

default-source-directory = "src"
default-target-directory = "build"

default-options =
  # TODO: Actually use these in the rest of the options so they are linked
  # properly.
  source-directory: default-source-directory
  target-directory: default-target-directory

  tasks:
    clean:
      enabled: true
      watch:   true
      path:    ""

    copy:
      enabled:     true
      watch:       true
      source-path: ""
      target-path: ""

    compile-browserify:
      enabled:     true
      watch:       true
      source-path: "build/client/js/app.js"
      target-path: "build/client/js/app.bundle.js"

    compile-coffeescript:
      enabled:     true
      watch:       true
      source-path: "src"
      target-path: "build"

    compile-jade:
      enabled:     true
      watch:       true
      source-path: "src/client"
      target-path: "build/client"

    compile-less:
      enabled:     true
      watch:       true
      source-path: "src/client"
      target-path: "build/client"

    compile-livescript:
      enabled:     true
      watch:       true
      source-path: "src"
      target-path: "build"

    compile-stylus:
      enabled:     true
      watch:       true
      source-path: "src/client"
      target-path: "build/client"

    documentation:
      enabled:     true
      watch:       true
      source-path: "src"
      target-path: "docs"

    run-servers:
      enabled: true
      watch:   true
      source-path: "build/server"
      paths: [
        "app.js"
      ]

    run-tests:
      enabled: true
      watch:   true

    watch:
      enabled: true
      paths: <[ src build test ]>


builder = (options = {}, cb) ->
  parsed-options = lib.parse-options.parse default-options, options

  clean = (cb) !->
    task = parsed-options.tasks.clean

    unless task.enabled
      info "| clean:disabled"
      return cb!

    info "> clean"

    if task.path is ""
      task.path = parsed-options.target-directory

    task.path = path.resolve task.path

    error <-! tasks.clean parsed-options, task
    return cb error if error

    info "< clean"

    cb!

  compile-browserify = (cb) !->
    task = parsed-options.tasks.compile-browserify

    unless task.enabled
      info "| compile-browserify:disabled"
      return cb!

    info "> compile-browserify"

    task = parsed-options.tasks.compile-browserify
    return cb! unless task.enabled

    # TODO: kinda weird here
    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    # TODO: kinda weird here
    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    error <-! tasks.compile-browserify.compile-all-files parsed-options, task
    return cb error if error

    info "< compile-browserify"

    cb!

  compile-coffeescript = (cb) !->
    task = parsed-options.tasks.compile-coffeescript

    unless task.enabled
      info "| compile-coffeescript:disabled"
      return cb!

    info "> compile-coffeescript"

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    error <-! tasks.compile-coffeescript.compile-all-files parsed-options, task
    return cb error if error

    info "< compile-coffeescript"

    cb!

  compile-jade = (cb) !->
    task = parsed-options.tasks.compile-jade

    unless task.enabled
      info "| compile-jade:disabled"
      return cb!

    info "> compile-jade"

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    error <-! tasks.compile-jade.compile-all-files parsed-options, task
    return cb error if error

    info "< compile-jade"

    cb!

  compile-less = (cb) !->
    task = parsed-options.tasks.compile-less

    unless task.enabled
      info "| compile-less:disabled"
      return cb!

    info "> compile-less"

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    error <-! tasks.compile-less.compile-all-files parsed-options, task
    return cb error if error

    info "< compile-less"

    cb!

  compile-livescript = (cb) !->
    task = parsed-options.tasks.compile-livescript

    unless task.enabled
      info "| compile-livescript:disabled"
      return cb!

    info "> compile-livescript"

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    error <-! tasks.compile-livescript.compile-all-files parsed-options, task
    return cb error if error

    info "< compile-livescript"

    cb!

  compile-stylus = (cb) !->
    task = parsed-options.tasks.compile-stylus

    unless task.enabled
      info "| compile-stylus:disabled"
      return cb!

    info "> compile-stylus"

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    error <-! tasks.compile-stylus.compile-all-files parsed-options, task
    return cb error if error

    info "< compile-stylus"

    cb!

  copy = (cb) !->
    task = parsed-options.tasks.copy

    unless task.enabled
      info "| copy:disabled"
      return cb!

    info "> copy"

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    error <-! tasks.copy.copy-all-files parsed-options, task
    return cb error if error

    info "< copy"

    cb!

  documentation = (cb) !->
    task = parsed-options.tasks.documentation

    unless task.enabled
      info "| documentation:disabled"
      return cb!

    info "> documentation"

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    #error <-! tasks.documentation.compile-all-files parsed-options, task
    #return cb error if error

    info "< documentation"

    cb!

  run-servers = (cb) !->
    task = parsed-options.tasks.run-servers

    unless task.enabled
      info "| run-servers:disabled"
      return cb!

    info "> run-servers"

    error <-! tasks.run-servers.run-servers parsed-options, task
    return cb error if error

    info "< run-servers"

    cb!

  run-tests = (cb) !->
    info "> run-tests"

    info "< run-tests"

    cb!

  watch = (cb) !->
    task = parsed-options.tasks.watch

    unless task.enabled
      info "| watch:disabled"
      return cb!

    info "> watch"

    tasks.watch parsed-options, task

    cb!

  done = (cb) !->
    info "> done"

    info "< done"

    cb!


  error <-! clean
  return cb error if error


  error <-! compile-coffeescript
  return cb error if error

  error <-! compile-livescript
  return cb error if error

  error <-! compile-jade
  return cb error if error


  error <-! copy
  return cb error if error


  error <-! compile-browserify
  return cb error if error


  error <-! compile-less
  return cb error if error

  error <-! compile-stylus
  return cb error if error


  error <-! documentation
  return cb error if error


  error <-! run-servers
  return cb error if error

  error <-! run-tests
  return cb error if error


  error <-! watch
  return cb error if error

  cb!

module.exports = builder

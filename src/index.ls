path = require "path"

async      = require "async"
deep-merge = require "deep-merge"
id-type    = require "id-type"
prelude-ls = require "prelude-ls"

{ each }         = prelude-ls
{ obj-to-pairs } = prelude-ls.Obj

lib   = require "./lib"
tasks = require "./tasks"

default-source-directory = "src"
default-target-directory = "build"

default-options =
  source-directory: default-source-directory
  target-directory: default-target-directory

  tasks:
    clean:
      enabled: true
      watch:   true
      path:    ""

    copy:
      enabled:    true
      watch:      true
      sourcePath: ""
      targetPath: ""

    compile-browserify:
      enabled:    true
      watch:      true
      sourcePath: "build/client/app.js"
      targetPath: "build/client"

    compile-coffeescript:
      enabled:    true
      watch:      true
      sourcePath: ""
      targetPath: ""

    compile-jade:
      enabled:    true
      watch:      true
      sourcePath: "src/client"
      targetPath: "build/client"

    compile-less:
      enabled:    true
      watch:      true
      sourcePath: ""
      targetPath: ""

    compile-livescript:
      enabled:    true
      watch:      true
      sourcePath: ""
      targetPath: ""

    compile-stylus:
      enabled:    true
      watch:      true
      sourcePath: ""
      targetPath: ""

    documentation:
      enabled:    true
      watch:      true
      sourcePath: ""
      targetPath: "docs"

    run-servers:
      enabled: true
      watch:   true
      paths: [
        "server/app.js"
      ]

    run-tests:
      enabled: true
      watch:   true

    watch:
      enabled: true
      sourcePath: ""


parse-options = (defaults, options) ->

builder = (options = {}, cb) ->
  parsed-options = deep-merge! default-options, options

  clean = (cb) !->
    console.log "> clean"

    return cb! unless parsed-options.tasks.clean.enabled

    task = parsed-options.tasks.clean

    if task.path is ""
      task.path = parsed-options.target-directory

    task.path = path.resolve task.path

    error <-! tasks.clean parsed-options, task
    return cb error if error

    console.log "< clean"

    cb!

  compile-browserify = (cb) !->
    console.log "> compile-browserify"

    console.log "! compile-browserify TODO: implement."

    console.log "< compile-browserify"

    cb!

  compile-coffeescript = (cb) !->
    console.log "> compile-coffeescript"

    task = parsed-options.tasks.compile-coffeescript
    return cb! unless task.enabled

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    error <-! tasks.compile-coffeescript.compile-all-files parsed-options, task
    return cb error if error

    console.log "< compile-coffeescript"

    cb!

  compile-jade = (cb) !->
    console.log "> compile-jade"

    task = parsed-options.tasks.compile-jade
    return cb! unless task.enabled

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    error <-! tasks.compile-jade.compile-all-files parsed-options, task
    return cb error if error

    console.log "< compile-jade"

    cb!

  compile-less = (cb) !->
    console.log "> compile-less"

    task = parsed-options.tasks.compile-less
    return cb! unless task.enabled

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    error <-! tasks.compile-less.compile-all-files parsed-options, task
    return cb error if error

    console.log "< compile-less"

    cb!

  compile-livescript = (cb) !->
    console.log "> compile-livescript"

    task = parsed-options.tasks.compile-livescript
    return cb! unless task.enabled

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    error <-! tasks.compile-livescript.compile-all-files parsed-options, task
    return cb error if error

    console.log "< compile-livescript"

    cb!

  compile-stylus = (cb) !->
    console.log "> compile-stylus"

    task = parsed-options.tasks.compile-stylus
    return cb! unless task.enabled

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    error <-! tasks.compile-stylus.compile-all-files parsed-options, task
    return cb error if error

    console.log "< compile-stylus"

    cb!

  copy = (cb) !->
    console.log "> copy"

    task = parsed-options.tasks.copy
    return cb! unless task.enabled

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    error <-! tasks.copy.copy-all-files parsed-options, task
    return cb error if error

    console.log "< copy"

    cb!

  documentation = (cb) !->
    console.log "> documentation"

    task = parsed-options.tasks.documentation
    return cb! unless task.enabled

    if task.source-path is ""
      task.source-path = parsed-options.source-directory

    task.source-path = path.resolve task.source-path

    if task.target-path is ""
      task.target-path = parsed-options.target-directory

    task.target-path = path.resolve task.target-path

    #error <-! tasks.documentation.compile-all-files parsed-options, task
    #return cb error if error

    console.log "< documentation"

    cb!

  run-servers = (cb) !->
    console.log "> run-servers"

    console.log "< run-servers"

    cb!

  run-tests = (cb) !->
    console.log "> run-tests"

    console.log "< run-tests"

    cb!

  watch = (cb) !->
    console.log "> watch"

    console.log "< watch"

    cb!

  done = (cb) !->
    console.log "> done"

    console.log "< done"

    cb!


  error <-! clean
  return cb error if error


  error <-! compile-coffeescript
  return cb error if error

  error <-! compile-livescript
  return cb error if error

  error <-! compile-jade
  return cb error if error


  error <-! compile-browserify
  return cb error if error


  error <-! compile-less
  return cb error if error

  error <-! compile-stylus
  return cb error if error


  error <-! copy
  return cb error if error

  error <-! documentation
  return cb error if error


  error <-! run-servers
  return cb error if error

  error <-! run-tests
  return cb error if error


  error <-! done
  return cb error if error

  cb!

module.exports = builder

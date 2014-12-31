require! <[ id-debug ]>

{
  debug
  error
  info
  warning
} = id-debug

Builder = require "./src"

e <-! Builder do
  tasks:
    clean:
      enabled: true

    compile-browserify:
      enabled: false

    compile-coffeescript:
      enabled: false

    compile-copy:
      enabled: false

    compile-jade:
      enabled: false

    compile-less:
      enabled: false

    compile-livescript:
      enabled: true

    compile-stylus:
      enabled: false

    run-browsersync-server:
      enabled: false

    run-servers:
      enabled: false

    run-tests:
      enabled: false

    watch-browserify:
      enabled: false

    watch-browsersync:
      enabled: false

    watch-coffeescript:
      enabled: false

    watch-jade:
      enabled: false

    watch-less:
      enabled: false

    watch-livescript:
      enabled: true

    watch-stylus:
      enabled: false

    watch-copy:
      enabled: false

    watch:
      enabled: true

error e if e

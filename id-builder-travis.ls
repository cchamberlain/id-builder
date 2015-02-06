# This file is used by Travis CI. It disabled everything but compile-livescript
# and run-tests.

id-builder = require "./src"

e <-! id-builder do
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
      enabled: true

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
      enabled: false

    watch-stylus:
      enabled: false

    watch-servers:
      enabled: false

    watch-copy:
      enabled: false

    watch-tests:
      enabled: false

    watch:
      enabled: false

error e if e

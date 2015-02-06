module.exports =
  source-directory: "src"
  target-directory: "build"
  tests-directory:  "build/tests"

  tasks:
    clean:
      enabled:     true
      path:        "build"

    # TODO: use source-directory in the task
    # TODO: rename source-path to entry-file-name and only the app.js part
    # TODO: rename target-path to target-file-name and only the app.bundle.js part
    compile-browserify:
      enabled:          true
      source-directory: "build/client/js"
      source-path:      "build/client/js/app.js"
      target-path:      "build/client/js/app.bundle.js"

    compile-coffeescript:
      enabled:     true
      source-path: "src"
      target-path: "build"

    compile-jade:
      enabled:     true
      source-path: "src/client"
      target-path: "build/client"

    compile-less:
      enabled:     true
      source-path: "src/client"
      target-path: "build/client"

    compile-livescript:
      enabled:     true
      source-path: "src"
      target-path: "build"

    compile-stylus:
      enabled:     true
      source-path: "src/client"
      target-path: "build/client"

    compile-copy:
      enabled:     true
      source-path: "src"
      target-path: "build"

    run-browsersync-server:
      enabled:     true

    run-servers:
      enabled:     true
      source-path: "build/server"
      paths:       [ "app.js" ]

    run-tests:
      enabled:     true
      source-path: "build/test"
      reporter:    "spec"

    # TODO: use source-directory in the task
    # TODO: rename source-path to entry-file-name and only the app.js part
    # TODO: rename target-path to target-file-name and only the app.bundle.js part
    watch-browserify:
      enabled:          true
      source-directory: "build/client/js"
      source-path:      "build/client/js/app.js"
      target-path:      "build/client/js/app.bundle.js"

    watch-browsersync:
      enabled:     true
      source-path: "build/client"

    watch-coffeescript:
      enabled:     true
      source-path: "src"
      target-path: "build"

    watch-jade:
      enabled:     true
      source-path: "src/client"
      target-path: "build/client"

    watch-less:
      enabled:     true
      source-path: "src/client"
      target-path: "build/client"

    watch-livescript:
      enabled:     true
      source-path: "src"
      target-path: "build"

    watch-servers:
      enabled:     true
      source-path: "build/server"
      paths:       [ "app.js" ]

    watch-tests:
      enabled:     true
      source-path: "build/test"
      reporter:    "spec"

    watch-stylus:
      enabled:     true
      source-path: "src/client"
      target-path: "build/client"

    watch-copy:
      enabled:     true
      source-path: "src"
      target-path: "build"

    watch:
      enabled:     true
      paths:       <[ src build ]>

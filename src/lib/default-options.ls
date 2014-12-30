module.exports =
  source-directory: "src"
  target-directory: "src"

  tasks:
    clean:
      enabled:     true
      path:        "build"

    compile-browserify:
      enabled:     true
      source-path: "build/client/js/app.js"
      target-path: "build/client/js/app.bundle.js"

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

    run-servers:
      enabled:     true
      source-path: "build/server"
      paths:       [ "app.js" ]

    run-tests:
      enabled:     true

    watch-browserify:
      enabled:     true
      source-path: "build/client/js/app.js"
      target-path: "build/client/js/app.bundle.js"

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

require! <[
  chai
  mkdirp
  rimraf
]>

browserify = require "../../../lib/browserify"
tests      = require "../../../lib/tests"

we         = it
{ expect } = chai

describe "browserify", !->
  before-each (cb) !->
    @directory-path = ".tmp/#{tests.random-string!}"
    mkdirp @directory-path, cb

  after-each (cb) !->
    rimraf @directory-path, cb

  # TODO: Convert this property into a method.
  describe "source-extension", !->
    we "should be defined", (cb) !->
      expect browserify.source-extension .to.be.a "string"
        .with.length.above 0

      cb!

  describe "target-extension", !->
    we "should be defined", (cb) !->
      expect browserify.target-extension .to.be.a "string"
        .with.length.above 0

      cb!

  # TODO: Damn globals. Can't test this can we.
  describe "path-reloads(options, path)", !->
    #export path-reloads = (options, path) -->

  describe "source-file-path-matches", !->
    # To prevent endless loops.
    describe "when the `source-file-path` is the `target-path`", !->
      we "should return `false`", (cb) !->
        options =
          target-path: "x/y.js"
          source-directory: "x"

        expect browserify.source-file-path-matches options, "x/y.js"
          .to.equal false

        cb!

    describe "when the `source-file-path` is in the the `source-directory`", !->
      we "should return `true`", (cb) !->
        options =
          target-path: "x/y.js"
          source-directory: "x"

        expect browserify.source-file-path-matches options, "x/q.js"
          .to.equal true

        cb!

    describe "when the `source-file-path` is not in the the `source-directory`", !->
      we "should return `false`", (cb) !->
        options =
          target-path: "x/q.js"
          source-directory: "a"

        expect browserify.source-file-path-matches options, "x/q.js"
          .to.equal false

        cb!

    #export source-file-path-matches = (options, source-file-path) -->

  describe "compile-all-files", !->
    #export compile-all-files = (options, cb) !->

  describe "watch", !->
    #export watch = (options, cb) !->

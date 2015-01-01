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

  describe "path-reloads", !->
    #export path-reloads = (options, path) -->

  describe "source-file-path-matches", !->
    #export source-file-path-matches = (options, source-file-path) -->

  describe "compile-all-files", !->
    #export compile-all-files = (options, cb) !->

  describe "watch", !->
    #export watch = (options, cb) !->

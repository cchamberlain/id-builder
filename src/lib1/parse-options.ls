deepmerge = require "deepmerge"

module.exports =
  parse: (defaults, options) ->
    deepmerge defaults, options

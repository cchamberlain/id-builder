require! <[ id-debug ]>

{
  debug
  error
  info
  warning
} = id-debug

builder = require "./src"

builder {}, (e) !->
  error e if e

#error <-! builder {}
#
#throw error if error

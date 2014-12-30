require! <[
  async
  fs
  id-debug
  prelude-ls
  rimraf
]>

logging = require "./logging"

{
  debug
  error
  info
  warning
} = id-debug

{
  each
  map
} = prelude-ls

export directory = (options, cb) !->
  error, nodes <-! fs.readdir options.path
  return cb error if error

  paths = map (-> "#{options.path}/#{it}"), nodes

  each (-> logging.task-info options.task-name, "`#{it}`"), paths

  error <-! async.each paths, rimraf
  return cb error if error

  cb null

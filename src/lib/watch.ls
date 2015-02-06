require! <[
  async
  chokidar
  fs
  path
  prelude-ls
]>

{
  each
  filter
  map
} = prelude-ls

watcher = void

export get-watcher = ->
  watcher

export start = (options) ->
  return unless options.paths.length

  return watcher if watcher

  watcher := chokidar.watch options.paths[0],
    ignored: /[\/\/]\./
    persistent: true
    ignore-initial: true

  for i in [ 1 ... options.paths.length ]
    watcher.add options.paths[i]

  watcher
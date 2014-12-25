require! <[ fs path mkdirp ]>

export ensure-file-directory = (options, task, target-file-path, cb) !-->
  error <-! mkdirp (path.dirname target-file-path)
  return cb error if error
  cb null

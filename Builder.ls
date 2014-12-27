builder = require "./src"

error <-! builder {}

throw error if error

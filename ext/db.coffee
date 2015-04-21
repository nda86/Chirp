mongoose = require 'mongoose'
uri = process.env.MONGOLAB_URI or 'mongodb://localhost/meandb'
mongoose.connect uri

module.exports = mongoose
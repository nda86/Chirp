mongoose = require 'mongoose'
config = require('../config.coffee')
# uri = process.env.MONGOLAB_URI or 'mongodb://localhost/meandb'
mongoose.connect config.database

module.exports = mongoose
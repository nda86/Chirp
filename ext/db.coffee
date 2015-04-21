mongoose = require 'mongoose'
uri = process.env.MONGOLAB_URI or 'mongodb://localhost/meandb'
# mongodb://nda86:password171086@ds037607.mongolab.com:37607/chirpdb
mongoose.connect uri

module.exports = mongoose
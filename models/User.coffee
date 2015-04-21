mongoose = require '../ext/db'

bcrypt = require 'bcrypt'


schemaUser = new mongoose.Schema 
	username: String,
	hash: String,
	createdAt:
		type: Date,
		default: Date.now

schemaUser.methods =
	isValidPassword: (user,password) ->
		return bcrypt.compareSync password, user.password,
	getHash: (password) ->
		return bcrypt.hashSync password, bcrypt.genSaltSync 10

schemaUser.virtual 'password'
	.get ->
		return this.hash
	.set (password) ->
		this.hash = this.getHash password

User = mongoose.model 'User', schemaUser


module.exports = User
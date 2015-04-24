mongoose = require '../ext/db'

bcrypt = require 'bcrypt'


schemaUser = new mongoose.Schema 
	username:
		type: String,
		required: on,
		index:
			unique: on
	password:
		type: String,
		required: on
	createdAt:
		type: Date,
		required: on,
		default: Date.now

schemaUser.pre 'save', (next) ->
	user = this
	return next() if !user.isModified 'password'
	bcrypt.genSalt 10, (err, salt) ->
		return next err if err
		bcrypt.hash user.password, salt, (err, hash) ->
			return next err if err
			user.password = hash
			next()

schemaUser.methods =
	isValidPassword: (password) ->
		return bcrypt.compareSync password, this.password
	# getHash: (password) ->
	# 	return bcrypt.hashSync password, bcrypt.genSaltSync 10

# schemaUser.virtual 'password'
# 	.get ->
# 		return this.hash
# 	.set (password) ->
# 		this.hash = this.getHash password

User = mongoose.model 'User', schemaUser


module.exports = User
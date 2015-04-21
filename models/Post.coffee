mongoose = require '../ext/db'
schemaPost = new mongoose.Schema
		user: String,
		text: String,
		createdAt:
			type: Date,
			default: Date.now

Post = mongoose.model 'Post', schemaPost

module.exports = Post
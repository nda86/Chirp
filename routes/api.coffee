Post = require '../models/Post'
router = require('express').Router()

isAuth = (req,res,next) -> 
	return next() if req.method is 'GET'
	return next() if req.session.User
	return res.send message: 'You must be logged'


router.use '/posts', isAuth


router.route '/posts'
	.get (req,res,next) ->
		Post.find (err,data) ->
			return next err if err
			return res.send data
	.post (req,res,next) ->
		newPost =
			user: req.body.user,
			text: req.body.text,
			# createdAt: req.body.createdAt
		Post.create newPost, (err,post) ->
			return next err if err
			return res.send post

router.route '/posts/:id'
	.get (req,res,next) ->
		id = req.params.id
		Post.findById id, (err,post) ->
			console.log id
			return next err if err
			return res.send post
	.put (req,res,next) ->
		id = req.params.id
		user = req.body.user
		text = req.body.text
		Post.findByIdAndUpdate id, {user: user, text: text}, (err,post) ->
			return next err if err
			return res.send post
		# Post.findById id (err,post) ->
		# 	return ext err if err
		# 	post.user = user
		# 	post.text = text
		# 	post.save (err,post) ->
		# 		return err if err
		# 		return res.send post
	.delete (req,res,next) ->
		id = req.params.id
		Post.findByIdAndRemove id, (err,post)->
			return next err if err
			return res.send post

module.exports = router



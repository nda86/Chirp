Post = require '../models/Post'
router = require('express').Router()
isAuth = require '../ext/isAuth.coffee'


router.use '/posts', isAuth


router.route '/posts'
	.get (req,res,next) ->
		Post.find (err,data) ->
			return next err if err
			return res.send data
	.post (req,res,next) ->
		post = new Post()
		post.user = req.body.user
		post.text = req.body.text
		post.save (err,post) ->
			return next err if err
			return res.send post

# router.route '/posts/:id'
# 	.get (req,res,next) ->
# 		id = req.params.id
# 		Post.findById id, (err,post) ->
# 			return next err if err
# 			return res.send post
# 	.put (req,res,next) ->
# 		id = req.params.id
# 		Post.findById id, (err,post) ->
# 			return next err if err
# 			post.user if req.body.user
# 			post.text if req.body.text
# 			post.save (err,post) ->
# 				return next err if err
# 				return res.send post
# 	.delete (req,res,next) ->
# 		id = req.params.id
# 		Post.findByIdAndRemove id, (err,post)->
# 			return next err if err
# 			return res.send post

module.exports = router



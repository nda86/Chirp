User = require '../models/User'
router = require('express').Router()



router.post '/signup', (req,res,next) ->
	username = req.body.username
	password = req.body.password
	User.find {username: username}, (err,users) ->
		return next err if err
		return res.send success: false, message: 'User already taken' if users.length > 0
		User.create 
			username: username,
			password: password, (err,user) ->
					return next err if err
					req.session.User = user.username
					return res.send success: true, message: 'Wellcome', user: user.username

router.post '/signin', (req,res,next) ->
	username = req.body.username
	password = req.body.password
	User.findOne username: username, (err,user) ->
			return next err if err
			return res.send success: false, message: 'User not found' if !user
			return res.send success: false, message: 'Wrong Password' if !user.isValidPassword(user,password)
			req.session.User = user.username
			return res.send success: true, message: 'Success! You are logining!', user: user.username

router.get '/signout', (req,res) ->
	req.session.destroy()
	res.send message: 'You are logout success!'

module.exports = router

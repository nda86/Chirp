User = require '../models/User'
config = require '../config.coffee'
jwt = require 'jsonwebtoken'
router = require('express').Router()



router.post '/signup', (req,res,next) ->
	user = new User()
	user.username = req.body.username
	user.password = req.body.password
	user.save (err,user) ->
		if err
			return res.send success: false, message: 'User already taken' if err.code is 11000
			return next err
		req.session.User = user.username
		token = jwt.sign username: user.username, config.jwtSecret, expiresInMinutes: 1440
		return res.send success: true, message: 'Wellcome', user: user.username, token: token

router.post '/signin', (req,res,next) ->
	username = req.body.username
	password = req.body.password
	User.findOne username: username, (err,user) ->
		return next err if err
		return res.send success: false, message: 'User not found' if !user
		return res.send success: false, message: 'Wrong Password' if !user.isValidPassword password
		req.session.User = user.username
		token = jwt.sign username: user.username, config.jwtSecret, expiresInMinutes: 1440
		return res.send success: true, message: 'Success! You are logining!', user: user.username, token: token

router.get '/signout', (req,res) ->
	req.session.destroy()
	res.send message: 'You are logout success!'

router.post '/me', (req,res,next) ->
	console.log req.session.User
	res.send req.session.User

module.exports = router

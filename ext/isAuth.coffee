jwt = require 'jsonwebtoken'
config = require '../config.coffee'

isAuth = (req,res,next) ->
	token = req.body.token or req.param('token') or req.headers['x-access-token']
	if token
		jwt.verify token, config.jwtSecret, (err,decoded) ->
			return res.status(403).send message: 'Ты кто такой? А ну брысь!!' if err
			req.decoded = decoded
			return next()
	else
		return res.status(403).send message: 'No token'

module.exports = isAuth
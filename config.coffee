module.exports =
	'port': process.env.PORT or 3000,
	'database': process.env.MONGOLAB_URI or 'mongodb://localhost/chirpdb',
	'jwtSecret': 'ilovemeansteak'
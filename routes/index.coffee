router = require('express').Router()
router.get '/', (req,res) ->
	res.render 'index', title: ChirApp


module.exports = router
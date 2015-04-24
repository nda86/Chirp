require('coffee-script/register');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var config = require('./config.coffee');

var api = require('./routes/api.coffee');
var myauth = require('./routes/auth.coffee');
var indexr = require('./routes/index.coffee');
// var auth = require('./routes/authentication')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// var PORT = config.port;
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(session({
	secret: 'super puper secret word'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/api', api);
app.use('/auth', myauth);
// app.use('/', indexr);
app.get('*',function(req,res){
	res.sendFile(__dirname + '/public/app/views/index.html');
})
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
// 	res.status = 404;
// 	msg = '<h1>404 Not Found!</h1>';
// 	res.send(msg);
// });

app.use(function(err,req,res,next){
	res.status(500).send({message: 'ERROR', error: err.message});
});


app.listen(config.port,function(){
	console.log('Listening on %d...',config.port);
});

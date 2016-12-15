var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var mongoose = require('mongoose');

var check = require('./routes/check.js');
var run = require('./routes/run.js');
var subscribe = require("./routes/subscribe.js");
var unsubscribe = require("./routes/unsubscribe.js");v
var register = require("./routes/register.js");

//var sandboxRun = require("./routes/sandbox/run.js");
//var sandboxInit = require("./routes/sandbox/init.js")

var app = express();
app.use(compression());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/check', check);
app.use('/run', run);
app.use('/subscribe',subscribe);
app.use('/unsubscribe',unsubscribe);
app.use('/register',register);

//app.use('/sandbox/run',sandboxRun)
//app.use('/sandbox/init',sandboxInit)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      status:err.status || 500,
      error:err.message
    })
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status:err.status || 500,
    error:err.message
  })
});


module.exports = app;

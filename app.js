var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var localStorage = require('localStorage');
var mongoose = require('mongoose');
var md5 = require('md5');
var routes = require('./app/routes/index');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all('/*', function(req, res, next) {
  res.header("Cache-Control","no-cache, no-store, max-age=0, must-revalidate");
  next();
});
app.use('/', routes);

mongoose.connect('mongodb://localhost/employee');
mongoose.connection.once('connected', function() {
  console.log("Connected to database");
});

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('err', {
    message: err.message,
    error: {}
  });
});
module.exports = app;
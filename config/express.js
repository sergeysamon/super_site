var express = require('express');
var glob    = require('glob');

var favicon        = require('serve-favicon');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var compress       = require('compression');
var methodOverride = require('method-override');
var nunjucks       = require('nunjucks');
var flash          = require('connect-flash');
var session        = require('express-session');


module.exports = function (app, config) {
  var env                    = process.env.NODE_ENV || 'development';
  app.locals.ENV             = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'nunjucks');
  nunjucks.configure(config.root + '/app/views', {
    autoescape: true,
    noCache   : true,
    express   : app
  });

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(session({
    secret           : "121333333333333333313adsfdgfn",
    resave           : false,
    saveUninitialized: false
  }));

  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  require('./passport')(app);

  app.use(flash());

  app.use(function (req, res, next) {
    if (req.isAuthenticated())
      res.locals.isAuth = true;
    else
      res.locals.isAuth = false;
    next()
  });

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });


  // 404 page
  app.get('*', function (req, res, next) {
    res.render('index', {title: "Express!"})
  });


  app.use(function (req, res, next) {
    var err    = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error  : err,
        title  : 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error  : {},
      title  : 'error'
    });
  });

};

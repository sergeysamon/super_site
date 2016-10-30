var express  = require('express'),
    router   = express.Router(),
    passport = require('passport'),
    bcrypt   = require('bcrypt-nodejs'),
    db       = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('pages/home/index', {title: "Express!"})
});

router.get('/login', isLoggedIn, function (req, res, next) {
  res.render('auth/login', {})
});

router.get('/signup', isLoggedIn, function (req, res) {
  res.render('auth/signup', {});
});

// router.get('/profile', isLoggedIn, function (req, res) {
//   res.render('auth/profile', {user: req.user});
// });

router.get('/logout', function (req, res) {
  req.logout();
  // req.session.destroy();
  res.redirect('/');
});

router.post('/signup', function (req, res, next) {
  db.User.findOne({where: {username: req.body.username}})
    .then(function (user) {
      if (!user) {
        db.User.create({
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password)
        }).then(function (user) {
          passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signup'
            // failureFlash   : true
          })(req, res, next)
        })
      } else {
        res.redirect('/');
      }
    })
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));


function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated())
    return next();
  res.redirect('/');
}

// router.get('/', function (req, res, next) {
//   db.Article.findAll().then(function (articles) {
//     res.render('index', {
//       title   : 'Generator-Express MVC',
//       articles: articles
//     });
//   });
// });

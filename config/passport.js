var db            = require('../app/models');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcrypt-nodejs');

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    db.User.findById(id).then(function (user) {
      done(null, user);
    })
  });

  passport.use(new LocalStrategy(function (username, pass, done) {
    db.User.findOne({
      where: {
        username: username
      }
    }).then(function (user, err) {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!bcrypt.compareSync(pass, user.password)) {
        return done(null, false)
      }
      return done(null, user);
    })
  }));

  app.use(function (req, res, next) {
    if (req.user) {
      res.locals.currentUser = req.user.username
    }
    next()
  });

  // passport.use('local-signup', new LocalStrategy({
  //     usernameField    : 'email',
  //     passwordField    : 'password',
  //     passReqToCallback: true
  //   },
  //   function (req, email, password, done) {
  //     process.nextTick(function () {
  //       db.User.findOne({
  //         where: {
  //           'email': email
  //         }
  //       }).then(function (user) {
  //         console.log('----------------------------------------------');
  //         console.log(!!user);
  //
  //         if (!user) {
  //           return done(null, false, req.flash('signupMessage', 'That email is already in use.'));
  //           console.log('+++++++++++++++++++++++++++++++++++++++++++++++')
  //         } else {
  //           var newUser = db.User.create({
  //             username: req.body.username,
  //             email   : req.body.email,
  //             password: this.generateHash(req.body.password)
  //           }).then(function (user) {
  //             // console.log(user)
  //           }).catch(function (err) {
  //             console.log(err)
  //           });
  //         }
  //         return done(null, newUser)
  //       })
  //         .catch(function (err) {
  //           if (err)
  //             return done(err);
  //         });
  //     });
  //   }));
  //
  // passport.use('local-login', new LocalStrategy({
  //     usernameField    : 'email',
  //     passwordField    : 'password',
  //     passReqToCallback: true
  //   },
  //   function (req, email, password, done) {
  //     console.log(email);
  //     db.User.findOne({
  //       where: {
  //         'email': email
  //       }
  //     }).then(function (user) {
  //       if (!user)
  //         return done(null, false, req.flash('loginMessage', 'No user found.'));
  //
  //       if (!user.validPassword(password))
  //         return done(null, false, req.flash('loginMessage', 'Wrong password.'));
  //
  //       return done(null, user);
  //
  //     }).catch(function (err) {
  //       if (err)
  //         return done(err);
  //     })
  //   }));
};

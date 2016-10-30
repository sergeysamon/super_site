var express = require('express'),
    router  = express.Router(),
    db      = require('../models');

module.exports = function (app) {
  app.use('/posts', router);
};


router.get('/', function (req, res, next) {
  console.log(req.isAuthenticated());

  db.Post.findAll().then(function (posts) {
    var context = {};
    if (!posts)
      context.posts = [];
    else
      context.posts = posts;
    res.render('posts/posts_list', context)
  })
});

router.post('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    db.Post.create({
      title : req.body.title,
      text  : req.body.text,
      UserId: req.user.id
    }).then(function () {
      res.redirect('/posts');
    });
  }

});

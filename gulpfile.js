'use strict';

var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var nodemon      = require('gulp-nodemon');
var sass         = require('gulp-sass');
var plumber      = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var csso         = require('gulp-csso');
var runSequence  = require('run-sequence');


// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'app.js',
    ext   : 'js',
    ignore: './public/**/*',
    // watch core server file(s) that require server restart on change
    watch : ['app.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) {
        cb();
      }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {
  setTimeout(function () {

  }, 1000);
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 3009,

    // open the proxied app in chrome
    browser: ['chrome']
  });
});

gulp.task('js', function () {
  return gulp.src('public/**/*.js');
  // do stuff to JavaScript files
  //.pipe(uglify())
  //.pipe(gulp.dest('...'));
});

gulp.task('css', function () {
  return gulp.src('public/**/*.css')
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
  gulp.src('./public/css/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade : false
    }))
    // .pipe(csso())
    .pipe(gulp.dest('./public/css'))
  // .pipe(browserSync.reload({stream: true}));
});

// gulp.task('nunjucks', function () {
//   return gulp.src('app/views/**/*.nunjucks')
//     .pipe(browserSync.reload({stream: true}));
// });

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('bs-reload-delay', function () {
  setTimeout(function () {
    browserSync.reload();
  }, 500);
});

gulp.task('sass-run', function (cb) {
  runSequence(
    'sass',
    'bs-reload-delay',
    cb
  )
});


gulp.task('build', function (cb) {
  runSequence(
    'sass',
    'browser-sync',
    cb
  )
});


gulp.task('default', ['build'], function () {
  gulp.watch('public/js/**/*.js', ['js', browserSync.reload]);
  gulp.watch(['public/css/**/*.css', '!public/css/style.css'], ['bs-reload']);
  gulp.watch('public/css/**/*.scss', ['sass-run']);
  gulp.watch('public/img/**/*', ['bs-reload']);
  gulp.watch('public/fonts/**/*', ['bs-reload']);
  gulp.watch('app/views/**/*.nunjucks', ['bs-reload']);
});


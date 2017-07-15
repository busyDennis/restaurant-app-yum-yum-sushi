'use strict';

var gulp                    = require('gulp'),
    env                     = require('gulp-env'),
    nodemon                 = require('gulp-nodemon'),
    sass                    = require('gulp-sass');

gulp.task('server:serve', function(cb) {
  var called = false;

  env({
    vars: {
      "NODE_ENV": "development"
    }
  });

  return nodemon({
      script:   './api/server.js',
      //nodeArgs: ['--debug'],
      ext:      'js html css',
      watch:    ['./api']
    })
    .on('start', function() {
      if (!called) {
        called = true;
        cb();
      }
    });
});

gulp.task('server:default', ['server:serve']);
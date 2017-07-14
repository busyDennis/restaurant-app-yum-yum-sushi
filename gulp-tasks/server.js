'use strict';

var gulp                    = require('gulp'),
    nodemon                 = require('gulp-nodemon'),
    sass                    = require('gulp-sass');

gulp.task('server:serve', function(cb) {
  var called = false;
  return nodemon({
      script:   './api/server.js',
      //nodeArgs: ['--debug'],
      env:      {
                  'NODE_ENV': 'development'
                },
      ext:      'js',
      watch:    ['server/']
    })
    .on('start', function() {
      if (!called) {
        called = true;
        cb();
      }
    });
});

gulp.task('server:default', ['server:serve']);
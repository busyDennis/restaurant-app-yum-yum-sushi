'use strict';

var gulp                    = require('gulp'),
    env                     = require('gulp-env'),
    fs                      = require('fs');

env.set({
    "NODE_ENV": "development"
  });

fs.readdirSync('./gulp-tasks').forEach(function(file) {
    require('./gulp-tasks/' + file);
  });

gulp.task('default', ['server:default', 'client:default']);
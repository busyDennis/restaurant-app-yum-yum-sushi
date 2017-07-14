'use strict';

var gulp                    = require('gulp'),
    fs                      = require('fs');


fs.readdirSync('gulp-tasks').forEach(function(file) {
    require('./gulp-tasks/' + file);
  });

gulp.task('default', ['server:default', 'client:default']);
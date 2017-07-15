'use strict';

var browserSync         = require('browser-sync').create(),
    gulp                = require('gulp'),
    proxy               = require('http-proxy-middleware'),
    sass                = require('gulp-sass');

gulp.task('client:serve', function(cb) {
    var proxyServer     = proxy('/api', {
          target: 'http://localhost:5000'
        });

    if(browserSync.active) {
      browserSync.exit();
    } else {
      browserSync.init({
        browser:           'firefox',
        startPath: '/',
        server: {
          baseDir:         ['./src'],
          middleware:      [proxyServer],
          routes: {
            '/bower_components': 'bower_components'
          }
        },
        ui:                false
      }, cb);
    };

  });

// gulp.task('sass', function() {
//     return gulp.src('./src/style/**/*.scss')
//       .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//       .pipe(gulp.dest('./src/style/style.css'))
//   });

// gulp.task('sass:watch', function () {
//     gulp.watch('./src/style/**/*.scss', ['sass']);
//   });

gulp.task('client:default', ['client:serve']);
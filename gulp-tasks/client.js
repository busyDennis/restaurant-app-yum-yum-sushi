'use strict';

var gulp                = require('gulp'),
    // proxy               = require('http-proxy-middleware'),
    sass                = require('gulp-sass');

gulp.task('client:serve', function(cb) {
    // var proxyServer     = proxy('/api', {
    //   target: 'http://localhost:3002'
    // });

    // browserSync.instance = browserSync.init({
    //   startPath: '/',
    //   server: {
    //     baseDir:      ['./src'],
    //     middleware:   [proxyServer],
    //     routes: {
    //       '/bower_components': 'bower_components'
    //     }
    //   },
    //   //browser: ['google chrome', 'firefox', 'internet explorer'],
    //   browser: (os.platform() === 'linux' ? ['google-chrome'] : ['google chrome'])
    // }, cb);
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
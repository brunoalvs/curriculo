'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync');

gulp.task('serve', ['pug', 'sass'], function() {
  browserSync.init({
    server: './'
  });

  gulp.watch('assets/sass/**/*.sass', ['sass']);
  gulp.watch('./**/*.pug', ['pug']);
  gulp.watch('./**/*.{html,css}').on('change', browserSync.reload);
});

gulp.task('pug', function() {
  return gulp.src('*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
})

gulp.task('sass', function() {
  return gulp.src('assets/sass/**/*.sass')
    .pipe(sass())
    .on('error', function(err){
            browserSync.notify(err.message, 3000);
            this.emit('end');
        })
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
})

gulp.task('default', ['pug', 'sass', 'serve']);

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');

function pugTask() {
  return gulp.src('*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
}

function stylusTask() {
  return gulp.src('assets/stylus/**/*.styl')
    .pipe(stylus())
    .on('error', function(err){
      browserSync.notify(err.message, 3000);
      this.emit('end');
    })
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
}


function serveTask() {
  browserSync.init({
    server: './'
  });

  gulp.watch('assets/stylus/**/*.styl', stylusTask);
  gulp.watch('./**/*.pug', pugTask);
  gulp.watch('./**/*.{html,css}').on('change', browserSync.reload);
}

exports.default = gulp.series(pugTask, stylusTask, serveTask);

// 'use strict'

// var gulp = require('gulp'),
//     stylus = require('gulp-stylus'),
//     pug = require('gulp-pug'),
//     browserSync = require('browser-sync');

// gulp.task('serve', ['pug', 'stylus'], function() {
//   browserSync.init({
//     server: './'
//   });

//   gulp.watch('assets/stylus/**/*.styl', ['stylus']);
//   gulp.watch('./**/*.pug', ['pug']);
//   gulp.watch('./**/*.{html,css}').on('change', browserSync.reload);
// });

// gulp.task('pug', function() {
//   return gulp.src('*.pug')
//     .pipe(pug())
//     .pipe(gulp.dest('./'))
//     .pipe(browserSync.stream());
// })

// gulp.task('stylus', function() {
//   return gulp.src('assets/stylus/**/*.styl')
//     .pipe(stylus())
//     .on('error', function(err){
//             browserSync.notify(err.message, 3000);
//             this.emit('end');
//         })
//     .pipe(gulp.dest('assets/css'))
//     .pipe(browserSync.stream());
// })

// gulp.task('default', ['pug', 'stylus', 'serve']);
